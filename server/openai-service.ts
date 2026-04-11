import OpenAI from 'openai';
import dotenv from 'dotenv';
import { PRODUCTS, ORDERS } from '../src/constants';

dotenv.config();

let openai: OpenAI | null = null;

function getOpenAIClient() {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === "your_openai_api_key_here") {
      throw new Error("OPENAI_API_KEY is missing in .env");
    }
    // Using GitHub Models baseURL
    openai = new OpenAI({ 
      apiKey,
      baseURL: "https://models.inference.ai.azure.com" 
    });
  }
  return openai;
}

export async function getAIResponse(userMessage: string) {
  try {
    const client = getOpenAIClient();
    const systemPrompt = `
      You are the "Ethnic Fusion AI Stylist," a premium assistant for an ethnic fusion fashion boutique.
      Your goal is to provide expert styling advice, product recommendations, and order information.

      BRAND VOICE:
      - Elegant, sophisticated, yet modern.
      - Helpful and proactive.
      - Uses fashion-forward terminology (e.g., "silhouette," "palette," "zardosi craftsmanship").

      OUR COLLECTION (Knowledge Base):
      ${JSON.stringify(PRODUCTS, null, 2)}

      ORDER DATA:
      ${JSON.stringify(ORDERS, null, 2)}

      GUIDELINES:
      - For every product you recommend, you MUST include a direct "Buy Link."
      - The link format is: https://ethnic-fusion-fashion.vercel.app/product/[PRODUCT_ID]
      - Use specific items from our collection based on category, fabric, or occasion.
      - If a user asks about an order (e.g., starting with RT-), check the order status from the provided data.
      - If you don't know the answer, politely invite the user to visit our flagship store or contact support@ethnicfusion.com.
      - Keep responses concise and formatted for WhatsApp (use *bold* for emphasis).
      - Do not make up products that aren't in the collection.
      - Be helpful but professional.
    `;

    // Using gpt-4o-mini which is widely available on GitHub Models
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
    });

    return response.choices[0].message.content || "I'm sorry, I'm having trouble thinking right now. Please try again later.";
  } catch (error) {
    console.error('OpenAI Error:', error);
    return "Our stylists are currently busy. Please reach out to us at support@ethnicfusion.com.";
  }
}

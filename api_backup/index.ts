import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import axios from 'axios';

// --- SELF-CONTAINED DATA (To avoid ERR_MODULE_NOT_FOUND on Vercel) ---
const PRODUCTS = [
  { id: '1', name: 'Zari Velvet Bridal Lehenga', price: 84500, category: 'Lehengas' },
  { id: '2', name: 'Kanchipuram Silk Drape', price: 42000, category: 'Sarees' },
  { id: '3', name: 'Mustard Fusion Gown', price: 28500, category: 'Fusion Dresses' },
  { id: '4', name: 'Floral Anarkali Suit', price: 36200, category: 'Anarkalis' },
  { id: '5', name: 'Ruby Gotta Patti Lehenga', price: 115000, category: 'Lehengas' },
  { id: '6', name: 'Sheer Organza Saree', price: 22400, category: 'Sarees' },
  { id: '7', name: 'Geometric Co-ord Set', price: 18900, category: 'Indo-Western' },
  { id: '8', name: 'Heritage Banarasi Dupatta', price: 12000, category: 'Kurtis' }
];

const ORDERS = [
  { id: 'RT-8849201', status: 'Shipped' },
  { id: 'RT-8847392', status: 'Delivered' },
  { id: 'RT-8845510', status: 'Delivered' }
];

const app = express();
app.use(bodyParser.json());

// --- OpenAI Logic ---
let openai: OpenAI | null = null;
function getOpenAIClient() {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY missing");
    openai = new OpenAI({ 
      apiKey,
      baseURL: "https://models.inference.ai.azure.com" 
    });
  }
  return openai;
}

async function getAIResponse(userMessage: string) {
  try {
    const client = getOpenAIClient();
    const systemPrompt = `
      You are the "Ethnic Fusion AI Stylist," a premium assistant for an ethnic fusion fashion boutique.
      BRAND VOICE: Elegant, sophisticated.
      OUR COLLECTION: ${JSON.stringify(PRODUCTS)}
      ORDER DATA: ${JSON.stringify(ORDERS)}
      GUIDELINES:
      - Include direct Buy Links: https://ethnic-fusion.vercel.app/product/[ID]
      - Use WhatsApp formatting (*bold*).
    `;
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
    });
    return response.choices[0].message.content || "Sorry, I am busy.";
  } catch (err) {
    return "Our stylists are currently busy.";
  }
}

// --- WhatsApp Logic ---
async function sendWhatsAppMessage(to: string, text: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const id = process.env.WHATSAPP_PHONE_NUMBER_ID;
  await axios({
    method: "POST",
    url: `https://graph.facebook.com/v21.0/${id}/messages`,
    data: { messaging_product: "whatsapp", to, text: { body: text } },
    headers: { Authorization: `Bearer ${token}` },
  });
}

// --- Express Routes ---
// Vercel routes both GET and POST to this file
app.all('/api', async (req, res) => {
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'ethnic_fusion_secret_123';

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
    return res.sendStatus(403);
  }

  if (req.method === 'POST') {
    const body = req.body;
    if (body.object === 'whatsapp_business_account') {
      const messages = body.entry?.[0]?.changes?.[0]?.value?.messages;
      if (messages && messages[0]) {
        const from = messages[0].from;
        const text = messages[0].text?.body;
        if (text) {
          const aiResponse = await getAIResponse(text);
          await sendWhatsAppMessage(from, aiResponse);
        }
      }
      return res.sendStatus(200);
    }
    return res.sendStatus(404);
  }

  res.sendStatus(405);
});

export default app;

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

export async function sendWhatsAppMessage(to: string, text: string) {
  try {
    const response = await axios({
      method: "POST",
      url: `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
      data: {
        messaging_product: "whatsapp",
        to: to,
        text: { body: text },
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      },
    });
    console.log("WhatsApp API Success Response:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error: any) {
    const errorData = error.response?.data || error.message;
    console.error("WhatsApp Send Error Detail:", JSON.stringify(errorData, null, 2));
    throw error;
  }
}

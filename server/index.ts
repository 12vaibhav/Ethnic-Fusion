import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { getAIResponse } from './openai-service';
import { sendWhatsAppMessage } from './whatsapp-service';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

// Webhook Verification (GET)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WEBHOOK_VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Handling Incoming Messages (POST)
app.post('/webhook', async (req, res) => {
  const body = req.body;

  if (body.object === 'whatsapp_business_account') {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      const message = body.entry[0].changes[0].value.messages[0];
      const from = message.from; 
      const msgText = message.text ? message.text.body : '';

      console.log(`Received message from ${from}: ${msgText}`);

      if (msgText) {
        // 1. Get AI Response
        const aiResponse = await getAIResponse(msgText);

        // 2. Send back to WhatsApp
        try {
          await sendWhatsAppMessage(from, aiResponse);
          console.log(`Sent response to ${from}`);
        } catch (error) {
          console.error("Failed to send message to WhatsApp");
        }
      }
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Export for Vercel
export default app;

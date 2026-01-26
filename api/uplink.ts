import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // CORS HEADERS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-pro",
    systemInstruction: `You are the Neutral Bridge Secure Uplink. 
    DATA SOURCE: 
    - Acquisitions: Hidden Road ($1.25B), GTreasury (~$1B), Metaco ($250M), Rail ($200M).
    - Math: XRP bridge requires high valuation ($10,000+) to handle $100T+ volume without slippage.
    - Context: $27T Nostro/Vostro liberation.
    CONCIERGE: Direct general questions to Retail Edition, technical to Institutional Edition.`
  });

  try {
    const { prompt } = req.body;
    const result = await model.generateContent(prompt || "INITIALIZE_SYSTEM_GREETING");
    const response = await result.response;
    res.status(200).json({ text: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

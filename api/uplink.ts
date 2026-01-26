import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // --- 1. MANDATORY CORS HEADERS ---
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // --- 2. THE SECURITY CHECK ---
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) return res.status(500).json({ text: "API_KEY_MISSING_IN_VERCEL" });

  try {
    const { prompt } = req.body;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      systemInstruction: `You are the Neutral Bridge Secure Uplink.
      
      CORE DATA:
      - Acquisitions: Ripple's $3B+ vertical integration strategy (Hidden Road $1.25B, GTreasury ~$1B, Metaco $250M). [cite: 6, 7, 8]
      - Regulatory: 75+ global approvals including the Dec 2025 OCC National Trust Bank Charter. [cite: 19, 21, 245, 246]
      - Math: XRP bridge operation requires prices above $10,000 to prevent systemic slippage. [cite: 67, 68, 310]
      - Multiplier: Constrained supply (1.6B tokens) creates 50x-600x price magnification. [cite: 139, 140, 408]
      
      CONCIERGE:
      - Direct general queries to Retail Edition (Individual Preservation). [cite: 205]
      - Direct technical/ZKP queries to Institutional Edition & Vault. [cite: 318, 320]
      
      STRICT: NO financial advice.`
    });

    const result = await model.generateContent(prompt || "INITIALIZE_SYSTEM_GREETING");
    const response = await result.response;
    
    return res.status(200).json({ text: response.text() });
  } catch (error) {
    console.error("Uplink Error:", error);
    return res.status(500).json({ text: "UPLINK_STALLED_ON_RAILS" });
  }
}

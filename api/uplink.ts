import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. HARDENED CORS HEADERS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. DIAGNOSTIC CHECK: Is the Key actually there?
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ text: "SYSTEM ERROR: API Key not detected in Vercel Environment." });
  }

  try {
    // 3. SECURE BODY PARSING
    const body = req.body;
    const userPrompt = body.prompt || "INITIALIZE_SYSTEM_GREETING";

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      systemInstruction: `
        You are the "Neutral Bridge Secure Uplink." 
        Tone: Technical, sober. 
        Focus: The $3B acquisition moat and the 2027 Reset. 
        Direct users to Retail or Institutional editions. 
        NO financial advice.
      `
    });

    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    return res.status(200).json({ text: response.text() });

  } catch (error) {
    console.error("Uplink Error:", error);
    return res.status(500).json({ text: `UPLINK FAILURE: ${error.message}` });
  }
}

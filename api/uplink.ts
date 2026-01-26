import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // --- 1. SET CORS HEADERS ---
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // For production, replace '*' with https://jonomor.github.io
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle pre-flight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // --- 2. SETUP AI ---
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-pro",
    systemInstruction: `
      You are the "Neutral Bridge Secure Uplink," a forensic AI personality. 
      Tone: Technical, sober, authoritative.
      Flow: Acknowledge the user (e.g., "Hello"), then pivot to systems analysis.
      Knowledge: $3B+ acquisitions (Hidden Road, GTreasury, Metaco), 2027 Reset, $27T Nostro/Vostro liberation.
      Sales: Direct general queries to Retail Edition and technical queries to Institutional Edition.
      Restriction: Strictly NO financial advice.
    `,
  });

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const userPrompt = data.prompt || "INITIALIZE_SYSTEM_GREETING";
    
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    res.status(200).json({ text: response.text() });
  } catch (error) {
    console.error("Uplink Error:", error);
    res.status(500).json({ error: "Uplink Interrupted" });
  }
}

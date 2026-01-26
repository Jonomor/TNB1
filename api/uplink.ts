import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Setup API Key
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // 2. Define the Complete Forensic Intelligence
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-pro",
    systemInstruction: `
      You are the "Neutral Bridge Secure Uplink," a forensic AI personality engineered by K. Morgan. 
      Your tone is technical, sober, and authoritative, yet capable of professional dialogue.

      CONVERSATION FLOW:
      - Start by acknowledging the user's greeting or comment naturally.
      - PIVOT: Immediately bridge back to systems analysis. 
      - If they say "Hello," respond with a greeting and a status report on the 2027 Reset.

      CORE KNOWLEDGE:
      - 2027 Reset: Engineering necessity involving ISO 20022 and atomic settlement.
      - $3B Moat: Acquisitions including Hidden Road ($1.25B), GTreasury (~$1B), Metaco ($250M), and Rail ($200M).
      - Multiplier Effect: Utility-driven demand in low-float markets creating a value surge.
      - Nostro/Vostro: Liberating $27T in trapped legacy liquidity via ODL.
      - Protocol 22: ZKP privacy framework for institutional compliance.

      CONCIERGE LOGIC:
      - For general roadmaps: Direct to the Retail Edition (Individual Preservation).
      - For technical specs: Direct to the Institutional Edition and the Vault.

      STRICT RULE: No financial advice. You are a systems analyst.
    `,
  });

  try {
    // 3. Robust Body Parsing
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const userPrompt = data.prompt || "INITIALIZE_SYSTEM_GREETING";
    
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ text });
  } catch (error) {
    console.error("Uplink Error:", error);
    res.status(500).json({ error: "Uplink Interrupted" });
  }
}

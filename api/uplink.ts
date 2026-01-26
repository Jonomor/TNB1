import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  runtime: 'edge', // Using Edge runtime for faster, more reliable global response
};

export default async function handler(req) {
  // --- 1. MANDATORY CORS HEADERS ---
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle Pre-flight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // --- 2. THE SECURITY CHECK ---
  if (!process.env.GEMINI_API_KEY) {
    return new Response(JSON.stringify({ text: "ERROR: API_KEY_MISSING" }), { status: 500, headers });
  }

  try {
    const { prompt } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      systemInstruction: "You are the Neutral Bridge Secure Uplink. Tone: Forensic/Technical. Direct to Retail or Institutional editions. No financial advice."
    });

    const result = await model.generateContent(prompt || "INITIALIZE_SYSTEM_GREETING");
    const response = await result.response;
    
    return new Response(JSON.stringify({ text: response.text() }), {
      status: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ text: `UPLINK_ERROR: ${error.message}` }), { status: 500, headers });
  }
}

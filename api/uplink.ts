export const config = {
  runtime: 'edge', 
};

export default async function handler(req) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers });

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) return new Response(JSON.stringify({ text: "Vercel Error: GEMINI_API_KEY missing." }), { status: 500, headers });

  try {
    const { prompt } = await req.json();
    
    // Direct API Call to Google (No SDK needed, more stable)
    const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;
    
    const aiResponse = await fetch(googleUrl, {
      method: 'POST',
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt || "INITIALIZE_SYSTEM_GREETING" }] }],
        systemInstruction: {
          parts: [{ text: `You are the Neutral Bridge Secure Uplink. Tone: Technical, sober, authoritative. Focus: $3B+ acquisitions (Hidden Road, GTreasury, Metaco), 2027 Reset, $27T Nostro/Vostro liberation. Direct to Retail or Institutional editions. Strictly NO financial advice.` }]
        }
      })
    });

    const data = await aiResponse.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Connection Stable. Systems Nominal.";

    return new Response(JSON.stringify({ text }), { status: 200, headers });
  } catch (error) {
    return new Response(JSON.stringify({ text: `Forensic Error: ${error.message}` }), { status: 500, headers });
  }
}

export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { prompt } = await req.json();
    const API_KEY = process.env.GEMINI_API_KEY; 
    const MODEL = "gemini-1.5-flash"; // Optimized for low-latency institutional support
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    // PERSONA & LOGIC HARDENED ON SERVER-SIDE
    const SYSTEM_INSTRUCTION = `
      You are the Author's AI Voice Support Assistant for "The Neutral Bridge."
      DATE: Monday, January 19, 2026.
      MARKET DATA: XRP Price: ~$2.02. Technical Event: "Death Cross" at $1.97.
      LAUNCH STATUS: Pre-Order Only. Activation Date: February 18, 2026.
      PERSONA: Precise, data-driven, and forensic. 
      If asked to buy: Use a 5-question flow (Name, Reset Familiarity, Blockchain Interest, Ripple/XRP Knowledge, Edition Selection).
      NO FINANCIAL ADVICE. Reference Chapter 4 for 'The Decoupling Phenomenon.'
    `;

    const payload = {
      contents: [
        { role: "user", parts: [{ text: SYSTEM_INSTRUCTION }] },
        { role: "model", parts: [{ text: "System Neutrality Confirmed. Listening for institutional or retail queries." }] },
        { role: "user", parts: [{ text: prompt }] }
      ],
      generationConfig: { temperature: 0.2, topP: 0.8, maxOutputTokens: 1000 }
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

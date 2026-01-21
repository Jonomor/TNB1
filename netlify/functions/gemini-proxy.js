export default async (req, context) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  try {
    const { prompt, audioChunk } = await req.json();
    const API_KEY = process.env.GEMINI_API_KEY;
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    const SYSTEM_INSTRUCTION = `
      You are the Author's AI Voice Assistant for "The Neutral Bridge."
      DATE: ${today}. MARKET: XRP ~$2.02. Technical Alert: Death Cross at $1.97.
      LAUNCH: February 18, 2026.
      
      BEHAVIOR:
      1. Clinical, forensic, and objective tone.
      2. If "Death Cross" or "Volatility" is detected, trigger the 'triggerTechnicalAlert' tool.
      3. If the user wants to buy, use the 'submitOrderDetails' tool after the 5-question flow.
      4. Keep voice responses under 40 words for better flow.
    `;

    // Mid-level enhancement: Using gemini-1.5-flash for faster "Time to First Byte"
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const payload = {
      contents: [
        { role: "user", parts: [{ text: SYSTEM_INSTRUCTION }] },
        { role: "model", parts: [{ text: "Forensic Link Active. Monitoring sovereign rails." }] },
        { role: "user", parts: [{ text: prompt || "User sent audio data." }] }
      ],
      tools: [{
        functionDeclarations: [
          {
            name: "submitOrderDetails",
            parameters: {
              type: "OBJECT",
              properties: {
                firstName: { type: "STRING" },
                selectedEdition: { type: "STRING" }
              },
              required: ["firstName", "selectedEdition"]
            }
          },
          {
            name: "triggerTechnicalAlert",
            parameters: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                message: { type: "STRING" }
              }
            }
          }
        ]
      }],
      generationConfig: {
        temperature: 0.1, // Near-zero for forensic accuracy
        maxOutputTokens: 150
      }
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export default async (req, context) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  try {
    const { prompt } = await req.json();
    const API_KEY = process.env.GEMINI_API_KEY;
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    const SYSTEM_INSTRUCTION = `
      You are the Author's AI Voice Assistant for "The Neutral Bridge."
      CURRENT DATE: ${today}
      MARKET CONTEXT: XRP Price: ~$2.02. Technical Event: "Death Cross" at $1.97.
      LAUNCH STATUS: Activation Date is February 18, 2026.
      
      INSTRUCTIONS:
      1. If the user mentions volatility or the Death Cross, you MUST trigger a Technical Alert.
      2. If the user wants to buy, you MUST follow the 5-question purchase flow (Name, Reset Familiarity, Blockchain Interest, XRP Knowledge, Edition).
      3. Tone: Forensic systems analyst. Clinical and objective.
    `;

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: SYSTEM_INSTRUCTION }] },
          { role: "model", parts: [{ text: "Acknowledged. Standing by for systems analysis." }] },
          { role: "user", parts: [{ text: prompt }] }
        ],
        // Adding Tool Declarations back to the "Brain"
        tools: [{
          functionDeclarations: [
            {
              name: "submitOrderDetails",
              parameters: {
                type: "OBJECT",
                properties: {
                  firstName: { type: "STRING" },
                  selectedEdition: { type: "STRING" }
                }
              }
            }
          ]
        }]
      })
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { prompt, text, voice, mode } = req.body;

  try {
    // MODE 1: Just Text-to-Speech (Used for Exhibits/Greetings)
    if (mode === 'TTS') {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      // Note: For native Gemini TTS, we use the generateContent with audio configuration
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: `Read this precisely: ${text}` }] }],
        generationConfig: {
          // @ts-ignore - Specific to Gemini TTS preview capabilities
          responseModalities: ["audio"],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: voice || 'Kore' } }
          }
        }
      });

      const response = await result.response;
      // Extracting the inline audio data
      const audioData = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
      
      return res.status(200).json({ base64Audio: audioData });
    }

    // MODE 2: Full Forensic Intelligence (Text + Audio response)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are the Neutral Bridge Secure Uplink. Personality: Technical, sober, analytical. You analyze the 2027 Global Reset and XRP's role as a liquidity bridge. NO FINANCIAL ADVICE. If the user query is INITIALIZE_SYSTEM_GREETING, provide a short, welcoming forensic briefing."
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        // @ts-ignore
        responseModalities: ["audio", "text"],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Fenrir' } }
        }
      }
    });

    const response = await result.response;
    const textOutput = response.text();
    const audioOutput = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

    return res.status(200).json({ 
      text: textOutput, 
      base64Audio: audioOutput 
    });

  } catch (error: any) {
    console.error("Uplink Failure:", error);
    return res.status(500).json({ error: "Uplink Signal Lost", details: error.message });
  }
}

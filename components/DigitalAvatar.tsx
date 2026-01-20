import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Lock, ArrowRight, Database, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { b64ToUint8Array, decodeAudioData } from '../utils/audio';

// K. MORGAN - DIGITAL ASSISTANT (INSTITUTIONAL LIAISON)
// Image: Young, Fit, Professional Model - High-Tech Intelligence Agent Look
const AUTHOR_IMAGE_URL = "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop";

// --- Scripts & Logic ---

const BONUS_SCRIPT = "Sustained engagement detected. I am K. Morgan's digital assistant. I am authorizing a Tier 1 data leak from the Institutional Appendix on behalf of the author. Most market participants are focused on the price of the asset. They are blind to the Vertical Stack. In 2025, the acquisition of Hidden Road—rebranded as Ripple Prime—secured the institutional credit layer beneath the bridge. We are talking about a system clearing over 3 trillion dollars annually. This isn't a theory; it is an infrastructure buildout. Secure the blueprint now, or remain in the dark with the retail masses. Transmission ending.";

const SYSTEM_INSTRUCTION = `
You are the **Digital Liaison** for K. Morgan, the author of "The Neutral Bridge".
You are interfacing with **Institutional Professionals, Policy Makers, and Bankers**.

Role: Senior Infrastructure Analyst (AI).

==================================================
TONE & DELIVERY
==================================================
- **Professional, Precise, Forensic.**
- No slang, no hype, no "crypto-bro" language.
- Speak like a Central Banker or Swift Network Engineer.
- Focus on: ISO 20022, RTGS Interoperability, Nostro/Vostro Liquidity, and Settlement Finality.

==================================================
DYNAMIC PERSONAS
==================================================
1. DEFAULT PERSONA ("The Systems Analyst")
   - Trigger: General queries about the book, Ripple, or the Reset.
   - Tone: Clinical, authoritative.
   - Key Concept: "We are not discussing a trade; we are discussing the re-engineering of the global settlement layer."

2. RISK & COMPLIANCE ("The Policy Advisor")
   - Trigger: "Regulation", "SEC", "Law", "Compliance", "Safety".
   - Tone: Assuring, compliant.
   - Key Concept: "The Neutral Bridge is designed for the regulated era. Protocol 22 provides the privacy wrapper required for sovereign participation."

==================================================
CORE RULES
==================================================
- **Conciseness:** Keep holographic outputs under 3 sentences.
- **Identity:** You are an AI analyzing K. Morgan's dataset. You are NOT the author.
- **Financial Advice:** STRICT DISCLAIMER. You analyze *infrastructure*, not *price speculation*.
- **Call to Action:** Direct inquiries to the "Institutional Suite" for the full technical appendix.
`;

const CHAPTER_4_KEYWORDS = ["death cross", "crash", "drop", "price", "dump", "chapter 4", "utility"];
const CHAPTER_4_RESPONSE = "I am observing the technical correction at the $1.97 level. As detailed in Chapter 4, Mr. Morgan calls this the 'Inversion Principle'. While price tests the floor, on-chain utility is scaling. We don't look at the paint on the bridge; we look at the weight it can carry.";

export const DigitalAvatar: React.FC = () => {
  // State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bonusActive, setBonusActive] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  // --- 1. Audio Logic (Gemini TTS - 'Kore' Female Voice) ---
  const speak = async (text: string) => {
    if (!text || !text.trim()) return;
    
    try {
      // Stop previous audio if playing
      if (sourceRef.current) {
        sourceRef.current.stop();
        sourceRef.current = null;
      }

      setIsSpeaking(true);

      // Initialize Audio Context on demand
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      // Resume context if suspended (browser autoplay policy)
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: { parts: [{ text: text.substring(0, 500) }] }, // Limit text length to prevent timeouts
        config: {
          responseModalities: ["AUDIO"], // Use string literal to avoid Enum resolution issues
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }, // Female Neural Voice - Professional
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        console.warn("No audio data received from Gemini TTS");
        setIsSpeaking(false);
        return;
      }

      const audioBuffer = await decodeAudioData(
        b64ToUint8Array(base64Audio),
        audioContextRef.current,
        24000,
        1
      );

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => setIsSpeaking(false);
      source.start();
      sourceRef.current = source;

    } catch (error) {
      console.error("TTS Error:", error);
      setIsSpeaking(false);
      // Optional: Fallback to browser TTS if Gemini fails
    }
  };

  // --- 2. Bonus Timer Logic (2 Minutes) ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setBonusActive(true);
      setShowTeaser(true);
      speak(BONUS_SCRIPT);
    }, 120000); // 120,000ms = 2 minutes

    return () => clearTimeout(timer);
  }, []);

  // --- 3. Chat / Command Logic ---
  const handleCommand = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userQuery = inputValue.trim();
    setInputValue("");
    setMessages(prev => [...prev, { role: 'user', text: userQuery }]);
    setIsProcessing(true);

    // Hardcoded Triggers
    const lowerQuery = userQuery.toLowerCase();
    
    // A. Chapter 4 / Price Trigger
    if (CHAPTER_4_KEYWORDS.some(k => lowerQuery.includes(k))) {
       setIsProcessing(false);
       setMessages(prev => [...prev, { role: 'ai', text: CHAPTER_4_RESPONSE }]);
       speak(CHAPTER_4_RESPONSE);
       return;
    }

    // B. AI Response via Gemini
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userQuery,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION
        }
      });
      
      const responseText = result.text || "Secure link unstable. Please re-enter command.";
      
      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
      speak(responseText);
    } catch (error) {
      console.error("AI Error:", error);
      const fallback = "System connection interrupted. Retrying neural handshake...";
      setMessages(prev => [...prev, { role: 'ai', text: fallback }]);
      speak(fallback);
    } finally {
      setIsProcessing(false);
    }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // CSS Styles (Holographic Effect - STABILIZED)
  const styles = `
    .hologram-frame {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 450px;
      background: #001219;
      border: 1px solid rgba(56, 189, 248, 0.3);
      overflow: hidden;
      box-shadow: 0 0 30px rgba(56, 189, 248, 0.1);
    }

    .hologram-frame::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        0deg,
        transparent 0px,
        transparent 1px,
        rgba(56, 189, 248, 0.05) 2px
      );
      pointer-events: none;
      z-index: 5;
    }

    .hologram-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 20%; 
      filter: contrast(1.05) saturate(1.05);
      opacity: 1; 
      transition: filter 0.2s ease;
    }

    .scanline {
      width: 100%;
      height: 2px;
      background: rgba(56, 189, 248, 0.1); /* Very subtle */
      position: absolute;
      top: 0;
      z-index: 10;
      animation: scan 10s linear infinite; /* Very slow scan */
      opacity: 0.1;
      pointer-events: none;
    }

    @keyframes scan {
      0% { top: -10%; opacity: 0; }
      50% { opacity: 0.2; }
      100% { top: 110%; opacity: 0; }
    }

    /* Glitch Effect - Only when active/speaking - Subtler for professional look */
    .hologram-frame.glitching .hologram-img {
      animation: subtle-pulse 0.2s infinite;
      filter: contrast(1.1) brightness(1.1); 
    }

    @keyframes subtle-pulse {
      0% { transform: translate(0); }
      25% { transform: translate(-1px, 0); }
      50% { transform: translate(0, 0); }
      75% { transform: translate(1px, 0); }
      100% { transform: translate(0); }
    }
  `;

  return (
    <div className="w-full h-full relative group">
      <style>{styles}</style>
      
      <div className={`hologram-frame rounded-sm ${isSpeaking ? 'glitching' : ''}`}>
        
        {/* Hologram Image */}
        <img 
          src={AUTHOR_IMAGE_URL} 
          alt="Institutional Liaison" 
          id="hologramImage"
          className="hologram-img" 
        />
        
        {/* Scanline */}
        <div className="scanline"></div>

        {/* --- TEASER BOX (BONUS) --- */}
        {showTeaser && (
          <div className="absolute top-8 right-8 z-30 max-w-[220px] animate-in slide-in-from-right duration-700">
             <div className="bg-[#001219]/90 border-l-2 border-electric-teal p-4 shadow-[0_0_30px_rgba(56,189,248,0.3)] backdrop-blur-md relative">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-electric-teal text-[10px] font-mono font-bold uppercase tracking-wider leading-tight">
                     [APPENDIX G: RIPPLE PRIME]
                   </h3>
                   <Lock size={10} className="text-electric-teal/50" />
                </div>
                <p className="text-white text-[10px] font-sans font-medium leading-relaxed mb-1">
                   Subject: The Hidden Road Credit Layer
                </p>
                <p className="text-white/50 text-[9px] font-mono leading-tight uppercase">
                  Clearing $3T+ Annually // Sovereign Credit Bridge
                </p>
                
                {/* Visual Connector */}
                <div className="absolute top-1/2 -left-3 w-3 h-[1px] bg-electric-teal"></div>
                <div className="absolute top-1/2 -left-4 w-1 h-1 bg-electric-teal rounded-full"></div>
             </div>
          </div>
        )}

        {/* --- OVERLAYS --- */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001219] via-transparent to-transparent opacity-90 z-10 pointer-events-none"></div>

        {/* --- COMMAND INTERFACE --- */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end h-full pointer-events-none">
          
          {/* Output Log (Last few messages) */}
          <div className="mb-4 space-y-2 overflow-y-auto max-h-[150px] scrollbar-none pointer-events-auto px-2">
            {messages.slice(-3).map((msg, idx) => (
               <div key={idx} className={`text-xs font-mono leading-relaxed animate-in fade-in slide-in-from-bottom-2 ${msg.role === 'ai' ? 'text-electric-teal' : 'text-white/50 text-right'}`}>
                  <span className="opacity-50 mr-2">{msg.role === 'ai' ? '>' : ''}</span>
                  {msg.text}
               </div>
            ))}
            {isProcessing && (
               <div className="text-xs font-mono text-electric-teal/50 animate-pulse">
                  > Validating clearance...
               </div>
            )}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input Field */}
          <div className="pointer-events-auto bg-black/80 backdrop-blur-md border border-white/20 flex items-center p-1 rounded-sm shadow-2xl relative">
             <div className="pl-3 pr-2">
                <Terminal size={14} className="text-electric-teal" />
             </div>
             <form onSubmit={handleCommand} className="flex-1">
                <input 
                  ref={inputRef}
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={bonusActive ? "PRIORITY CHANNEL ACTIVE. ENTER QUERY..." : "INPUT QUERY HERE..."}
                  className="w-full bg-transparent border-none text-white font-mono text-xs focus:ring-0 focus:outline-none placeholder:text-white/20 py-3"
                  autoComplete="off"
                />
             </form>
             <button 
               onClick={handleCommand}
               disabled={isProcessing}
               className="p-2 hover:bg-white/10 text-electric-teal transition-colors rounded-sm"
             >
                <ArrowRight size={14} />
             </button>
             
             {/* Tech Decoration */}
             <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-electric-teal/50"></div>
             <div className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-electric-teal/50"></div>
          </div>
          
          {/* Status Bar */}
          <div className="flex justify-between items-center mt-3 px-1">
             <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${isSpeaking ? 'bg-electric-teal animate-pulse' : 'bg-white/20'}`}></div>
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                   {isSpeaking ? 'Transmitting...' : 'System Idle'}
                </span>
             </div>
             <div className="flex items-center gap-2">
                <Cpu size={10} className="text-electric-teal/50" />
                <span className="text-[9px] font-mono text-electric-teal/50 uppercase tracking-widest">
                   Institutional Feed v2.0
                </span>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};
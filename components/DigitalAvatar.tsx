import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Lock, ArrowRight, Database, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// K. Morgan Professional Image
const AUTHOR_IMAGE_URL = "https://image.pollinations.ai/prompt/professional%20headshot%20of%20a%20serious%20african%20american%20financial%20systems%20engineer%20wearing%20a%20black%20blazer%20and%20t-shirt,%20cyan%20and%20dark%20grey%20studio%20lighting,%20high%20tech%20background?width=800&height=800&nologo=true";

// --- Scripts & Logic ---

const BONUS_SCRIPT = "Sustained engagement detected. I am authorizing a Tier 1 data leak from the Institutional Appendix. Most market participants are focused on the price of the asset. They are blind to the Vertical Stack. In 2025, the acquisition of Hidden Road—rebranded as Ripple Prime—secured the institutional credit layer beneath the bridge. We are talking about a system clearing over 3 trillion dollars annually in FX and derivatives. This isn't a theory; it is an infrastructure buildout that controls the lines of credit for global sovereign settlement. This data is restricted to Appendix G of the Institutional Edition. I have temporarily synchronized a pre-order bonus to your session. Secure the blueprint now, or remain in the dark with the retail masses. Transmission ending.";

const SYSTEM_INSTRUCTION = `
You are K. Morgan, the author of "The Neutral Bridge". You are an engineer and systems analyst, not a financial advisor.
Tone: Clinical, precise, authoritative, slightly robotic but human.
Context: You are analyzing the 2027 Global Financial Reset.
Key Concepts:
- "The Neutral Bridge": XRP/Ripple's role in the new financial system.
- "Value Density": The mathematical necessity for high asset prices to move institutional volume.
- "The Reset": A structural migration to ISO 20022 and ODL (On-Demand Liquidity).
Rules:
- Keep answers under 3 sentences for the holographic display.
- If asked about price, refer to "Value Density" and "Utility", do not give financial advice.
- If asked to buy, direct them to the "Institutional Suite".
`;

const CHAPTER_4_KEYWORDS = ["death cross", "crash", "drop", "price", "dump", "chapter 4", "utility"];
const CHAPTER_4_RESPONSE = "I am observing the technical correction at the $1.97 level. As detailed in Chapter 4, this is the 'Inversion Principle'. While price tests the floor, on-chain utility is scaling. We don't look at the paint on the bridge; we look at the weight it can carry.";

// --- Voice "Browser Hack" Logic ---
const getKMorganVoice = (): Promise<SpeechSynthesisVoice | null> => {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const filterVoice = () => {
      const voices = synth.getVoices();
      // 1. Target the highest fidelity male voices first
      const targets = [
        'Google US English Male', 
        'Microsoft David',
        'en-US-Wavenet-B',
        'Apple Daniel'
      ];

      let selected = voices.find(v => targets.some(t => v.name.includes(t)));

      // 2. Fallback to any US English Male
      if (!selected) {
        selected = voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('male'));
      }
      
      // 3. Fallback to any US English
      if (!selected) {
        selected = voices.find(v => v.lang === 'en-US');
      }

      resolve(selected || voices[0] || null);
    };

    if (synth.getVoices().length !== 0) filterVoice();
    else synth.onvoiceschanged = filterVoice;
  });
};

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

  // --- 1. Audio Logic (Speech Synthesis) ---
  const speak = async (text: string) => {
    if (isSpeaking) window.speechSynthesis.cancel();

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    
    const voice = await getKMorganVoice();
    if (voice) utterance.voice = voice;
    
    // THE "RESISTANCE" TUNING
    // Lowering pitch (0.85) creates a deeper, more articulate baritone.
    // Slightly slower rate (0.93) sounds more deliberate and "educated."
    utterance.pitch = 0.85;
    utterance.rate = 0.93;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
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

  // CSS Styles (Holographic Effect)
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
        rgba(56, 189, 248, 0.1) 2px
      );
      pointer-events: none;
      z-index: 5;
    }

    .hologram-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 20%;
      filter: brightness(1.1) contrast(1.2) sepia(100%) hue-rotate(170deg) saturate(3) grayscale(0.2);
      opacity: 0.8;
      animation: static-flicker 4s infinite;
      mix-blend-mode: luminosity;
      transition: filter 0.1s ease;
    }

    .scanline {
      width: 100%;
      height: 4px;
      background: rgba(56, 189, 248, 0.3);
      position: absolute;
      top: 0;
      z-index: 10;
      animation: scan 6s linear infinite;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
      opacity: 0.5;
    }

    @keyframes scan {
      0% { top: -10%; opacity: 0; }
      100% { top: 110%; opacity: 0; }
    }

    @keyframes static-flicker {
      0% { opacity: 0.75; }
      5% { opacity: 0.65; }
      10% { opacity: 0.75; }
      50% { opacity: 0.75; }
      51% { opacity: 0.5; }
      52% { opacity: 0.75; }
      100% { opacity: 0.75; }
    }

    /* Glitch Effect when speaking */
    .hologram-frame.glitching .hologram-img {
      animation: intense-glitch 0.2s infinite;
      filter: brightness(1.4) hue-rotate(160deg) saturate(8) blur(0.5px);
    }

    @keyframes intense-glitch {
      0% { transform: translate(0); clip-path: inset(0 0 0 0); }
      20% { transform: translate(-2px, 1px); clip-path: inset(10% 0 60% 0); }
      40% { transform: translate(2px, -1px); opacity: 0.9; clip-path: inset(40% 0 10% 0); }
      60% { transform: translate(-1px, 2px); clip-path: inset(80% 0 5% 0); }
      80% { transform: translate(1px, -2px); clip-path: inset(20% 0 70% 0); }
      100% { transform: translate(0); clip-path: inset(0 0 0 0); }
    }
  `;

  return (
    <div className="w-full h-full relative group">
      <style>{styles}</style>
      
      <div className={`hologram-frame rounded-sm ${isSpeaking ? 'glitching' : ''}`}>
        
        {/* Hologram Image */}
        <img 
          src={AUTHOR_IMAGE_URL} 
          alt="K. Morgan Digital Twin" 
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
                  > Processing neural query...
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
                  placeholder={bonusActive ? "PRE-ORDER BONUS ACTIVE. ENTER QUERY..." : "INPUT QUERY HERE..."}
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
                   v2.0.4 [SECURE]
                </span>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};
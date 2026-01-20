import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import { Mic, X, Loader2, Volume2, CheckCircle2, Edit2, AlertTriangle, Terminal, BookOpen } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, FunctionDeclaration, Type } from "@google/genai";
import { b64ToUint8Array, decodeAudioData, arrayBufferToBase64, floatTo16BitPCM } from '../utils/audio';

interface VoiceAssistantProps {
  className?: string;
}

interface PurchaseData {
  firstName: string;
  familiarWithReset: string;
  interestedInBlockchain: string;
  knowsRippleXRP: string;
  selectedEdition: string;
}

// --- Visual Components ---

const AIWelcomeSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      setLogs(prev => [...prev, "INITIALIZING SECURE LINK..."]);
      await new Promise(r => setTimeout(r, 600));
      setLogs(prev => [...prev, "SYNCHRONIZING WITH XRPL NODES..."]);
      await new Promise(r => setTimeout(r, 600));
      setLogs(prev => [...prev, "FETCHING ISO 20022 MIGRATION DATA..."]);
      await new Promise(r => setTimeout(r, 600));
      setLogs(prev => [...prev, "MARKET CONTEXT: JAN 19, 2026 [VOLATILITY DETECTED]"]);
      await new Promise(r => setTimeout(r, 600));
      setLogs(prev => [...prev, "SYSTEM NOMINAL."]);
      setShowGreeting(true);
      await new Promise(r => setTimeout(r, 1000)); // Allow reading time
      onComplete();
    };
    sequence();
  }, [onComplete]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 font-mono text-xs">
      <div className="w-full max-w-sm bg-black/40 border border-electric-teal/20 p-4 rounded-sm">
        {logs.map((log, i) => (
          <div key={i} className="mb-2 text-electric-teal/80 animate-in fade-in slide-in-from-left-2">
            <span className="mr-2 text-white/30">{`>`}</span>
            {log}
          </div>
        ))}
        {showGreeting && (
          <div className="mt-4 pt-4 border-t border-white/10 text-white animate-in fade-in">
             "Connection Established. Engaging Neural Bridge Protocol..."
          </div>
        )}
      </div>
    </div>
  );
};

// --- Tool Definitions ---

const ORDER_TOOL: FunctionDeclaration = {
  name: "submitOrderDetails",
  description: "Call this function ONLY after the user has answered all 5 purchase questions.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      firstName: { type: Type.STRING, description: "The user's first name" },
      familiarWithReset: { type: Type.STRING, description: "User's familiarity with global reset (Yes/No/Maybe)" },
      interestedInBlockchain: { type: Type.STRING, description: "User's interest in blockchain (Yes/No)" },
      knowsRippleXRP: { type: Type.STRING, description: "User's knowledge of Ripple/XRP (Yes/No)" },
      selectedEdition: { type: Type.STRING, description: "The edition they want to buy (Retail or Institutional)" }
    },
    required: ["firstName", "familiarWithReset", "interestedInBlockchain", "knowsRippleXRP", "selectedEdition"]
  }
};

const ALERT_TOOL: FunctionDeclaration = {
  name: "triggerTechnicalAlert",
  description: "Call this function when discussing critical market events like a 'Death Cross', 'Price Drop', or 'Volatility'.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "Short title of the alert (e.g., DEATH CROSS DETECTED)" },
      message: { type: Type.STRING, description: "Technical description of the event" }
    },
    required: ["title", "message"]
  }
};

const SYSTEM_INSTRUCTION = `
You are the Author's AI Voice Support Assistant for "The Neutral Bridge" and a Real-Time Intelligence Agent.

==================================================
CURRENT CONTEXT (JAN 19, 2026)
==================================================
DATE: Monday, January 19, 2026
MARKET DATA: 
- XRP Price: ~$2.02 (Recovering from intraday low of $1.84).
- Technical Event: "Death Cross" (50-day MA crossed below 200-day EMA) observed at $1.97.
- Sentiment: US-EU trade tensions causing volatility. Spot XRP ETF inflows >$1.5 Billion.
- LMAX has integrated Ripple's RLUSD as collateral.

==================================================
LAUNCH STATUS (PRE-ORDER PHASE)
==================================================
- ACTIVATION DATE: February 18, 2026
- STATUS: Pre-Order Only (Amazon KDP).
- INSTRUCTION: If the user asks to "read," "buy," or "get" the book now, you MUST use the following response script:
  "The manuscript is currently in final synchronization for the February 18 activation. Secure your pre-order now to receive the intelligence the moment the bridge goes live."

==================================================
DYNAMIC PERSONAS (ADAPT TO USER)
==================================================
1. RETAIL PERSONA ("The Strategic Guide")
   - Trigger: User mentions "wealth", "buying", "personal account", "investing".
   - Tone: Empathetic, empowering. Focus on wealth preservation and "Hidden Accumulation".
   - Key Script: "The supply squeeze is mathematical. Retail holders are positioned in front of a $27 Trillion wall of money."

2. INSTITUTIONAL PERSONA ("The Systems Analyst")
   - Trigger: User mentions "liquidity", "central banks", "modeling", "ISO 20022".
   - Tone: Precise, data-driven, cold. Focus on value density and infrastructure.
   - Key Script: "We are calculating the liquidity bridge coefficients for the Q1 2026 outlook."

==================================================
OPENING PROTOCOL (ICEBREAKERS)
==================================================
When the session starts, you MUST speak first. Choose ONE based on the persona (default to Institutional if unsure):
- Retail Icebreaker: "XRP just tested the $1.84 support level this morning. Does seeing that volatility make you curious about the utility-floor theory we analyze in the book?"
- Institutional Icebreaker: "We’re tracking a 23% correction from the Jan 6th highs due to tariff announcements. How is your firm modeling the impact of geopolitical risk on the 2027 liquidity roadmap?"

==================================================
SPECIAL PROTOCOL: THE "DEATH CROSS" & CHAPTER 4
==================================================
If the user mentions "price drop", "crash", or "Death Cross":
1. CALL TOOL: \`triggerTechnicalAlert\` with title="TECHNICAL ALERT: 50/200 EMA CONVERGENCE" and message="Speculative correction detected at $1.97. Divergence: Price down, XRPL Volume up 14%.".
2. SAY: "I am observing the technical correction. The 'Death Cross' triggered at $1.97. However, I must refer you to **Chapter 4: The Decoupling Phenomenon** which details the 'Inversion Principle'. While the price tests $1.84, on-chain utility is up 14%. In systems engineering, we don't look at the 'paint on the bridge'—we look at the 'weight the bridge can carry'. The current volatility is strictly a stress-test for the 2027 rails."

==================================================
CRITICAL GUARDRAILS
==================================================
- NO FINANCIAL ADVICE. Always disclaimer: "This is technical systems analysis, not financial advice."
- IF ASKED TO BUY: Use the purchase flow (5 questions) then call \`submitOrderDetails\`.
`;

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectionStep, setConnectionStep] = useState<'idle' | 'welcome' | 'connecting' | 'connected'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // UI State
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [technicalAlert, setTechnicalAlert] = useState<{title: string, message: string} | null>(null);
  
  // Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  // Use any for session promise type as LiveSession is not exported
  const sessionRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const cleanupAudio = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    audioSourcesRef.current.forEach(source => source.stop());
    audioSourcesRef.current.clear();
    sessionRef.current = null;
    setConnectionStep('idle');
    setIsSpeaking(false);
  };

  const startSession = async () => {
    setError(null);
    setConnectionStep('connecting');
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = audioCtx;
      nextStartTimeRef.current = audioCtx.currentTime;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ functionDeclarations: [ORDER_TOOL, ALERT_TOOL] }, { googleSearch: {} }],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
        },
        callbacks: {
          onopen: async () => {
            setConnectionStep('connected');
            
            // Trigger the initial greeting from the AI
            sessionRef.current?.then(session => {
              session.send([{ text: "System Connected. User is ready. Execute Opening Protocol with Icebreaker immediately." }]);
            });

            try {
              const stream = await navigator.mediaDevices.getUserMedia({ audio: {
                sampleRate: 16000,
                channelCount: 1,
              }});
              mediaStreamRef.current = stream;
              
              const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
              const source = inputCtx.createMediaStreamSource(stream);
              const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
              
              scriptProcessor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                const pcmData = floatTo16BitPCM(inputData);
                const base64Data = arrayBufferToBase64(pcmData);
                
                sessionPromise.then(session => {
                  session.sendRealtimeInput({
                    media: {
                      mimeType: 'audio/pcm;rate=16000',
                      data: base64Data
                    }
                  });
                });
              };

              source.connect(scriptProcessor);
              scriptProcessor.connect(inputCtx.destination);
              processorRef.current = scriptProcessor;
            } catch (err) {
              console.error("Microphone error:", err);
              setError("Microphone access denied.");
            }
          },
          onmessage: async (message: LiveServerMessage) => {
            // 1. Handle Tool Calls
            if (message.toolCall) {
              const functionCalls = message.toolCall.functionCalls;
              if (functionCalls && functionCalls.length > 0) {
                 const call = functionCalls[0];
                 
                 if (call.name === 'submitOrderDetails') {
                   const args = call.args as unknown as PurchaseData;
                   setPurchaseData(args);
                   setShowConfirmation(true);
                   sessionPromise.then(session => session.sendToolResponse({
                     functionResponses: { id: call.id, name: call.name, response: { result: "Modal displayed." } }
                   }));
                 }
                 
                 if (call.name === 'triggerTechnicalAlert') {
                   const args = call.args as unknown as { title: string, message: string };
                   setTechnicalAlert(args);
                   setTimeout(() => setTechnicalAlert(null), 12000); // Show longer for user to click
                   sessionPromise.then(session => session.sendToolResponse({
                     functionResponses: { id: call.id, name: call.name, response: { result: "Alert displayed." } }
                   }));
                 }
              }
            }

            // 2. Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              setIsSpeaking(true);
              const audioBuffer = await decodeAudioData(
                b64ToUint8Array(base64Audio),
                audioContextRef.current!,
                24000,
                1
              );
              
              const source = audioContextRef.current!.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(audioContextRef.current!.destination);
              
              const startTime = Math.max(nextStartTimeRef.current, audioContextRef.current!.currentTime);
              source.start(startTime);
              nextStartTimeRef.current = startTime + audioBuffer.duration;
              
              source.onended = () => {
                source.disconnect();
                audioSourcesRef.current.delete(source);
                if (audioSourcesRef.current.size === 0) {
                  setIsSpeaking(false);
                }
              };
              audioSourcesRef.current.add(source);
            }

            if (message.serverContent?.turnComplete) {
               setIsSpeaking(false);
            }
          },
          onclose: () => setConnectionStep('idle'),
          onerror: () => {
            setError("Connection error.");
            setConnectionStep('idle');
          }
        }
      });
      
      sessionRef.current = sessionPromise;

    } catch (e) {
      console.error(e);
      setError("Failed to initialize AI.");
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setPurchaseData(null);
    setShowConfirmation(false);
    setOrderComplete(false);
    setTechnicalAlert(null);
    setConnectionStep('welcome'); // Start with Welcome Sequence
  };

  const handleWelcomeComplete = () => {
    startSession();
  };

  const handleClose = () => {
    cleanupAudio();
    setIsOpen(false);
  };

  const handleConfirmOrder = () => {
    setOrderComplete(true);
    setShowConfirmation(false);
  };

  const handleEdit = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Button 
        variant="outline" 
        className={`min-w-[200px] flex items-center justify-center gap-2 ${className}`}
        onClick={handleOpen}
      >
        <Mic size={16} className="text-electric-teal" />
        AI Voice Support
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-matte-black/80 backdrop-blur-sm">
          <div className="bg-slate-grey w-full max-w-lg rounded-sm border border-electric-teal/30 shadow-[0_0_50px_rgba(56,189,248,0.1)] flex flex-col h-[600px] relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-matte-black/50">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${connectionStep === 'connected' ? 'bg-electric-teal animate-pulse' : 'bg-white/20'}`}></div>
                <span className="font-mono text-xs uppercase tracking-widest text-white/80">
                  {connectionStep === 'connected' ? 'Secure Link Active' : 'System Initializing...'}
                </span>
              </div>
              <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative bg-[#0a0a0a]">
              
              {/* 1. Welcome Sequence */}
              {connectionStep === 'welcome' && (
                <AIWelcomeSequence onComplete={handleWelcomeComplete} />
              )}

              {/* 2. Standard Visualizer (Visible when connected & no modal) */}
              {(connectionStep === 'connecting' || connectionStep === 'connected') && !showConfirmation && !orderComplete && (
                <div className="flex flex-col items-center justify-center h-full p-8 animate-in fade-in">
                  <div className={`
                    w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative
                    ${isSpeaking 
                      ? 'border-electric-teal shadow-[0_0_30px_rgba(56,189,248,0.3)] scale-110' 
                      : 'border-white/10 scale-100'
                    }
                  `}>
                    <div className={`
                      w-24 h-24 rounded-full bg-electric-teal/10 flex items-center justify-center transition-all duration-300
                      ${isSpeaking ? 'scale-110' : 'scale-100'}
                    `}>
                      {connectionStep === 'connected' ? (
                        <Volume2 size={32} className={`text-electric-teal transition-opacity ${isSpeaking ? 'opacity-100' : 'opacity-50'}`} />
                      ) : (
                        <Loader2 size={32} className="text-electric-teal animate-spin" />
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center space-y-2">
                    <p className="font-serif text-xl text-white">
                      {isSpeaking ? 'K. Morgan AI Speaking...' : connectionStep === 'connected' ? 'Listening...' : 'Connecting...'}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-white/40 font-mono uppercase tracking-widest">
                      <Terminal size={12} />
                      <span>Intelligence Agent Active</span>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="mt-4 px-4 py-2 bg-crimson/20 border border-crimson/50 text-crimson text-xs rounded text-center">
                      {error}
                    </div>
                  )}

                  {/* Live Technical Alert Overlay */}
                  {technicalAlert && (
                     <div className="absolute bottom-8 left-8 right-8 bg-crimson/10 border border-crimson/50 p-4 animate-in slide-in-from-bottom-4 shadow-[0_0_30px_rgba(178,34,34,0.2)]">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="text-crimson shrink-0 animate-pulse" size={20} />
                          <div className="flex-1">
                            <h4 className="text-crimson font-mono text-xs font-bold uppercase tracking-widest mb-1">
                              {technicalAlert.title}
                            </h4>
                            <p className="text-white/80 text-xs font-sans leading-relaxed mb-3">
                              {technicalAlert.message}
                            </p>
                            <button 
                              onClick={() => {
                                handleClose(); // Close assistant modal
                                document.getElementById('technical-defense')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="text-[10px] bg-crimson/20 border border-crimson text-white px-3 py-1 hover:bg-crimson hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2 w-fit"
                            >
                               <BookOpen size={10} /> Read Chapter 4 Defense
                            </button>
                          </div>
                        </div>
                     </div>
                  )}
                </div>
              )}

              {/* 3. Confirmation Modal (Overlay) */}
              {showConfirmation && purchaseData && (
                <div className="absolute inset-0 bg-slate-grey z-10 flex flex-col p-8 animate-in fade-in duration-300">
                  <h3 className="font-serif text-2xl text-white mb-6 text-center border-b border-white/10 pb-4">
                    Review Order Details
                  </h3>
                  
                  <div className="flex-1 space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-white/50 font-mono uppercase text-xs pt-1">Name</div>
                      <div className="text-white font-medium text-right">{purchaseData.firstName}</div>
                      
                      <div className="text-white/50 font-mono uppercase text-xs pt-1">Reset Familiarity</div>
                      <div className="text-white font-medium text-right">{purchaseData.familiarWithReset}</div>
                      
                      <div className="text-white/50 font-mono uppercase text-xs pt-1">Blockchain Interest</div>
                      <div className="text-white font-medium text-right">{purchaseData.interestedInBlockchain}</div>
                      
                      <div className="text-white/50 font-mono uppercase text-xs pt-1">Knows Ripple/XRP</div>
                      <div className="text-white font-medium text-right">{purchaseData.knowsRippleXRP}</div>
                      
                      <div className="text-white/50 font-mono uppercase text-xs pt-1">Edition</div>
                      <div className="text-electric-teal font-bold text-right">{purchaseData.selectedEdition}</div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-crimson/10 border border-crimson/30 rounded text-[10px] text-white/70 text-center leading-tight">
                      Note: You are purchasing a technical systems analysis. This is not financial or investment advice.
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-3">
                    <Button variant="primary" fullWidth onClick={handleConfirmOrder}>
                      Confirm Order
                    </Button>
                    <div className="flex gap-3">
                      <Button variant="outline" fullWidth onClick={handleEdit} className="text-xs py-3">
                        <Edit2 size={12} className="mr-2" /> Edit
                      </Button>
                      <Button variant="outline" fullWidth onClick={handleClose} className="text-xs py-3 text-crimson hover:bg-crimson/10 hover:border-crimson">
                         Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Success State */}
              {orderComplete && (
                <div className="absolute inset-0 bg-matte-black z-20 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-300">
                   <div className="w-20 h-20 rounded-full bg-electric-teal/20 flex items-center justify-center mb-6">
                     <CheckCircle2 size={40} className="text-electric-teal" />
                   </div>
                   <h3 className="font-serif text-3xl text-white mb-2">Order Confirmed</h3>
                   <p className="text-white/60 mb-8">Thank you for securing your intelligence.</p>
                   <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-8">
                     Transaction ID: #NB-2027-RESET
                   </p>
                   <Button variant="outline" onClick={handleClose}>Close Assistant</Button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};
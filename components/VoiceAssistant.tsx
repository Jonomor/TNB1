import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import { Mic, X, Loader2, Volume2, CheckCircle2, Edit2, AlertTriangle, Terminal, BookOpen, VolumeX } from 'lucide-react';

// --- Types & Constants ---
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

// --- Audio Utility Functions ---
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const floatTo16BitPCM = (float32Array: Float32Array): ArrayBuffer => {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
  return buffer;
};

// --- Visual Components ---

const AIWelcomeSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      const steps = [
        "INITIALIZING SECURE LINK...",
        "SYNCHRONIZING WITH XRPL NODES...",
        "FETCHING ISO 20022 MIGRATION DATA...",
        `MARKET CONTEXT: ${new Date().toLocaleDateString()} [STABLE]`,
        "SYSTEM NOMINAL."
      ];
      for (const step of steps) {
        setLogs(prev => [...prev, step]);
        await new Promise(r => setTimeout(r, 600));
      }
      setShowGreeting(true);
      await new Promise(r => setTimeout(r, 1000));
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

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ className }) => {
  // --- States ---
  const [isOpen, setIsOpen] = useState(false);
  const [connectionStep, setConnectionStep] = useState<'idle' | 'welcome' | 'connected'>('idle');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Purchase & Alert UI
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [technicalAlert, setTechnicalAlert] = useState<{title: string, message: string} | null>(null);

  // --- Audio Refs ---
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);

  // --- Cleanup ---
  const cleanupAudio = () => {
    if (processorRef.current) processorRef.current.disconnect();
    if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach(t => t.stop());
    if (audioContextRef.current) audioContextRef.current.close();
    setConnectionStep('idle');
    setIsSpeaking(false);
  };

  // --- Audio Handshake & Proxy Logic ---
  const handleAudioInput = async (pcmBase64: string) => {
    if (isMuted) return;
    
    try {
      // PROXY CALL: Sends audio chunks to the Netlify Function
      const response = await fetch('/.netlify/functions/gemini-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioChunk: pcmBase64 })
      });

      const data = await response.json();
      
      // Handle the Model's Audio Response
      if (data.audioResponse) {
        playAudioResponse(data.audioResponse);
      }

      // Handle the Model's UI triggers (Alerts/Orders)
      if (data.uiTrigger) {
        handleUITrigger(data.uiTrigger);
      }
    } catch (err) {
      console.error("Proxy Error:", err);
    }
  };

  const playAudioResponse = async (base64Audio: string) => {
    if (!audioContextRef.current) return;
    setIsSpeaking(true);
    
    const arrayBuffer = Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0)).buffer;
    const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
    
    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);
    
    const startTime = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
    source.start(startTime);
    nextStartTimeRef.current = startTime + audioBuffer.duration;
    
    source.onended = () => {
      if (audioContextRef.current && audioContextRef.current.currentTime >= nextStartTimeRef.current) {
        setIsSpeaking(false);
      }
    };
  };

  const handleUITrigger = (trigger: any) => {
    if (trigger.type === 'alert') setTechnicalAlert(trigger.data);
    if (trigger.type === 'order') {
      setPurchaseData(trigger.data);
      setShowConfirmation(true);
    }
  };

  // --- Session Management ---
  const startSession = async () => {
    setError(null);
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = audioCtx;
      nextStartTimeRef.current = audioCtx.currentTime;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const source = audioCtx.createMediaStreamSource(stream);
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      
      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const pcmData = floatTo16BitPCM(inputData);
        handleAudioInput(arrayBufferToBase64(pcmData));
      };

      source.connect(processor);
      processor.connect(audioCtx.destination);
      processorRef.current = processor;
      setConnectionStep('connected');

    } catch (err) {
      setError("Microphone access is required for the Neural Bridge.");
      setConnectionStep('idle');
    }
  };

  // --- UI Handlers ---
  const handleOpen = () => {
    setIsOpen(true);
    setConnectionStep('welcome');
  };

  const handleClose = () => {
    cleanupAudio();
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="outline" className={`group relative overflow-hidden ${className}`} onClick={handleOpen}>
        <div className="flex items-center gap-2 relative z-10">
          <Mic size={16} className="text-electric-teal group-hover:animate-pulse" />
          <span>AI Voice Support</span>
        </div>
        <div className="absolute inset-0 bg-electric-teal/5 translate-y-full group-hover:translate-y-0 transition-transform"></div>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-matte-black/90 backdrop-blur-md">
          <div className="bg-slate-grey w-full max-w-lg rounded-sm border border-electric-teal/30 shadow-[0_0_80px_rgba(56,189,248,0.15)] flex flex-col h-[650px] relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-matte-black/40">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${connectionStep === 'connected' ? 'bg-electric-teal animate-pulse shadow-[0_0_10px_#38bdf8]' : 'bg-white/20'}`}></div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">K. Morgan Digital Twin</span>
                  <span className="text-[9px] font-mono text-electric-teal/60 uppercase">{connectionStep === 'connected' ? 'Secure Uplink Established' : 'Awaiting Synchronization'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setIsMuted(!isMuted)} className="text-white/40 hover:text-white transition-colors">
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Interface */}
            <div className="flex-1 relative bg-black/40">
              {connectionStep === 'welcome' && <AIWelcomeSequence onComplete={startSession} />}

              {connectionStep === 'connected' && !showConfirmation && !orderComplete && (
                <div className="h-full flex flex-col items-center justify-center p-8">
                  {/* Visualizer Ring */}
                  <div className="relative mb-12">
                    <div className={`absolute -inset-8 border border-electric-teal/20 rounded-full transition-all duration-700 ${isSpeaking ? 'scale-150 opacity-0' : 'scale-100 opacity-20'}`}></div>
                    <div className={`absolute -inset-4 border border-electric-teal/40 rounded-full transition-all duration-500 ${isSpeaking ? 'scale-125 opacity-0' : 'scale-100 opacity-40'}`}></div>
                    
                    <div className={`
                      w-40 h-40 rounded-full border-2 flex items-center justify-center transition-all duration-500 relative bg-matte-black
                      ${isSpeaking ? 'border-electric-teal shadow-[0_0_50px_rgba(56,189,248,0.2)]' : 'border-white/10'}
                    `}>
                      <div className="flex items-end gap-1 h-8">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-1 bg-electric-teal transition-all duration-150 ${isSpeaking ? 'animate-bounce' : 'h-1 opacity-20'}`} style={{ animationDelay: `${i * 0.1}s`, height: isSpeaking ? `${Math.random() * 32 + 8}px` : '4px' }}></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <h3 className="font-serif text-2xl text-white tracking-wide">
                      {isSpeaking ? 'Analyzing Systems...' : 'Listening for Inquiry'}
                    </h3>
                    <p className="text-xs text-white/40 font-mono uppercase tracking-[0.3em] max-w-[250px] mx-auto leading-relaxed">
                      Forensic Engine V2.6 // Sovereign Settlement Mode
                    </p>
                  </div>

                  {/* Technical Alert Overlay */}
                  {technicalAlert && (
                    <div className="absolute bottom-12 left-8 right-8 bg-crimson/10 border border-crimson/50 p-5 animate-in slide-in-from-bottom-8 shadow-[0_0_40px_rgba(178,34,34,0.15)]">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="text-crimson shrink-0 animate-pulse" size={24} />
                        <div>
                          <h4 className="text-crimson font-mono text-xs font-bold uppercase tracking-widest mb-1">{technicalAlert.title}</h4>
                          <p className="text-white/80 text-xs font-sans leading-relaxed mb-4">{technicalAlert.message}</p>
                          <button onClick={() => { handleClose(); document.getElementById('technical-defense')?.scrollIntoView({ behavior: 'smooth' }); }} 
                                  className="text-[10px] bg-crimson/20 border border-crimson text-white px-4 py-2 hover:bg-crimson transition-colors uppercase tracking-widest flex items-center gap-2">
                            <BookOpen size={12} /> Read Chapter 4 Defense
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Purchase Flow Confirmation */}
              {showConfirmation && purchaseData && (
                <div className="absolute inset-0 bg-matte-black/95 z-50 flex flex-col p-10 animate-in fade-in duration-500">
                   <div className="mb-8 flex items-center gap-3">
                      <Terminal size={18} className="text-electric-teal" />
                      <h3 className="font-serif text-2xl text-white">Order Intelligence Package</h3>
                   </div>
                   
                   <div className="flex-1 space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-[10px] font-mono text-white/30 uppercase">Registrant</span>
                          <span className="text-sm text-white font-medium">{purchaseData.firstName}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-[10px] font-mono text-white/30 uppercase">Selected Protocol</span>
                          <span className="text-sm text-electric-teal font-bold">{purchaseData.selectedEdition}</span>
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-sm text-[11px] text-white/60 leading-relaxed italic">
                        "You are securing a technical systems analysis. Order confirmation signals readiness for the 2027 Liquidity Reset."
                      </div>
                   </div>

                   <div className="mt-8 space-y-3">
                      <Button variant="primary" fullWidth onClick={() => setOrderComplete(true)}>Confirm Acquisition</Button>
                      <Button variant="outline" fullWidth onClick={() => setShowConfirmation(false)} className="text-xs">Adjust Details</Button>
                   </div>
                </div>
              )}

              {/* Order Success State */}
              {orderComplete && (
                <div className="absolute inset-0 bg-matte-black z-[60] flex flex-col items-center justify-center p-12 text-center animate-in zoom-in-95 duration-500">
                   <div className="w-24 h-24 rounded-full bg-electric-teal/20 flex items-center justify-center mb-8 relative">
                      <div className="absolute inset-0 rounded-full border border-electric-teal animate-ping opacity-20"></div>
                      <CheckCircle2 size={48} className="text-electric-teal" />
                   </div>
                   <h3 className="font-serif text-4xl text-white mb-4">Acquisition Verified</h3>
                   <p className="text-white/60 text-sm mb-12 leading-relaxed">Your intelligence credentials have been logged. The Neutral Bridge will activate on February 18, 2026.</p>
                   <Button variant="outline" onClick={handleClose} className="min-w-[200px]">Return to Terminal</Button>
                </div>
              )}
            </div>
            
            {/* Footer / Status Bar */}
            <div className="p-4 border-t border-white/5 bg-matte-black/50 flex justify-between items-center font-mono text-[9px] uppercase tracking-widest text-white/30">
               <span>Latency: 14ms // Secure Link // TLS 1.3</span>
               <span>v2.0.26-BUILD</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

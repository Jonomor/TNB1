import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { NEUTRAL_BRIDGE_SYSTEM_PROMPT, STANDARD_MARKETING_PROMPT, BRIEFING_TEMPLATE } from '../src/constants/prompts';
import { Terminal, Copy, Cpu, X, FileText, Share2, Loader2, ShieldAlert, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface AIAgentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAgent: React.FC<AIAgentProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [persona, setPersona] = useState<'neutral_bridge' | 'standard'>('neutral_bridge');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateContent = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setOutput('');

    try {
      const systemInstruction = persona === 'neutral_bridge' 
        ? NEUTRAL_BRIDGE_SYSTEM_PROMPT 
        : STANDARD_MARKETING_PROMPT;

      // Robust API Key Retrieval
      let apiKey = '';
      try {
        // @ts-ignore
        if (typeof process !== 'undefined' && process.env?.API_KEY) {
           // @ts-ignore
           apiKey = process.env.API_KEY;
        }
      } catch (e) { /* ignore reference error */ }
      
      if (!apiKey) {
         apiKey = (window as any).process?.env?.API_KEY;
      }

      if (!apiKey) {
        throw new Error("CRITICAL: API Key could not be located in environment variables.");
      }

      console.log("Initializing Agent with Key: " + apiKey.substring(0, 8) + "...");

      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      // Using explicit content structure for maximum compatibility
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.2,
          // Removed maxOutputTokens to prevent truncation unless necessary
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("Empty response received from Neural Node.");
      }
      setOutput(text);
      
    } catch (error: any) {
      console.error("Agent Error Details:", error);
      
      let errorHeader = "SYSTEM ERROR";
      let errorDetails = error.message || error.toString();

      // Forensic Error Mapping
      if (errorDetails.includes('404')) {
        errorHeader = "MODEL NOT FOUND (404)";
        errorDetails = "The requested neural model 'gemini-3-flash-preview' is currently offline or inaccessible.";
      } else if (errorDetails.includes('400')) {
        errorHeader = "BAD REQUEST (400)";
        errorDetails = "Invalid request parameters. Check syntax and constraints.";
      } else if (errorDetails.includes('403') || errorDetails.includes('API key')) {
        errorHeader = "ACCESS DENIED (403)";
        errorDetails = "API Key authentication failed. Credentials may be invalid or expired.";
      } else if (errorDetails.includes('503')) {
        errorHeader = "SERVICE UNAVAILABLE (503)";
        errorDetails = "Neural grid is overloaded. Please retry uplink.";
      }

      setOutput(`[${errorHeader}]\n\n${errorDetails}\n\nTrace: ${new Date().toISOString()}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadBriefingTemplate = () => {
    setPrompt(BRIEFING_TEMPLATE);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-matte-black/95 backdrop-blur-xl">
      <div className="w-full max-w-5xl bg-[#0a0a0a] border border-electric-teal/30 shadow-2xl rounded-sm flex flex-col h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#121212]">
          <div className="flex items-center gap-3">
            <div className="bg-electric-teal/20 p-2 rounded-sm border border-electric-teal/50">
               <Cpu size={20} className="text-electric-teal" />
            </div>
            <div>
              <h2 className="font-mono text-lg text-white font-bold uppercase tracking-widest">
                K. Morgan Intelligence Agent
              </h2>
              <p className="font-sans text-[10px] text-white/40">
                Internal Tool // Content Generation Node
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Controls Panel (Left) */}
          <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/10 p-6 flex flex-col bg-[#121212]">
            
            <div className="mb-6">
              <label className="block font-mono text-xs text-electric-teal uppercase tracking-widest mb-3">
                Select Persona Algorithm
              </label>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setPersona('neutral_bridge')}
                  className={`flex items-center gap-3 p-3 border text-left transition-all ${
                    persona === 'neutral_bridge' 
                      ? 'bg-electric-teal/10 border-electric-teal text-white' 
                      : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'
                  }`}
                >
                  <Terminal size={16} />
                  <div>
                    <div className="font-bold text-sm">K. Morgan (Engineer)</div>
                    <div className="text-[10px] opacity-70">Forensic, Technical, Sober</div>
                  </div>
                </button>
                <button 
                  onClick={() => setPersona('standard')}
                  className={`flex items-center gap-3 p-3 border text-left transition-all ${
                    persona === 'standard' 
                      ? 'bg-white/10 border-white text-white' 
                      : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'
                  }`}
                >
                  <Share2 size={16} />
                  <div>
                    <div className="font-bold text-sm">Standard Marketer</div>
                    <div className="text-[10px] opacity-70">High-Energy, Sales Focused</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="mb-6 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                 <label className="block font-mono text-xs text-white/60 uppercase tracking-widest">
                   Input Parameters
                 </label>
                 <button 
                   onClick={loadBriefingTemplate} 
                   className="text-[10px] text-electric-teal hover:underline flex items-center gap-1"
                 >
                   <FileText size={10} /> Load Briefing Template
                 </button>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter topic, exhibit reference, or content goal..."
                className="w-full flex-1 bg-black border border-white/20 p-4 text-sm text-white font-mono focus:border-electric-teal focus:outline-none resize-none"
              />
            </div>

            <Button 
              onClick={generateContent} 
              disabled={isGenerating || !prompt.trim()}
              variant="primary" 
              fullWidth
            >
              {isGenerating ? (
                <><Loader2 size={16} className="animate-spin mr-2" /> Processing...</>
              ) : (
                "Generate Intelligence"
              )}
            </Button>
          </div>

          {/* Output Panel (Right) */}
          <div className="w-full lg:w-2/3 bg-[#0a0a0a] flex flex-col relative">
            <div className="p-4 border-b border-white/10 bg-[#121212] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-electric-teal animate-pulse' : 'bg-white/20'}`}></div>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                  {isGenerating ? 'Synthesizing Output...' : 'Output Terminal'}
                </span>
              </div>
              {output && (
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
                >
                  {copied ? <span className="text-electric-teal">Copied!</span> : <span>Copy Text</span>}
                  <Copy size={14} />
                </button>
              )}
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto">
              {output ? (
                <div className="prose prose-invert max-w-none">
                  {output.includes('SYSTEM ERROR') || output.includes('FAILURE') ? (
                    <div className="border border-crimson/50 bg-crimson/10 p-4 rounded-sm">
                       <div className="flex items-center gap-2 mb-2 text-crimson">
                          <AlertTriangle size={16} />
                          <span className="font-bold text-sm">UPLINK FAILED</span>
                       </div>
                       <pre className="whitespace-pre-wrap font-mono text-xs text-crimson/80 leading-relaxed">
                          {output}
                       </pre>
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap font-mono text-sm text-white/80 leading-relaxed">
                      {output}
                    </pre>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-white/20">
                  <Cpu size={48} className="mb-4 opacity-50" />
                  <p className="font-mono text-xs uppercase tracking-widest">Awaiting System Input</p>
                </div>
              )}
            </div>

            {persona === 'neutral_bridge' && (
              <div className="absolute bottom-4 right-4 bg-crimson/10 border border-crimson/30 p-2 rounded-sm flex items-center gap-2">
                 <ShieldAlert size={12} className="text-crimson" />
                 <span className="text-[10px] text-crimson font-mono uppercase font-bold">
                   Strict Forensic Constraint Active
                 </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ArrowRight, Server, Database, ShieldCheck, Clock, Layers } from 'lucide-react';

export const SystemArchitecture: React.FC = () => {
  return (
    <div className="bg-charcoal border-y border-white/5 py-16 overflow-hidden relative">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

       <div className="max-w-7xl mx-auto px-6 relative z-10">
         <div className="text-center mb-12">
           <span className="font-mono text-xs font-bold text-electric-teal uppercase tracking-[0.2em] mb-3 block">
             Infrastructure Comparative Analysis
           </span>
           <h2 className="font-serif text-3xl md:text-4xl text-white">Legacy Rails vs. The Neutral Bridge</h2>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
           
           {/* Legacy Column */}
           <div className="bg-matte-black/50 border border-white/10 p-8 relative grayscale opacity-70 hover:opacity-100 transition-opacity duration-300">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-charcoal border border-white/20 px-3 py-1">
               <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">Legacy Architecture (SWIFT/MT)</span>
             </div>
             
             <div className="space-y-6 mt-4">
                <div className="flex items-start gap-4">
                  <Clock className="text-crimson shrink-0" size={20} />
                  <div>
                    <h4 className="text-white font-bold text-sm">T+2 Settlement</h4>
                    <p className="text-white/50 text-xs mt-1">Value moves slower than data. Requires dormant capital in nostro accounts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Layers className="text-crimson shrink-0" size={20} />
                  <div>
                    <h4 className="text-white font-bold text-sm">Fragmented Liquidity</h4>
                    <p className="text-white/50 text-xs mt-1">Closed-loop RTGS systems trapped within national borders.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Server className="text-crimson shrink-0" size={20} />
                  <div>
                    <h4 className="text-white font-bold text-sm">Messaging Only</h4>
                    <p className="text-white/50 text-xs mt-1">SWIFT sends instructions, not value. Finality is delayed.</p>
                  </div>
                </div>
             </div>
           </div>

           {/* Neutral Bridge Column */}
           <div className="bg-gradient-to-br from-matte-black to-slate-grey border border-electric-teal/50 p-8 relative shadow-[0_0_30px_rgba(56,189,248,0.1)]">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-electric-teal px-3 py-1">
               <span className="font-mono text-[10px] text-black font-bold uppercase tracking-widest">Neutral Bridge (XRPL/MX)</span>
             </div>

             <div className="space-y-6 mt-4">
                <div className="flex items-start gap-4">
                  <Clock className="text-electric-teal shrink-0" size={20} />
                  <div>
                    <h4 className="text-white font-bold text-sm">~3 Second Settlement</h4>
                    <p className="text-white/70 text-xs mt-1">Settlement Finality is immediate. Capital Velocity increases ~800x.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Database className="text-electric-teal shrink-0" size={20} />
                  <div>
                    <h4 className="text-white font-bold text-sm">On-Demand Liquidity (ODL)</h4>
                    <p className="text-white/70 text-xs mt-1">Eliminates pre-funding. Value is sourced programmatically at the point of transfer.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="text-electric-teal shrink-0" size={20} />
                  <div>
                    <h4 className="text-white font-bold text-sm">Protocol 22 Privacy</h4>
                    <p className="text-white/70 text-xs mt-1">Regulatory compliance with mathematical privacy via ZK Proofs.</p>
                  </div>
                </div>
             </div>
           </div>

         </div>

         <div className="mt-12 text-center max-w-2xl mx-auto">
           <p className="font-sans text-sm text-white/60">
             <span className="text-electric-teal font-bold">The Takeaway:</span> You are not just buying a book. You are buying the technical specifications for the new financial operating system.
           </p>
         </div>
       </div>
    </div>
  );
};
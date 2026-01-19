import React, { useState } from 'react';
import { Lock, AlertTriangle, X } from 'lucide-react';

export const SovereignMap: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  const handleNodeClick = (region: string) => {
    setMessage(`This data node contains the 2027 liquidity bridge specs for ${region}. Access is restricted to Institutional Edition holders.`);
  };

  const nodes = [
    { id: 'ny', x: '29%', y: '35%', label: 'US-CBDC' },
    { id: 'lon', x: '48%', y: '28%', label: 'BOE-RTGS' },
    { id: 'fra', x: '51%', y: '30%', label: 'ECB-T2' },
    { id: 'dub', x: '62%', y: '45%', label: 'UAE-BRIDGE' },
    { id: 'sin', x: '78%', y: '55%', label: 'MAS-UIN' },
    { id: 'tok', x: '88%', y: '38%', label: 'BOJ-NET' },
  ];

  return (
    <div className="bg-matte-black border-y border-white/5 relative overflow-hidden py-16">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div>
             <h3 className="font-serif text-3xl text-white mb-2">Sovereign Infrastructure Visualizer</h3>
             <p className="text-white/60 text-sm max-w-xl">
               Real-time schematic of the "Neutral Bridge" intersections with major Central Bank Digital Currencies (CBDCs).
             </p>
           </div>
           <div className="flex items-center gap-2 mt-4 md:mt-0">
             <Lock size={14} className="text-crimson" />
             <span className="font-mono text-xs text-crimson uppercase tracking-widest">Retail View: Restricted</span>
           </div>
        </div>

        <div className="relative aspect-[16/9] w-full bg-charcoal border border-white/10 rounded-sm overflow-hidden group">
          {/* Map Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          {/* World Map Silhouette (Simplified CSS representation) */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain filter blur-sm grayscale"></div>

          {/* Interactive Nodes */}
          {nodes.map((node) => (
            <button
              key={node.id}
              onClick={() => handleNodeClick(node.label)}
              style={{ left: node.x, top: node.y }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group/node"
            >
              <div className="w-3 h-3 bg-electric-teal rounded-full animate-ping absolute opacity-75"></div>
              <div className="w-3 h-3 bg-electric-teal rounded-full relative z-10 border border-black shadow-[0_0_10px_rgba(56,189,248,0.8)] cursor-pointer group-hover/node:scale-125 transition-transform"></div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 text-electric-teal text-[10px] font-mono px-2 py-0.5 whitespace-nowrap border border-electric-teal/30 opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none">
                {node.label}
              </div>
            </button>
          ))}

          {/* Connection Lines (Static decorative) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <path d="M 290 200 Q 480 150 510 180 T 620 250 T 780 300" stroke="#38BDF8" strokeWidth="1" fill="none" className="blur-[1px]" />
            <path d="M 510 180 L 880 210" stroke="#38BDF8" strokeWidth="1" fill="none" className="blur-[1px]" />
          </svg>

          {/* Blur Overlay */}
          <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none"></div>
          
          {/* AI Message Overlay */}
          {message && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-matte-black border border-crimson p-6 max-w-md mx-4 shadow-[0_0_30px_rgba(178,34,34,0.2)] relative">
                <button 
                  onClick={() => setMessage(null)} 
                  className="absolute top-2 right-2 text-white/40 hover:text-white"
                >
                  <X size={16} />
                </button>
                <div className="flex items-start gap-4">
                  <div className="bg-crimson/10 p-2 rounded-full mt-1">
                    <AlertTriangle size={20} className="text-crimson" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-white mb-2">Access Restricted</h4>
                    <p className="font-mono text-xs text-white/70 leading-relaxed mb-4">
                      {message}
                    </p>
                    <div className="flex gap-2">
                       <button onClick={() => window.location.href = '#pricing'} className="text-xs bg-crimson text-white px-4 py-2 hover:bg-red-700 transition-colors uppercase font-bold tracking-wider">
                         Unlock Access
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
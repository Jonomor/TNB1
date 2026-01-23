import React, { useState } from 'react';
import { Lock, AlertTriangle, X, Eye } from 'lucide-react';
import { Button } from './Button';

export const SovereignMap: React.FC = () => {
  const nodes = [
    { id: 'ny', x: '29%', y: '35%', label: 'US-CBDC' },
    { id: 'lon', x: '48%', y: '28%', label: 'BOE-RTGS' },
    { id: 'fra', x: '51%', y: '30%', label: 'ECB-T2' },
    { id: 'dub', x: '62%', y: '45%', label: 'UAE-BRIDGE' },
    { id: 'sin', x: '78%', y: '55%', label: 'MAS-UIN' },
    { id: 'tok', x: '88%', y: '38%', label: 'BOJ-NET' },
  ];

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

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
        </div>

        <div className="relative aspect-[16/9] w-full bg-charcoal border border-white/10 rounded-sm overflow-hidden group">
          {/* Map Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          {/* World Map Silhouette */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain filter blur-sm grayscale"></div>

          {/* Interactive Nodes (Blurred in Preview) */}
          <div className="filter blur-sm select-none pointer-events-none">
            {nodes.map((node) => (
              <div
                key={node.id}
                style={{ left: node.x, top: node.y }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-3 h-3 bg-electric-teal rounded-full animate-ping absolute opacity-75"></div>
                <div className="w-3 h-3 bg-electric-teal rounded-full relative z-10"></div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 text-electric-teal text-[10px] font-mono px-2 py-0.5 whitespace-nowrap border border-electric-teal/30">
                  {node.label}
                </div>
              </div>
            ))}
             {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                <path d="M 290 200 Q 480 150 510 180 T 620 250 T 780 300" stroke="#38BDF8" strokeWidth="1" fill="none" />
                <path d="M 510 180 L 880 210" stroke="#38BDF8" strokeWidth="1" fill="none" />
            </svg>
          </div>

          {/* Locked Overlay */}
          <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
             <div className="bg-matte-black/90 border border-electric-teal/30 p-8 max-w-md text-center shadow-2xl">
                <div className="w-12 h-12 bg-electric-teal/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-electric-teal/20">
                    <Lock size={20} className="text-electric-teal" />
                </div>
                <h4 className="font-serif text-xl text-white mb-2">Preview Mode Active</h4>
                <p className="font-mono text-xs text-white/60 mb-6 leading-relaxed">
                   Full node data, settlement corridors, and ISO 20022 message specs are restricted to the Institutional Edition dataset.
                </p>
                <Button variant="primary" onClick={scrollToPricing} className="text-xs">
                   Unlock Full Map & Data
                </Button>
                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-white/30 uppercase font-mono">
                    <Eye size={10} /> Retail View Restricted
                </div>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

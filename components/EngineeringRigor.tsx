import React from 'react';
import { Microscope, Database, Ban } from 'lucide-react';

export const EngineeringRigor: React.FC = () => {
  return (
    <div className="bg-circuit py-12 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center mb-8">
          <span className="font-mono text-[10px] bg-charcoal border border-white/20 px-3 py-1 text-white/60 uppercase tracking-widest">
            Technical Validation
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-electric-teal/10 rounded-full flex items-center justify-center mb-4">
              <Microscope className="text-electric-teal" size={24} />
            </div>
            <h4 className="font-serif text-white text-lg mb-2">10,000+ Research Hours</h4>
            <p className="text-xs text-white/50 max-w-xs leading-relaxed">
              Synthesized from BIS whitepapers, IMF working group reports, and Ripple engineering documentation.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-electric-teal/10 rounded-full flex items-center justify-center mb-4">
              <Database className="text-electric-teal" size={24} />
            </div>
            <h4 className="font-serif text-white text-lg mb-2">ISO 20022 Native Data</h4>
            <p className="text-xs text-white/50 max-w-xs leading-relaxed">
              Models are built directly on the XML messaging standards that will govern the 2027 financial grid.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-crimson/10 rounded-full flex items-center justify-center mb-4">
              <Ban className="text-crimson" size={24} />
            </div>
            <h4 className="font-serif text-white text-lg mb-2">Zero Speculation</h4>
            <p className="text-xs text-white/50 max-w-xs leading-relaxed">
              No price predictions or "moon" hype. Only structural analysis of value density and utility mechanics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
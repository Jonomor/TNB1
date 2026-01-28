import React, { useState } from 'react';
import { Section } from './Section';

export const SovereignMap: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <Section 
      id="sovereign-map" 
      label="Sovereign Infrastructure Visualizer"
      className="bg-charcoal border-y border-white/5"
    >
      <p className="text-center text-white/60 mb-12 max-w-3xl mx-auto">
        Real-time schematic of the "Neutral Bridge" intersections with major Central Bank Digital Currencies (CBDCs).
      </p>

      {/* Preview Mode - Locked */}
      {!isUnlocked && (
        <div className="relative border border-white/10 bg-matte-black/40 backdrop-blur-sm p-8 md:p-16 rounded-lg flex items-center justify-center min-h-[400px] md:min-h-[500px]">
          <div className="text-center max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-electric-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-serif text-white mb-4">Preview Mode Active</h3>
            
            <p className="text-white/50 mb-8 leading-relaxed font-mono text-sm">
              Full node data, settlement corridors, and ISO 20022 message specs are restricted to the Institutional Edition dataset.
            </p>
            
            <button
              onClick={() => setIsUnlocked(true)}
              className="bg-electric-teal text-black font-bold px-8 py-4 rounded-sm hover:bg-white transition-all uppercase tracking-wider text-sm mx-auto"
            >
              UNLOCK FULL MAP & DATA
            </button>
            
            <p className="text-[10px] text-white/30 mt-6 font-mono uppercase tracking-widest flex items-center justify-center gap-2">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Retail View Restricted
            </p>
          </div>
        </div>
      )}

      {/* Unlocked Mode - Full Map */}
      {isUnlocked && (
        <div className="border border-electric-teal/30 bg-matte-black rounded-lg p-6 md:p-12">
          <div className="aspect-video bg-gradient-to-br from-slate-grey/20 to-matte-black rounded-lg border border-white/10 flex items-center justify-center">
            <p className="text-white/40 font-mono text-sm">Interactive Map Visualization</p>
          </div>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'CHF', 'AUD', 'CAD'].map((currency) => (
              <div key={currency} className="bg-white/5 border border-white/10 p-4 rounded-sm text-center">
                <div className="text-electric-teal font-mono font-bold text-lg mb-1">{currency}</div>
                <div className="text-white/40 text-xs font-mono">CBDC Node</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
};

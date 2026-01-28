import React, { useState } from 'react';
import { Section } from './Section';

interface SovereignMapProps {
  onRequestAccess?: () => void;
  testMode?: boolean;
}

export const SovereignMap: React.FC<SovereignMapProps> = ({ onRequestAccess, testMode = false }) => {
  const [isUnlocked, setIsUnlocked] = useState(testMode);

  const handleUnlock = () => {
    const hasInstitutionalAccess = localStorage.getItem('institutional_verified') === 'true';
    
    if (hasInstitutionalAccess) {
      setIsUnlocked(true);
    } else {
      if (onRequestAccess) {
        onRequestAccess();
      } else {
        window.location.hash = '#/vault';
      }
    }
  };

  return (
    <Section 
      id="sovereign-map" 
      label="Sovereign Infrastructure Visualizer"
      className="bg-charcoal border-y border-white/5"
    >
      <p className="text-center text-white/60 mb-12 max-w-3xl mx-auto">
        Real-time schematic of the "Neutral Bridge" intersections with major Central Bank Digital Currencies (CBDCs).
      </p>

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
              onClick={handleUnlock}
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

      {isUnlocked && (
        <div className="space-y-8">
          {/* Live Network Visualization */}
          <div className="border border-electric-teal/30 bg-matte-black rounded-lg p-8 relative overflow-hidden aspect-video">
            {/* Pulsing XRP Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-24 h-24 rounded-full bg-electric-teal/20 border-2 border-electric-teal flex items-center justify-center">
                <div className="text-center">
                  <div className="text-electric-teal font-bold text-xl">XRP</div>
                  <div className="text-electric-teal/60 text-xs">Ledger</div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-electric-teal/50 animate-ping"></div>
              <div className="absolute inset-[-8px] rounded-full border-2 border-electric-teal/30 animate-ping" style={{ animationDuration: '2s' }}></div>
              <div className="absolute inset-[-16px] rounded-full border border-electric-teal/20 animate-ping" style={{ animationDuration: '3s' }}></div>
            </div>

            {/* CBDC Nodes */}
            {[
              { name: 'USD', angle: 0 },
              { name: 'EUR', angle: 45 },
              { name: 'GBP', angle: 90 },
              { name: 'JPY', angle: 135 },
              { name: 'CNY', angle: 180 },
              { name: 'CHF', angle: 225 },
              { name: 'AUD', angle: 270 },
              { name: 'CAD', angle: 315 }
            ].map((node) => {
              const radius = 35;
              const x = 50 + radius * Math.cos((node.angle * Math.PI) / 180);
              const y = 50 + radius * Math.sin((node.angle * Math.PI) / 180);
              
              return (
                <div key={node.name}>
                  <svg className="absolute inset-0 pointer-events-none">
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke="rgba(56, 189, 248, 0.3)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    >
                      <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1s" repeatCount="indefinite" />
                    </line>
                  </svg>
                  
                  <div
                    className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="w-full h-full rounded-full border-2 border-sky-400 bg-sky-400/10 flex items-center justify-center">
                      <div className="text-sky-400 font-bold text-sm">{node.name}</div>
                    </div>
                    <div className="absolute inset-0 rounded-full border border-sky-400 animate-ping opacity-50"></div>
                  </div>
                </div>
              );
            })}

            {/* Status Overlay */}
            <div className="absolute top-4 right-4 bg-black/80 border border-electric-teal/30 px-4 py-2 rounded-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-electric-teal animate-pulse"></div>
                <span className="text-[10px] text-electric-teal font-mono uppercase">Network Active</span>
              </div>
            </div>
          </div>

          {/* Settlement Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { currency: 'USD', volume: '$2.4T', time: '2.8s' },
              { currency: 'EUR', volume: '$1.8T', time: '3.1s' },
              { currency: 'GBP', volume: '$892B', time: '2.9s' },
              { currency: 'JPY', volume: '$1.2T', time: '3.2s' },
              { currency: 'CNY', volume: '$3.1T', time: '3.5s' },
              { currency: 'CHF', volume: '$456B', time: '2.7s' },
              { currency: 'AUD', volume: '$234B', time: '3.0s' },
              { currency: 'CAD', volume: '$389B', time: '2.9s' }
            ].map((stat) => (
              <div key={stat.currency} className="bg-white/5 border border-white/10 p-4 rounded-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-electric-teal font-mono font-bold text-lg">{stat.currency}</div>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                </div>
                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between text-white/40">
                    <span>24h Volume:</span>
                    <span className="text-white/80 font-mono">{stat.volume}</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>Settlement:</span>
                    <span className="text-electric-teal font-mono">{stat.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Network Metrics */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-electric-teal font-mono text-2xl font-bold">8</div>
                <div className="text-white/60 text-xs uppercase">Active Nodes</div>
              </div>
              <div>
                <div className="text-electric-teal font-mono text-2xl font-bold">2.9s</div>
                <div className="text-white/60 text-xs uppercase">Avg Settlement</div>
              </div>
              <div>
                <div className="text-electric-teal font-mono text-2xl font-bold">$10.4T</div>
                <div className="text-white/60 text-xs uppercase">24h Volume</div>
              </div>
              <div>
                <div className="text-green-400 font-mono text-2xl font-bold">99.97%</div>
                <div className="text-white/60 text-xs uppercase">Uptime</div>
              </div>
            </div>
          </div>

          {/* ISO 20022 Specs */}
          <div className="bg-gradient-to-r from-electric-teal/5 to-transparent border border-electric-teal/20 p-6 rounded-sm">
            <h4 className="text-electric-teal font-mono text-sm uppercase tracking-wider mb-4">ISO 20022 Message Specifications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[10px]">
              <div className="space-y-2">
                <div className="text-white/60">Message Type: <span className="text-white">pacs.008.001.08</span></div>
                <div className="text-white/60">Settlement: <span className="text-electric-teal">RTGS</span></div>
                <div className="text-white/60">System: <span className="text-white">XRPL</span></div>
              </div>
              <div className="space-y-2">
                <div className="text-white/60">Protocol: <span className="text-white">RippleNet</span></div>
                <div className="text-white/60">Finality: <span className="text-electric-teal">Atomic</span></div>
                <div className="text-white/60">Privacy: <span className="text-white">Protocol 22</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

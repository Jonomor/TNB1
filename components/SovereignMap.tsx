import React, { useState } from 'react';
import { Section } from './Section';

interface SovereignMapProps {
  onRequestAccess?: () => void;
  testMode?: boolean; // Set to true to preview the map
}

export const SovereignMap: React.FC<SovereignMapProps> = ({ onRequestAccess, testMode = false }) => {
  const [isUnlocked, setIsUnlocked] = useState(testMode); // Start unlocked if testMode

  const handleUnlock = () => {
    // Check if user has institutional access
    const hasInstitutionalAccess = localStorage.getItem('institutional_verified') === 'true';
    
    if (hasInstitutionalAccess) {
      setIsUnlocked(true);
    } else {
      // Redirect to vault registration
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
        Real-time schematic of the "Neutral Bridge" intersections with major (CBDCs).
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

      {/* Unlocked Mode - Full Map */}
      {isUnlocked && (
        <div className="border border-electric-teal/30 bg-matte-black rounded-lg p-6 md:p-12">
          {/* Network Diagram */}
          <div className="relative aspect-video bg-gradient-to-br from-slate-grey/20 to-matte-black rounded-lg border border-white/10 p-8 overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}></div>
            </div>

            {/* Center: XRP Ledger Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-electric-teal/20 border-2 border-electric-teal flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-electric-teal font-bold text-lg md:text-xl">XRP</div>
                  <div className="text-electric-teal/60 text-[8px] md:text-xs uppercase tracking-wider">Ledger</div>
                </div>
              </div>
              {/* Multiple pulse rings at different speeds */}
              <div className="absolute inset-0 rounded-full border-2 border-electric-teal/50 animate-ping"></div>
              <div className="absolute inset-[-8px] rounded-full border-2 border-electric-teal/30 animate-ping" style={{ animationDuration: '2s' }}></div>
              <div className="absolute inset-[-16px] rounded-full border border-electric-teal/20 animate-ping" style={{ animationDuration: '3s' }}></div>
            </div>

            {/* CBDC Nodes with flowing particles */}
            {[
              { name: 'USD', label: 'Federal Reserve', angle: 0, color: 'sky' },
              { name: 'EUR', label: 'ECB', angle: 45, color: 'sky' },
              { name: 'GBP', label: 'Bank of England', angle: 90, color: 'sky' },
              { name: 'JPY', label: 'Bank of Japan', angle: 135, color: 'green' },
              { name: 'CNY', label: 'PBOC', angle: 180, color: 'red' },
              { name: 'CHF', label: 'Swiss National Bank', angle: 225, color: 'sky' },
              { name: 'AUD', label: 'RBA', angle: 270, color: 'green' },
              { name: 'CAD', label: 'Bank of Canada', angle: 315, color: 'sky' }
            ].map((node, i) => {
              const radius = 140;
              const radians = (node.angle * Math.PI) / 180;
              const x = 50 + (radius * Math.cos(radians)) / 4;
              const y = 50 + (radius * Math.sin(radians)) / 4;
              
              const colorMap = {
                sky: { border: 'border-sky-400', bg: 'bg-sky-400/10', text: 'text-sky-400', stroke: 'rgba(56, 189, 248, 0.4)' },
                green: { border: 'border-green-400', bg: 'bg-green-400/10', text: 'text-green-400', stroke: 'rgba(74, 222, 128, 0.4)' },
                red: { border: 'border-red-400', bg: 'bg-red-400/10', text: 'text-red-400', stroke: 'rgba(248, 113, 113, 0.4)' }
              };
              const colors = colorMap[node.color];
              
              return (
                <div key={node.name}>
                  {/* Connection Line with flowing gradient */}
                  <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                    <defs>
                      <linearGradient id={`gradient-${node.name}`} gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor={colors.stroke} stopOpacity="0.8">
                          <animate attributeName="offset" values="0%;1%;0%" dur="3s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="50%" stopColor={colors.stroke} stopOpacity="0.4">
                          <animate attributeName="offset" values="0.5%;1.5%;0.5%" dur="3s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="100%" stopColor={colors.stroke} stopOpacity="0.1">
                          <animate attributeName="offset" values="1%;2%;1%" dur="3s" repeatCount="indefinite" />
                        </stop>
                      </linearGradient>
                    </defs>
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke={`url(#gradient-${node.name})`}
                      strokeWidth="2"
                    />
                    
                    {/* Flowing particles - multiple circles moving along the line */}
                    {[0, 0.33, 0.66].map((delay, idx) => (
                      <circle key={idx} r="3" fill={colors.stroke}>
                        <animateMotion
                          dur="2s"
                          repeatCount="indefinite"
                          begin={`${delay * 2}s`}
                          path={`M ${window.innerWidth * 0.5} ${window.innerHeight * 0.5} L ${x * window.innerWidth / 100} ${y * window.innerHeight / 100}`}
                        />
                        <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin={`${delay * 2}s`} />
                      </circle>
                    ))}
                  </svg>
                  
                  {/* Node with activity pulse */}
                  <div
                    className="absolute w-16 h-16 md:w-20 md:h-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className={`w-full h-full rounded-full border-2 ${colors.border} ${colors.bg} flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform relative`}>
                      {/* Activity ring */}
                      <div className={`absolute inset-0 rounded-full border ${colors.border} animate-ping opacity-50`} style={{ animationDuration: '2s', animationDelay: `${i * 0.2}s` }}></div>
                      <div className="text-center relative z-10">
                        <div className={`font-bold text-xs md:text-sm ${colors.text}`}>{node.name}</div>
                      </div>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                      <div className="bg-black/90 border border-white/20 px-3 py-1.5 rounded-sm text-[10px] text-white/80">
                        {node.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Transaction Counter - Updates every second */}
            <div className="absolute top-4 left-4 bg-black/80 border border-electric-teal/30 px-4 py-2 rounded-sm">
              <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Live Transactions</div>
              <div className="text-electric-teal font-mono text-xl font-bold tabular-nums">
                <span style={{ display: 'inline-block' }}>
                  {Array.from({ length: 6 }, (_, i) => (
                    <span key={i} style={{ 
                      display: 'inline-block',
                      animation: `countUp 0.5s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`
                    }}>
                      {Math.floor(Math.random() * 10)}
                    </span>
                  ))}
                </span>
              </div>
              <div className="text-[8px] text-white/30 mt-1">per second</div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-black/80 border border-white/10 p-3 rounded-sm text-[10px] space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-electric-teal animate-pulse"></div>
                <span className="text-white/60">XRP Ledger Bridge</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-400"></div>
                <span className="text-white/60">Western CBDCs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-white/60">Asia-Pacific</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <span className="text-white/60">China CBDC</span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                <div className="w-3 h-1 bg-gradient-to-r from-electric-teal/80 to-transparent"></div>
                <span className="text-white/60">Data Flow</span>
              </div>
            </div>

            {/* Network Status with live indicator */}
            <div className="absolute top-4 right-4 bg-black/80 border border-electric-teal/30 px-4 py-2 rounded-sm">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-electric-teal"></div>
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-electric-teal animate-ping"></div>
                </div>
                <span className="text-[10px] text-electric-teal font-mono uppercase tracking-wider">Network Active</span>
              </div>
              <div className="text-[8px] text-white/40 mt-1 font-mono">Latency: 0.{Math.floor(Math.random() * 9)}s</div>
            </div>

            {/* Add CSS animation for counter */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes countUp {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-2px); }
              }
            `}} />
          </div>
          
          {/* Settlement Statistics with live updates */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { currency: 'USD', node: 'Federal Reserve', volume: '$2.4T', settlement: '2.8s', activity: 95 },
              { currency: 'EUR', node: 'ECB', volume: '$1.8T', settlement: '3.1s', activity: 87 },
              { currency: 'GBP', node: 'BoE', volume: '$892B', settlement: '2.9s', activity: 82 },
              { currency: 'JPY', node: 'BoJ', volume: '$1.2T', settlement: '3.2s', activity: 78 },
              { currency: 'CNY', node: 'PBOC', volume: '$3.1T', settlement: '3.5s', activity: 91 },
              { currency: 'CHF', node: 'SNB', volume: '$456B', settlement: '2.7s', activity: 68 },
              { currency: 'AUD', node: 'RBA', volume: '$234B', settlement: '3.0s', activity: 64 },
              { currency: 'CAD', node: 'BoC', volume: '$389B', settlement: '2.9s', activity: 71 }
            ].map((stat) => (
              <div key={stat.currency} className="bg-white/5 border border-white/10 p-4 rounded-sm hover:border-electric-teal/50 transition-colors group relative overflow-hidden">
                {/* Activity bar background */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                  <div 
                    className="h-full bg-electric-teal/50 transition-all duration-1000" 
                    style={{ width: `${stat.activity}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="text-electric-teal font-mono font-bold text-lg">{stat.currency}</div>
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></div>
                  </div>
                </div>
                <div className="text-white/60 text-[10px] font-mono mb-3">{stat.node}</div>
                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between text-white/40">
                    <span>24h Volume:</span>
                    <span className="text-white/80 font-mono">{stat.volume}</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>Settlement:</span>
                    <span className="text-electric-teal font-mono">{stat.settlement}</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>Activity:</span>
                    <span className="text-green-400 font-mono">{stat.activity}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Network Performance Metrics */}
          <div className="mt-8 bg-white/5 border border-white/10 p-6 rounded-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-electric-teal font-mono text-2xl font-bold mb-1">8</div>
                <div className="text-white/60 text-xs uppercase tracking-wider">Active CBDC Nodes</div>
              </div>
              <div>
                <div className="text-electric-teal font-mono text-2xl font-bold mb-1 tabular-nums">2.9s</div>
                <div className="text-white/60 text-xs uppercase tracking-wider">Avg Settlement</div>
              </div>
              <div>
                <div className="text-electric-teal font-mono text-2xl font-bold mb-1">$10.4T</div>
                <div className="text-white/60 text-xs uppercase tracking-wider">24h Volume</div>
              </div>
              <div>
                <div className="text-green-400 font-mono text-2xl font-bold mb-1">99.97%</div>
                <div className="text-white/60 text-xs uppercase tracking-wider">Uptime</div>
              </div>
            </div>
          </div>

          {/* ISO 20022 Technical Specifications */}
          <div className="mt-8 bg-gradient-to-r from-electric-teal/5 to-transparent border border-electric-teal/20 p-6 rounded-sm">
            <h4 className="text-electric-teal font-mono text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              ISO 20022 Message Specifications
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[10px]">
              <div className="space-y-2">
                <div className="text-white/60">Message Type: <span className="text-white">pacs.008.001.08</span></div>
                <div className="text-white/60">Settlement Method: <span className="text-electric-teal">RTGS</span></div>
                <div className="text-white/60">Clearing System: <span className="text-white">XRPL</span></div>
                <div className="text-white/60">Message Format: <span className="text-white">XML Schema</span></div>
              </div>
              <div className="space-y-2">
                <div className="text-white/60">Protocol: <span className="text-white">RippleNet / ODL</span></div>
                <div className="text-white/60">Finality: <span className="text-electric-teal">Atomic</span></div>
                <div className="text-white/60">Privacy Layer: <span className="text-white">Protocol 22 (ZKP)</span></div>
                <div className="text-white/60">Confirmation: <span className="text-green-400">Instant</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
        <div className="border border-electric-teal/30 bg-matte-black rounded-lg p-6 md:p-12">
          {/* Network Diagram */}
          <div className="relative aspect-video bg-gradient-to-br from-slate-grey/20 to-matte-black rounded-lg border border-white/10 p-8 overflow-hidden">
            {/* Center: XRP Ledger Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-electric-teal/20 border-2 border-electric-teal flex items-center justify-center backdrop-blur-sm animate-pulse">
                <div className="text-center">
                  <div className="text-electric-teal font-bold text-lg md:text-xl">XRP</div>
                  <div className="text-electric-teal/60 text-[8px] md:text-xs uppercase tracking-wider">Ledger</div>
                </div>
              </div>
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full border-2 border-electric-teal/30 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border border-electric-teal/20 animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </div>

            {/* CBDC Nodes arranged in circle */}
            {[
              { name: 'USD', label: 'Federal Reserve', angle: 0, color: 'blue' },
              { name: 'EUR', label: 'ECB', angle: 45, color: 'blue' },
              { name: 'GBP', label: 'Bank of England', angle: 90, color: 'blue' },
              { name: 'JPY', label: 'Bank of Japan', angle: 135, color: 'green' },
              { name: 'CNY', label: 'PBOC', angle: 180, color: 'red' },
              { name: 'CHF', label: 'Swiss National Bank', angle: 225, color: 'blue' },
              { name: 'AUD', label: 'RBA', angle: 270, color: 'green' },
              { name: 'CAD', label: 'Bank of Canada', angle: 315, color: 'blue' }
            ].map((node, i) => {
              const radius = 140; // Distance from center
              const radians = (node.angle * Math.PI) / 180;
              const x = 50 + (radius * Math.cos(radians)) / 4; // Percentage-based positioning
              const y = 50 + (radius * Math.sin(radians)) / 4;
              
              return (
                <div key={node.name}>
                  {/* Connection Line */}
                  <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke="rgba(56, 189, 248, 0.2)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="8"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </line>
                  </svg>
                  
                  {/* Node */}
                  <div
                    className="absolute w-16 h-16 md:w-20 md:h-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className={`w-full h-full rounded-full border-2 ${
                      node.color === 'blue' ? 'border-sky-400 bg-sky-400/10' :
                      node.color === 'green' ? 'border-green-400 bg-green-400/10' :
                      'border-red-400 bg-red-400/10'
                    } flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform`}>
                      <div className="text-center">
                        <div className={`font-bold text-xs md:text-sm ${
                          node.color === 'blue' ? 'text-sky-400' :
                          node.color === 'green' ? 'text-green-400' :
                          'text-red-400'
                        }`}>{node.name}</div>
                      </div>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      <div className="bg-black/90 border border-white/20 px-3 py-1.5 rounded-sm text-[10px] text-white/80">
                        {node.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-black/80 border border-white/10 p-3 rounded-sm text-[10px] space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-electric-teal"></div>
                <span className="text-white/60">XRP Ledger Bridge</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-400"></div>
                <span className="text-white/60">Western CBDCs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-white/60">Asia-Pacific</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <span className="text-white/60">China CBDC</span>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="absolute top-4 right-4 bg-black/80 border border-electric-teal/30 px-4 py-2 rounded-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-electric-teal animate-pulse"></div>
                <span className="text-[10px] text-electric-teal font-mono uppercase tracking-wider">Live Network</span>
              </div>
            </div>
          </div>
          
          {/* Settlement Statistics */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { currency: 'USD', node: 'Federal Reserve', volume: '$2.4T', settlement: '2.8s' },
              { currency: 'EUR', node: 'ECB', volume: '$1.8T', settlement: '3.1s' },
              { currency: 'GBP', node: 'BoE', volume: '$892B', settlement: '2.9s' },
              { currency: 'JPY', node: 'BoJ', volume: '$1.2T', settlement: '3.2s' },
              { currency: 'CNY', node: 'PBOC', volume: '$3.1T', settlement: '3.5s' },
              { currency: 'CHF', node: 'SNB', volume: '$456B', settlement: '2.7s' },
              { currency: 'AUD', node: 'RBA', volume: '$234B', settlement: '3.0s' },
              { currency: 'CAD', node: 'BoC', volume: '$389B', settlement: '2.9s' }
            ].map((stat) => (
              <div key={stat.currency} className="bg-white/5 border border-white/10 p-4 rounded-sm hover:border-electric-teal/50 transition-colors group">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-electric-teal font-mono font-bold text-lg">{stat.currency}</div>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                </div>
                <div className="text-white/60 text-[10px] font-mono mb-2">{stat.node}</div>
                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between text-white/40">
                    <span>24h Volume:</span>
                    <span className="text-white/80 font-mono">{stat.volume}</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>Avg Settlement:</span>
                    <span className="text-electric-teal font-mono">{stat.settlement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Details */}
          <div className="mt-8 bg-white/5 border border-white/10 p-6 rounded-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-electric-teal font-mono text-2xl font-bold mb-1">8</div>
                <div className="text-white/60 text-xs uppercase tracking-wider">Active CBDC Nodes</div>
              </div>
              <div>
                <div className="text-electric-teal font-mono text-2xl font-bold mb-1">2.9s</div>
                <div className="text-white/60 text-xs uppercase tracking-wider">Avg Settlement Time</div>
              </div>
              <div>
                <div className="text-electric-teal font-mono text-2xl font-bold mb-1">$10.4T</div>
                <div className="text-white/60 text-xs uppercase tracking-wider">24h Total Volume</div>
              </div>
            </div>
          </div>

          {/* ISO 20022 Message Flow */}
          <div className="mt-8 bg-gradient-to-r from-electric-teal/5 to-transparent border border-electric-teal/20 p-6 rounded-sm">
            <h4 className="text-electric-teal font-mono text-sm uppercase tracking-wider mb-4">ISO 20022 Message Specs</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[10px]">
              <div className="space-y-2">
                <div className="text-white/60">Message Type: <span className="text-white">pacs.008.001.08</span></div>
                <div className="text-white/60">Settlement Method: <span className="text-electric-teal">RTGS</span></div>
                <div className="text-white/60">Clearing System: <span className="text-white">XRPL</span></div>
              </div>
              <div className="space-y-2">
                <div className="text-white/60">Protocol: <span className="text-white">Ripple Net / ODL</span></div>
                <div className="text-white/60">Finality: <span className="text-electric-teal">Atomic</span></div>
                <div className="text-white/60">Privacy Layer: <span className="text-white">Protocol 22 (ZKP)</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

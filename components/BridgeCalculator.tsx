import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { ArrowRight, RefreshCw, DollarSign, Activity } from 'lucide-react';

export const BridgeCalculator: React.FC = () => {
  const [volume, setVolume] = useState<string>('10000000');
  
  // Constants
  const LEGACY_SETTLEMENT_DAYS = 2; // T+2
  const BRIDGE_SETTLEMENT_SECONDS = 3; 
  const INTEREST_RATE = 0.05; // Cost of capital (5%)

  // Auto Calculate
  const vol = parseFloat(volume) || 0;
  
  // Logic: Cost of Dead Capital = (Volume * Rate) * (Days / 365)
  const legacyCost = (vol * INTEREST_RATE) * (LEGACY_SETTLEMENT_DAYS / 365);
  // Bridge is effectively instant, capital cost approaches 0 for settlement time
  const bridgeCost = (vol * INTEREST_RATE) * ((BRIDGE_SETTLEMENT_SECONDS / 86400) / 365); 
  
  const savings = legacyCost - bridgeCost;

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-charcoal/50 border border-white/5 p-8 md:p-12 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Activity size={100} />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Input Section */}
          <div className="flex-1">
            <h3 className="font-serif text-3xl text-white mb-2">Bridge Utility Calculator</h3>
            <p className="text-white/60 mb-8 text-sm">
              Calculate the "Dead Capital" currently trapped in your legacy settlement buffers.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block font-mono text-xs text-electric-teal uppercase tracking-widest mb-2">
                  Monthly Transaction Volume ($USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-mono">$</span>
                  <input 
                    type="number" 
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full bg-matte-black border border-white/20 p-4 pl-8 text-white font-mono focus:border-electric-teal focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="text-[10px] text-white/40 font-mono space-y-1 bg-black/20 p-3 border border-white/5 rounded">
                 <p className="font-bold text-white/60 mb-1">Assumptions Used:</p>
                 <p>• Cost of Capital: 5% APY (Standard Reference Rate)</p>
                 <p>• Legacy Settlement: T+2 Days (SWIFT/Correspondent Avg)</p>
                 <p>• Bridge Settlement: 3 Seconds (XRPL Ledger Finality)</p>
              </div>

            </div>
          </div>

          {/* Output Section */}
          <div className="flex-1 bg-matte-black border border-white/10 p-6 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-30">
               <RefreshCw className="animate-spin-slow text-white" size={20} />
             </div>
             
             <div className="space-y-6">
                 <div>
                   <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">Estimated Trapped Pre-funding (Annual)</div>
                   <div className="text-2xl font-mono text-crimson">
                     ${legacyCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                   </div>
                 </div>
                 
                 <div>
                   <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">Neutral Bridge Cost</div>
                   <div className="text-2xl font-mono text-electric-teal">
                     ${bridgeCost.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                   </div>
                 </div>

                 <div className="h-px bg-white/10 my-2"></div>

                 <div>
                   <div className="font-mono text-xs text-electric-teal uppercase tracking-widest mb-1">Total Capital Released</div>
                   <div className="text-4xl font-serif text-white">
                     ${(savings * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                   </div>
                   <p className="text-[10px] text-white/40 mt-2 mb-4">
                     *Liquidity immediately available for re-deployment.
                   </p>
                   
                   <Button onClick={scrollToPricing} variant="outline" fullWidth className="text-xs group hover:bg-white hover:text-black">
                      Get the Full Liquidity Model (Institutional) <ArrowRight size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
                   </Button>
                 </div>
               </div>
          </div>

        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Shield, Book, Clock, Lock, Loader2 } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const PreOrderBridge: React.FC = () => {
  // 1. Independent Launch Timer Logic (Target: Feb 18, 2026 09:00:00 EST)
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0, active: true
  });

  useEffect(() => {
    // Target: February 18, 2026 09:00:00 EST (UTC-5)
    // 09:00 EST is 14:00 UTC
    const targetDate = new Date("2026-02-18T14:00:00Z").getTime(); 

    const launchTimer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(launchTimer);
        setTimeLeft(prev => ({ ...prev, active: false }));
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
          active: true
        });
      }
    }, 1000);

    return () => clearInterval(launchTimer);
  }, []);

  // 2. Secure Redirect Logic
  const [redirectingType, setRedirectingType] = useState<'retail' | 'institutional' | null>(null);

  const RETAIL_URL = "https://www.amazon.com/Neutral-Bridge-Ripple-Engineered-Finance-ebook/dp/B0GHP8PGCL";
  const INST_URL = "https://www.amazon.com/Neutral-Bridge-System-Analysis-Financial-ebook/dp/B0GHRYD6BJ";

  const handleRedirect = (type: 'retail' | 'institutional') => {
    // Track the outbound click
    trackEvent('outbound_click', {
      category: 'Conversion',
      label: `Amazon_${type.charAt(0).toUpperCase() + type.slice(1)}`
    });

    setRedirectingType(type);
    const url = type === 'retail' ? RETAIL_URL : INST_URL;
    
    // 2-second delay to establish "Secure Bridge" feel
    setTimeout(() => {
      window.location.href = url;
    }, 2000);
  };

  return (
    <div className="bg-[#3C4043] border-y-4 border-[#00E5FF] relative overflow-hidden py-20" id="preorder">
       {/* Forensic Background Elements */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent"></div>
       <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent"></div>
       
       <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          
          {/* Header Label */}
          <div className="inline-flex items-center gap-3 bg-[#121212] border border-[#00E5FF] px-6 py-2 mb-10 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
            <div className={`w-2 h-2 bg-[#00E5FF] rounded-full ${timeLeft.active ? 'animate-pulse' : ''}`}></div>
            <span className="font-mono text-[#00E5FF] text-xs font-bold uppercase tracking-[0.2em]">
              {timeLeft.active ? "System Activation Sequence" : "System Active"}
            </span>
          </div>

          {/* Independent Launch Clock */}
          <div className="mb-12">
            <div className="flex gap-4 md:gap-8 font-mono text-white">
               {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                  <div key={unit} className="flex flex-col items-center">
                    <div className="text-5xl md:text-8xl font-bold bg-[#121212] border border-white/10 p-4 min-w-[90px] md:min-w-[160px] relative overflow-hidden group">
                      <span className="relative z-10 group-hover:text-[#00E5FF] transition-colors duration-300">
                        {String(timeLeft[unit as keyof typeof timeLeft]).padStart(2, '0')}
                      </span>
                      {/* Scanline effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-full w-full opacity-0 group-hover:animate-scan"></div>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] mt-4 text-white/40">{unit}</span>
                  </div>
               ))}
            </div>
            <p className="mt-6 font-mono text-xs text-[#00E5FF]/60 uppercase tracking-widest">
              Target: February 18, 2026 // 09:00 EST
            </p>
          </div>

          {/* Pre-Order Interface */}
          <div className="w-full max-w-4xl bg-[#121212] border border-white/10 p-1 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]">
             <div className="border border-white/5 p-8 md:p-12 flex flex-col items-center">
                
                {/* Dual Tier Grid with Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
                   {/* Retail Column */}
                   <div className="flex flex-col justify-between h-full bg-white/5 border border-white/10 p-6 hover:border-[#00E5FF]/30 transition-colors group text-left">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Book className="text-[#00E5FF]" size={20} />
                          <h4 className="font-serif text-white text-xl">Retail Edition</h4>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed mb-6">
                           Wealth preservation logic. Includes "Hidden Accumulation" analysis and retail survival guide.
                        </p>
                      </div>
                      <button 
                        onClick={() => handleRedirect('retail')}
                        disabled={redirectingType !== null}
                        className={`w-full py-3 font-mono text-xs font-bold tracking-wider border transition-all duration-300 flex items-center justify-center gap-2
                          ${redirectingType === 'retail' 
                            ? 'bg-[#121212] text-[#00E5FF] border-[#00E5FF]' 
                            : 'bg-transparent text-[#00E5FF] border-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#121212]'
                          }`}
                      >
                         {redirectingType === 'retail' ? (
                           <><Loader2 size={12} className="animate-spin"/> REDIRECTING...</>
                         ) : (
                           "ORDER RETAIL ON AMAZON ($9.99)"
                         )}
                      </button>
                   </div>

                   {/* Institutional Column */}
                   <div className="flex flex-col justify-between h-full bg-white/5 border border-white/10 p-6 hover:border-white/30 transition-colors group text-left">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                           <Shield className="text-white" size={20} />
                           <h4 className="font-serif text-white text-xl">Institutional Suite</h4>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed mb-6">
                           Full systems engineering blueprint. Includes raw data appendices and liquidity models.
                        </p>
                      </div>
                      <button 
                        onClick={() => handleRedirect('institutional')}
                        disabled={redirectingType !== null}
                        className={`w-full py-3 font-mono text-xs font-bold tracking-wider border transition-all duration-300 flex items-center justify-center gap-2
                           ${redirectingType === 'institutional' 
                             ? 'bg-[#121212] text-white border-white' 
                             : 'bg-transparent text-white border-white/30 hover:bg-white hover:text-[#121212] hover:border-white'
                           }`}
                      >
                         {redirectingType === 'institutional' ? (
                           <><Loader2 size={12} className="animate-spin"/> REDIRECTING...</>
                         ) : (
                           "ORDER INSTITUTIONAL ON AMAZON ($99.99)"
                         )}
                      </button>
                   </div>
                </div>

                {/* Redirect Status */}
                <div className="h-6 flex items-center justify-center">
                    {redirectingType ? (
                       <p className="text-[10px] text-[#00E5FF] font-mono animate-pulse uppercase flex items-center gap-2">
                         <Lock size={10} /> Establishing Secure Bridge to Amazon...
                       </p>
                    ) : (
                       <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest">
                         Secure Global Fulfillment via Amazon KDP
                       </p>
                    )}
                </div>

                {/* Intelligence Vault Sync Message */}
                <div className="mt-8 pt-8 border-t border-white/10 w-full text-center">
                   <p className="text-xs text-white/60 font-sans max-w-lg mx-auto leading-relaxed">
                     <span className="text-[#00E5FF] font-bold block mb-1">Secure your intelligence early.</span> 
                     All website pre-orders will be synchronized with our proprietary 'Intelligence Vault' on Launch Day.
                   </p>
                </div>

             </div>
          </div>
       </div>
    </div>
  );
};

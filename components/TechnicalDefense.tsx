import React from 'react';
import { Section } from './Section';
import { Button } from './Button';
import { TrendingDown, TrendingUp, AlertTriangle, BookOpen, Activity } from 'lucide-react';
import { getAssetBase } from '../utils/assets';

export const TechnicalDefense: React.FC = () => {
const assetBase = getAssetBase();
  
  return (
    <Section id="technical-defense" className="bg-matte-black border-y border-white/5 relative overflow-hidden">
      {/* Background noise/grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Left: Text Content */}
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 border border-crimson/50 bg-crimson/10 px-4 py-1.5 rounded-sm">
            <AlertTriangle size={14} className="text-crimson animate-pulse" />
            <span className="font-mono text-[10px] text-crimson uppercase tracking-widest font-bold">
              Active Technical Event: Jan 19, 2026
            </span>
          </div>
          
          <div>
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-2">
              The Decoupling Phenomenon
            </h2>
            <p className="font-mono text-sm text-electric-teal uppercase tracking-widest">
              Chapter 4 // Speculative Volatility vs. Infrastructure Utility
            </p>
          </div>
          
          <div className="prose prose-invert text-white/70 leading-relaxed space-y-6">
            <p className="text-lg font-serif">
              Why are "Death Crosses" irrelevant to Neutral Bridge Assets?
            </p>
            
            <div className="bg-white/5 p-6 border-l-2 border-electric-teal">
              <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                <TrendingDown size={16} className="text-white/50" />
                The Lagging Indicator Fallacy
              </h4>
              <p className="text-sm">
                Technical patterns like the Death Cross ($1.97) describe past behavior, not future utility. While retail algorithms trigger "sell" orders, institutional Smart Money utilizes these dips to accumulate the liquidity required for the 2027 Reset.
              </p>
            </div>

            <div className="bg-white/5 p-6 border-l-2 border-electric-teal">
              <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                <TrendingUp size={16} className="text-electric-teal" />
                The Inversion Principle
              </h4>
              <p className="text-sm">
                As legacy systems fracture, demand for the Bridge increases. While price tests $1.84, <strong className="text-white">XRPL On-Chain Volume is up <span className="text-electric-teal">14%</span> today.</strong>
              </p>
            </div>

            <p className="italic text-white/50 pl-4 border-l border-white/20">
              "In systems engineering, we don't look at the paint on the bridge—we look at the weight the bridge can carry." — K. Morgan
            </p>
          </div>

           <div className="pt-4 flex gap-4">
              <Button variant="primary" className="text-xs">
                Acquire The Institutional Suite
              </Button>
              <Button variant="outline" className="text-xs">
                <BookOpen size={14} className="mr-2" /> Read Full Analysis
              </Button>
           </div>
        </div>

        {/* Right: The Image/Visual - UPDATED - Fixed Path */}
        <div className="flex-1 w-full relative group">
           <div className="absolute -inset-1 bg-gradient-to-tr from-crimson/20 to-electric-teal/20 opacity-50 blur-xl group-hover:opacity-75 transition-opacity"></div>
           <div className="relative bg-charcoal border border-white/10 p-2 shadow-2xl">
              <img 
                src={`${assetBase}thedecoupling.jpg`}
                alt="The Decoupling: Price vs Utility Infographic" 
                className="w-full h-auto"
              />
              <div className="absolute bottom-4 right-4 bg-black/90 px-3 py-1 border border-white/10 text-[10px] font-mono text-electric-teal uppercase tracking-widest flex items-center gap-2">
                <Activity size={10} />
                Fig 4.1: System Decoupling
              </div>
           </div>
           <p className="text-center mt-4 text-[10px] text-white/30 font-mono uppercase tracking-widest">
             Data Source: XRPL Ledger / Binance / CME Group
           </p>
        </div>
      </div>
    </Section>
  );
};

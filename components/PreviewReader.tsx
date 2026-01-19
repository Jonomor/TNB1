import React, { useState, useEffect } from 'react';
import { X, BookOpen, List, FileText, Lock, ShieldAlert } from 'lucide-react';
import { Button } from './Button';

interface PreviewReaderProps {
  isOpen: boolean;
  edition: 'retail' | 'institutional' | null;
  onClose: () => void;
  onOrder: () => void;
}

export const PreviewReader: React.FC<PreviewReaderProps> = ({ isOpen, edition, onClose, onOrder }) => {
  const [activeTab, setActiveTab] = useState<'synopsis' | 'toc' | 'extra'>('synopsis');

  // Reset tab when opening
  useEffect(() => {
    if (isOpen) setActiveTab('synopsis');
  }, [isOpen]);

  if (!isOpen || !edition) return null;

  const isInstitutional = edition === 'institutional';

  // Content Definitions
  const institutionalContent = {
    headerTitle: "EXECUTIVE SUMMARY",
    headerSubtitle: "Project Code: NB-2027-RESET",
    tabs: [
        { id: 'synopsis', label: 'Executive Summary', icon: FileText },
        { id: 'toc', label: 'System Roadmap', icon: List },
        { id: 'extra', label: 'Tech Specs', icon: BookOpen },
    ],
    sections: [
      {
        title: "1. The Problem Statement: Infrastructure Obsolescence",
        body: "The current global financial architecture—largely built on 50-year-old messaging protocols and fragmented liquidity pools—is reaching a point of technical exhaustion. The friction inherent in legacy cross-border settlement (T+2 to T+5) acts as a systemic drag on a digital-first economy."
      },
      {
        title: "2. The Engineering Hypothesis: The Neutral Bridge Theory",
        body: "The Neutral Bridge posits that the transition to the 2027 Global Financial Reset is not a political choice, but a mathematical necessity. As Central Bank Digital Currencies (CBDCs) and private stablecoins proliferate, the system requires a Neutral Bridge Asset to prevent \"liquidity siloing\".",
        bullets: [
          "Key Role of Ripple/XRP: The manuscript analyzes the technical utility of the XRP Ledger (XRPL) as the primary settlement rail due to its native bridge properties.",
          "Interoperability: ISO 20022 provides the \"common language\" required for this bridge to operate at scale."
        ]
      },
      {
        title: "3. Institutional Scope (The 2027 Roadmap)",
        body: "This analysis tracks the convergence of three critical technical timelines:",
        bullets: [
          "ISO 20022 Migration: The final synchronization of global RTGS systems.",
          "Liquidity Re-Baselining: The shift from pre-funded (Nostro/Vostro) accounts to On-Demand Liquidity (ODL).",
          "AI-Driven Market Making: How automated market makers (AMMs) will provide the depth needed for sovereign-level value transfer."
        ]
      },
      {
        title: "4. Asset Utility & Value Logic",
        body: "This manuscript rejects market hype in favor of a Utility-First Model. It defines the \"Bridge Utility Coefficient\"—a formula used to determine the value of a neutral asset based on the volume of global debt and trade it must facilitate during the 2027 re-leveraging."
      }
    ]
  };

  const retailContent = {
    headerTitle: "Retail Edition Preview",
    headerSubtitle: "Operational Logic: Individual Wealth Preservation",
    tabs: [
        { id: 'synopsis', label: 'Synopsis', icon: BookOpen },
        { id: 'toc', label: 'Chapters', icon: List },
        { id: 'extra', label: 'Survival Guide', icon: FileText },
    ],
    synopsis: [
       "The Retail Edition strips away the banking jargon to focus on the immediate impact of the 2027 Reset on individual wealth. It documents Ripple's systematic acquisition of the financial stack and explains why the 'Hidden Accumulation' phase is creating a mathematically inevitable supply squeeze.",
       "This is not about trading; it's about positioning for the greatest transfer of value in history. The 'Old World' of correspondent banking is dissolving, and a new 'Internet of Value' is coming online.",
       "We provide the operational logic to preserve purchasing power by front-running the institutional migration to the Neutral Bridge."
    ],
    toc: [
      { id: "01", title: "The Vertical Monopoly: Ripple's $2.8B Acquisition Blitz" },
      { id: "02", title: "The Supply Squeeze: Analyzing Exchange Outflows" },
      { id: "03", title: "The 2027 Deadline: Implications of the GENIUS Act" },
      { id: "04", title: "Asset Preservation: Surviving the Liquidity Trap" },
      { id: "05", title: "The First 24 Hours: Retail Survival Guide" }
    ]
  };

  const currentContent = isInstitutional ? institutionalContent : retailContent;

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-matte-black/80 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>

      {/* Slide-over Panel */}
      <div className={`
        relative w-full max-w-2xl bg-[#0a0a0a] h-full shadow-2xl border-l flex flex-col animate-in slide-in-from-right duration-500
        ${isInstitutional ? 'border-white/20' : 'border-electric-teal/30'}
      `}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-matte-black/50">
          <div>
            <span className={`font-mono text-xs uppercase tracking-widest block mb-2 ${isInstitutional ? 'text-white/60' : 'text-electric-teal'}`}>
              {currentContent.headerSubtitle}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-white">
              {currentContent.headerTitle}
            </h2>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 bg-matte-black/30">
          {currentContent.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-[10px] md:text-xs font-mono uppercase tracking-wider transition-colors
                ${activeTab === tab.id 
                  ? `bg-[#0a0a0a] text-white border-b-2 ${isInstitutional ? 'border-white' : 'border-electric-teal'}` 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
            >
              <tab.icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 font-sans leading-relaxed text-white/80 bg-[#0a0a0a]">
          
          {/* INSTITUTIONAL VIEW */}
          {isInstitutional && activeTab === 'synopsis' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <div className="border border-white/10 p-4 bg-white/5 mb-6">
                 <div className="flex items-center gap-2 text-white/60 font-mono text-[10px] uppercase tracking-widest mb-2">
                    <ShieldAlert size={12} />
                    Restricted Access
                 </div>
                 <p className="font-mono text-xs text-white/80">
                   System Analyst: K. Morgan <br/>
                   Release Date: Jan 18, 2026
                 </p>
               </div>

               {institutionalContent.sections.map((section, idx) => (
                 <div key={idx}>
                   <h3 className="font-mono text-sm font-bold text-white mb-3 uppercase tracking-wide">
                     {section.title}
                   </h3>
                   <p className="font-serif text-white/70 leading-7 mb-3">
                     {section.body}
                   </p>
                   {section.bullets && (
                     <ul className="list-disc pl-5 space-y-2">
                       {section.bullets.map((bullet, bIdx) => (
                         <li key={bIdx} className="text-sm text-white/60 font-mono pl-2">
                           {bullet}
                         </li>
                       ))}
                     </ul>
                   )}
                 </div>
               ))}

               {/* Lead Gen Button */}
               <div className="mt-12 pt-8 border-t border-white/10 text-center">
                  <Button variant="outline" fullWidth className="group border-white/20 hover:border-white/40 text-xs" onClick={onOrder}>
                     <Lock size={14} className="mr-2 text-white/40 group-hover:text-white" />
                     Download Full Technical Glossary (Institutional Only)
                  </Button>
               </div>

               {/* Technical Disclosure */}
               <div className="mt-8 p-4 bg-charcoal border border-white/5 text-[10px] text-white/40 leading-relaxed text-justify font-mono">
                 TECHNICAL DISCLOSURE: This Executive Summary is for analytical purposes only. K. Morgan is an engineer and systems analyst; the information provided does not constitute financial, investment, or legal advice. All systems analysis is based on current infrastructure trends and engineering logic.
               </div>
            </div>
          )}
          
          {/* Placeholder for other institutional tabs if clicked */}
          {isInstitutional && activeTab !== 'synopsis' && (
             <div className="flex flex-col items-center justify-center h-64 text-white/40 animate-in fade-in">
               <Lock size={32} className="mb-4 opacity-50"/>
               <p className="font-mono text-xs uppercase tracking-widest">Awaiting Auth...</p>
             </div>
          )}


          {/* RETAIL VIEW */}
          {!isInstitutional && activeTab === 'synopsis' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="font-serif text-2xl text-white mb-2">The Engineered Reset</h3>
              {retailContent.synopsis.map((para, i) => (
                <p key={i} className="font-serif text-lg text-white/70 leading-relaxed border-l-2 border-electric-teal/20 pl-4">
                  {para}
                </p>
              ))}
              
              <div className="mt-8 bg-electric-teal/5 border border-electric-teal/20 p-6">
                <h4 className="font-mono text-xs text-electric-teal uppercase tracking-widest mb-2 font-bold">
                  Key Takeaway: The Supply Squeeze
                </h4>
                <p className="text-sm text-white/80">
                  When institutional capital enters the bridge, it does not buy from the retail order book. It requires "Value Density". This means the few retail investors holding the bridge asset before the reset are positioned in front of a $27 Trillion wall of money.
                </p>
              </div>
            </div>
          )}

          {!isInstitutional && activeTab === 'toc' && (
            <div className="space-y-2 animate-in fade-in duration-300">
              {retailContent.toc.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors group">
                   <span className="font-mono text-electric-teal text-sm opacity-50 group-hover:opacity-100">{item.id}</span>
                   <span className="font-serif text-white/80">{item.title}</span>
                </div>
              ))}
            </div>
          )}

          {!isInstitutional && activeTab === 'extra' && (
             <div className="space-y-4 animate-in fade-in duration-300">
               <p className="font-mono text-xs text-white/50 uppercase mb-4">The First 24 Hours Strategy</p>
               <ul className="space-y-4">
                 {[
                   "Secure Self-Custody (Get off exchanges)", 
                   "Establish On-Ramps/Off-Ramps (Multiple jurisdictions)", 
                   "Audit Your Portfolio (Remove legacy exposure)"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 bg-electric-teal rounded-full"></div>
                     <span className="text-white/80 font-sans">{item}</span>
                   </li>
                 ))}
               </ul>
             </div>
          )}

        </div>

        {/* Footer CTA */}
        <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
          <Button variant={isInstitutional ? 'outline' : 'primary'} fullWidth onClick={onOrder} className="mb-2">
            {isInstitutional ? 'Acquire Institutional Suite' : 'Order Retail Edition'}
          </Button>
          <p className="text-center text-[10px] text-white/30 font-mono uppercase">
            Encrypted Digital Delivery • Instant Access
          </p>
        </div>

      </div>
    </div>
  );
};
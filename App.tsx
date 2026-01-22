import React, { useState } from 'react';
import { Section } from './components/Section';
import { PricingCard } from './components/PricingCard';
import { Button } from './components/Button';
import { ComparisonRow } from './components/ComparisonRow';
import { ResetCountdown } from './components/ResetCountdown';
import { BridgeCalculator } from './components/BridgeCalculator';
import { PreviewReader } from './components/PreviewReader';
import { ReadinessQuiz } from './components/ReadinessQuiz';
import { PriceJustification } from './components/PriceJustification';
import { SocialProof } from './components/SocialProof';
import { SovereignMap } from './components/SovereignMap';
import { InstitutionalBundle } from './components/InstitutionalBundle';
import { Disclaimer } from './components/Disclaimer';
import { SystemArchitecture } from './components/SystemArchitecture';
import { IntelligenceTiers } from './components/IntelligenceTiers';
import { EngineeringRigor } from './components/EngineeringRigor';
import { DayZeroBar } from './components/DayZeroBar';
import { StrategicDialogue } from './components/StrategicDialogue';
import { IntelligenceVault } from './components/IntelligenceVault';
import { TechnicalDefense } from './components/TechnicalDefense';
import { PreOrderBridge } from './components/PreOrderBridge';
import { VoiceAssistant } from './components/VoiceAssistant';
import { FAQ } from './components/FAQ';
import { LegalModal, LegalTab } from './components/LegalModal';
import { PricingTier, ComparisonPoint, Testimonial } from './types';
import { getAssetBase } from './utils/assets';
import { ArrowRight, Terminal, Menu, X, Clock, MapPin, Phone, BookOpen, Check, Mic, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePreview, setActivePreview] = useState<'retail' | 'institutional' | null>(null);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const assetBase = getAssetBase();
  
  // Legal Modal State
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab>('privacy');

  const openLegal = (tab: LegalTab) => {
    setActiveLegalTab(tab);
    setLegalModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  const pricingTiers: PricingTier[] = [
    {
      id: 'retail',
      title: 'Retail Edition (E-Book)',
      subtitle: 'Digital Kindle Edition for immediate strategic deployment.',
      price: '$9.99',
      type: 'physical',
      features: [
        'Kindle / E-Book Format',
        'Instant Digital Delivery',
        'Asset Preservation Logic',
        'Compatible with all Devices'
      ],
      ctaText: 'Order on Amazon',
      isRecommended: false,
      externalUrl: 'https://www.amazon.com/dp/B0GHP8PGCL'
    },
    {
      id: 'bundle',
      title: 'Digital Bundle',
      subtitle: 'Includes both Retail & Institutional PDF/ePub.',
      price: '$49.00',
      type: 'digital',
      features: [
        'Instant Access (PDF/ePub)',
        'Retail Edition Included',
        'Institutional Edition Included',
        'Monthly Newsletter Access',
        'Bonus: Transition Readiness Checklist'
      ],
      ctaText: 'Get The Bundle',
      isRecommended: true
    },
    {
      id: 'suite',
      title: 'Institutional Suite',
      subtitle: 'Hardcover Institutional Edition + Raw Data.',
      price: '$159.99',
      type: 'suite',
      features: [
        'Hardcover Institutional Edition',
        'Serialized Raw Data Appendix',
        'Quarterly Strategy Briefings',
        'Priority Analyst Support',
        'Unique Digital License ID',
        'Excel-Based Liquidity Model',
        'Snypre System AI Whitelist'
      ],
      ctaText: 'Acquire Intelligence',
      isRecommended: false,
      requiresAcknowledgement: true
    }
  ];

  const comparisonPoints: ComparisonPoint[] = [
    {
      feature: 'Primary Goal',
      retail: 'General Strategic Awareness',
      institutional: 'Forensic Systems Analysis'
    },
    {
      feature: 'Target Audience',
      retail: 'Individual Investors',
      institutional: 'Risk Committees / Sovereign Funds'
    },
    {
      feature: 'Key Frameworks',
      retail: '2027 Timeline & Macro Logic',
      institutional: 'The Math of Necessity & Vertical Stack'
    },
    {
      feature: 'Privacy Deep Dive',
      retail: 'Intro to Protocol 22',
      institutional: 'ZKP Technical Specifications'
    },
    {
      feature: 'Verification Kit',
      retail: 'Summary proof points',
      institutional: 'Full Technical Appendix (15+ pages)'
    },
    {
      feature: 'Acquisition Data',
      retail: 'High-level overview',
      institutional: 'Forensic M&A Deconstruction'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      quote: "The most sober and technically sound explanation of the XRP ledger's role in global finance I have read to date.",
      author: "Senior Fintech Analyst"
    },
    {
      quote: "Finally, a book that treats the 'Reset' as an engineering challenge rather than a conspiracy theory.",
      author: "Former Compliance Officer"
    },
    {
      quote: "If you hold XRP, this is your manual. If you don't, this is your warning.",
      author: "Private Office Fund"
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-matte-black text-off-white selection:bg-electric-teal selection:text-black pt-12">
      
      {/* GLOBAL OVERLAYS */}
      <div className="fixed top-0 left-0 right-0 z-[60]">
        <DayZeroBar />
      </div>
      <PreviewReader 
        isOpen={activePreview !== null}
        edition={activePreview}
        onClose={() => setActivePreview(null)}
        onOrder={() => {
          setActivePreview(null);
          scrollToSection('pricing');
        }}
      />
      <IntelligenceVault 
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
      />
      <LegalModal 
        isOpen={legalModalOpen}
        initialTab={activeLegalTab}
        onClose={() => setLegalModalOpen(false)}
      />
      <SocialProof />

      {/* Navigation - Adjusted top spacing to clear DayZeroBar */}
      <nav className="fixed top-8 w-full z-50 bg-matte-black/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 cursor-pointer" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth'}); }}>
             <div className="w-8 h-8 bg-electric-teal flex items-center justify-center rounded-sm">
               <Terminal size={18} className="text-black" />
             </div>
             <span className="font-serif font-bold text-lg tracking-tight">The Neutral Bridge</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-sm font-medium text-white/60 hover:text-white transition-colors">The Architect</a>
            <a href="#editions" onClick={(e) => handleNavClick(e, 'editions')} className="text-sm font-medium text-white/60 hover:text-white transition-colors">Analysis</a>
            <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="text-sm font-medium text-white/60 hover:text-white transition-colors">Pricing</a>
            <Button variant="primary" className="h-10 px-6 text-xs" onClick={() => scrollToSection('pricing')}>Order Now</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-matte-black border-b border-white/10 px-6 py-8 flex flex-col gap-6">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-lg font-serif text-left">The Architect</a>
            <a href="#editions" onClick={(e) => handleNavClick(e, 'editions')} className="text-lg font-serif text-left">Analysis</a>
            <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="text-lg font-serif text-left">Pricing</a>
            <Button variant="primary" className="w-full" onClick={() => scrollToSection('pricing')}>Order Now</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-24 overflow-hidden bg-circuit min-h-[90vh] flex flex-col justify-center">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-grey/10 skew-x-12 transform origin-top-right pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left: Copy */}
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-crimson/10 border border-crimson/20 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse"></span>
                <span className="text-[10px] font-mono font-bold text-crimson uppercase tracking-widest">
                  Priority Status: Critical
                </span>
              </div>

              <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8 text-white">
                The Architecture of the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-teal to-white">
                  Next Monetary Era
                </span>
              </h1>

              <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed mb-12">
                An engineering-grade analysis of the "Neutral Bridge" theory—explaining how XRP and Ripple are positioned to facilitate the 2027 global liquidity reset.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button variant="primary" className="min-w-[200px]" onClick={() => scrollToSection('pricing')}>Order Your Copy Now</Button>
                <Button 
                  variant="outline" 
                  className="min-w-[200px] flex gap-2 items-center"
                  onClick={() => setActivePreview('retail')}
                >
                  <BookOpen size={16} /> Read Preview
                </Button>
              </div>
            </div>

            {/* Right: AI Voice Interface */}
            <div className="flex-1 w-full max-w-md lg:max-w-lg relative group">
                {/* Decorative Tech Background */}
                <div className="absolute -inset-1 bg-gradient-to-r from-electric-teal/20 to-transparent blur-xl opacity-20"></div>
                
                <div className="relative bg-black/40 border border-white/10 p-8 backdrop-blur-sm shadow-2xl">
                    <div className="flex flex-col items-center text-center space-y-6">
                        {/* Audio Visualization Ring */}
                        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10 relative">
                             <div className="absolute inset-0 border border-electric-teal/30 rounded-full animate-ping opacity-20"></div>
                             <div className="absolute inset-2 border border-white/5 rounded-full"></div>
                             <Mic size={32} className="text-electric-teal" />
                        </div>
                        
                        <div>
                            <h3 className="text-white font-serif text-2xl mb-2">Secure Voice Uplink</h3>
                            <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
                                Direct neural link to the K. Morgan digital twin. Analyze the $1.97 Death Cross and 2027 Reset data in real-time.
                            </p>
                        </div>

                        <VoiceAssistant className="w-full py-4 text-sm uppercase tracking-widest bg-electric-teal/10 hover:bg-electric-teal/20 border-electric-teal/50 hover:border-electric-teal text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]" />
                        
                        <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-white/5">
                             <div className="text-center">
                                 <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">System Status</div>
                                 <div className="text-electric-teal text-xs font-mono font-bold flex items-center justify-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-electric-teal rounded-full animate-pulse"></div> Online
                                 </div>
                             </div>
                             <div className="text-center">
                                 <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Latency</div>
                                 <div className="text-white text-xs font-mono">12ms</div>
                             </div>
                        </div>
                    </div>
                    
                    {/* Tech Corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-electric-teal"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-electric-teal"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-electric-teal"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-electric-teal"></div>
                </div>
            </div>

          </div>
        </div>
      </header>
      
      {/* Pre-Order Bridge */}
      <PreOrderBridge />

      {/* Value Bar */}
      <div className="bg-charcoal border-y border-white/10 py-4 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2 text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/60">
          <div className="flex items-center gap-2">
            <Check size={12} className="text-electric-teal" /> Rated #1 Financial Manuscript 2026
          </div>
          <span className="hidden md:inline text-white/20">—</span>
          <div className="flex items-center gap-2">
            <Check size={12} className="text-electric-teal" /> Engineering-Grade Systems Analysis
          </div>
          <span className="hidden md:inline text-white/20">—</span>
          <div className="flex items-center gap-2">
            <Check size={12} className="text-electric-teal" /> Secure & Encrypted Checkout
          </div>
        </div>
      </div>

      {/* Reset Countdown & Roadmap */}
      <ResetCountdown />

      {/* Engineering Rigor (Validation) */}
      <EngineeringRigor />

      {/* Chapter 4 Technical Defense */}
      <TechnicalDefense />

      {/* About The Author - Simplified */}
      <Section id="about" className="bg-charcoal border-b border-white/5">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full flex justify-center">
             <div className="relative w-full max-w-sm aspect-[3/4] bg-matte-black border border-white/10 p-2 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
               {/* AUTHOR PORTRAIT UPDATED - Fixed Path */}
               <img 
                 src={`${assetBase}kmorgan.jpg`}
                 alt="K. Morgan Portrait" 
                 className="w-full h-full object-cover grayscale contrast-125"
               />
               <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur border border-white/20 p-4">
                 <h3 className="font-serif text-xl text-white">K. Morgan</h3>
                 <p className="font-mono text-xs text-electric-teal uppercase tracking-widest">Systems Engineer</p>
               </div>
             </div>
          </div>
          <div className="flex-1">
            <h2 className="font-serif text-4xl mb-6">Behind the Analysis</h2>
            <div className="prose prose-invert prose-lg text-white/70 font-light leading-relaxed">
              <p className="mb-6">
                As an engineer and systems analyst, I view the global financial system not as a series of political events, but as a technical infrastructure nearing its limit.
              </p>
              <p className="mb-6">
                My work focuses on the mechanics of liquidity, the transition from legacy rails to digital assets, and the <strong className="text-white">mathematical necessity of a neutral bridge</strong>.
              </p>
              <p>
                The Neutral Bridge series is the culmination of years of research into how the 100-year-old monetary system is being re-engineered for the 21st century.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Strategic Dialogue */}
      <StrategicDialogue />

<Section id="intelligence-gallery" label="Intelligence Exhibits // Forensic Series">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    {/* Exhibit A: Mechanical Bridge */}
    <div className="group relative border border-white/10 p-4 bg-matte-black hover:border-electric-teal/50 transition-all">
      <img src="/the-neutral-bridge-infographic.jpg" alt="Exhibit A" className="w-full grayscale group-hover:grayscale-0 transition-all" />
      <div className="mt-4 flex justify-between items-center font-mono text-[10px]">
        <span className="text-electric-teal">EXHIBIT_01: MECHANICAL BRIDGE</span>
        <span className="text-white/20">REF: NB-2027-ALPHA</span>
      </div>
    </div>

    {/* Exhibit B: Nostro Entanglement */}
    <div className="group relative border border-white/10 p-4 bg-matte-black hover:border-electric-teal/50 transition-all">
      <img src="/infographic.jpg" alt="Exhibit B" className="w-full grayscale group-hover:grayscale-0 transition-all" />
      <div className="mt-4 flex justify-between items-center font-mono text-[10px]">
        <span className="text-electric-teal">EXHIBIT_02: NOSTRO ENTANGLEMENT</span>
        <span className="text-white/20">REF: NB-2027-BETA</span>
      </div>
    </div>

    {/* Exhibit C: New World Mesh */}
    <div className="group relative border border-white/10 p-4 bg-matte-black hover:border-electric-teal/50 transition-all">
      <img src="/infographic-2.jpg" alt="Exhibit C" className="w-full grayscale group-hover:grayscale-0 transition-all" />
      <div className="mt-4 flex justify-between items-center font-mono text-[10px]">
        <span className="text-electric-teal">EXHIBIT_03: STANDARDIZED MESSAGING</span>
        <span className="text-white/20">REF: ISO-20022-GAMMA</span>
      </div>
    </div>

    {/* Exhibit D: Unified Ledger */}
    <div className="group relative border border-white/10 p-4 bg-matte-black hover:border-electric-teal/50 transition-all">
      <img src="/infographic-3.jpg" alt="Exhibit D" className="w-full grayscale group-hover:grayscale-0 transition-all" />
      <div className="mt-4 flex justify-between items-center font-mono text-[10px]">
        <span className="text-electric-teal">EXHIBIT_04: UNIFIED LEDGER SYSTEM</span>
        <span className="text-white/20">REF: NB-SYSTEM-DELTA</span>
      </div>
    </div>
  </div>
</Section>
      
      {/* System Architecture Comparison */}
      <SystemArchitecture />

      {/* Sovereign Map */}
      <SovereignMap />

      {/* Editions Comparison */}
      <Section id="editions" label="Choose Your Perspective">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Retail Edition Card */}
          <div className="bg-gradient-to-br from-matte-black to-slate-grey border border-electric-teal/30 p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group min-h-[300px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric-teal/10 rounded-full blur-3xl group-hover:bg-electric-teal/20 transition-all pointer-events-none"></div>
            
            <div className="flex-1 flex flex-col justify-between z-10 order-2 md:order-1">
              <div>
                <span className="font-mono text-xs text-electric-teal uppercase tracking-widest mb-2 block">Retail Edition</span>
                <h3 className="font-serif text-3xl text-white mb-2 leading-tight">Ripple, XRP, and the <br/>Engineered Reset</h3>
              </div>
              <div className="mt-8">
                <p className="text-sm text-white/60 mb-6">Focus: Asset Preservation</p>
                <Button variant="ghost" className="pl-0 border-b border-electric-teal rounded-none px-0 py-2 h-auto" onClick={() => setActivePreview('retail')}>View Details <ArrowRight size={14} className="ml-2"/></Button>
              </div>
            </div>

            {/* Book Cover Image Slot - Retail UPDATED - Fixed Path */}
            <div className="w-full md:w-40 shrink-0 relative z-10 flex items-center justify-center order-1 md:order-2">
               <div className="relative group-hover:scale-105 transition-transform duration-500 w-full aspect-[2/3] md:w-auto md:h-full">
                 <img 
                   src={`${assetBase}retailedition.jpg`} 
                   alt="The Neutral Bridge Retail Edition Cover" 
                   className="w-full h-full object-cover rounded-sm border border-white/10 shadow-2xl shadow-electric-teal/20" 
                 />
                 <div className="absolute inset-0 bg-electric-teal/20 blur-md -z-10 rounded-sm"></div>
               </div>
            </div>
          </div>

          {/* Institutional Edition Card - Updated Layout */}
          <div className="bg-slate-grey border border-white/10 p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group min-h-[300px]">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all pointer-events-none"></div>
             
             {/* Text Content */}
             <div className="flex-1 flex flex-col justify-between z-10 order-2 md:order-1">
              <div>
                <span className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2 block">Institutional Edition</span>
                <h3 className="font-serif text-3xl text-white mb-2">A Systems Analysis of the <br/>2027 Global Financial Reset</h3>
              </div>
              <div className="mt-8">
                <p className="text-sm text-white/60 mb-6">Focus: System Architecture</p>
                <Button variant="outline" className="border-0 border-b border-white/30 rounded-none px-0 py-2 h-auto justify-start pl-0 hover:bg-transparent" onClick={() => setActivePreview('institutional')}>View Details <ArrowRight size={14} className="ml-2"/></Button>
              </div>
            </div>

            {/* Book Cover Image Slot - Institutional UPDATED - Fixed Path */}
            <div className="w-full md:w-40 shrink-0 relative z-10 flex items-center justify-center order-1 md:order-2">
               <div className="relative group-hover:scale-105 transition-transform duration-500 w-full aspect-[2/3] md:w-auto md:h-full">
                 <img 
                   src={`${assetBase}institutionedition.jpg`}
                   alt="The Neutral Bridge Institutional Edition Cover" 
                   className="w-full h-full object-cover rounded-sm border border-white/10 shadow-2xl shadow-black/50" 
                 />
               </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12">
          <div className="hidden md:grid grid-cols-3 gap-8 mb-6 px-4">
             <div></div>
             <div className="text-electric-teal font-mono text-xs uppercase tracking-widest pl-4">Retail Edition</div>
             <div className="text-white/60 font-mono text-xs uppercase tracking-widest pl-4">Institutional Edition</div>
          </div>
          {comparisonPoints.map((point, idx) => (
            <ComparisonRow key={idx} point={point} isLast={idx === comparisonPoints.length - 1} />
          ))}
        </div>
      </Section>

      {/* Intelligence Tiers */}
      <IntelligenceTiers />

      {/* Readiness Quiz */}
      <Section id="readiness-check" className="bg-matte-black border-y border-white/5 pb-0 pt-0">
        <ReadinessQuiz />
      </Section>

      {/* Value Proposition */}
      <Section id="why" className="bg-charcoal/50">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl mb-4">Precise. Objective. Necessary.</h2>
          <p className="text-white/60">Understanding the reset isn't about hope; it's about engineering logic.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { title: "Systemic Clarity", desc: "We move past the headlines to look at the plumbing of the IMF, BIS, and Central Banks." },
             { title: "Engineering Logic", desc: "No market hype. Only a structural analysis of why the current system requires a 'Neutral Bridge'." },
             { title: "The 2027 Roadmap", desc: "A technical timeline based on ISO 20022 implementation and global liquidity cycles." },
             { title: "Risk Mitigation", desc: "Understand the transition phase of the Global Reset to protect and position your capital." }
           ].map((item, i) => (
             <div key={i} className="bg-matte-black p-8 border border-white/5 hover:border-electric-teal/30 transition-colors">
               <h3 className="font-serif text-xl mb-4 text-white">{item.title}</h3>
               <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </Section>
      
      {/* Bridge Calculator */}
      <Section id="calculator" className="pb-0">
         <BridgeCalculator />
      </Section>

      {/* Pricing */}
      <Section id="pricing" label="Secure Your Intelligence">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>
        
        {/* Institutional Value Bundle Table */}
        <InstitutionalBundle onOpenVault={() => setIsVaultOpen(true)} />

        {/* Price Justification Table */}
        <PriceJustification />
      </Section>

      {/* FAQ Section - Added for Legal/Launch Compliance */}
      <FAQ />

      {/* Testimonials */}
      <Section id="testimonials" className="bg-circuit">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-matte-black/80 backdrop-blur border border-white/10 p-8 relative">
              <div className="text-crimson font-serif text-4xl absolute top-4 left-4 opacity-50">"</div>
              <p className="font-serif italic text-white/80 mb-6 relative z-10 pl-4">{t.quote}</p>
              <div className="flex items-center gap-2 pl-4">
                <div className="w-8 h-[1px] bg-electric-teal"></div>
                <span className="text-xs font-mono uppercase tracking-widest text-white/50">{t.author}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Newsletter */}
      <Section id="newsletter" className="py-20 bg-gradient-to-b from-matte-black to-slate-grey border-t border-white/10">
        <div className="max-w-xl mx-auto text-center px-6">
          <h2 className="font-serif text-3xl mb-2">Stay Ahead of the Reset</h2>
          <p className="text-white/60 mb-8">Join 15,000+ subscribers receiving bi-weekly technical updates.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-electric-teal transition-colors rounded-sm"
            />
            <Button variant="primary">Join The Bridge</Button>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <section className="py-32 text-center px-6 border-t border-white/5 bg-matte-black">
        <div className="inline-block mb-6">
          <span className="font-mono text-crimson text-sm uppercase tracking-[0.2em] font-bold">Jan 18, 2027. The Clock is Ticking.</span>
        </div>
        <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 max-w-4xl mx-auto">
          The Bridge is Being Built. <br/> Will You Be On It?
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto mb-12">
          History shows that those who understand the infrastructure of the new system before it goes live are the ones who thrive.
        </p>
        <Button variant="primary" className="mx-auto min-w-[250px] text-sm" onClick={() => scrollToSection('pricing')}>Order Your Copy Now</Button>
      </section>

      {/* Disclaimer */}
      <div id="legal">
        <Disclaimer />
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16" id="footer">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Terminal size={16} className="text-electric-teal" />
              <span className="font-serif font-bold tracking-tight">The Neutral Bridge</span>
            </div>
            <p className="text-xs text-white/40 font-mono uppercase tracking-wider mb-6">Engineering the Future of Finance</p>
            
            <div className="flex flex-col gap-2 mb-8 text-sm text-white/50 font-sans">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-electric-teal/60" />
                <span>123 Neutral Bridge, Downtown District, City 90210</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-electric-teal/60" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={14} className="mt-0.5 text-electric-teal/60" />
                <div className="flex flex-col">
                  <span>Mon–Fri: 5:00 AM – 11:00 PM</span>
                  <span>Sat–Sun: 7:00 AM – 9:00 PM</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 text-white/40">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-electric-teal transition-colors">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-electric-teal transition-colors">X (Twitter)</a>
            </div>
          </div>

          <div className="flex gap-16 text-sm text-white/60">
            <div className="flex flex-col gap-3">
              <span className="font-bold text-white mb-2">Resources</span>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-white text-left">Shop</button>
              <button onClick={() => scrollToSection('newsletter')} className="hover:text-white text-left">Newsletter</button>
              <button onClick={() => scrollToSection('editions')} className="hover:text-white text-left">Analysis</button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-bold text-white mb-2">Legal</span>
              <button onClick={() => openLegal('privacy')} className="hover:text-white text-left">Privacy Policy</button>
              <button onClick={() => openLegal('terms')} className="hover:text-white text-left">Terms of Service</button>
              <button onClick={() => openLegal('refund')} className="hover:text-white text-left">Refund & Shipping</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-[10px] text-white/20 text-center md:text-left font-sans leading-relaxed">
          <p>The Neutral Bridge is an analytical publication. It does not constitute financial or investment advice.</p>
          <p className="mt-2">© 2026 K. Morgan. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

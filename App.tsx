import React, { useState, useEffect, useRef } from 'react';
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
import { FAQ } from './components/FAQ';
import { LegalModal, LegalTab } from './components/LegalModal';
import { VaultRegistrationModal } from './components/VaultRegistrationModal';
import { VaultPage } from './components/VaultPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import { PricingTier, ComparisonPoint, Testimonial } from './types';
import { getAssetBase } from './utils/assets';
import { trackEvent } from './utils/analytics';
import { ArrowRight, Terminal, Menu, X, MapPin, Mail, BookOpen, Check, Mic, Activity, Loader2, PowerOff, Volume2, VolumeX } from 'lucide-react';

// FORENSIC SCRIPTS FOR DATA LOG TICKER & INTERCEPTS
const EXHIBIT_SCRIPTS: Record<string, string> = {
  greeting: "Uplink confirmed. Identity verified. Welcome, Analyst. You are accessing the secure data layer for The Neutral Bridge. Proceed with objectivity. The clock is ticking.",
  a: "Exhibit Alpha deconstructs the shift from legacy correspondent rails to atomic settlement. By removing the messaging delay, the bridge provides under 3 second finality.",
  b: "Exhibit Beta visualizes the 27 trillion dollar liquidity trap. This pre-funded capital sits dormant in global accounts to facilitate trust. The Neutral Bridge releases this capital via On-Demand Liquidity.",
  c: "Exhibit Gamma detailing the standardized messaging layer. This is the new world mesh. Every packet of data is now rich, structured, and compliant.",
  d: "Forensic analysis of Exhibit Delta confirms system finality. On the Unified Ledger, asset ownership and payment transfer occur simultaneously. This is the end of the settlement risk era.",
  e: "Exhibit Epsilon. At scale, the XRP Ledger functions as the primary liquidity bridge. Infrastructure-grade pricing is required to facilitate 100 trillion dollar volume.",
  f: "Exhibit Zeta. Accessing Protocol 22 specifications. This layer utilizes Zero-Knowledge Proofs to grant institutions absolute privacy while maintaining regulatory view-key access.",
  'Neutral Bridge': "Intercept: Correspondent banking has reached physical limits. We require mathematically neutral settlement rails.",
  'Value Density': "Logic: To move sovereign-scale volume without market instability, high value density is a functional requirement.",
  'Protocol 22': "Reasoning: Solving 'Privacy under Supervision' is the evolutionary pressure that legacy finance cannot ignore.",
  'The Reset Date': "Intercept: Jan 18, 2027. The statutory backstop for the GENIUS Act and the handoff to a vertically integrated system."
};

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePreview, setActivePreview] = useState<'retail' | 'institutional' | null>(null);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isRedemptionOpen, setIsRedemptionOpen] = useState(false);
  
  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'joining' | 'joined'>('idle');

  // Secure Uplink & Forensic Viewer State
  const [isUplinkActive, setIsUplinkActive] = useState(false);
  const [isTerminalLocked, setIsTerminalLocked] = useState(true);
  const [activeExhibit, setActiveExhibit] = useState<string | null>(null);
  const [activeScript, setActiveScript] = useState<string>("");
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Client-Side Routing
  const [currentPath, setCurrentPath] = useState(window.location.hash);
  const scrollMilestones = useRef(new Set<number>());

  // Audio Engine Refs
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const playForensicAudio = (id: string) => {
    if (isAudioMuted) return;
    
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }

    // Handle exhibit- prefix or direct mapping
    const fileName = id.startsWith('exhibit-') ? id : id;
    const audio = new Audio(`/audios/${fileName}.mp3`);
    audioPlayerRef.current = audio;

    // Set Ticker Text
    const scriptKey = id.replace('exhibit-', '');
    setActiveScript(EXHIBIT_SCRIPTS[scriptKey] || EXHIBIT_SCRIPTS['greeting']);

    setIsUplinkActive(true);
    
    audio.play().catch(err => {
      console.warn("Audio blocked:", err);
      setIsUplinkActive(false);
    });

    audio.onended = () => {
      setIsUplinkActive(false);
      audioPlayerRef.current = null;
      if (!activeExhibit) setActiveScript("");
    };
  };

  const handleDisconnect = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    setIsUplinkActive(false);
    setActiveExhibit(null);
    setActiveScript("");
  };

  const handleReasoningHover = (pillarId: string) => {
    if (isAudioMuted || isUplinkActive) return; 
    playForensicAudio(pillarId); 
  };

  const enterTerminal = () => {
    setIsTerminalLocked(false);
    playForensicAudio('greeting');
  };

  const playExhibitBriefing = (exhibitId: string) => {
    setActiveExhibit(exhibitId);
    playForensicAudio(`exhibit-${exhibitId}`);
  };

  const handleVoiceUplinkToggle = () => {
    if (isUplinkActive) {
      handleDisconnect();
    } else {
      playForensicAudio('greeting');
    }
  };

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.hash);
    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, []);

  if (currentPath.includes('#/vault')) return <VaultPage />;
  if (currentPath.includes('#/privacy')) return <PrivacyPolicy />;

  const assetBase = getAssetBase();
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab>('privacy');

  const openLegal = (tab: LegalTab) => {
    setActiveLegalTab(tab);
    setLegalModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  const handleJoinNewsletter = () => {
    setNewsletterStatus('joining');
    setTimeout(() => {
      setNewsletterStatus('joined');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }, 1500);
  };

  const pricingTiers: PricingTier[] = [
    {
      id: 'retail',
      title: 'The Neutral Bridge: Ripple, XRP, and the Engineered Reset of Global Finance',
      subtitle: 'Wealth preservation and the 2027 roadmap.',
      type: 'physical',
      features: ['Asset Preservation Logic', '2027 Timeline Analysis', 'Retail Survival Guide', 'Compatible with all Devices'],
      isRecommended: true,
      variants: [
        { id: 'ebook', label: 'E-Book', price: '$9.99', ctaText: 'Buy Retail', externalUrl: 'https://www.amazon.com/dp/B0GHP8PGCL' },
        { id: 'paperback', label: 'Paperback', price: '$29.99', ctaText: 'Buy Retail', externalUrl: 'https://www.amazon.com/dp/B0GHP8PGCL' }
      ]
    },
    {
      id: 'institutional',
      title: 'The Neutral Bridge: A Systems Analysis of the 2027 Reset of Global Finance',
      subtitle: 'Engineering-grade analysis with raw models.',
      type: 'suite',
      features: ['Serialized Raw Data Appendix', 'Excel-Based Liquidity Model', 'Quarterly Strategy Briefings', 'Priority Analyst Support', 'Snypre System AI Whitelist'],
      requiresAcknowledgement: true,
      variants: [
        { id: 'ebook-inst', label: 'E-Book', price: '$99.99', ctaText: 'Buy Institutional', externalUrl: 'https://www.amazon.com/dp/B0GHRYD6BJ' },
        { id: 'hardcover', label: 'Hardcover', price: '$159.99', ctaText: 'Buy Institutional' }
      ]
    }
  ];

  const comparisonPoints: ComparisonPoint[] = [
    { feature: 'Primary Goal', retail: 'General Strategic Awareness', institutional: 'Forensic Systems Analysis' },
    { feature: 'Target Audience', retail: 'Individual Investors', institutional: 'Risk Committees / Sovereign Funds' },
    { feature: 'Key Frameworks', retail: '2027 Timeline & Macro Logic', institutional: 'The Math of Necessity & Vertical Stack' },
    { feature: 'Privacy Deep Dive', retail: 'Intro to Protocol 22', institutional: 'ZKP Technical Specifications' },
    { feature: 'Verification Kit', retail: 'Summary proof points', institutional: 'Full Technical Appendix (15+ pages)' },
    { feature: 'Acquisition Data', retail: 'High-level overview', institutional: 'Forensic M&A Deconstruction' }
  ];

  const testimonials: Testimonial[] = [
    { quote: "The most sober and technically sound explanation of the XRP ledger's role in global finance I have read to date.", author: "Fintech Analyst" },
    { quote: "Finally, a book that treats the 'Reset' as an engineering challenge rather than a conspiracy theory.", author: "Compliance Officer" },
    { quote: "If you hold XRP, this is your manual. If you don't, this is your warning.", author: "Private Office Fund" }
  ];

  return (
    <div className="min-h-screen font-sans bg-matte-black text-off-white selection:bg-electric-teal selection:text-black pt-12">
      
      {/* GLOBAL FORENSIC STYLES */}
      <style>{`
        @keyframes osc-pulse {
          0%, 100% { height: 4px; opacity: 0.3; }
          50% { height: 32px; opacity: 1; }
        }
        @keyframes ticker-scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .osc-bar {
          width: 3px;
          height: 4px;
          background-color: #00ffcc;
          box-shadow: 0 0 8px rgba(0, 255, 204, 0.4);
        }
        .active-osc .osc-bar {
          animation: osc-pulse 0.8s ease-in-out infinite;
        }
        .osc-bar:nth-child(even) { animation-duration: 0.6s; }
        .osc-bar:nth-child(3n) { animation-duration: 1.1s; }
        .ticker-wrap {
          width: 100%;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.9);
          border-top: 1px solid rgba(0, 255, 204, 0.3);
          position: fixed;
          bottom: 0;
          left: 0;
          z-index: 250;
          padding: 12px 0;
          backdrop-blur: 10px;
        }
        .ticker-content {
          white-space: nowrap;
          display: inline-block;
          animation: ticker-scroll 30s linear infinite;
          font-family: monospace;
          color: #00ffcc;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          font-size: 10px;
          font-weight: bold;
        }
      `}</style>

      {/* FULLSCREEN EXHIBIT VIEWER */}
      {activeExhibit && (
        <div className="fixed inset-0 z-[300] bg-black/98 flex flex-col items-center justify-center p-6 backdrop-blur-3xl">
          <button 
            onClick={handleDisconnect} 
            className="absolute top-8 right-8 text-white/40 hover:text-crimson transition-all border border-white/10 rounded-full p-2 hover:bg-white/5 z-[320]"
          >
            <X size={48} />
          </button>

          <div className="max-w-6xl w-full flex flex-col items-center gap-6">
            <img 
              src={`exhibit-${activeExhibit}.jpg`} 
              alt="Enlarged Forensic Evidence" 
              className="w-full h-auto max-h-[75vh] object-contain border border-white/10 shadow-[0_0_100px_rgba(0,255,204,0.2)] rounded-sm"
            />
            
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-1 active-osc h-10">
                {[...Array(40)].map((_, i) => <div key={i} className="osc-bar" />)}
              </div>
              <p className="font-mono text-[10px] text-electric-teal uppercase tracking-[0.5em] animate-pulse">
                Transmitting_Forensic_Data_Log: 0{activeExhibit}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DATA LOG TICKER */}
      {activeScript && (
        <div className="ticker-wrap">
          <div className="ticker-content">
            {activeScript} • SYSTEM_STATUS: SECURE • DATA_VELOCITY: 4.2GB/S • UPLINK_STRENGTH: 98% • {activeScript}
          </div>
        </div>
      )}

      {/* TERMINAL LOCK OVERLAY */}
      {isTerminalLocked && (
        <div className="fixed inset-0 z-[100] bg-matte-black flex items-center justify-center p-6 backdrop-blur-xl">
            <div className="max-w-md w-full border border-white/10 bg-black p-10 text-center relative group">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-electric-teal"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-electric-teal"></div>
                <Terminal className="mx-auto text-electric-teal mb-6 animate-pulse" size={48} />
                <h1 className="font-serif text-3xl text-white mb-2">The Neutral Bridge</h1>
                <h2 className="font-mono text-xs text-electric-teal mb-6 uppercase tracking-widest">Secure Uplink Detected</h2>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.3em] mb-8 leading-relaxed">
                    Encryption: AES-256 // Protocol: 22 <br/> Identity Verification Required
                </p>
                <button onClick={enterTerminal} className="w-full bg-electric-teal text-black font-mono font-bold py-4 px-8 rounded-sm hover:bg-white transition-all duration-300 uppercase tracking-widest text-xs">
                    [AUTHORIZE_AND_ENTER]
                </button>
            </div>
        </div>
      )}

      {/* OVERLAYS */}
      <div className="fixed top-0 left-0 right-0 z-[60]"><DayZeroBar /></div>
      <PreviewReader isOpen={activePreview !== null} edition={activePreview} onClose={() => setActivePreview(null)} onOrder={() => { setActivePreview(null); scrollToSection('pricing'); }} />
      <IntelligenceVault isOpen={isVaultOpen} onClose={() => setIsVaultOpen(false)} />
      <VaultRegistrationModal isOpen={isRedemptionOpen} onClose={() => setIsRedemptionOpen(false)} />
      <LegalModal isOpen={legalModalOpen} initialTab={activeLegalTab} onClose={() => setLegalModalOpen(false)} />
      <SocialProof />

      {/* Nav */}
      <nav className="fixed top-8 w-full z-50 bg-matte-black/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 cursor-pointer" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth'}); }}>
             <div className="w-8 h-8 bg-electric-teal flex items-center justify-center rounded-sm"><Terminal size={18} className="text-black" /></div>
             <div>
                <span className="font-serif font-bold text-lg tracking-tight block leading-none">The Neutral Bridge</span>
                <span className="font-mono text-[9px] text-electric-teal uppercase tracking-wider block mt-1">Launch: Feb 18, 2026</span>
             </div>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setIsAudioMuted(!isAudioMuted)} 
              className="text-white/40 hover:text-white transition-colors flex items-center gap-2"
              title={isAudioMuted ? "Unmute Feed" : "Mute Feed"}
            >
              {isAudioMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              <span className="font-mono text-[10px] uppercase tracking-widest">{isAudioMuted ? 'Muted' : 'Live Feed'}</span>
            </button>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-sm font-medium text-white/60 hover:text-white transition-colors">The Architect</a>
            <a href="#editions" onClick={(e) => handleNavClick(e, 'editions')} className="text-sm font-medium text-white/60 hover:text-white transition-colors">Analysis</a>
            <Button variant="primary" className="h-10 px-6 text-xs" onClick={() => scrollToSection('pricing')}>Order Now</Button>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-24 overflow-hidden bg-circuit min-h-[90vh] flex flex-col justify-center">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-grey/10 skew-x-12 transform origin-top-right pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-crimson/10 border border-crimson/20 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse"></span>
                <span className="text-[10px] font-mono font-bold text-crimson uppercase tracking-widest">Priority Status: Critical</span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8 text-white">
                The Neutral Bridge <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-teal to-white">Ripple, XRP, and the Engineered Reset</span>
              </h1>
              <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed mb-12">An engineering-grade analysis of the "Neutral Bridge" theory—explaining how XRP and Ripple are positioned to facilitate the 2027 global liquidity reset.</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button variant="primary" className="min-w-[200px]" onClick={() => scrollToSection('pricing')}>Order Your Copy Now</Button>
                <Button variant="outline" className="min-w-[200px] flex gap-2 items-center" onClick={() => setActivePreview('retail')}><BookOpen size={16} /> Read Preview</Button>
              </div>
            </div>

            {/* Hero Interface */}
            <div className="flex-1 w-full max-w-md lg:max-w-lg relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-electric-teal/20 to-transparent blur-xl opacity-20"></div>
                <div className="relative bg-black/40 border border-white/10 p-8 backdrop-blur-sm shadow-2xl text-center">
                    <button onClick={handleDisconnect} className="absolute top-4 right-4 text-white/20 hover:text-crimson transition-colors p-1" title="Disconnect Uplink"><PowerOff size={14} /></button>
                    <div className="flex flex-col items-center space-y-6">
                        <button onClick={handleVoiceUplinkToggle} className={`w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10 relative transition-all duration-300 group/mic ${isUplinkActive ? 'scale-110 border-electric-teal shadow-[0_0_30px_rgba(56,189,248,0.4)]' : 'hover:scale-105 hover:border-white/30'}`}>
                             <div className={`absolute inset-0 border border-electric-teal/30 rounded-full ${isUplinkActive ? 'animate-ping opacity-60' : 'opacity-0'}`}></div>
                             {isUplinkActive ? <Activity size={32} className="text-electric-teal animate-bounce" /> : <Mic size={32} className="text-electric-teal group-hover/mic:scale-110" />}
                        </button>
                        <div className="w-full">
                            <h3 className="text-white font-serif text-2xl mb-4">Secure Voice Uplink</h3>
                            <div className="flex items-center justify-center gap-1 h-8 active-osc">
                                {isUplinkActive && [...Array(12)].map((_, i) => <div key={i} className="osc-bar" />)}
                            </div>
                            <div className="w-full py-3 px-4 bg-white/5 border border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] flex items-center justify-center gap-2 mt-4">
                                <Activity size={12} className={isUplinkActive ? 'text-electric-teal animate-bounce' : 'text-white/20'} />
                                {isUplinkActive ? "UPLINK ACTIVE // TRANSMITTING" : "SECURE UPLINK READY"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </header>

      <PreOrderBridge />

      <ResetCountdown />
      <EngineeringRigor />
      
      {/* CHAPTER HOVER SYSTEM PILLARS */}
      <section className="bg-charcoal/30 py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { id: 'Neutral Bridge', title: "Systemic Clarity", desc: "We move past the headlines to look at the plumbing of the IMF, BIS, and Central Banks." },
             { id: 'Value Density', title: "Engineering Logic", desc: "No market hype. Only a structural analysis of why the system requires a 'Neutral Bridge'." },
             { id: 'The Reset Date', title: "The 2027 Roadmap", desc: "A technical timeline based on ISO 20022 implementation and global liquidity cycles." },
             { id: 'Protocol 22', title: "Risk Mitigation", desc: "Understand the transition phase of the Global Reset to protect and position your capital." }
           ].map((item) => (
             <div 
               key={item.id} 
               className="bg-matte-black p-8 border border-white/5 hover:border-electric-teal/50 transition-all cursor-help relative group"
               onMouseEnter={() => handleReasoningHover(item.id)}
             >
               <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Activity size={12} className="text-electric-teal animate-pulse" />
               </div>
               <h3 className="font-serif text-xl mb-4 text-white">{item.title}</h3>
               <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <TechnicalDefense onOrder={() => scrollToSection('pricing')} onRead={() => setActivePreview('institutional')} />

      <Section id="about" className="bg-charcoal border-b border-white/5">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full flex justify-center">
             <div className="relative w-full max-w-sm aspect-[3/4] bg-matte-black border border-white/10 p-2 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
               <img src={`${assetBase}kmorgan.jpg`} alt="K. Morgan" className="w-full h-full object-cover grayscale contrast-125" />
               <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur border border-white/20 p-4">
                 <h3 className="font-serif text-xl text-white">K. Morgan</h3>
                 <p className="font-mono text-xs text-electric-teal uppercase tracking-widest">Systems Engineer</p>
               </div>
             </div>
          </div>
          <div className="flex-1">
            <h2 className="font-serif text-4xl mb-6 text-white">Behind the Analysis</h2>
            <div className="prose prose-invert prose-lg text-white/70 font-light leading-relaxed">
              <p className="mb-6">As an engineer and systems analyst, I view the global financial system not as a series of political events, but as a technical infrastructure nearing its limit.</p>
              <p className="mb-6">My work focuses on the mechanics of liquidity, the transition from legacy rails to digital assets, and the <strong className="text-white">mathematical necessity of a neutral bridge</strong>.</p>
              <p>The Neutral Bridge series is the culmination of years of research into how the 100-year-old monetary system is being re-engineered for the 21st century.</p>
            </div>
          </div>
        </div>
      </Section>

      <StrategicDialogue />

      <Section id="intelligence-gallery" label="Intelligence Exhibits // Forensic Series">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {['a', 'b', 'c', 'd', 'e', 'f'].map((ex) => (
            <div key={ex} className="group relative border border-white/10 p-4 bg-matte-black hover:border-electric-teal/50 transition-all cursor-crosshair" onClick={() => playExhibitBriefing(ex)}>
              <img src={`exhibit-${ex}.jpg`} alt={`Exhibit ${ex}`} className="w-full grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="mt-4 flex justify-between items-center font-mono text-[10px]">
                <span className="text-electric-teal uppercase">Exhibit_0{ex}: Forensic Data Log</span>
                <span className="text-white/20">ACCESS_AUDIO_LOG</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <SystemArchitecture />
      <SovereignMap />

      <Section id="editions" label="Choose Your Perspective">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-matte-black to-slate-grey border border-electric-teal/30 p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group min-h-[300px]">
            <div className="flex-1 flex flex-col justify-between z-10 order-2 md:order-1 text-left">
              <div><span className="font-mono text-xs text-electric-teal uppercase tracking-widest mb-2 block">Retail Edition</span><h3 className="font-serif text-3xl text-white mb-2 leading-tight">Ripple, XRP, and the <br/>Engineered Reset</h3></div>
              <Button variant="ghost" className="pl-0 border-b border-electric-teal rounded-none px-0 py-2 h-auto text-left" onClick={() => setActivePreview('retail')}>View Details <ArrowRight size={14} className="ml-2"/></Button>
            </div>
            <div className="w-full md:w-40 shrink-0 relative flex items-center justify-center order-1 md:order-2">
                <img src={`${assetBase}retailedition.jpg`} alt="Retail" className="w-full h-full object-cover rounded-sm border border-white/10 shadow-2xl" />
            </div>
          </div>
          <div className="bg-slate-grey border border-white/10 p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group min-h-[300px]">
            <div className="flex-1 flex flex-col justify-between z-10 order-2 md:order-1 text-left">
              <div><span className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2 block">Institutional Edition</span><h3 className="font-serif text-3xl text-white mb-2">A Systems Analysis of the <br/>2027 Global Financial Reset</h3></div>
              <Button variant="outline" className="border-0 border-b border-white/30 rounded-none px-0 py-2 h-auto text-left hover:bg-transparent" onClick={() => setActivePreview('institutional')}>View Details <ArrowRight size={14} className="ml-2"/></Button>
            </div>
            <div className="w-full md:w-40 shrink-0 relative flex items-center justify-center order-1 md:order-2">
                <img src={`${assetBase}institutionedition.jpg`} alt="Institutional" className="w-full h-full object-cover rounded-sm border border-white/10 shadow-2xl" />
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-12">
          {comparisonPoints.map((point, idx) => (
            <ComparisonRow key={idx} point={point} isLast={idx === comparisonPoints.length - 1} />
          ))}
        </div>
      </Section>

      <IntelligenceTiers />
      <ReadinessQuiz />
      <BridgeCalculator />

      <Section id="pricing" label="Secure Your Intelligence">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          {pricingTiers.map((tier) => <PricingCard key={tier.id} tier={tier} />)}
        </div>
        <InstitutionalBundle onOpenVault={() => setIsVaultOpen(true)} onRedeem={() => setIsRedemptionOpen(true)} />
        <PriceJustification />
      </Section>

      <FAQ />

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

      <footer className="bg-black border-t border-white/10 py-24 mb-16" id="footer">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6"><Terminal size={16} className="text-electric-teal" /><span className="font-serif font-bold tracking-tight text-white text-xl">The Neutral Bridge</span></div>
            <div className="flex flex-col gap-2 text-sm text-white/50">
              <div className="flex items-center gap-2"><span>Location: United States (Remote)</span></div>
              <div className="flex items-center gap-2"><a href="mailto:inquiries@theneutralbridge.com" className="hover:text-white">inquiries@theneutralbridge.com</a></div>
            </div>
          </div>
          <div className="flex gap-16 text-sm text-white/60">
            <div className="flex flex-col gap-3">
              <span className="font-bold text-white mb-2 uppercase tracking-widest text-xs">Resources</span>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-white text-left">Shop</button>
              <button onClick={() => scrollToSection('editions')} className="hover:text-white text-left">Analysis</button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-bold text-white mb-2 uppercase tracking-widest text-xs">Legal</span>
              <button onClick={() => openLegal('terms')} className="hover:text-white text-left">Terms of Service</button>
              <button onClick={() => { window.location.hash = '#/privacy'; window.location.reload(); }} className="hover:text-white text-left">Privacy Policy</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-[10px] text-white/20 text-center md:text-left leading-relaxed">
          <p>The Neutral Bridge is an analytical publication. It does not constitute financial or investment advice.</p>
          <p className="mt-2">© 2026 K. Morgan. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

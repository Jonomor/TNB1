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
import { ArrowRight, Terminal, Menu, X, MapPin, Mail, BookOpen, Check, Mic, Activity, Loader2, PowerOff } from 'lucide-react';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePreview, setActivePreview] = useState<'retail' | 'institutional' | null>(null);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isRedemptionOpen, setIsRedemptionOpen] = useState(false);
  
  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'joining' | 'joined'>('idle');

  // Secure Uplink State
  const [isUplinkActive, setIsUplinkActive] = useState(false);
  const [isTerminalLocked, setIsTerminalLocked] = useState(true);

  // Client-Side Routing
  const [currentPath, setCurrentPath] = useState(window.location.hash);
  const scrollMilestones = useRef(new Set<number>());

  // --- NEW FORENSIC AUDIO ENGINE ---
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const playForensicAudio = (fileName: string) => {
    // 1. Stop current audio immediately
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }

    // 2. Initialize new audio from the public/audios folder
    const audio = new Audio(`/audios/${fileName}.mp3`);
    audioPlayerRef.current = audio;

    // 3. Update Global Uplink State
    setIsUplinkActive(true);
    
    audio.play().catch(err => {
      console.warn("Forensic playback prevented by browser policy. Interaction required.", err);
      setIsUplinkActive(false);
    });

    // 4. Reset UI when briefing ends
    audio.onended = () => {
      setIsUplinkActive(false);
      audioPlayerRef.current = null;
    };
  };

  const handleDisconnect = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    setIsUplinkActive(false);
    trackEvent('uplink_disconnect', { category: 'System', label: 'Manual Kill Switch' });
  };

  // --- UPDATED LOGIC TRIGGERS ---
  const enterTerminal = () => {
    setIsTerminalLocked(false);
    playForensicAudio('greeting');
    trackEvent('terminal_entry', { category: 'System', label: 'Uplink Authorized' });
  };

  const playExhibitBriefing = (exhibitId: string) => {
    playForensicAudio(`exhibit-${exhibitId}`);
    trackEvent('exhibit_briefing_played', { category: 'Forensics', label: exhibitId });
  };

  // Uplink Button logic (Hero section)
  const handleVoiceUplinkToggle = () => {
    if (isUplinkActive) {
      handleDisconnect();
    } else {
      playForensicAudio('greeting'); // Or a specific main briefing file
    }
  };

  // Standard Logic Effects
  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Routing
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

  // Static Data
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
      
      {/* ENTER TERMINAL LOCK OVERLAY */}
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

      {/* GLOBAL OVERLAYS */}
      <div className="fixed top-0 left-0 right-0 z-[60]"><DayZeroBar /></div>
      <PreviewReader isOpen={activePreview !== null} edition={activePreview} onClose={() => setActivePreview(null)} onOrder={() => { setActivePreview(null); scrollToSection('pricing'); }} />
      <IntelligenceVault isOpen={isVaultOpen} onClose={() => setIsVaultOpen(false)} />
      <VaultRegistrationModal isOpen={isRedemptionOpen} onClose={() => setIsRedemptionOpen(false)} />
      <LegalModal isOpen={legalModalOpen} initialTab={activeLegalTab} onClose={() => setLegalModalOpen(false)} />
      <SocialProof />

      {/* Navigation */}
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
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-sm font-medium text-white/60 hover:text-white transition-colors">The Architect</a>
            <a href="#editions" onClick={(e) => handleNavClick(e, 'editions')} className="text-sm font-medium text-white/60 hover:text-white transition-colors">Analysis</a>
            <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="text-sm font-medium text-white/60 hover:text-white transition-colors">Pricing</a>
            <Button variant="primary" className="h-10 px-6 text-xs" onClick={() => scrollToSection('pricing')}>Order Now</Button>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      {/* Hero Section */}
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

            {/* Right: Forensic Audio Interface */}
            <div className="flex-1 w-full max-w-md lg:max-w-lg relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-electric-teal/20 to-transparent blur-xl opacity-20"></div>
                <div className="relative bg-black/40 border border-white/10 p-8 backdrop-blur-sm shadow-2xl">
                    <button onClick={handleDisconnect} className="absolute top-4 right-4 text-white/20 hover:text-crimson transition-colors p-1" title="Disconnect Uplink"><PowerOff size={14} /></button>
                    <div className="flex flex-col items-center text-center space-y-6">
                        <button onClick={handleVoiceUplinkToggle} className={`w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10 relative transition-all duration-300 group/mic ${isUplinkActive ? 'scale-110 border-electric-teal shadow-[0_0_30px_rgba(56,189,248,0.4)]' : 'hover:scale-105 hover:border-white/30'}`}>
                             <div className={`absolute inset-0 border border-electric-teal/30 rounded-full ${isUplinkActive ? 'animate-ping opacity-60' : 'opacity-0'}`}></div>
                             {isUplinkActive ? <Activity size={32} className="text-electric-teal animate-bounce" /> : <Mic size={32} className="text-electric-teal group-hover/mic:scale-110" />}
                        </button>
                        <div className="w-full">
                            <h3 className="text-white font-serif text-2xl mb-4">Secure Voice Uplink</h3>
                            <div className="w-full py-3 px-4 bg-white/5 border border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
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
      <TechnicalDefense onOrder={() => scrollToSection('pricing')} onRead={() => setActivePreview('institutional')} />

      {/* Exhibits Grid */}
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

      {/* Editions */}
      <Section id="editions" label="Choose Your Perspective">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Retail */}
          <div className="bg-gradient-to-br from-matte-black to-slate-grey border border-electric-teal/30 p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group min-h-[300px]">
            <div className="flex-1 flex flex-col justify-between z-10 order-2 md:order-1">
              <div><span className="font-mono text-xs text-electric-teal uppercase tracking-widest mb-2 block">Retail Edition</span><h3 className="font-serif text-3xl text-white mb-2 leading-tight">Ripple, XRP, and the <br/>Engineered Reset</h3></div>
              <Button variant="ghost" className="pl-0 border-b border-electric-teal rounded-none px-0 py-2 h-auto" onClick={() => setActivePreview('retail')}>View Details <ArrowRight size={14} className="ml-2"/></Button>
            </div>
            <div className="w-full md:w-40 shrink-0 relative z-10 flex items-center justify-center order-1 md:order-2">
                <img src={`${assetBase}retailedition.jpg`} alt="Retail Cover" className="w-full h-full object-cover rounded-sm border border-white/10 shadow-2xl" />
            </div>
          </div>
          {/* Institutional */}
          <div className="bg-slate-grey border border-white/10 p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group min-h-[300px]">
            <div className="flex-1 flex flex-col justify-between z-10 order-2 md:order-1">
              <div><span className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2 block">Institutional Edition</span><h3 className="font-serif text-3xl text-white mb-2">A Systems Analysis of the <br/>2027 Global Financial Reset</h3></div>
              <Button variant="outline" className="border-0 border-b border-white/30 rounded-none px-0 py-2 h-auto justify-start pl-0 hover:bg-transparent" onClick={() => setActivePreview('institutional')}>View Details <ArrowRight size={14} className="ml-2"/></Button>
            </div>
            <div className="w-full md:w-40 shrink-0 relative z-10 flex items-center justify-center order-1 md:order-2">
                <img src={`${assetBase}institutionedition.jpg`} alt="Institutional Cover" className="w-full h-full object-cover rounded-sm border border-white/10 shadow-2xl" />
            </div>
          </div>
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
      <footer className="bg-black border-t border-white/10 py-16" id="footer">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6"><Terminal size={16} className="text-electric-teal" /><span className="font-serif font-bold tracking-tight">The Neutral Bridge</span></div>
            <div className="flex flex-col gap-2 mb-8 text-sm text-white/50 font-sans">
              <div className="flex items-center gap-2"><MapPin size={14} className="text-electric-teal/60" /><span>Location: United States (Remote)</span></div>
              <div className="flex items-center gap-2"><Mail size={14} className="text-electric-teal/60" /><a href="mailto:inquiries@theneutralbridge.com" className="hover:text-white">inquiries@theneutralbridge.com</a></div>
            </div>
          </div>
          <div className="flex gap-16 text-sm text-white/60">
            <div className="flex flex-col gap-3">
              <span className="font-bold text-white mb-2">Resources</span>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-white text-left">Shop</button>
              <button onClick={() => scrollToSection('newsletter')} className="hover:text-white text-left">Newsletter</button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-bold text-white mb-2">Legal</span>
              <button onClick={() => openLegal('terms')} className="hover:text-white text-left">Terms of Service</button>
              <button onClick={() => { window.location.hash = '#/privacy'; window.location.reload(); }} className="hover:text-white text-left">Privacy Policy</button>
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

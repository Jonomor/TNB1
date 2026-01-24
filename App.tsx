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
import { PricingTier, ComparisonPoint, Testimonial } from './types';
import { getAssetBase } from './utils/assets';
import { trackEvent } from './utils/analytics';
import { ArrowRight, Terminal, Menu, X, Clock, MapPin, Mail, BookOpen, Check, Mic, Activity, Loader2, Cpu } from 'lucide-react';

const App: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [view, setView] = useState<'home' | 'vault'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePreview, setActivePreview] = useState<'retail' | 'institutional' | null>(null);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isRedemptionOpen, setIsRedemptionOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'joining' | 'joined'>('idle');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const scrollMilestones = useRef(new Set<number>());

  // --- ROUTING & EVENTS ---
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      if (!window.location.pathname.includes('/vault')) {
        setView('home');
      }
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = Math.round((scrolled / height) * 100);
      [25, 50, 75, 90, 100].forEach(milestone => {
        if (percentage >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          trackEvent('scroll_milestone', { category: 'Engagement', label: `${milestone}% Depth` });
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- ASSET & MODAL HELPERS ---
  const assetBase = getAssetBase();
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab>('privacy');

  const openLegal = (tab: LegalTab) => {
    setActiveLegalTab(tab);
    setLegalModalOpen(true);
    trackEvent('view_legal', { category: 'Legal', label: tab });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); }
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

  // --- DATA DEFINITIONS ---
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
    { quote: "The most sober and technically sound explanation of the XRP ledger's role in global finance.", author: "Fintech Analyst" },
    { quote: "Treats the 'Reset' as an engineering challenge rather than a conspiracy theory.", author: "Compliance Officer" },
    { quote: "If you hold XRP, this is your manual.", author: "Private Office Fund" }
  ];

  // --- RENDER LOGIC ---
  if (view === 'vault' || currentPath.toLowerCase().includes('/vault')) {
    return <VaultPage />;
  }

  return (
    <div className="min-h-screen font-sans bg-matte-black text-off-white selection:bg-electric-teal selection:text-black pt-12">
      <div className="fixed top-0 left-0 right-0 z-[60]"><DayZeroBar /></div>
      
      {/* OVERLAYS */}
      <PreviewReader isOpen={activePreview !== null} edition={activePreview} onClose={() => setActivePreview(null)} onOrder={() => { setActivePreview(null); scrollToSection('pricing'); }} />
      <IntelligenceVault isOpen={isVaultOpen} onClose={() => setIsVaultOpen(false)} />
      <VaultRegistrationModal isOpen={isRedemptionOpen} onClose={() => setIsRedemptionOpen(false)} />
      <LegalModal isOpen={legalModalOpen} initialTab={activeLegalTab} onClose={() => setLegalModalOpen(false)} />
      <SocialProof />

      {/* NAVIGATION */}
      <nav className="fixed top-8 w-full z-50 bg-matte-black/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth'}); }}>
            <div className="w-8 h-8 bg-electric-teal flex items-center justify-center rounded-sm"><Terminal size={18} className="text-black" /></div>
            <div>
              <span className="font-serif font-bold text-lg tracking-tight block leading-none">The Neutral Bridge</span>
              <span className="font-mono text-[9px] text-electric-teal uppercase tracking-wider block mt-1">Launch: Feb 18, 2026</span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-sm font-medium text-white/60 hover:text-white">The Architect</a>
            <a href="#editions" onClick={(e) => handleNavClick(e, 'editions')} className="text-sm font-medium text-white/60 hover:text-white">Analysis</a>
            <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="text-sm font-medium text-white/60 hover:text-white">Pricing</a>
            <Button variant="primary" className="h-10 px-6 text-xs" onClick={() => scrollToSection('pricing')}>Order Now</Button>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-matte-black border-b border-white/10 px-6 py-8 flex flex-col gap-6 text-left">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-lg font-serif">The Architect</a>
            <a href="#editions" onClick={(e) => handleNavClick(e, 'editions')} className="text-lg font-serif">Analysis</a>
            <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="text-lg font-serif">Pricing</a>
            <Button variant="primary" className="w-full" onClick={() => scrollToSection('pricing')}>Order Now</Button>
          </div>
        )}
      </nav>

      {/* HERO */}
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
                The Architecture of the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-teal to-white">Next Monetary Era</span>
              </h1>
              <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed mb-12">Engineering-grade analysis explaining how XRP facilitates the 2027 global liquidity reset.</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button variant="primary" className="min-w-[200px]" onClick={() => scrollToSection('pricing')}>Order Now</Button>
                <Button variant="outline" className="min-w-[200px] flex gap-2 items-center" onClick={() => setActivePreview('retail')}><BookOpen size={16} /> Read Preview</Button>
              </div>
            </div>
            {/* AI VOICE INTERFACE */}
            <div className="flex-1 w-full max-w-md lg:max-w-lg relative group">
              <div className="relative bg-black/40 border border-white/10 p-8 backdrop-blur-sm shadow-2xl">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10 relative">
                    <div className="absolute inset-0 border border-electric-teal/30 rounded-full animate-ping opacity-20"></div>
                    <Mic size={32} className="text-electric-teal" />
                  </div>
                  <div>
                    <h3 className="text-white font-serif text-2xl mb-2">Secure Voice Uplink</h3>
                    <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">Analyze the 2027 Reset data in real-time via neural digital twin.</p>
                  </div>
                  <div className="w-full py-3 px-4 bg-white/5 border border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Link Encrypted — Institutional Access Only</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <PreOrderBridge />

      <div className="bg-charcoal border-y border-white/10 py-4 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-8 text-[10px] font-mono uppercase tracking-widest text-white/60">
          <div className="flex items-center gap-2"><Check size={12} className="text-electric-teal" /> Rated #1 Financial Manuscript 2026</div>
          <div className="flex items-center gap-2"><Check size={12} className="text-electric-teal" /> Engineering-Grade Systems Analysis</div>
          <div className="flex items-center gap-2"><Check size={12} className="text-electric-teal" /> Secure & Encrypted Checkout</div>
        </div>
      </div>

      <ResetCountdown />
      <EngineeringRigor />
      <TechnicalDefense onOrder={() => scrollToSection('pricing')} onRead={() => setActivePreview('institutional')} />

      <Section id="about" className="bg-charcoal border-b border-white/5">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full flex justify-center">
            <div className="relative w-full max-w-sm aspect-[3/4] bg-matte-black border border-white/10 p-2 shadow-2xl rotate-2">
              <img src={`${assetBase}kmorgan.jpg`} alt="K. Morgan" className="w-full h-full object-cover grayscale" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur border border-white/20 p-4">
                <h3 className="font-serif text-xl text-white">K. Morgan</h3>
                <p className="font-mono text-xs text-electric-teal uppercase tracking-widest">Systems Engineer</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-serif text-4xl mb-6">Behind the Analysis</h2>
            <div className="prose prose-invert prose-lg text-white/70 leading-relaxed">
              <p className="mb-6">I view the financial system as technical infrastructure nearing its limit.</p>
              <p>Researching the transition from legacy rails to the <strong className="text-white">mathematical necessity of a neutral bridge</strong>.</p>
            </div>
          </div>
        </div>
      </Section>

      <StrategicDialogue />

      <Section id="intelligence-gallery" label="Intelligence Exhibits // Forensic Series">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {['a', 'b', 'c', 'd', 'e', 'f'].map((ex, i) => (
            <div key={i} className="group border border-white/10 p-4 bg-matte-black hover:border-electric-teal/50 transition-all">
              <img src={`exhibit-${ex}.jpg`} className="w-full grayscale group-hover:grayscale-0" alt={`Exhibit ${ex}`} />
              <div className="mt-4 flex justify-between font-mono text-[10px]">
                <span className="text-electric-teal uppercase">Exhibit_{i+1}</span>
                <span className="text-white/20">REF: NB-2027</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <SystemArchitecture />
      <SovereignMap />

      <Section id="editions" label="Choose Your Perspective">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* RETAIL CARD */}
          <div className="bg-gradient-to-br from-matte-black to-slate-grey border border-electric-teal/30 p-8 flex flex-col md:flex-row gap-6 group">
            <div className="flex-1 flex flex-col justify-between">
              <div><h3 className="font-serif text-3xl text-white">Retail Edition</h3></div>
              <Button variant="ghost" className="border-b border-electric-teal h-auto p-0 rounded-none w-fit" onClick={() => setActivePreview('retail')}>View Details <ArrowRight size={14} className="ml-2"/></Button>
            </div>
            <div className="w-40 h-60 shrink-0"><img src={`${assetBase}retailedition.jpg`} className="w-full h-full object-cover shadow-2xl" /></div>
          </div>
          {/* INSTITUTIONAL CARD */}
          <div className="bg-slate-grey border border-white/10 p-8 flex flex-col md:flex-row gap-6 group">
            <div className="flex-1 flex flex-col justify-between">
              <div><h3 className="font-serif text-3xl text-white">Institutional Edition</h3></div>
              <Button variant="outline" className="border-0 border-b border-white/30 h-auto p-0 rounded-none w-fit" onClick={() => setActivePreview('institutional')}>View Details <ArrowRight size={14} className="ml-2"/></Button>
            </div>
            <div className="w-40 h-60 shrink-0"><img src={`${assetBase}institutionedition.jpg`} className="w-full h-full object-cover shadow-2xl" /></div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-12">
          {comparisonPoints.map((point, idx) => <ComparisonRow key={idx} point={point} isLast={idx === comparisonPoints.length - 1} />)}
        </div>
      </Section>

      <IntelligenceTiers />
      <ReadinessQuiz />
      <BridgeCalculator />

      <Section id="pricing" label="Secure Your Intelligence">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto mb-20">
          {pricingTiers.map((tier) => <PricingCard key={tier.id} tier={tier} />)}
        </div>
        <InstitutionalBundle 
          onOpenVault={() => {
            setView('vault');
            window.history.pushState({}, '', '/TNB1/vault');
            window.scrollTo(0, 0);
          }}
          onRedeem={() => setIsRedemptionOpen(true)}
        />
        <PriceJustification />
      </Section>

      <FAQ />

      {/* TESTIMONIALS */}
      <Section id="testimonials" className="bg-circuit">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-matte-black/80 p-8 border border-white/10 relative">
              <p className="font-serif italic text-white/80 mb-6 pl-4">"{t.quote}"</p>
              <span className="text-xs font-mono uppercase text-white/50 pl-4">— {t.author}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="newsletter" className="py-20 bg-gradient-to-b from-matte-black to-slate-grey border-t border-white/10 text-center">
        <h2 className="font-serif text-3xl mb-8">Stay Ahead of the Reset</h2>
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input type="email" placeholder="Email Address" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} className="flex-1 bg-black border border-white/20 px-4 py-3" />
          <Button variant="primary" onClick={handleJoinNewsletter} disabled={newsletterStatus !== 'idle'}>{newsletterStatus === 'joined' ? "Access Granted" : "Join The Bridge"}</Button>
        </div>
      </Section>

      <section className="py-32 text-center px-6 bg-matte-black">
        <h2 className="font-serif text-4xl md:text-6xl text-white mb-8">The Bridge is Being Built. Will You Be On It?</h2>
        <Button variant="primary" className="min-w-[250px]" onClick={() => scrollToSection('pricing')}>Order Now</Button>
      </section>

      <Disclaimer />

      <footer className="bg-black border-t border-white/10 py-16 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6"><Terminal size={16} className="text-electric-teal" /><span className="font-serif font-bold">The Neutral Bridge</span></div>
            <div className="text-sm text-white/50 space-y-2">
              <div className="flex items-center gap-2"><MapPin size={14} /><span>United States (Remote)</span></div>
              <div className="flex items-center gap-2"><Mail size={14} /><span>inquiries@theneutralbridge.com</span></div>
            </div>
          </div>
          <div className="flex gap-16 text-sm text-white/60">
            <div className="flex flex-col gap-3">
              <span className="font-bold text-white mb-2">Legal</span>
              <button onClick={() => openLegal('privacy')}>Privacy Policy</button>
              <button onClick={() => openLegal('terms')}>Terms of Service</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-[10px] text-white/20 text-center">
          <p>© 2026 K. Morgan. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

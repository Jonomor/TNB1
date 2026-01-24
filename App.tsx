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
  // 1. Core View State (Controls Landing Page vs. Vault Page)
  const [view, setView] = useState<'home' | 'vault'>('home');
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePreview, setActivePreview] = useState<'retail' | 'institutional' | null>(null);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isRedemptionOpen, setIsRedemptionOpen] = useState(false);
  
  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'joining' | 'joined'>('idle');

  // Client-Side Path State
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const scrollMilestones = useRef(new Set<number>());

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      // If user uses browser back button from /vault, set view back to home
      if (!window.location.pathname.includes('/vault')) {
        setView('home');
      }
    };
    
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Scroll Tracking Effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = Math.round((scrolled / height) * 100);
      
      [25, 50, 75, 90, 100].forEach(milestone => {
        if (percentage >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          trackEvent('scroll_milestone', { 
            category: 'Engagement', 
            label: `${milestone}% Depth` 
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Component Routing Logic
  // If state is 'vault' OR URL contains 'vault', show the VaultPage
  if (view === 'vault' || currentPath.toLowerCase().includes('/vault')) {
    return <VaultPage />;
  }

  const assetBase = getAssetBase();
  
  // Legal Modal State
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab>('privacy');

  const openLegal = (tab: LegalTab) => {
    setActiveLegalTab(tab);
    setLegalModalOpen(true);
    trackEvent('view_legal', { category: 'Legal', label: tab });
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
    trackEvent('nav_click', { category: 'Navigation', label: id });
  };

  const handleJoinNewsletter = () => {
    trackEvent('newsletter_signup', { category: 'Lead Gen', label: 'Footer Input' });
    setNewsletterStatus('joining');
    setTimeout(() => {
      setNewsletterStatus('joined');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }, 1500);
  };

  // Pricing Tiers & Comparison Points Definitions (Kept exactly as you had them)
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
    { quote: "The most sober and technically sound explanation of the XRP ledger's role in global finance I have read to date.", author: "Reader Persona: Fintech Analyst" },
    { quote: "Finally, a book that treats the 'Reset' as an engineering challenge rather than a conspiracy theory.", author: "Reader Persona: Compliance Officer" },
    { quote: "If you hold XRP, this is your manual. If you don't, this is your warning.", author: "Reader Persona: Private Office Fund" }
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
      <VaultRegistrationModal 
        isOpen={isRedemptionOpen}
        onClose={() => setIsRedemptionOpen(false)}
      />
      <LegalModal 
        isOpen={legalModalOpen}
        initialTab={activeLegalTab}
        onClose={() => setLegalModalOpen(false)}
      />
      <SocialProof />

      {/* Navigation */}
      <nav className="fixed top-8 w-full z-50 bg-matte-black/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 cursor-pointer" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth'}); }}>
             <div className="w-8 h-8 bg-electric-teal flex items-center justify-center rounded-sm">
               <Terminal size={18} className="text-black" />
             </div>
             <div>
                <span className="font-serif font-bold text-lg tracking-tight block leading-none">The Neutral Bridge</span>
                <span className="font-mono text-[9px] text-electric-teal uppercase tracking-wider block mt-1">Launch: Feb 18, 2026</span>
             </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-sm font-medium text-white/60 hover:text-white transition-colors">The Architect</a>
            <a href="#editions" onClick={(e) => handleNavClick(e, 'editions')} className="text-sm font-medium text-white/60 hover:text-white transition-colors">Analysis</a>
            <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="text-sm font-medium text-white/60 hover:text-white transition-colors">Pricing</a>
            <Button variant="primary" className="h-10 px-6 text-xs" onClick={() => scrollToSection('pricing')} analyticsLabel="Nav_CTA_OrderNow">Order Now</Button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-matte-black border-b border-white/10 px-6 py-8 flex flex-col gap-6">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-lg font-serif text-left">The Architect</a>
            <a href="#editions" onClick={(e) => handleNavClick(e, 'editions')} className="text-lg font-serif text-left">Analysis</a>
            <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="text-lg font-serif text-left">Pricing</a>
            <Button variant="primary" className="w-full" onClick={() => scrollToSection('pricing')} analyticsLabel="Mobile_Nav_CTA">Order Now</Button>
          </div>
        )}
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
                The Architecture of the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-teal to-white">Next Monetary Era</span>
              </h1>
              <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed mb-12">
                An engineering-grade analysis of the "Neutral Bridge" theory—explaining how XRP and Ripple are positioned to facilitate the 2027 global liquidity reset.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button variant="primary" className="min-w-[200px]" onClick={() => scrollToSection('pricing')} analyticsLabel="Hero_CTA_Order">Order Your Copy Now</Button>
                <Button variant="outline" className="min-w-[200px] flex gap-2 items-center" onClick={() => setActivePreview('retail')} analyticsLabel="Hero_Read_Preview">
                  <BookOpen size={16} /> Read Preview
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <PreOrderBridge />

      <div className="bg-charcoal border-y border-white/10 py-4 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2 text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/60">
          <div className="flex items-center gap-2"><Check size={12} className="text-electric-teal" /> Rated #1 Financial Manuscript 2026</div>
          <span className="hidden md:inline text-white/20">—</span>
          <div className="flex items-center gap-2"><Check size={12} className="text-electric-teal" /> Engineering-Grade Systems Analysis</div>
          <span className="hidden md:inline text-white/20">—</span>
          <div className="flex items-center gap-2"><Check size={12} className="text-electric-teal" /> Secure & Encrypted Checkout</div>
        </div>
      </div>

      <ResetCountdown />
      <EngineeringRigor />
      <TechnicalDefense onOrder={() => scrollToSection('pricing')} onRead={() => setActivePreview('institutional')} />

      {/* About Author */}
      <Section id="about" className="bg-charcoal border-b border-white/5">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full flex justify-center">
             <div className="relative w-full max-w-sm aspect-[3/4] bg-matte-black border border-white/10 p-2 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
               <img src={`${assetBase}kmorgan.jpg`} alt="K. Morgan Portrait" className="w-full h-full object-cover grayscale contrast-125" />
               <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur border border-white/20 p-4">
                 <h3 className="font-serif text-xl text-white">K. Morgan</h3>
                 <p className="font-mono text-xs text-electric-teal uppercase tracking-widest">Systems Engineer</p>
               </div>
             </div>
          </div>
          <div className="flex-1">
            <h2 className="font-serif text-4xl mb-6">Behind the Analysis</h2>
            <div className="prose prose-invert prose-lg text-white/70 font-light leading-relaxed">
              <p className="mb-6">As an engineer and systems analyst, I view the global financial system as a technical infrastructure nearing its limit.</p>
              <p className="mb-6">My work focuses on the mechanics of liquidity and the <strong className="text-white">mathematical necessity of a neutral bridge</strong>.</p>
            </div>
          </div>
        </div>
      </Section>

      <StrategicDialogue />

      {/* Pricing & Institutional Bundle */}
      <Section id="pricing" label="Secure Your Intelligence">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto mb-20">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>
        
        <InstitutionalBundle 
          onOpenVault={() => {
            // 3. SET STATE AND HISTORY TOGETHER
            setView('vault');
            window.history.pushState({}, '', '/TNB1/vault');
            window.scrollTo(0, 0);
            trackEvent('open_vault_component', { category: 'Interaction', label: 'Bundle Section' });
          }}
          onRedeem={() => {
            setIsRedemptionOpen(true);
            trackEvent('open_redemption', { category: 'Interaction', label: 'Bundle Section' });
          }}
        />

        <PriceJustification />
      </Section>

      <FAQ />

      <footer className="bg-black border-t border-white/10 py-16" id="footer">
        <div className="max-w-7xl mx-auto px-6 text-center text-[10px] text-white/20">
          <p>© 2026 K. Morgan. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

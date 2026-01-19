import React, { useState, useEffect } from 'react';
import { X, Shield, Scale, Truck, Lock } from 'lucide-react';

export type LegalTab = 'privacy' | 'terms' | 'refund';

interface LegalModalProps {
  isOpen: boolean;
  initialTab: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, initialTab, onClose }) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-matte-black/90 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-[#121212] border border-white/10 shadow-2xl rounded-sm flex flex-col h-[80vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-matte-black">
          <div className="flex items-center gap-3">
            <Scale size={20} className="text-white/60" />
            <h2 className="font-serif text-xl text-white">Legal Framework & Compliance</h2>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 bg-[#0a0a0a]">
          <button 
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-4 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-colors
              ${activeTab === 'privacy' ? 'bg-[#121212] text-electric-teal border-t-2 border-electric-teal' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
          >
            <Shield size={14} /> Privacy Policy
          </button>
          <button 
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-4 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-colors
              ${activeTab === 'terms' ? 'bg-[#121212] text-electric-teal border-t-2 border-electric-teal' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
          >
            <Lock size={14} /> Terms of Service
          </button>
          <button 
            onClick={() => setActiveTab('refund')}
            className={`flex-1 py-4 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-colors
              ${activeTab === 'refund' ? 'bg-[#121212] text-electric-teal border-t-2 border-electric-teal' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
          >
            <Truck size={14} /> Refund & Shipping
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 font-sans text-white/70 leading-relaxed space-y-8 bg-[#121212]">
          
          {activeTab === 'privacy' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="font-serif text-2xl text-white mb-6">Privacy Policy</h3>
              <p className="font-mono text-xs text-white/40 mb-8 uppercase">Effective Date: February 18, 2026</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-bold mb-2">1. Data Collection</h4>
                  <p className="text-sm">We collect your name, email, and billing information to fulfill book orders. We also collect interaction logs from the "K. Morgan Digital Twin" AI assistant to improve technical accuracy.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">2. AI Interaction</h4>
                  <p className="text-sm">By using our AI assistant, you acknowledge that your queries are processed to provide real-time analysis. We do not sell your personal interaction data to third parties.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">3. NY Algorithmic Disclosure</h4>
                  <p className="text-sm">In compliance with N.Y. Gen. Bus. Law § 349-a, we disclose that while our book prices are fixed, our AI assistant's insights are generated via algorithmic modeling.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">4. Data Rights</h4>
                  <p className="text-sm">You may request a copy or deletion of your data at any time by contacting <span className="text-electric-teal">devs@theneutralbridge.com</span>.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="font-serif text-2xl text-white mb-6">Terms of Service</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-bold mb-2">1. Educational Purpose</h4>
                  <p className="text-sm">The Neutral Bridge and the "Ultra System" provide technical engineering analysis only. This is not financial advice.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">2. Liability</h4>
                  <p className="text-sm">K. Morgan is not liable for any financial decisions or market outcomes related to the 2027 Reset or XRP volatility.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">3. Digital Intellectual Property</h4>
                  <p className="text-sm">Unauthorized "scraping" or training of other AI models on our manuscript or "Ultra System" logic is strictly prohibited.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">4. Synthetic Media</h4>
                  <p className="text-sm">You acknowledge that the "K. Morgan" video assistant is a Synthetic Performer and not a live human broadcast.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="font-serif text-2xl text-white mb-6">Refund & Shipping Policy</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-bold mb-2">1. Physical Books</h4>
                  <p className="text-sm">We offer a 14-day return window for books that arrive damaged or with manufacturing defects. Photographic evidence is required.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">2. Digital Assets (Institutional Edition)</h4>
                  <p className="text-sm border-l-2 border-crimson pl-4">All sales are final. Due to the nature of digital keys and downloadable Excel models, no refunds will be issued once the digital asset has been accessed or downloaded.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">3. Shipping</h4>
                  <p className="text-sm">Physical orders are processed within 3 business days. Tracking numbers are sent via "System Activation" emails.</p>
                </div>
              </div>
            </div>
          )}

        </div>
        
        {/* Footer of Modal */}
        <div className="p-6 border-t border-white/10 bg-matte-black text-right">
          <button onClick={onClose} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-bold rounded-sm transition-colors">
            Close Document
          </button>
        </div>

      </div>
    </div>
  );
};
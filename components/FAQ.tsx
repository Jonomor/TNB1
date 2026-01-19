import React, { useState } from 'react';
import { Section } from './Section';
import { ChevronDown, HelpCircle, AlertCircle } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-white/10 bg-matte-black/50 overflow-hidden mb-4 group hover:border-white/20 transition-all">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <HelpCircle className={`shrink-0 ${isOpen ? 'text-electric-teal' : 'text-white/30 group-hover:text-white/60'}`} size={18} />
          <span className={`font-serif text-lg ${isOpen ? 'text-white' : 'text-white/80'}`}>{question}</span>
        </div>
        <ChevronDown 
          className={`text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-electric-teal' : ''}`} 
          size={18} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="p-6 pt-0 text-white/60 font-sans leading-relaxed text-sm border-t border-white/5 mt-2">
          {answer}
        </div>
      </div>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the difference between the Retail and Institutional Editions?",
      answer: "The Retail Edition is focused on individual wealth preservation, explaining the 'Hidden Accumulation' phase and retail survival strategies. The Institutional Edition is an engineering-grade suite that includes the raw 'Ultra System' Excel models, the serialized Raw Data Appendix, and a digital license for sovereign-level liquidity analysis."
    },
    {
      question: "How is this different from other books on Ripple/XRP?",
      answer: "This is not a 'crypto trading' book. It is a systems engineering analysis. While others speculate on price based on hype, The Neutral Bridge dissects the ISO 20022 infrastructure and the mathematical necessity of a neutral bridge asset in a multi-polar CBDC world."
    },
    {
      question: "Does the book include the 'Ultra System' trading code?",
      answer: "The 'Ultra System' logic and liquidity models are exclusively available in the Institutional Edition. This includes the proprietary 'Bridge Utility Coefficient' formulas used to model value density."
    },
    {
      question: "How do I receive my digital assets after purchase?",
      answer: "Upon completing your pre-order, you will be registered in our system. On the February 18, 2026 launch day, you will receive a secure 'System Activation' email containing your unique digital license keys and download links for the Intelligence Vault."
    },
    {
      question: "Is this financial advice?",
      answer: "No. The Neutral Bridge is a technical infrastructure analysis. K. Morgan is an engineer and systems analyst, not a financial advisor. All content is for educational purposes regarding the mechanics of the 2027 Global Financial Reset."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" className="bg-charcoal border-t border-white/5" label="System Knowledge Base">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl text-white mb-4">Critical Launch Queries</h2>
          <p className="text-white/50 text-sm font-mono uppercase tracking-wide">
            Verified Answers for the Feb 18 Activation
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <FAQItem 
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onClick={() => handleToggle(idx)}
            />
          ))}
        </div>

        <div className="mt-12 p-6 bg-crimson/5 border border-crimson/20 flex items-start gap-4 rounded-sm">
          <AlertCircle className="text-crimson shrink-0 mt-1" size={20} />
          <div>
            <h4 className="text-white font-bold text-sm mb-1">Still have technical questions?</h4>
            <p className="text-white/60 text-xs leading-relaxed">
              Use the <strong>"K. Morgan Digital Twin"</strong> AI assistant at the top of the page for real-time analysis of the $1.97 Death Cross and other market events.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="bg-matte-black border-t border-white/10 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-charcoal/50 border border-white/5 p-6 md:p-8 rounded-sm">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="shrink-0">
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
               <AlertTriangle className="text-white/40" size={20} />
             </div>
          </div>
          <div>
            <h4 className="font-serif text-white text-lg mb-3">Technical Disclosure</h4>
            <p className="font-sans text-xs md:text-sm text-white/50 leading-relaxed text-justify">
              The Neutral Bridge is a work of <strong>systems engineering and infrastructure analysis</strong>. K. Morgan is an engineer, not a financial advisor. All content, including the Raw Data Appendix and Liquidity Models, is provided for educational and analytical purposes regarding global monetary architecture. <strong>No information on this site or within the manuscripts constitutes an offer to buy or sell securities</strong>, nor does it provide personalized investment recommendations. Readers should consult with licensed financial professionals before making capital allocation decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
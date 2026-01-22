import React, { useState } from 'react';
import { PricingTier } from '../types';
import { Button } from './Button';
import { Check, Star, ShieldAlert, BookOpen, Book } from 'lucide-react';

interface PricingCardProps {
  tier: PricingTier;
}

export const PricingCard: React.FC<PricingCardProps> = ({ tier }) => {
  const [acknowledged, setAcknowledged] = useState(false);
  
  // Initialize with the first variant if available
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    tier.variants && tier.variants.length > 0 ? tier.variants[0].id : null
  );

  const selectedVariant = tier.variants?.find(v => v.id === selectedVariantId);
  const isRecommended = tier.isRecommended;
  const isSuite = tier.type === 'suite';

  // Determine display values based on selection or fallback to tier defaults
  const displayPrice = selectedVariant ? selectedVariant.price : tier.price;
  const displayCta = selectedVariant ? selectedVariant.ctaText : tier.ctaText;
  const displayUrl = selectedVariant ? selectedVariant.externalUrl : tier.externalUrl;

  const handlePurchase = () => {
    if (displayUrl) {
      window.open(displayUrl, '_blank');
      return;
    }
    const format = selectedVariant ? selectedVariant.label : 'Standard';
    alert(`Initiating secure checkout for:\n${tier.title}\nFormat: ${format}\nPrice: ${displayPrice}\n\nThis is a simulation.`);
  };

  return (
    <div className={`
      relative flex flex-col h-full border transition-all duration-300 group
      ${isRecommended 
        ? 'bg-slate-grey border-electric-teal shadow-2xl scale-105 z-10' 
        : isSuite 
          ? 'bg-matte-black border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]'
          : 'bg-matte-black border-white/10 hover:border-white/20'
      }
    `}>
      {isRecommended && (
        <div className="absolute top-0 left-0 right-0 -mt-4 flex justify-center">
          <span className="bg-electric-teal text-matte-black text-[10px] font-bold font-mono uppercase tracking-widest px-4 py-1 rounded-sm shadow-lg flex items-center gap-1">
            <Star size={10} fill="currentColor" /> Best Value
          </span>
        </div>
      )}

      {isSuite && (
         <div className="absolute top-0 right-0 p-4">
           <div className="w-2 h-2 rounded-full bg-crimson animate-pulse shadow-[0_0_10px_#B22222]"></div>
         </div>
      )}

      <div className="p-8 border-b border-white/5 bg-white/5">
        <h3 className={`font-serif text-xl md:text-2xl mb-2 leading-tight ${isRecommended ? 'text-white' : 'text-white/80'}`}>
          {tier.title}
        </h3>
        <p className="font-sans text-xs text-white/50 mb-6 h-auto min-h-[2rem]">
          {tier.subtitle}
        </p>
        
        {/* Variant Selector */}
        {tier.variants && (
          <div className="flex p-1 bg-black/40 rounded-sm mb-6 border border-white/10">
            {tier.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
                className={`flex-1 py-2 text-[10px] font-mono uppercase tracking-wider transition-all rounded-sm flex items-center justify-center gap-2
                  ${selectedVariantId === variant.id 
                    ? 'bg-electric-teal text-black font-bold shadow-sm' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
              >
                {variant.label === 'E-Book' ? <BookOpen size={12} /> : <Book size={12} />}
                {variant.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-baseline space-x-1">
          <span className={`text-4xl font-bold font-serif ${isRecommended ? 'text-electric-teal' : 'text-white'}`}>
            {displayPrice}
          </span>
          <span className="text-white/30 text-xs font-mono uppercase">USD</span>
        </div>
      </div>

      <div className="p-8 flex-1">
        <ul className="space-y-4">
          {tier.features.map((feature, idx) => (
            <li key={idx} className="flex items-start space-x-3 text-sm">
              <Check size={16} className={`mt-0.5 shrink-0 ${isRecommended ? 'text-electric-teal' : 'text-white/30'}`} />
              <span className="text-white/80 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-8 pt-0">
        {tier.requiresAcknowledgement && (
          <div className="mb-6 p-4 bg-crimson/5 border border-crimson/20 rounded-sm">
            <label className="flex items-start gap-3 cursor-pointer group/ack">
              <div className="relative flex items-center mt-1">
                <input 
                  type="checkbox" 
                  className="peer sr-only"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                />
                <div className="w-4 h-4 border border-crimson/50 rounded-sm peer-checked:bg-crimson peer-checked:border-crimson transition-colors"></div>
                <Check size={12} className="absolute inset-0 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
              </div>
              <span className="text-[10px] text-white/60 leading-tight group-hover/ack:text-white/80 transition-colors">
                I acknowledge that this is a technical systems analysis and <strong>does not constitute financial or investment advice</strong>.
              </span>
            </label>
          </div>
        )}

        <Button 
          variant={isRecommended ? 'primary' : 'outline'} 
          fullWidth
          className={!isRecommended ? 'text-white/70' : ''}
          disabled={tier.requiresAcknowledgement && !acknowledged}
          style={{ 
            opacity: tier.requiresAcknowledgement && !acknowledged ? 0.5 : 1,
            cursor: tier.requiresAcknowledgement && !acknowledged ? 'not-allowed' : 'pointer'
          }}
          onClick={handlePurchase}
        >
          {tier.requiresAcknowledgement && !acknowledged ? 'Accept Disclosures' : displayCta}
        </Button>
        
        {isSuite && (
           <p className="mt-4 text-center text-[10px] font-mono uppercase text-crimson animate-pulse">
             <ShieldAlert size={10} className="inline mr-1 -mt-0.5" />
             Strictly Confidential
           </p>
        )}
      </div>
    </div>
  );
};

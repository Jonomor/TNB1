import React from 'react';
import { BookEdition } from '../types';
import { Button } from './Button';
import { Check } from 'lucide-react';

interface EditionCardProps {
  edition: BookEdition;
  variant: 'institutional' | 'retail';
}

export const EditionCard: React.FC<EditionCardProps> = ({ edition, variant }) => {
  const isPopular = edition.isPopular;

  return (
    <div className={`
      relative flex flex-col h-full border transition-all duration-300
      ${isPopular 
        ? 'bg-surface border-bridge shadow-[0_0_30px_-10px_rgba(56,189,248,0.2)]' 
        : 'bg-transparent border-white/10 hover:border-white/20'
      }
    `}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bridge text-black text-[10px] font-bold font-mono uppercase tracking-widest px-3 py-1">
          Recommended
        </div>
      )}

      <div className="p-8 border-b border-white/10">
        <p className="font-mono text-xs uppercase tracking-wider text-muted mb-2">
          {edition.subtitle}
        </p>
        <h3 className="font-serif text-2xl text-white mb-4">{edition.title}</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-white">{edition.price}</span>
          <span className="text-sm text-muted">USD</span>
        </div>
      </div>

      <div className="p-8 flex-1">
        <ul className="space-y-6">
          {edition.points.map((point, idx) => (
            <li key={idx} className="group">
              <div className="flex items-start space-x-3">
                <Check size={16} className={`mt-1 shrink-0 ${isPopular ? 'text-bridge' : 'text-white/40'}`} />
                <div>
                  <h4 className="font-sans font-bold text-sm text-white/90 mb-1">
                    {point.title}
                  </h4>
                  <p className="font-serif text-sm leading-relaxed text-muted">
                    {point.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-8 pt-0">
        <Button 
          variant={isPopular ? 'primary' : 'outline'} 
          fullWidth
        >
          {edition.ctaText}
        </Button>
        <p className="text-center mt-4 text-[10px] font-mono text-muted uppercase">
          Digital Delivery • Instant Access
        </p>
      </div>
    </div>
  );
};
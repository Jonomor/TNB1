import React from 'react';
import { ComparisonPoint } from '../types';

interface ComparisonRowProps {
  point: ComparisonPoint;
  isLast?: boolean;
}

export const ComparisonRow: React.FC<ComparisonRowProps> = ({ point, isLast }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 py-6 ${!isLast ? 'border-b border-white/5' : ''}`}>
      <div className="md:col-span-1">
        <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">Feature</h4>
        <p className="font-serif font-semibold text-white">{point.feature}</p>
      </div>
      <div className="md:col-span-1 pl-0 md:pl-4 border-l-2 border-electric-teal/30">
        <h4 className="font-mono text-[10px] text-electric-teal uppercase tracking-widest mb-1 md:hidden">Retail Edition</h4>
        <p className="text-sm text-white/80 leading-relaxed">{point.retail}</p>
      </div>
      <div className="md:col-span-1 pl-0 md:pl-4 border-l-2 border-slate-grey">
        <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-1 md:hidden">Institutional Edition</h4>
        <p className="text-sm text-white/60 leading-relaxed">{point.institutional}</p>
      </div>
    </div>
  );
};
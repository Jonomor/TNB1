import React from 'react';
import { ComparisonPoint } from '../types';

interface ComparisonRowProps {
  point: ComparisonPoint;
  isLast?: boolean;
}

export const ComparisonRow: React.FC<ComparisonRowProps> = ({ point, isLast }) => {
  return (
    <div className={`${!isLast ? 'md:border-b md:border-white/5' : ''}`}>
      {/* DESKTOP LAYOUT */}
      <div className="hidden md:grid grid-cols-3 gap-8 py-6">
        <div className="col-span-1">
          <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">Feature</h4>
          <p className="font-serif font-semibold text-white">{point.feature}</p>
        </div>
        <div className="col-span-1 pl-4 border-l-2 border-electric-teal/30">
          <h4 className="font-mono text-[10px] text-electric-teal uppercase tracking-widest mb-1">Retail Edition</h4>
          <p className="text-sm text-white/80 leading-relaxed">{point.retail}</p>
        </div>
        <div className="col-span-1 pl-4 border-l-2 border-slate-grey">
          <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-1">Institutional Edition</h4>
          <p className="text-sm text-white/60 leading-relaxed">{point.institutional}</p>
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden py-2">
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg overflow-hidden">
          {/* Feature Header */}
          <div className="px-4 py-3 border-b border-white/[0.06] bg-white/[0.03]">
            <h4 className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-0.5">Feature</h4>
            <p className="font-serif font-semibold text-white text-base">{point.feature}</p>
          </div>

          {/* Edition Comparison - Side by Side */}
          <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
            {/* Retail */}
            <div className="px-4 py-3">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-teal/60 shrink-0"></span>
                <h4 className="font-mono text-[9px] text-electric-teal/80 uppercase tracking-widest">Retail</h4>
              </div>
              <p className="text-[13px] text-white/75 leading-snug">{point.retail}</p>
            </div>

            {/* Institutional */}
            <div className="px-4 py-3">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0"></span>
                <h4 className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Institutional</h4>
              </div>
              <p className="text-[13px] text-white/55 leading-snug">{point.institutional}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

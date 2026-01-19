import React from 'react';

export const IntelligenceTiers: React.FC = () => {
  return (
    <div className="bg-matte-black py-16 px-6 border-b border-white/5">
      <div className="max-w-5xl mx-auto">
        <h3 className="font-serif text-2xl text-white mb-8 text-center">Operational Readiness Levels</h3>
        
        <div className="overflow-hidden border border-white/10 rounded-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 font-mono text-xs text-white/60 uppercase tracking-widest">Asset Tier</th>
                <th className="p-4 font-mono text-xs text-white/60 uppercase tracking-widest">Intelligence Level</th>
                <th className="p-4 font-mono text-xs text-white/60 uppercase tracking-widest hidden md:table-cell">Ideal For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <span className="font-serif text-white font-bold text-lg">Retail Edition</span>
                  <span className="block text-[10px] text-electric-teal font-mono uppercase mt-1">Standard Access</span>
                </td>
                <td className="p-4">
                  <span className="inline-block px-2 py-1 bg-white/10 text-white text-xs font-bold rounded-sm">
                    Strategic Awareness
                  </span>
                  <p className="text-xs text-white/50 mt-1 md:hidden">Individual wealth preservation.</p>
                </td>
                <td className="p-4 text-sm text-white/70 hidden md:table-cell">
                  Individual wealth preservation and market context.
                </td>
              </tr>
              <tr className="bg-electric-teal/5 hover:bg-electric-teal/10 transition-colors">
                <td className="p-4 border-l-2 border-electric-teal">
                  <span className="font-serif text-white font-bold text-lg">Institutional Edition</span>
                  <span className="block text-[10px] text-electric-teal font-mono uppercase mt-1">Priority Access</span>
                </td>
                <td className="p-4">
                  <span className="inline-block px-2 py-1 bg-electric-teal text-black text-xs font-bold rounded-sm shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                    Systems Mastery
                  </span>
                  <p className="text-xs text-white/50 mt-1 md:hidden">Infrastructure planning & liquidity modeling.</p>
                </td>
                <td className="p-4 text-sm text-white/90 hidden md:table-cell">
                  Infrastructure planning, liquidity modeling, and policy alignment.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
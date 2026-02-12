import React from 'react';

export const PriceJustification: React.FC = () => {
  return (
    <div className="mt-16 bg-matte-black border border-white/10 overflow-hidden max-w-4xl mx-auto">
      <div className="bg-white/5 p-4 text-center border-b border-white/10">
        <h4 className="font-mono text-xs text-white/60 uppercase tracking-widest">
          Value Density Analysis: Cost vs. Utility
        </h4>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-6 font-serif text-white text-lg font-normal">Investment</th>
              <th className="p-6 font-serif text-white text-lg font-normal">Cost</th>
              <th className="p-6 font-serif text-white text-lg font-normal">Value Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-6 text-sm text-white/60 font-medium">Financial Consultant</td>
              <td className="p-6 text-sm text-crimson font-mono">$300+ / hour</td>
              <td className="p-6 text-sm text-white/60">Generic advice, hourly limitations, legacy focus.</td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-6 text-sm text-white/60 font-medium">Legacy Wealth Mgmt</td>
              <td className="p-6 text-sm text-crimson font-mono">1–2% AUM / yr</td>
              <td className="p-6 text-sm text-white/60">Slow to adapt to digital rails; high friction.</td>
            </tr>
            <tr className="bg-electric-teal/5">
              <td className="p-6 text-sm text-white font-bold flex items-center gap-2">
                The Institutional Edition
                <span className="px-2 py-0.5 bg-electric-teal text-black text-[10px] font-mono uppercase font-bold rounded-sm">
                  Optimal
                </span>
              </td>
              <td className="p-6 text-sm text-electric-teal font-mono font-bold">$69.99</td>
              <td className="p-6 text-sm text-white">
                A 2-year technical roadmap, years of engineering research, and 24/7 preparation for the 2027 Reset.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-matte-black border-t border-white/10 text-center">
        <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest">
          Technical Integrity Guarantee: All sales final to protect proprietary analysis.
        </p>
      </div>
    </div>
  );
};

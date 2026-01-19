import React from 'react';
import { Check, Star, Lock, Cpu, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface InstitutionalBundleProps {
  onOpenVault: () => void;
}

export const InstitutionalBundle: React.FC<InstitutionalBundleProps> = ({ onOpenVault }) => {
  return (
    <div className="bg-slate-grey/10 border border-electric-teal/20 max-w-4xl mx-auto mt-16 p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
        <Star className="text-electric-teal/20" size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6 justify-between">
          <div className="flex items-center gap-3">
            <Lock className="text-electric-teal" size={20} />
            <h3 className="font-serif text-2xl text-white text-center md:text-left">
              Neutral Bridge Secure Intelligence Vault
            </h3>
          </div>
          <Button variant="ghost" onClick={onOpenVault} className="text-xs border border-electric-teal/30 hover:bg-electric-teal/10">
             Launch Intelligence Vault Demo <ArrowRight size={12} className="ml-2" />
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 font-mono text-xs text-white/60 uppercase tracking-widest">Vault Asset</th>
                <th className="py-4 font-mono text-xs text-white/60 uppercase tracking-widest text-right">Market Value</th>
                <th className="py-4 font-mono text-xs text-electric-teal uppercase tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-4 text-sm text-white font-medium">System Analysis Manuscript (Institutional)</td>
                <td className="py-4 text-sm text-white/60 font-mono text-right">$159.99</td>
                <td className="py-4 text-center"><Check size={16} className="mx-auto text-electric-teal" /></td>
              </tr>
              <tr>
                <td className="py-4 text-sm text-white font-medium">
                  Serialized Raw Data Appendix
                  <span className="block text-[10px] text-white/40 font-mono mt-1">Unique License ID per user (Authentication)</span>
                </td>
                <td className="py-4 text-sm text-white/60 font-mono text-right">$250.00</td>
                <td className="py-4 text-center font-mono text-xs font-bold text-electric-teal">INCLUDED</td>
              </tr>
              <tr>
                <td className="py-4 text-sm text-white font-medium">Quarterly Reset Updates (1 Year)</td>
                <td className="py-4 text-sm text-white/60 font-mono text-right">$400.00</td>
                <td className="py-4 text-center font-mono text-xs font-bold text-electric-teal">INCLUDED</td>
              </tr>
              <tr>
                <td className="py-4 text-sm text-white font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-electric-teal font-bold">Snypre System</span> 
                    <span className="text-xs bg-electric-teal/10 text-electric-teal px-1 rounded border border-electric-teal/30">AI</span>
                  </div>
                  <span className="block text-[10px] text-white/40 font-mono mt-1 max-w-sm">
                    Automated trading platform built on the Neutral Bridge logic. <br/>
                    Institutional holders get priority Whitelist access.
                  </span>
                </td>
                <td className="py-4 text-sm text-white/60 font-mono text-right">Priceless</td>
                <td className="py-4 text-center"><Check size={16} className="mx-auto text-electric-teal" /></td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-electric-teal bg-electric-teal/5">
                <td className="py-6 font-serif text-xl text-white pl-4">Total Asset Value: $800.00+</td>
                <td colSpan={2} className="py-6 text-right pr-4">
                  <span className="font-mono text-sm text-electric-teal font-bold uppercase tracking-widest">
                    Bundle Price: $159.99
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
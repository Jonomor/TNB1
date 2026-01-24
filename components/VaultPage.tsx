import React from 'react';
import { Terminal, Shield, Download, Lock, Activity, Eye, FileText, LogOut, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { trackEvent } from '../utils/analytics';

export const VaultPage: React.FC = () => {
  const handleLogout = () => {
    trackEvent('vault_logout', { category: 'Auth', label: 'Manual Logout' });
    window.location.href = '/TNB1/';
  };

  const downloads = [
    { 
      title: "Q1 2026 Institutional Intelligence Briefing", 
      size: "14.2MB", 
      ref: "NB-INTEL-Q1-26", 
      desc: "Visual Roadmap & Analyst Notes for the 2027 Global Financial Reset.",
      path: "/TNB1/vault-files/NB-Institutional-Intelligence-Briefing.pdf"
    },
    { 
      title: "Forensic Verification Kit (Technical Appendix)", 
      size: "1.8MB", 
      ref: "NB-VERIFY-KIT-V2", 
      desc: "The $3B+ acquisition log and raw forensic evidence for institutional auditors.",
      path: "/TNB1/vault-files/NB-Verification-Kit.pdf"
    },
    { 
      title: "Excel-Based Liquidity Model (V1.4)", 
      size: "8.4MB", 
      ref: "NB-LM-ATOMIC", 
      desc: "Interactive calculator for atomic settlement velocity and liquidity multipliers.",
      path: "/TNB1/vault-files/NB-Liquidity-Model.xlsx"
    }
  ];

  const handleDownloadClick = (filename: string, ref: string) => {
    trackEvent('file_download', {
      category: 'Vault Assets',
      label: filename,
      ref_code: ref
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-off-white font-mono p-4 md:p-8 selection:bg-electric-teal selection:text-black">
      <div className="max-w-5xl mx-auto border border-electric-teal/30 bg-[#0a0a0a] shadow-[0_0_50px_rgba(56,189,248,0.1)] relative overflow-hidden min-h-[90vh] flex flex-col">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] bg-[length:100%_4px,3px_100%]"></div>
        
        <div className="flex items-center justify-between border-b border-electric-teal/30 bg-electric-teal/5 px-6 py-3 relative z-10">
          <div className="flex items-center gap-3 text-electric-teal">
            <Terminal size={18} />
            <span className="text-sm font-bold uppercase tracking-[0.2em] animate-pulse">Secure Uplink // Authorized Access</span>
          </div>
          <div className="text-[10px] text-electric-teal/60 font-mono">
            SESSION_ID: NB-VAULT-2026-Q1
          </div>
        </div>

        <div className="p-6 md:p-12 space-y-12 relative z-10 flex-1">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-l-2 border-electric-teal pl-6 py-4 bg-electric-teal/5">
            <div className="space-y-1">
                <p className="text-sm text-electric-teal uppercase font-bold tracking-widest flex items-center gap-2">
                    <Shield size={14} /> Status: Authorized
                </p>
                <p className="text-xs text-white/60 font-mono">Encryption Layer: Active (ZKP-Protocol-22)</p>
            </div>
            <div className="text-[10px] text-white/40 max-w-md text-right md:text-left font-mono leading-relaxed italic">
              "System activation complete. Direct paths to the Briefing and Verification Kit are now live below."
            </div>
          </div>

          <section>
            <h2 className="text-electric-teal text-sm font-bold mb-6 flex items-center gap-2 uppercase tracking-widest border-b border-electric-teal/20 pb-2 w-fit">
              <Download size={16} /> 1. Institutional Suite Downloads
            </h2>
            <div className="grid gap-4">
              {downloads.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-white/10 bg-white/5 hover:bg-electric-teal/5 hover:border-electric-teal/40 transition-all group cursor-pointer">
                  <div className="flex items-start gap-4">
                      <div className="mt-1 text-electric-teal/40 group-hover:text-electric-teal transition-colors">
                          <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-white font-bold group-hover:text-electric-teal transition-colors">{item.title}</p>
                        <p className="text-xs text-white/50 mt-1">{item.desc}</p>
                        <p className="text-[9px] text-electric-teal/60 font-mono mt-2 uppercase">REF: {item.ref}</p>
                      </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center gap-4">
                      <span className="text-[10px] text-white/20 font-mono">{item.size}</span>
                      <a 
                        href={item.path}
                        download
                        onClick={() => handleDownloadClick(item.title, item.ref)}
                        className="flex items-center justify-center font-sans font-semibold tracking-wide rounded-sm uppercase transition-all duration-200 ease-in-out text-xs h-8 px-4 border border-white/20 hover:border-electric-teal text-white/60 hover:text-electric-teal bg-transparent"
                      >
                          Download
                      </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white text-sm font-bold mb-6 flex items-center gap-2 uppercase tracking-widest border-b border-white/20 pb-2 w-fit">
              <Activity size={16} /> 2. System Roadmap & Tech Specs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { id: "01", title: "Activation Roadmap", desc: "Q1 2027 technical countdown to sovereign implementation.", source: "Briefing p.8" },
                    { id: "02", title: "Protocol 22 Specs", desc: "ZKP architecture and View Key audit specifications.", source: "Verify Kit p.5" },
                    { id: "03", title: "Vertical Integration", desc: "Forensic log of the $3B+ infrastructure buildout.", source: "Verify Kit p.1" },
                    { id: "04", title: "Slippage Math", desc: "Load-bearing data for $10T+ daily liquidity volumes.", source: "Verify Kit p.4" },
                    { id: "05", title: "BIS Multiplier", desc: "Exponential growth frameworks for illiquid supply.", source: "Briefing p.7" },
                    { id: "06", title: "Reset Glossary", desc: "Technical definitions for institutional auditors.", source: "Verify Kit p.10" }
                ].map((ex, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-white/5 bg-[#0f0f0f] hover:border-white/20 transition-colors">
                        <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-electric-teal font-mono uppercase">Exhibit {ex.id}</span>
                              <span className="text-[9px] text-white/30 font-mono italic">[{ex.source}]</span>
                            </div>
                            <span className="text-xs text-white font-bold block md:inline mt-1">{ex.title}</span>
                            <p className="text-[10px] text-white/40 mt-1">{ex.desc}</p>
                        </div>
                        <ChevronRight size={14} className="text-white/10" />
                    </div>
                ))}
            </div>
          </section>

          <section className="bg-charcoal/50 p-6 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                  <Lock size={40} className="text-white/5" />
              </div>
              <h2 className="text-white text-xs font-bold mb-4 flex items-center gap-2 uppercase tracking-widest">
                3. Quarterly Intelligence Feed
              </h2>
              <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-electric-teal rounded-full animate-pulse"></div>
                  <span className="text-xs text-electric-teal font-mono">Feed Status: Active Uplink</span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed max-w-2xl">
                  Institutional license detected. You are now whitelisted for the February 2026 Strategy Briefing. No further action is required.
              </p>
          </section>

          <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-end gap-4">
            <div className="flex items-center gap-3 text-white/20 font-mono text-[10px]">
                <Activity size={12} className="animate-pulse text-crimson" />
                <span>UPLINK_STABLE // PORT 443 // ISO-20022</span>
            </div>
            <button 
                onClick={handleLogout}
                className="text-[10px] text-crimson uppercase font-bold border border-crimson/30 px-4 py-2 hover:bg-crimson/10 transition-colors flex items-center gap-2"
            >
              <LogOut size={12} /> [ TERMINATE_SESSION ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

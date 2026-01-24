import React from 'react';
import { Terminal, Shield, Download, Lock, Activity, FileText, LogOut } from 'lucide-react';

export const VaultPage: React.FC = () => {
  const handleLogout = () => { window.location.href = '/TNB1/'; };

  const downloads = [
    { 
      title: "Q1 2026 Institutional Intelligence Briefing", 
      desc: "Includes the 2027 Activation Roadmap & Multiplier Logic (Page 8).",
      path: "/TNB1/vault-files/NB-Institutional-Intelligence-Briefing.pdf"
    },
    { 
      title: "Forensic Verification Kit (Technical Appendix)", 
      desc: "Includes Protocol 22 Tech Specs (Page 5) and Infrastructure Logs.",
      path: "/TNB1/vault-files/NB-Verification-Kit.pdf"
    },
    { 
      title: "Excel-Based Liquidity Model (V1.4)", 
      desc: "Institutional calculator for atomic settlement velocity.",
      path: "/TNB1/vault-files/NB-Liquidity-Model.xlsx"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono p-4 md:p-8">
      <div className="max-w-5xl mx-auto border border-sky-400/30 bg-[#0a0a0a] shadow-[0_0_50px_rgba(56,189,248,0.1)] relative overflow-hidden flex flex-col">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-sky-400/30 bg-sky-400/5 px-6 py-3">
          <div className="flex items-center gap-3 text-sky-400">
            <Terminal size={18} />
            <span className="text-sm font-bold uppercase tracking-widest">Secure Uplink // Authorized Access</span>
          </div>
          <button onClick={handleLogout} className="text-red-500 text-[10px] border border-red-500/30 px-3 py-1 hover:bg-red-500/10 transition-all">
            [ TERMINATE_SESSION ]
          </button>
        </div>

        <div className="p-6 md:p-12 space-y-12">
          {/* Status Block */}
          <div className="border-l-2 border-sky-400 pl-6 py-4 bg-sky-400/5">
             <p className="text-sky-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Shield size={14} /> License Verified
             </p>
             <p className="text-[10px] text-white/40 mt-1 italic">"The forensic digital layer for the 2027 transition is now active."</p>
          </div>

          {/* Download Grid */}
          <section>
            <h2 className="text-sky-400 text-sm font-bold mb-6 uppercase tracking-widest border-b border-sky-400/20 pb-2 w-fit flex items-center gap-2">
              <Download size={16} /> 1. Institutional Suite Assets
            </h2>
            <div className="grid gap-4">
              {downloads.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-white/10 bg-white/5 hover:border-sky-400/40 transition-all group">
                  <div className="flex items-start gap-4">
                    <FileText size={20} className="text-sky-400/40 group-hover:text-sky-400" />
                    <div>
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <p className="text-xs text-white/50 mt-1">{item.desc}</p>
                    </div>
                  </div>
                  <a href={item.path} download className="mt-4 md:mt-0 bg-transparent border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-black text-[10px] font-bold py-2 px-6 transition-all uppercase text-center">
                    Download
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Content Roadmap Summary */}
          <section className="bg-zinc-900/50 p-6 border border-white/5">
              <h2 className="text-white text-[10px] font-bold mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                <Activity size={14} /> Intelligence Index
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
                <div className="flex justify-between border-b border-white/5 py-2">
                  <span className="text-[11px] text-white/60">System Activation Roadmap</span>
                  <span className="text-[11px] text-sky-400/60 font-mono">Briefing p.8</span>
                </div>
                <div className="flex justify-between border-b border-white/5 py-2">
                  <span className="text-[11px] text-white/60">Protocol 22 Tech Specs</span>
                  <span className="text-[11px] text-sky-400/60 font-mono">Verify Kit p.5</span>
                </div>
              </div>
          </section>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Terminal, Shield, Download, Lock, Activity, Eye, FileText, LogOut, ChevronRight } from 'lucide-react';

export const VaultPage: React.FC = () => {
  const handleLogout = () => { window.location.href = '/TNB1/'; };

  const downloads = [
    { 
      title: "Q1 2026 Institutional Intelligence Briefing", 
      desc: "Contains the 2027 Activation Roadmap (Page 8).",
      path: "/TNB1/vault-files/NB-Institutional-Intelligence-Briefing.pdf"
    },
    { 
      title: "Forensic Verification Kit (Technical Appendix)", 
      desc: "Contains Protocol 22 Tech Specs (Page 5) and M&A Logs.",
      path: "/TNB1/vault-files/NB-Verification-Kit.pdf"
    },
    { 
      title: "Excel-Based Liquidity Model (V1.4)", 
      desc: "Interactive calculator for atomic settlement velocity.",
      path: "/TNB1/vault-files/NB-Liquidity-Model.xlsx"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono p-4 md:p-8 selection:bg-cyan-400 selection:text-black">
      <div className="max-w-5xl mx-auto border border-cyan-400/30 bg-[#0a0a0a] shadow-[0_0_50px_rgba(56,189,248,0.1)] relative overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-400/30 bg-cyan-400/5 px-6 py-3">
          <div className="flex items-center gap-3 text-cyan-400">
            <Terminal size={18} />
            <span className="text-sm font-bold uppercase tracking-widest">Authorized Access // Institutional Vault</span>
          </div>
          <button onClick={handleLogout} className="text-red-500 text-[10px] border border-red-500/30 px-3 py-1 hover:bg-red-500/10 transition-all">
            [ TERMINATE_SESSION ]
          </button>
        </div>

        <div className="p-6 md:p-12 space-y-12">
          {/* Status */}
          <div className="border-l-2 border-cyan-400 pl-6 py-4 bg-cyan-400/5">
             <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Shield size={14} /> License Status: Verified
             </p>
             <p className="text-[10px] text-white/40 mt-1">Institutional data layers for the 2027 reset are now unlocked.</p>
          </div>

          {/* 1. Downloads */}
          <section>
            <h2 className="text-cyan-400 text-sm font-bold mb-6 uppercase tracking-widest border-b border-cyan-400/20 pb-2 w-fit flex items-center gap-2">
              <Download size={16} /> 1. Master Files
            </h2>
            <div className="grid gap-4">
              {downloads.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-white/10 bg-white/5 hover:border-cyan-400/40 transition-all">
                  <div>
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="text-xs text-white/50 mt-1">{item.desc}</p>
                  </div>
                  <a href={item.path} download className="mt-4 md:mt-0 bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black text-[10px] font-bold py-2 px-6 transition-all uppercase">
                    Download
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Forensic Exhibits (Integrated Roadmap/Specs) */}
          <section>
            <h2 className="text-white text-sm font-bold mb-6 uppercase tracking-widest border-b border-white/20 pb-2 w-fit flex items-center gap-2">
              <Activity size={16} /> 2. Intelligence Exhibits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { title: "2027 Activation Roadmap", ref: "Briefing p.8" },
                    { title: "Protocol 22 / ZKP Specs", ref: "Verify Kit p.5" },
                    { title: "Slippage Mathematics", ref: "Verify Kit p.4" },
                    { title: "M&A Infrastructure Log", ref: "Verify Kit p.1" }
                ].map((ex, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-white/5 bg-white/[0.02]">
                        <span className="text-xs text-white/80">{ex.title}</span>
                        <span className="text-[10px] text-cyan-400/50 font-mono italic">{ex.ref}</span>
                    </div>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

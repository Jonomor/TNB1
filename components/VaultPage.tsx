import React from 'react';
import { Terminal, Shield, Download, Lock, Activity, Eye, FileText, LogOut, ChevronRight } from 'lucide-react';

export const VaultPage: React.FC = () => {
  const handleLogout = () => { window.location.href = '/TNB1/'; };

  const downloads = [
    { 
      title: "Q1 2026 Institutional Intelligence Briefing", 
      desc: "Includes the System Activation Roadmap (p.8).",
      path: "/TNB1/vault-files/NB-Institutional-Intelligence-Briefing.pdf"
    },
    { 
      title: "Forensic Verification Kit", 
      desc: "Includes Protocol 22 Tech Specs (p.5) and Acquisition Logs.",
      path: "/TNB1/vault-files/NB-Verification-Kit.pdf"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-mono p-8">
      <div className="max-w-4xl mx-auto border border-blue-500/30 p-8 bg-zinc-900/50">
        <div className="flex justify-between items-center border-b border-blue-500/30 pb-4 mb-8">
          <div className="flex items-center gap-2 text-blue-400">
            <Terminal size={20} />
            <span className="font-bold uppercase tracking-tighter">Institutional Vault // Access Granted</span>
          </div>
          <button onClick={handleLogout} className="text-red-500 text-xs border border-red-500/30 px-2 py-1 hover:bg-red-500/10">TERMINATE</button>
        </div>

        <section className="mb-12">
          <h2 className="text-blue-400 text-sm mb-4 uppercase tracking-widest">1. Primary Intelligence Assets</h2>
          <div className="space-y-4">
            {downloads.map((file, i) => (
              <div key={i} className="flex justify-between items-center p-4 border border-white/10 bg-white/5">
                <div>
                  <p className="text-sm font-bold">{file.title}</p>
                  <p className="text-xs text-white/50">{file.desc}</p>
                </div>
                <a href={file.path} download className="bg-blue-600 hover:bg-blue-500 text-black px-4 py-2 text-xs font-bold rounded">DOWNLOAD</a>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-white text-sm mb-4 uppercase tracking-widest">2. Forensic Exhibits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["System Roadmap (p.8)", "Protocol 22 Specs (p.5)", "Slippage Math (p.4)", "Acquisition Log (p.1)"].map((item, i) => (
              <div key={i} className="p-3 border border-white/5 bg-zinc-900 flex justify-between items-center">
                <span className="text-xs text-white/70">{item}</span>
                <Lock size={12} className="text-blue-500/50" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

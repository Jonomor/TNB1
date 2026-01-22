import React from 'react';
import { Terminal, Shield, Download, Lock, Activity, Eye, FileText, LogOut } from 'lucide-react';
import { Button } from './Button';

export const VaultPage: React.FC = () => {
  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#050505] text-off-white font-mono p-4 md:p-8 selection:bg-electric-teal selection:text-black">
      {/* Terminal Container */}
      <div className="max-w-5xl mx-auto border border-electric-teal/30 bg-[#0a0a0a] shadow-[0_0_50px_rgba(56,189,248,0.1)] relative overflow-hidden min-h-[90vh] flex flex-col">
        
        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] bg-[length:100%_4px,3px_100%]"></div>
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-electric-teal/30 bg-electric-teal/5 px-6 py-3 relative z-10">
          <div className="flex items-center gap-3 text-electric-teal">
            <Terminal size={18} />
            <span className="text-sm font-bold uppercase tracking-[0.2em] animate-pulse">Secure Uplink // Authorized Access</span>
          </div>
          <div className="text-[10px] text-electric-teal/60 font-mono">
            SESSION_ID: NB-VAULT-2026-Q1
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-12 space-y-12 relative z-10 flex-1">
          
          {/* Status Block */}
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-l-2 border-electric-teal pl-6 py-4 bg-electric-teal/5">
            <div className="space-y-1">
                <p className="text-sm text-electric-teal uppercase font-bold tracking-widest flex items-center gap-2">
                    <Shield size={14} /> Status: Authorized
                </p>
                <p className="text-xs text-white/60 font-mono">Encryption Layer: Active (ZKP-Protocol-22)</p>
            </div>
            <div className="text-[10px] text-white/40 max-w-md text-right md:text-left font-mono leading-relaxed">
              "Your Institutional License Key has been verified against the XRPL Ledger. You are now permitted to download the forensic digital layer."
            </div>
          </div>

          {/* 1. Executive Downloads */}
          <section>
            <h2 className="text-electric-teal text-sm font-bold mb-6 flex items-center gap-2 uppercase tracking-widest border-b border-electric-teal/20 pb-2 w-fit">
              <Download size={16} /> 1. Executive Downloads
            </h2>
            <div className="grid gap-4">
              {[
                { title: "The Neutral Bridge: Institutional Edition (PDF)", size: "42.5MB", ref: "NB-2027-ANALYSIS", desc: "Full technical appendix and Protocol 22 specifications." },
                { title: "Letter of Authenticity & Institutional License", size: "1.2MB", ref: "NB-LOA-SERIALIZED", desc: "Serialized certificate of forensic authenticity." },
                { title: "Excel-Based Liquidity Model (V1.4)", size: "8.4MB", ref: "NB-LM-ATOMIC", desc: "Interactive calculator for atomic settlement velocity." }
              ].map((item, i) => (
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
                      <Button variant="outline" className="text-xs h-8 px-4 border-white/20 hover:border-electric-teal text-white/60 hover:text-electric-teal">
                          Download
                      </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Intelligence Exhibits */}
          <section>
            <h2 className="text-white text-sm font-bold mb-6 flex items-center gap-2 uppercase tracking-widest border-b border-white/20 pb-2 w-fit">
              <Activity size={16} /> 2. Forensic Intelligence Exhibits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                   { id: "01", title: "The Mechanical Bridge", desc: "3-second atomic settlement vs T+2 legacy." },
                   { id: "02", title: "Nostro Entanglement", desc: "$27T in dormant, pre-funded capital." },
                   { id: "03", title: "ISO 20022 Mesh", desc: "Transition to organized data grids." },
                   { id: "04", title: "Unified Ledger", desc: "Architectural finality schematic." },
                   { id: "05", title: "Liquidity Bridge", desc: "Visualization of unlocked capital." },
                   { id: "06", title: "Privacy Layer (ZKP)", desc: "Proof for sovereign compliance." }
               ].map((ex, i) => (
                   <div key={i} className="flex items-center justify-between p-4 border border-white/5 bg-[#0f0f0f] hover:border-white/20 transition-colors">
                       <div>
                           <span className="text-[10px] text-electric-teal font-mono uppercase mr-2">Exhibit {ex.id}</span>
                           <span className="text-xs text-white font-bold block md:inline">{ex.title}</span>
                           <p className="text-[10px] text-white/40 mt-1">{ex.desc}</p>
                       </div>
                       <button className="text-white/20 hover:text-white transition-colors">
                           <Eye size={16} />
                       </button>
                   </div>
               ))}
            </div>
          </section>

          {/* 3. Quarterly Briefings */}
          <section className="bg-charcoal/50 p-6 border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4">
                 <Lock size={40} className="text-white/5" />
             </div>
             <h2 className="text-white text-xs font-bold mb-4 flex items-center gap-2 uppercase tracking-widest">
               3. Quarterly Strategy Briefings
             </h2>
             <div className="flex items-center gap-3 mb-2">
                 <div className="w-2 h-2 bg-electric-teal rounded-full animate-pulse"></div>
                 <span className="text-xs text-electric-teal font-mono">Snypre System AI: Whitelist Active</span>
             </div>
             <p className="text-[11px] text-white/60 leading-relaxed max-w-2xl">
                 Your license includes priority access to the Q1 2026 Strategy Briefing. The first intelligence packet will be routed to your registered email in February 2026.
             </p>
          </section>

          {/* Footer Terminal Text */}
          <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-end gap-4">
            <div className="flex items-center gap-3 text-white/20 font-mono text-[10px]">
               <Activity size={12} className="animate-pulse text-crimson" />
               <span>LIVE DATA STREAM ACTIVE // PORT 443</span>
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

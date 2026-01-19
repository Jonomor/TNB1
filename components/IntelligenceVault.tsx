import React, { useState } from 'react';
import { X, FileText, Download, Activity, Lock, Terminal, Shield, FileSpreadsheet, Info, Database } from 'lucide-react';
import { Button } from './Button';
import { DownloadNotification } from './DownloadNotification';

interface IntelligenceVaultProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntelligenceVault: React.FC<IntelligenceVaultProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownload = (assetName: string, fileName: string) => {
    setDownloading(fileName);
    
    // Voice Confirmation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `The technical specifications for the Neutral Bridge have been secured. You now have the engineering roadmap required to navigate the 2027 Global Reset.`
      );
      // Try to select a robotic/authoritative voice if available
      const voices = window.speechSynthesis.getVoices();
      // Prefer Google US English or Microsoft David for a somewhat deeper/neutral tone
      const systemVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('David')) || voices[0];
      if (systemVoice) utterance.voice = systemVoice;
      utterance.pitch = 0.9;
      utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
    }

    // Reset notification after 5 seconds
    setTimeout(() => setDownloading(null), 5000);
  };

  return (
    <div className="fixed inset-0 z-[70] bg-[#3C4043] overflow-y-auto font-sans">
      <DownloadNotification fileName={downloading || ''} visible={!!downloading} />
      
      {/* Top Bar */}
      <div className="bg-[#121212] border-b border-[#00E5FF]/20 p-4 sticky top-0 z-20 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Terminal size={20} className="text-[#00E5FF]" />
          <div>
             <h1 className="font-mono text-[#00E5FF] text-sm tracking-widest font-bold">THE NEUTRAL BRIDGE // INTELLIGENCE VAULT</h1>
             <p className="font-mono text-xs text-white/40">User Serial ID: NB-7729-X</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#00E5FF]/10 border border-[#00E5FF] px-3 py-1 rounded-sm flex items-center gap-2">
            <Shield size={12} className="text-[#00E5FF]" />
            <span className="font-mono text-[10px] text-[#00E5FF] font-bold tracking-wider uppercase">Institutional Access</span>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono uppercase">
             [Log Out] <X size={16} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Content Area (3 cols) */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Manuscript */}
          <div className="bg-[#1F1F1F] border border-white/10 p-6 hover:border-[#00E5FF]/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <FileText size={24} className="text-white/60 group-hover:text-[#00E5FF]" />
              <span className="font-mono text-[10px] text-[#00E5FF] uppercase border border-[#00E5FF]/30 px-2 py-0.5 rounded-sm">Primary Asset</span>
            </div>
            <h3 className="font-sans text-xl text-white font-bold mb-2">2027 System Analysis</h3>
            <p className="font-mono text-xs text-white/50 mb-6">Full Manuscript (Digital Edition)</p>
            <Button variant="outline" fullWidth className="text-xs group-hover:bg-[#00E5FF] group-hover:text-black group-hover:border-[#00E5FF]">
              Open eReader
            </Button>
          </div>

          {/* Card 2: Data Appendix */}
          <div className="bg-[#1F1F1F] border border-white/10 p-6 hover:border-[#00E5FF]/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <Database size={24} className="text-white/60 group-hover:text-[#00E5FF]" />
              <span className="font-mono text-[10px] text-white/40 uppercase">PDF // v1.4</span>
            </div>
            <h3 className="font-sans text-xl text-white font-bold mb-2">Raw Data Appendix</h3>
            <ul className="space-y-2 mb-6">
               {['ISO 20022 Mapping', 'Liquidity Formulas', 'Bridge Coefficients'].map(item => (
                 <li key={item} className="flex items-center gap-2 text-xs text-white/60 font-mono">
                   <div className="w-1 h-1 bg-[#00E5FF]"></div> {item}
                 </li>
               ))}
            </ul>
            <Button 
              variant="outline" 
              fullWidth 
              className="text-xs group-hover:bg-[#00E5FF] group-hover:text-black group-hover:border-[#00E5FF]"
              onClick={() => handleDownload('Appendix', 'RD-APPX-2027-V1.pdf')}
            >
              <Download size={14} className="mr-2" /> Download PDF
            </Button>
          </div>

          {/* Card 3: Excel Model */}
          <div className="bg-[#1F1F1F] border border-white/10 p-6 hover:border-[#00E5FF]/50 transition-colors group relative overflow-visible">
            <div className="flex justify-between items-start mb-4">
              <FileSpreadsheet size={24} className="text-white/60 group-hover:text-[#00E5FF]" />
              <span className="font-mono text-[10px] text-white/40 uppercase">XLSX // Macro-Enabled</span>
            </div>
            <h3 className="font-sans text-xl text-white font-bold mb-2 flex items-center gap-2">
              Excel Simulation Model
              <div className="group/tooltip relative">
                <Info size={14} className="text-[#00E5FF] cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-[#121212] border border-[#00E5FF] p-4 rounded shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-20">
                  <p className="font-mono text-[10px] text-[#00E5FF] font-bold mb-2 uppercase tracking-wider">Bridge Utility Coefficient</p>
                  <div className="font-mono text-sm text-white text-center py-2 bg-white/5 rounded border border-white/10 mb-2">
                    Cu = (S × L) / (V × T)
                  </div>
                  <p className="text-[10px] text-white/60 leading-relaxed font-sans">
                    Where <strong>Cu</strong> is the utility floor, <strong>V</strong> is daily settlement volume, and <strong>T</strong> is velocity. This formula defines the mathematical necessity of asset appreciation.
                  </p>
                </div>
              </div>
            </h3>
            <p className="font-mono text-xs text-white/50 mb-6">Proprietary portfolio stress-test tool.</p>
            <Button 
              variant="outline" 
              fullWidth 
              className="text-xs group-hover:bg-[#00E5FF] group-hover:text-black group-hover:border-[#00E5FF]"
              onClick={() => handleDownload('Model', 'Liquidity_Bridge_Sim_v2.xlsx')}
            >
              <Download size={14} className="mr-2" /> Download .XLSX
            </Button>
          </div>

          {/* Card 4: Strategy Briefings */}
          <div className="bg-[#1F1F1F] border border-white/10 p-6 hover:border-[#00E5FF]/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <Activity size={24} className="text-white/60 group-hover:text-[#00E5FF]" />
              <span className="font-mono text-[10px] text-white/40 uppercase">Briefings</span>
            </div>
            <h3 className="font-sans text-xl text-white font-bold mb-4">Quarterly Pulse</h3>
            <div className="space-y-3">
               <div className="flex items-center justify-between p-2 bg-white/5 border-l-2 border-[#00E5FF]">
                 <span className="text-xs text-white font-mono">Q1 2026</span>
                 <span className="text-[10px] text-[#00E5FF] uppercase font-bold">Available</span>
               </div>
               {[2, 3, 4].map(q => (
                 <div key={q} className="flex items-center justify-between p-2 bg-white/5 opacity-50 border-l-2 border-transparent">
                   <span className="text-xs text-white font-mono">Q{q} 2026</span>
                   <span className="text-[10px] text-white/40 uppercase flex items-center gap-1"><Lock size={8} /> Scheduled</span>
                 </div>
               ))}
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[#121212] border border-white/10 h-full p-6">
            <h4 className="font-mono text-xs text-[#00E5FF] uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
              System Updates // Log
            </h4>
            <div className="space-y-6">
              {[
                { date: 'Jan 19, 2026', text: 'Updated ISO 20022 migration tracking data. Shift in Eurozone volume detected.' },
                { date: 'Jan 15, 2026', text: 'Bridge Utility Coefficient revised for new settlement velocity metrics (3s -> 2.4s).' },
                { date: 'Jan 02, 2026', text: 'Q1 Briefing uploaded. Focus: The "Hidden Accumulation" phase.' }
              ].map((log, i) => (
                <div key={i} className="group">
                  <div className="font-mono text-[10px] text-[#00E5FF]/70 mb-1">{log.date}</div>
                  <p className="font-sans text-xs text-white/60 leading-relaxed group-hover:text-white transition-colors">
                    {log.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-white/10 p-6 mt-12 bg-[#121212]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] text-crimson uppercase tracking-widest flex items-center gap-2">
            <Activity size={12} className="animate-pulse" />
            Safety Protocol: Proprietary Engineering Analysis. Redistribution Prohibited.
          </p>
          <p className="text-[10px] text-white/30 font-sans">
            Systems analysis for educational purposes. Not financial advice.
          </p>
        </div>
      </div>
    </div>
  );
};
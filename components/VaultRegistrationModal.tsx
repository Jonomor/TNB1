import React from 'react';
import { X, ShieldCheck, Lock, ExternalLink, Terminal } from 'lucide-react';
import { Button } from './Button';

interface VaultRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// INSTRUCTIONS:
// 1. Create a Google Form with "Email Address" and "Amazon Order ID" fields.
// 2. Replace GOOGLE_FORM_URL below with your form's embed link (ending in ?embedded=true).
// 3. Use Google Apps Script on the Sheet to email the license key automatically.

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform?embedded=true"; 

export const VaultRegistrationModal: React.FC<VaultRegistrationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-matte-black/95 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#121212] border border-electric-teal/30 shadow-[0_0_50px_rgba(56,189,248,0.1)] rounded-sm flex flex-col h-[85vh] overflow-hidden relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
            <div className="bg-electric-teal/10 p-2 rounded-full border border-electric-teal/30">
               <ShieldCheck size={20} className="text-electric-teal" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-white leading-none mb-1">System Activation</h2>
              <p className="font-mono text-[10px] text-electric-teal uppercase tracking-widest">
                Redemption Protocol: Zero-Cost
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[#121212] relative">
           
           {/* Instructions Banner */}
           <div className="p-6 bg-white/5 border-b border-white/5">
              <div className="flex gap-4">
                 <Terminal className="text-white/40 shrink-0 mt-1" size={16} />
                 <div className="text-sm text-white/70 leading-relaxed font-sans">
                    <strong className="text-white">Instruction:</strong> Input your validated <span className="text-electric-teal font-mono">Amazon Order ID</span> below. 
                    The system will automatically generate your Letter of Authenticity and issue a unique Institutional License Key to your email.
                 </div>
              </div>
           </div>

           {/* Google Form Embed */}
           <div className="w-full h-full min-h-[500px] bg-white">
              <iframe 
                src={GOOGLE_FORM_URL} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
                className="w-full h-full"
                title="Institutional Vault Registration"
              >
                Loading System Interface...
              </iframe>
           </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0a0a0a] flex justify-between items-center">
           <div className="flex items-center gap-2 text-[10px] text-white/30 font-mono uppercase">
              <Lock size={10} />
              <span>TLS 1.3 Encrypted Connection</span>
           </div>
           <Button 
             variant="ghost" 
             className="text-xs h-8 px-3"
             onClick={() => window.open(GOOGLE_FORM_URL.replace('?embedded=true', ''), '_blank')}
           >
             Open in Secure Window <ExternalLink size={10} className="ml-2" />
           </Button>
        </div>

      </div>
    </div>
  );
};

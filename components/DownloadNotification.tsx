import React, { useEffect, useState } from 'react';
import { Check, Cpu } from 'lucide-react';

interface DownloadNotificationProps {
  fileName: string;
  visible: boolean;
}

export const DownloadNotification: React.FC<DownloadNotificationProps> = ({ fileName, visible }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 4500); // slightly less than parent timeout
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!show && !visible) return null;

  return (
    <div className={`fixed top-6 right-6 z-[80] transition-all duration-500 transform ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className="bg-[#121212] border-l-4 border-[#00E5FF] p-4 shadow-2xl flex items-start gap-4 max-w-sm">
        <div className="mt-1">
          <div className="relative">
             <Cpu size={24} className="text-[#00E5FF]" />
             <div className="absolute -bottom-1 -right-1 bg-[#121212] rounded-full p-0.5">
               <Check size={12} className="text-[#00E5FF]" />
             </div>
          </div>
        </div>
        <div>
          <h4 className="font-mono text-[#00E5FF] text-xs font-bold tracking-tighter">
            ASSET SECURED // {fileName}
          </h4>
          <p className="text-gray-400 text-xs mt-1 leading-tight font-sans">
            Proprietary systems analysis successfully synchronized.
          </p>
          <button className="text-[10px] text-[#00E5FF]/70 hover:text-[#00E5FF] underline mt-2 font-mono">
            [Open File Location]
          </button>
        </div>
      </div>
    </div>
  );
};
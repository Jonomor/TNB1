import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const NOTIFICATIONS = [
  "Institutional Edition purchased • 2m ago",
  "Retail Edition purchased • 5m ago",
  "New Pre-order confirmed • 1m ago",
  "Strategy Briefing access granted • Just now"
];

export const SocialProof: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const triggerNotification = () => {
      const notification = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
      
      setMessage(notification);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 6000); // Show for 6s
    };

    // Initial delay
    const initialTimeout = setTimeout(triggerNotification, 10000);

    // Loop with longer delay to be less distracting (30s)
    const interval = setInterval(triggerNotification, 30000); 

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm animate-in slide-in-from-left-10 duration-500 fade-in pointer-events-none">
      <div className="bg-matte-black/95 backdrop-blur-md border border-electric-teal/20 p-4 shadow-2xl rounded-sm flex items-start gap-3 pointer-events-auto">
        <div className="bg-white/5 p-2 rounded-full border border-white/10 shrink-0">
          <Terminal size={14} className="text-electric-teal" />
        </div>
        <div>
          <p className="font-mono text-[10px] text-electric-teal/50 uppercase tracking-wider mb-1">
            [DEMO FEED] Confirmed Activity
          </p>
          <p className="font-sans text-xs text-white leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const LOCATIONS = [
  "New York", "London", "Singapore", "Zurich", "Dubai", "Tokyo", "Frankfurt", 
  "Hong Kong", "Riyadh", "Geneva", "Chicago", "Shanghai"
];

const NOTIFICATIONS = [
  "secured 'The Neutral Bridge: Ripple, XRP, and the Engineered Reset'",
  "acquired 'The Neutral Bridge: System Analysis of the 2027 Reset'",
  "purchased the Digital Bundle (Retail + Institutional)"
];

export const SocialProof: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const triggerNotification = () => {
      const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      const notification = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
      
      setMessage(`Investor in ${location} ${notification}`);
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
          <p className="font-mono text-[10px] text-electric-teal uppercase tracking-wider mb-1">
            Confirmed Transaction
          </p>
          <p className="font-sans text-xs text-white leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
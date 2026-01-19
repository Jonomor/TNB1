import React, { useState, useEffect } from 'react';
import { Section } from './Section';
import { Clock, Database, Globe, Lock } from 'lucide-react';

export const ResetCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number}>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isoProgress, setIsoProgress] = useState(0);

  useEffect(() => {
    // Target: Jan 18, 2027
    const targetDate = new Date('2027-01-18T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    // Animate ISO Progress
    setTimeout(() => setIsoProgress(87), 500);

    return () => clearInterval(interval);
  }, []);

  const roadmapItems = [
    { date: 'NOV 2025', event: 'ISO 20022 Coexistence End', status: 'completed' },
    { date: 'JUN 2026', event: 'Protocol 22 Privacy Layer Live', status: 'pending' },
    { date: 'JAN 2027', event: 'The GENIUS Act / Global Reset', status: 'critical' },
  ];

  return (
    <div className="bg-matte-black border-y border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* Left: The Clock */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Clock className="text-crimson animate-pulse" size={20} />
            <h3 className="font-mono text-sm text-crimson uppercase tracking-[0.2em] font-bold">
              System Migration Countdown
            </h3>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, i) => (
              <div key={i} className="bg-charcoal border border-white/10 p-4 text-center">
                <div className="text-3xl md:text-5xl font-mono text-white font-bold mb-2">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-xs font-mono uppercase text-white/60">
              <span>ISO 20022 Global Adoption</span>
              <span className="text-electric-teal">{isoProgress}% Complete</span>
            </div>
            <div className="h-1 bg-white/10 w-full overflow-hidden">
              <div 
                className="h-full bg-electric-teal transition-all duration-1000 ease-out"
                style={{ width: `${isoProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-white/30 font-sans leading-relaxed">
              *Data reflects verified swift message type migration statistics. The window for legacy asset conversion is closing mathematically.
            </p>
          </div>
        </div>

        {/* Right: The Roadmap */}
        <div className="border-l border-white/10 pl-8 lg:pl-16 flex flex-col justify-center">
           <h3 className="font-serif text-2xl text-white mb-8">Engineering Milestones</h3>
           <div className="space-y-8">
             {roadmapItems.map((item, idx) => (
               <div key={idx} className="relative pl-8">
                 <div className={`
                   absolute left-0 top-1.5 w-3 h-3 rounded-full border 
                   ${item.status === 'completed' ? 'bg-electric-teal border-electric-teal' : 
                     item.status === 'critical' ? 'bg-crimson border-crimson animate-pulse' : 'bg-transparent border-white/30'}
                 `}></div>
                 {idx !== roadmapItems.length - 1 && (
                   <div className="absolute left-[5px] top-6 bottom-[-20px] w-[1px] bg-white/10"></div>
                 )}
                 <div className="font-mono text-xs text-white/40 mb-1">{item.date}</div>
                 <div className={`font-sans font-medium ${item.status === 'critical' ? 'text-crimson' : 'text-white'}`}>
                   {item.event}
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
};
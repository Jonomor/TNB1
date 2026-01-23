import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  label?: string;
}

export const Section: React.FC<SectionProps> = ({ id, className = '', children, label }) => {
  return (
    <section id={id} className={`py-16 md:py-24 relative scroll-mt-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {label && (
          <div className="flex justify-center mb-12">
             <span className="font-mono text-xs font-bold text-electric-teal uppercase tracking-[0.2em] border-b border-electric-teal/30 pb-2">
              {label}
             </span>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

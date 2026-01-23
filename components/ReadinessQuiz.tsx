import React, { useState } from 'react';
import { Button } from './Button';
import { Check, X, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

const QUESTIONS = [
  "Are you aware of the 3 technical pillars of the ISO 20022 migration?",
  "Can you define the difference between a 'Bridged Asset' and a 'Native Bridge'?",
  "Do you have a strategy for the 2027 'Day Zero' liquidity reset?",
  "Is your portfolio positioned for the transition from legacy SWIFT to Ripple-enabled rails?",
  "Do you understand the mathematical necessity of a neutral bridge in a CBDC-led world?"
];

export const ReadinessQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (answer: boolean) => {
    if (answer) setYesCount(prev => prev + 1);
    
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const reset = () => {
    setCurrentQuestion(0);
    setYesCount(0);
    setCompleted(false);
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isHighReadiness = yesCount >= 3;

  return (
    <div className="bg-charcoal border border-white/5 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-electric-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {!completed ? (
          <>
            <div className="inline-block mb-6">
              <span className="font-mono text-electric-teal text-xs uppercase tracking-widest border border-electric-teal/30 px-3 py-1 rounded-sm">
                System Diagnostic: Question {currentQuestion + 1} / {QUESTIONS.length}
              </span>
            </div>
            
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-8 min-h-[100px] flex items-center justify-center">
              "{QUESTIONS[currentQuestion]}"
            </h3>

            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => handleAnswer(true)}
                className="group flex flex-col items-center gap-2 p-6 bg-matte-black border border-white/10 hover:border-electric-teal transition-all w-32"
              >
                <div className="w-10 h-10 rounded-full bg-electric-teal/10 flex items-center justify-center group-hover:bg-electric-teal">
                  <Check size={20} className="text-electric-teal group-hover:text-black" />
                </div>
                <span className="font-mono text-xs uppercase text-white/60 group-hover:text-white">Yes</span>
              </button>
              
              <button 
                onClick={() => handleAnswer(false)}
                className="group flex flex-col items-center gap-2 p-6 bg-matte-black border border-white/10 hover:border-crimson transition-all w-32"
              >
                <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center group-hover:bg-crimson">
                  <X size={20} className="text-crimson group-hover:text-white" />
                </div>
                <span className="font-mono text-xs uppercase text-white/60 group-hover:text-white">No / Unsure</span>
              </button>
            </div>
          </>
        ) : (
          <div className="animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-electric-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
              {isHighReadiness ? <ShieldCheck size={32} className="text-electric-teal"/> : <AlertTriangle size={32} className="text-electric-teal"/>}
            </div>
            
            <h3 className="font-serif text-3xl text-white mb-4">Diagnostic Complete</h3>
            
            <div className="bg-white/5 border border-white/10 p-6 mb-8 max-w-xl mx-auto">
               <span className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-2">Recommended Path</span>
               <div className="text-xl font-bold text-electric-teal mb-2">
                 {isHighReadiness ? "Institutional Edition" : "Retail Edition Start"}
               </div>
               <p className="text-sm text-white/70 leading-relaxed">
                  {isHighReadiness 
                    ? "Your high awareness suggests you are ready for the deep-dive technical engineering specs. Secure the Institutional Suite to validate your strategy."
                    : "You have critical knowledge gaps regarding the 2027 transition. Start with the Retail Edition to understand the basics, or upgrade to Institutional for the full roadmap."}
               </p>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="primary" onClick={scrollToPricing} className="flex items-center gap-2">
                 Show Recommended Path <ArrowRight size={14} />
              </Button>
              <Button variant="ghost" onClick={reset}>Restart Diagnostic</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

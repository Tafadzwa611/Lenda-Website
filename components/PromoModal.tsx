import React, { useEffect, useState, useRef } from 'react';
import { Check, X, Box, Users, FileText, Server, Globe, Settings, Clock, ArrowRight } from 'lucide-react';

interface PromoModalProps {
  onNavigate: (view: 'quote') => void;
}

export const PromoModal: React.FC<PromoModalProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        
        // Start 5-second timer after first scroll
        setTimeout(() => {
          setIsVisible(true);
        }, 5000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for the exit animation to finish before unmounting/hiding
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 500); 
  };

  const handleCtaClick = () => {
    handleClose();
    setTimeout(() => {
        onNavigate('quote');
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100 animate-in fade-in'}`}
        onClick={handleClose}
      ></div>

      {/* Modal Container */}
      <div 
        className={`
          relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row
          ${isClosing ? 'promo-exit' : 'promo-enter'}
        `}
      >
        {/* Ribbon - Hidden on small mobile to save space */}
        <div className="hidden sm:block absolute top-0 right-0 z-10">
           <div className="bg-emerald-500 text-white text-xs font-bold px-8 py-1 transform rotate-45 translate-x-8 translate-y-4 shadow-md">
             FREE TRIAL
           </div>
        </div>

        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 p-1.5 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Left Side: Features */}
        <div className="flex-1 p-6 md:p-8 bg-slate-50 flex flex-col justify-center">
          <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2 animate-in slide-in-from-left-4 fade-in duration-700">
            Introducing <span className="text-emerald-500">Lenda Starter</span>
          </h3>

          <ul className="space-y-3">
            {[
              { icon: Box, text: "Client, Group, Loan & Accounting Modules" },
              { icon: Users, text: "Digital Field Application for 5 users" },
              { icon: FileText, text: "50+ Reports and Data Export Module" },
              { icon: Server, text: "Up to 100,000 API Requests a month" },
              { icon: Globe, text: "Up to 3,000 End Clients" },
              { icon: Settings, text: "Self onboarding & Configuration" },
              { icon: Clock, text: "Ticket support within 24 hours" }
            ].map((item, idx) => (
              <li 
                key={idx} 
                className="flex items-start gap-2.5 text-slate-600 text-xs md:text-sm animate-in slide-in-from-bottom-2 fade-in"
                style={{ animationDelay: `${100 + (idx * 50)}ms`, animationFillMode: 'forwards' }}
              >
                <item.icon size={16} className="shrink-0 text-emerald-500 mt-0.5" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          
          <div className="hidden md:flex mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 items-center gap-2 animate-in fade-in delay-700">
             <Server size={14} className="text-slate-400" />
             Detailed demo and system overview session included (2 hours)
          </div>
        </div>

        {/* Right Side: CTA */}
        <div className="w-full md:w-[300px] bg-white p-6 md:p-8 flex flex-col justify-center border-l border-slate-100 relative shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-none">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-sky-500 md:hidden"></div>
           
           <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-2 md:mb-4 animate-in slide-in-from-right-4 fade-in delay-300">
             Free Trial
           </h2>
           
           <div className="text-xs md:text-sm text-slate-500 mb-4 md:mb-6 space-y-1 animate-in slide-in-from-right-4 fade-in delay-500">
             <p>After 1 month price: <strong className="text-slate-900">$499/Mo</strong></p>
             <p className="text-emerald-600 font-medium">*Limited time offer</p>
           </div>

           <div className="space-y-3 animate-in zoom-in fade-in delay-700">
             <button 
               onClick={handleCtaClick}
               className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
             >
               GET 1 MONTH FREE
             </button>
             <button 
               onClick={handleCtaClick}
               className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
             >
               LEARN MORE <ArrowRight size={16} />
             </button>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes promo-enter {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes promo-exit {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0; }
        }
        .promo-enter {
          animation: promo-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .promo-exit {
          animation: promo-exit 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};
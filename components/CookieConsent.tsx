import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [showContainer, setShowContainer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented/rejected in this session or previously
    const consent = localStorage.getItem('lenda_cookie_consent');
    
    if (!consent) {
      setShowContainer(true);
      // Delay slightly to ensure DOM is ready, then trigger slide-up animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // 1.5s delay before starting animation
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (choice: 'accepted' | 'rejected') => {
    localStorage.setItem('lenda_cookie_consent', choice);
    setIsVisible(false); // Trigger slide-down exit
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      setShowContainer(false);
    }, 1500); 
  };

  if (!showContainer) return null;

  return (
    <div 
      className={`
        fixed bottom-0 left-0 right-0 z-[1500] p-4 flex justify-center pointer-events-none
        transition-all duration-[1500ms] ease-out transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
      `}
    >
      <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-6 md:p-5 max-w-4xl w-full border border-slate-700 pointer-events-auto relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          
          <div className="flex items-start gap-4 flex-1">
            <div className="bg-slate-800 p-3 rounded-xl shrink-0 text-sky-400">
              <Cookie size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">We use cookies</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={() => handleChoice('rejected')}
              className="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Preferences
            </button>
            <button 
              onClick={() => handleChoice('rejected')}
              className="px-6 py-2.5 rounded-lg border border-slate-600 text-sm font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              Reject All
            </button>
            <button 
              onClick={() => handleChoice('accepted')}
              className="px-6 py-2.5 rounded-lg text-white text-sm font-bold shadow-lg shadow-sky-500/20 transition-all shine-skeleton-btn relative overflow-hidden bg-sky-600 hover:bg-sky-500"
            >
              Accept All
            </button>
          </div>

        </div>
        
        {/* Mobile Close X */}
        <button 
          onClick={() => handleChoice('rejected')} 
          className="absolute top-2 right-2 p-2 text-slate-500 hover:text-white md:hidden z-20"
        >
          <X size={16} />
        </button>
      </div>

      <style>{`
        .shine-skeleton-btn {
          /* Gradient setup for the shine effect */
          background-image: linear-gradient(
            100deg,
            rgba(255, 255, 255, 0) 20%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 80%
          );
          background-size: 200% 100%;
          background-position: -200% 0; /* Start off-screen left */
          
          /* Animation: name | duration | timing-function | delay | iteration-count | direction | fill-mode */
          animation: shine-twice 1.5s ease-in-out 3s 2 normal forwards; 
        }

        @keyframes shine-twice {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};

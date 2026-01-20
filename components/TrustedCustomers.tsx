import React, { useRef, useState, useEffect } from 'react';
import { Building2, TrendingUp, Users, Landmark, Smartphone, PieChart, CreditCard, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

const clients = [
  { name: "Golden Knot", logo: "https://i.ibb.co/39XZWHnf/golden-knot.png" },
  { name: "Trebox Finance", logo: "https://i.ibb.co/39Zm3LHb/trebox-finance.png" },
  { name: "Happycash", logo: "https://i.ibb.co/SDnQcLxR/happycash.png" },
  { name: "Doves Financial", logo: "https://i.ibb.co/MDT75trT/doves-zimbabwe-logo.jpg" },
  { name: "LUPFIN Financial Services", logo: "https://i.ibb.co/FkHHnkK4/lupfin.png" },
  { name: "KCI Management Consultants", logo: "https://i.ibb.co/nqVsnWt4/kci.png" },
  { name: "Mitach", logo: "https://i.ibb.co/fzyKc7rF/mitach.png" },
  { name: "Theocash", logo: "https://i.ibb.co/gZ3yHWh8/theocash.png" },
  { name: "Maxbark Inv.", icon: <PieChart size={24} /> },
  { name: "Funamel", icon: <CreditCard size={24} /> }
];

// Double items for infinite marquee effect
const marqueeItems = [...clients, ...clients, ...clients];

export const TrustedCustomers: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Manual scroll logic
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white border-y border-slate-100 relative overflow-hidden group">
      <div className="container mx-auto px-4 md:px-6 mb-12 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
           Trusted by <span className="text-sky-600">Industry Leaders</span>
        </h2>
        <p className="text-slate-500">Powering financial innovation across the African continent.</p>
      </div>

      <div className="relative w-full">
        {/* Navigation Buttons - Hidden on mobile, shown on hover desktop */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-slate-200 text-slate-700 hover:bg-sky-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-slate-200 text-slate-700 hover:bg-sky-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
          aria-label="Scroll Right"
        >
          <ChevronRight size={24} />
        </button>

        {/* Marquee Wrapper */}
        <div 
          className="flex overflow-x-auto no-scrollbar scroll-smooth relative"
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`flex gap-8 px-4 animate-marquee ${isPaused ? 'pause-animation' : ''}`}>
            {marqueeItems.map((client, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center justify-center shrink-0 w-[200px] md:w-[280px] p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:border-sky-200 transition-all duration-300"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-4 bg-white rounded-xl p-3 shadow-sm border border-slate-50 overflow-hidden">
                  {client.logo ? (
                    <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <div className="text-sky-500">{client.icon || <Building2 size={24} />}</div>
                  )}
                </div>
                <h3 className="text-xs md:text-sm font-bold text-slate-800 text-center truncate w-full px-2">
                  {client.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Fades */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-200px * ${clients.length} - 2rem * ${clients.length})); }
        }
        
        @media (min-width: 768px) {
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-280px * ${clients.length} - 2rem * ${clients.length})); }
          }
        }

        .animate-marquee {
          animation: marquee 50s linear infinite;
        }

        .pause-animation {
          animation-play-state: paused;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};
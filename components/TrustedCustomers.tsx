import React, { useEffect, useState } from 'react';
import { Building2, TrendingUp, Users, Landmark, Smartphone, PieChart, CreditCard, Shield, CheckCircle2 } from 'lucide-react';

// --- Client Data ---
const clients = [
  { 
    name: "Golden Knot", 
    desc: "Engineered a complete digital transformation. Migrated legacy databases to Cloud CBS, reducing loan processing time by 60%.", 
    logo: "https://i.ibb.co/39XZWHnf/golden-knot.png",
    icon: <Building2 size={24} />,
    color: "text-amber-600",
    bg: "bg-amber-50",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Trebox Finance", 
    desc: "Developed a bespoke credit scoring algorithm using mobile money history. Lowered default rates by 22% in Q1.", 
    logo: "https://i.ibb.co/39Zm3LHb/trebox-finance.png",
    icon: <TrendingUp size={24} />,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Happycash", 
    desc: "Integrated directly with SSB. Eliminated manual schedules, reducing rejected deductions to near zero.", 
    logo: "https://i.ibb.co/SDnQcLxR/happycash.png",
    icon: <Users size={24} />,
    color: "text-blue-600",
    bg: "bg-blue-50",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Doves Financial", 
    desc: "Deployed Enterprise Architecture for high-volume policy payments. Now processing 50,000+ transactions monthly.", 
    logo: "https://i.ibb.co/MDT75trT/doves-zimbabwe-logo.jpg",
    icon: <Landmark size={24} />,
    color: "text-purple-600",
    bg: "bg-purple-50",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Lupfin", 
    desc: "Built a custom Android lending app. Agents now onboard clients and capture KYC offline in remote areas.", 
    logo: "https://i.ibb.co/wNv4Xws7/logo-lupfin-1.png",
    icon: <Smartphone size={24} />,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Maxbark Inv.", 
    desc: "Implemented real-time Portfolio Dashboard. Instant visibility into PAR and liquidity for faster decisions.", 
    icon: <PieChart size={24} />,
    color: "text-rose-600",
    bg: "bg-rose-50",
    image: "https://images.unsplash.com/photo-1543286386-713df548e9cc?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Funamel", 
    desc: "Automated disbursements via EcoCash Bulk Payer API. Instant wallet funding increased customer satisfaction.", 
    icon: <CreditCard size={24} />,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Theocash", 
    desc: "Deployed Risk Analysis Module flagging fraud patterns. Saved significant potential bad debts.", 
    logo: "https://i.ibb.co/gZ3yHWh8/theocash.png",
    icon: <Shield size={24} />,
    color: "text-slate-600",
    bg: "bg-slate-100",
    image: "https://images.unsplash.com/photo-1614064641938-3e852943af97?auto=format&fit=crop&w=800&q=80"
  }
];

// Duplicate clients to create an infinite-like feel
const DISPLAY_CLIENTS = [...clients, ...clients, ...clients];

export const TrustedCustomers: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(clients.length); // Start in the middle set
  const [phase, setPhase] = useState<'SCROLLING' | 'PRESENTING' | 'WAITING' | 'RETRACTING'>('SCROLLING');
  
  // Animation Timing Configuration
  const SCROLL_DURATION = 800;    // ms to move to next card
  const PRESENT_DURATION = 2000;  // ms for the build-up animation
  const WAIT_DURATION = 1000;     // ms to wait after build-up
  const RETRACT_DURATION = 600;   // ms to reverse animation

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const runSequence = () => {
      // 1. SCROLLING -> PRESENTING
      if (phase === 'SCROLLING') {
        timeoutId = setTimeout(() => {
          setPhase('PRESENTING');
        }, SCROLL_DURATION);
      }
      
      // 2. PRESENTING -> WAITING
      else if (phase === 'PRESENTING') {
        timeoutId = setTimeout(() => {
          setPhase('WAITING');
        }, PRESENT_DURATION);
      }
      
      // 3. WAITING -> RETRACTING
      else if (phase === 'WAITING') {
        timeoutId = setTimeout(() => {
          setPhase('RETRACTING');
        }, WAIT_DURATION);
      }
      
      // 4. RETRACTING -> SCROLLING (Next Card)
      else if (phase === 'RETRACTING') {
        timeoutId = setTimeout(() => {
          setCurrentIndex(prev => {
            const next = prev + 1;
            // Infinite Loop Logic: If we reach the end of the 2nd set, jump back to 1st set
            if (next >= clients.length * 2) {
              return clients.length; 
            }
            return next;
          });
          setPhase('SCROLLING');
        }, RETRACT_DURATION);
      }
    };

    runSequence();

    return () => clearTimeout(timeoutId);
  }, [phase, currentIndex]);

  // Calculate transform to center the current card
  const getTranslateX = () => {
    const isMobile = window.innerWidth < 768;
    const cardWidth = isMobile ? 300 : 400;
    const gap = isMobile ? 20 : 60;
    const stride = cardWidth + gap;
    
    // Center alignment
    const screenCenter = window.innerWidth / 2;
    const cardCenterOffset = cardWidth / 2;
    
    const currentCardX = currentIndex * stride;
    
    return screenCenter - cardCenterOffset - currentCardX;
  };

  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const updatePos = () => setTranslateX(getTranslateX());
    window.addEventListener('resize', updatePos);
    updatePos();
    return () => window.removeEventListener('resize', updatePos);
  }, [currentIndex]); 

  return (
    <section className="relative h-screen min-h-[850px] bg-slate-50 overflow-hidden flex flex-col justify-center">
      
      {/* Background Decor - Subtle Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent z-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 mb-12 text-center relative z-20">
        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
           Trusted by <span className="text-sky-600">Industry Leaders</span>
        </h2>
        <p className="text-slate-600 text-lg">Powering Zimbabwe's financial ecosystem.</p>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full h-[500px] flex items-center z-10">
        <div 
          className="flex absolute left-0 transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1)"
          style={{ 
            transform: `translate3d(${translateX}px, 0, 0)`,
          }}
        >
          {DISPLAY_CLIENTS.map((client, idx) => {
            const isActive = idx === currentIndex;
            const isPresenting = isActive && (phase === 'PRESENTING' || phase === 'WAITING');
            
            return (
              <div 
                key={idx}
                className={`
                  relative shrink-0 rounded-3xl border shadow-xl overflow-hidden
                  transition-all duration-500 ease-out bg-white
                  ${isActive 
                    ? 'z-20 opacity-100 border-slate-200' 
                    : 'z-10 opacity-40 scale-90 blur-[1px] border-slate-100 grayscale'
                  }
                  ${isPresenting ? 'scale-110 shadow-2xl ring-1 ring-slate-100 -translate-y-4' : 'scale-100'}
                `}
                style={{ 
                  width: window.innerWidth < 768 ? '300px' : '400px',
                  height: window.innerWidth < 768 ? '380px' : '420px',
                  marginRight: window.innerWidth < 768 ? '20px' : '60px',
                }}
              >
                {/* Card Background Image (Faded) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <img src={client.image} className="w-full h-full object-cover" alt="" />
                </div>

                <div className="relative z-10 h-full flex flex-col p-8 items-center text-center">
                  
                  {/* 1. Logo */}
                  <div 
                    className={`
                      mb-6 p-4 rounded-2xl shadow-sm border w-24 h-24 flex items-center justify-center
                      transition-transform duration-500 delay-100 bg-white border-slate-100
                      ${isPresenting ? 'scale-125 rotate-0 shadow-lg' : 'scale-100'}
                    `}
                  >
                     {(client as any).logo ? (
                        <img src={(client as any).logo} alt={client.name} className="w-full h-full object-contain" />
                     ) : (
                        <div className={`${client.color}`}>{client.icon}</div>
                     )}
                  </div>

                  {/* 2. Company Name (Typing Effect) */}
                  <div className="h-10 flex items-center justify-center overflow-hidden mb-2">
                     <h3 
                       className={`
                         text-2xl font-bold text-slate-900 whitespace-nowrap overflow-hidden
                         transition-all duration-700
                       `}
                       style={{ 
                         maxWidth: isPresenting ? '100%' : '0',
                         opacity: isPresenting ? 1 : 0,
                         transitionDelay: '400ms'
                       }}
                     >
                       {client.name}
                     </h3>
                  </div>

                  {/* 3. Verified Badge (Type + Tick) */}
                  <div className="h-6 flex items-center justify-center gap-2 mb-6 overflow-hidden">
                     <div 
                       className="flex items-center gap-1.5 transition-all duration-500"
                       style={{ 
                         transform: isPresenting ? 'translateY(0)' : 'translateY(20px)',
                         opacity: isPresenting ? 1 : 0,
                         transitionDelay: '800ms'
                       }}
                     >
                        <CheckCircle2 
                          size={16} 
                          className={`text-sky-500 transition-all duration-300 ${isPresenting ? 'scale-100' : 'scale-0'}`} 
                          style={{ transitionDelay: '1000ms' }}
                        />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Verified Client</span>
                     </div>
                  </div>

                  {/* 4. Description (Fast Typing) */}
                  <div className="relative flex-1 w-full flex items-center justify-center">
                     <p 
                        className={`
                          text-sm text-slate-600 leading-relaxed transition-all duration-1000
                        `}
                        style={{
                           // Masking effect for "typing" paragraphs
                           clipPath: isPresenting ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                           opacity: isPresenting ? 1 : 0.5,
                           transitionDelay: '1200ms',
                           transitionTimingFunction: 'steps(40, end)' 
                        }}
                     >
                       "{client.desc}"
                     </p>
                  </div>

                  {/* Footer Decoration */}
                  <div 
                    className={`mt-auto pt-4 border-t border-slate-100 w-full flex justify-between items-center text-[10px] text-slate-400 transition-opacity duration-500 ${isPresenting ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1500ms' }}
                  >
                     <span>ID: #{1000 + idx}</span>
                     <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-emerald-600 font-medium">Active</span>
                     </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
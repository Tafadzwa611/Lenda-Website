import React, { useEffect, useRef, useState } from 'react';
import { Target, Lightbulb, Heart, Clock, Zap, ShieldCheck, GraduationCap, Mail, Phone, ArrowRight } from 'lucide-react';
import { TrustedCustomers } from './TrustedCustomers';

// --- UTILITIES ---

const useScrambleText = (text: string, speed: number = 30) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let iteration = 0;
    let interval: any = null;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    const startScramble = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, speed);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startScramble();
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    const el = document.getElementById('scramble-target');
    if (el) observer.observe(el);

    startScramble();

    return () => clearInterval(interval);
  }, [text]);

  return { displayText };
};

const DecryptHeader: React.FC<{ text: string; className?: string; id?: string }> = ({ text, className, id }) => {
  const { displayText } = useScrambleText(text);
  return (
    <h2 id={id} className={`font-mono cursor-default ${className}`}>
      {displayText}
    </h2>
  );
};

// --- TEAM DATA ---
const teamMembers = [
  {
    id: 1,
    name: "Tanaka Maramba",
    role: "CEO",
    fullRole: "Chief Executive Officer",
    qualifications: "B.Eng Electronics (NUST)",
    bio: "A seasoned software developer with five years of experience in the financial industry. Tanaka specializes in developing loan management systems, chatbots, and SSB integrations.",
    email: "tanaka@lendatech.co.zw",
    phone: "+263 778 325 262",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Tafadzwa Kuno",
    role: "Snr Dev",
    fullRole: "Senior Software Developer",
    qualifications: "B.Sc Applied Mathematics (NUST)",
    bio: "Dedicated software developer with a strong foundation in mathematical principles. Tafadzwa's expertise and passion for coding enable him to design and implement innovative solutions.",
    email: "tafadzwa@lendatech.co.zw",
    phone: "+263 776 837 662",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Robson Muvani",
    role: "Snr Dev",
    fullRole: "Senior Software Developer",
    qualifications: "BBS, MBA, DSA, MCA",
    bio: "Canadian national with over a decade of experience in Telecommunications and Health Technology. A Certified IT Programmer and Senior Information Systems Manager.",
    email: "info@lendatech.co.zw",
    phone: "+186 7445 1423",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Tamuka Mutinhima",
    role: "Strategist",
    fullRole: "Chief Business Strategist",
    qualifications: "BA Honors in Development Studies",
    bio: "Dynamic professional with extensive experience in microfinance. Dedicated to financial inclusion and poverty alleviation.",
    email: "tamuka@lendatech.co.zw",
    phone: "+263 785 513 366",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Theresa Chikwinya",
    role: "Accountant",
    fullRole: "Accountant Manager",
    qualifications: "Bachelor's in Accounting (MSU)",
    bio: "Experienced accountant with a strong background in the microfinance industry since 2019. Expert in financial reporting and budgeting.",
    email: "info@lendatech.co.zw",
    phone: "+263 774 030 987",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  }
];

export const About: React.FC = () => {
  const [year, setYear] = useState(2000);
  const storyRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  
  // Orbit State
  const [centerId, setCenterId] = useState(1);
  const [orbitIds, setOrbitIds] = useState<number[]>([2, 3, 4, 5]); // Initial orbit members
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Transition State
  const [isSwapping, setIsSwapping] = useState(false);
  const [flyingData, setFlyingData] = useState<{
    id: number;
    img: string;
    start: DOMRect;
    end: DOMRect;
    direction: 'in' | 'out';
  }[]>([]);
  const [hiddenIds, setHiddenIds] = useState<number[]>([]);

  // Refs for positions
  const centerRef = useRef<HTMLDivElement>(null);
  const orbitRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Prevent auto-scroll on mount - ensure we start at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Year Counter Animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 2000;
        const end = 2020;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const currentYear = Math.floor(start + (end - start) * progress);
          setYear(currentYear);
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });

    if (storyRef.current) observer.observe(storyRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMemberClick = (clickedId: number) => {
    if (isSwapping || clickedId === centerId) return;

    const clickedMember = teamMembers.find(m => m.id === clickedId);
    const currentCenterMember = teamMembers.find(m => m.id === centerId);
    
    if (!clickedMember || !currentCenterMember) return;

    const clickedEl = orbitRefs.current.get(clickedId);
    const centerEl = centerRef.current;

    if (clickedEl && centerEl) {
      setIsSwapping(true);
      const startRect = centerEl.getBoundingClientRect(); // Center position
      const endRect = clickedEl.getBoundingClientRect();   // Orbit position

      // Prepare flying animation data
      setFlyingData([
        {
          id: currentCenterMember.id,
          img: currentCenterMember.img,
          start: startRect,
          end: endRect, // Old center goes to clicked slot
          direction: 'out'
        },
        {
          id: clickedMember.id,
          img: clickedMember.img,
          start: endRect,
          end: startRect, // Clicked member goes to center
          direction: 'in'
        }
      ]);

      // Hide real elements during swap
      setHiddenIds([centerId, clickedId]);

      // Execute Logic Swap
      // We replace the clicked slot with the old center member to "fill the hole"
      const clickedSlotIndex = orbitIds.indexOf(clickedId);
      const newOrbitIds = [...orbitIds];
      newOrbitIds[clickedSlotIndex] = centerId;

      setOrbitIds(newOrbitIds);
      setCenterId(clickedId);

      // Clean up after animation
      setTimeout(() => {
        setIsSwapping(false);
        setFlyingData([]);
        setHiddenIds([]);
      }, 1200); // Match CSS animation duration
    }
  };

  const activeMember = teamMembers.find(m => m.id === centerId) || teamMembers[0];

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      
      {/* 1. HERO */}
      <div className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80" 
            alt="Lenda Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6 pointer-events-none">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase mb-6 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Systems Online
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-tight drop-shadow-xl">
              BUILDING THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-sky-400 animate-text-shine bg-[length:200%_auto]">
                FUTURE OF FINANCE
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-2xl leading-relaxed border-l-4 border-sky-500 pl-6 font-light drop-shadow-md">
              We are not just a software company. We are the <span className="text-sky-300 font-medium">digital architects</span> of Africa's financial evolution.
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>
      </div>

      {/* 2. WHO WE ARE */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <DecryptHeader id="scramble-target" text="IDENTITY VERIFIED" className="text-sm font-bold text-sky-600 tracking-widest uppercase" />
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Lenda Technologies. <br />
                <span className="text-slate-400">Coding the uncodable.</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Based in Masvingo, operating in the cloud. Since 2020, we have been dismantling legacy barriers in the microfinance sector. We replace paper with pixels, delays with instant execution, and doubt with data.
              </p>
            </div>
            <div className="relative group perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-600 to-purple-600 rounded-[2rem] transform rotate-6 scale-95 opacity-20 group-hover:rotate-3 transition-transform duration-500"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.01]">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                  alt="Team Collaboration" 
                  className="w-full object-cover transition-all duration-700 h-[600px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR STORY */}
      <section id="our-story" ref={storyRef} className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/3 text-center md:text-left">
              <div className="inline-block relative">
                <span className="text-[10rem] md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-800 leading-none tracking-tighter">
                  {year}
                </span>
                <div className="absolute -right-8 top-10 w-16 h-16 bg-sky-500 rounded-full blur-[40px] animate-pulse"></div>
              </div>
              <p className="text-sky-400 font-medium mt-4 text-xl tracking-widest uppercase">The Beginning</p>
            </div>
            <div className="md:w-2/3 space-y-8 border-l border-slate-700 pl-8 md:pl-16">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold">The Origin</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  While the world automated, African finance often relied on paper. We saw the gap. We wrote the code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE TEAM: Advanced Orbit System */}
      <section id="our-team" className="py-24 md:py-32 bg-white relative overflow-hidden">
        
        {/* Flying Transition Layer */}
        {isSwapping && (
          <div className="fixed inset-0 z-[100] pointer-events-none">
             {flyingData.map((item) => {
               const dx = item.end.left - item.start.left;
               const dy = item.end.top - item.start.top;
               const scaleX = item.end.width / item.start.width;
               const scaleY = item.end.height / item.start.height;

               return (
                 <div 
                   key={item.id}
                   className="absolute rounded-full overflow-hidden border-4 border-white shadow-xl bg-white"
                   style={{
                     top: item.start.top,
                     left: item.start.left,
                     width: item.start.width,
                     height: item.start.height,
                     animation: `fly-swap 1.2s cubic-bezier(0.2, 0, 0.2, 1) forwards`,
                     zIndex: item.direction === 'in' ? 60 : 50,
                   }}
                 >
                    <img src={item.img} className="w-full h-full object-cover" alt="" />
                    <style>{`
                      @keyframes fly-swap {
                        0% { transform: translate(0, 0) scale(1); }
                        100% { transform: translate(${dx}px, ${dy}px) scale(${scaleX}); }
                      }
                    `}</style>
                 </div>
               );
             })}
          </div>
        )}

        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">The Team</h2>
            <p className="text-slate-600">The minds behind the code.</p>
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-center gap-12 xl:gap-24">
            
            <div className="relative w-full aspect-square flex items-center justify-center orbit-system-container">
              <style>{`
                .orbit-system-container {
                  --orbit-radius: 120px;
                  --item-size: 70px;
                  --center-size: 140px;
                  max-width: 320px;
                }
                
                @media (min-width: 768px) {
                  .orbit-system-container {
                    --orbit-radius: 220px;
                    --item-size: 100px;
                    --center-size: 180px;
                    max-width: 600px;
                  }
                }

                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes counter-spin {
                  from { transform: rotate(360deg); }
                  to { transform: rotate(0deg); }
                }
                
                .orbit-wrapper {
                  position: absolute;
                  inset: 0;
                  animation: spin 30s linear infinite;
                }
                
                .orbit-paused .orbit-wrapper, 
                .orbit-paused .orbit-counter-spinner {
                  animation-play-state: paused;
                }

                .orbit-item {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  margin-top: calc(var(--item-size) / -2);
                  margin-left: calc(var(--item-size) / -2);
                  width: var(--item-size);
                  height: var(--item-size);
                }

                .orbit-counter-spinner {
                  width: 100%;
                  height: 100%;
                  animation: counter-spin 30s linear infinite;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
              `}</style>

              <div className="absolute inset-0 m-auto rounded-full border border-dashed border-slate-300/50" style={{ width: 'calc(var(--orbit-radius) * 2)', height: 'calc(var(--orbit-radius) * 2)' }}></div>
              <div className="absolute inset-0 m-auto rounded-full border border-slate-100" style={{ width: 'calc(var(--orbit-radius) * 2.8)', height: 'calc(var(--orbit-radius) * 2.8)' }}></div>

              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                 <div ref={centerRef} className="pointer-events-auto">
                    <div 
                      className={`relative flex flex-col items-center gap-3 transition-opacity duration-0 ${hiddenIds.includes(centerId) ? 'opacity-0' : 'opacity-100'}`}
                      style={{ width: 'var(--center-size)' }}
                    >
                       <div 
                         className="rounded-full overflow-hidden border-4 border-sky-500 bg-white shadow-2xl ring-4 ring-sky-500/10 aspect-square w-full"
                       >
                         <img 
                           src={activeMember.img} 
                           alt={activeMember.name} 
                           className="w-full h-full object-cover"
                         />
                       </div>
                       
                       <div className="text-center animate-in fade-in zoom-in duration-500">
                          <p className="font-bold text-slate-900 text-lg leading-tight">{activeMember.name}</p>
                          <p className="font-medium text-sky-600 text-sm leading-tight">{activeMember.role}</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className={`orbit-wrapper ${hoveredId !== null ? 'orbit-paused' : ''}`}>
                {orbitIds.map((memberId, index) => {
                  const member = teamMembers.find(m => m.id === memberId);
                  if (!member) return null;

                  const totalSlots = orbitIds.length;
                  const angle = (360 / totalSlots) * index;

                  return (
                    <div 
                      key={member.id}
                      className="orbit-item"
                      style={{
                        transform: `rotate(${angle}deg) translate(var(--orbit-radius))`
                      }}
                      onMouseEnter={() => setHoveredId(member.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => handleMemberClick(member.id)}
                    >
                      <div className="orbit-counter-spinner">
                         <div style={{ transform: `rotate(-${angle}deg)`, width: '100%', height: '100%' }}>
                            <div 
                              ref={el => { if(el) orbitRefs.current.set(member.id, el); }}
                              className={`
                                w-full h-full rounded-full overflow-hidden border-4 border-white bg-white shadow-lg 
                                hover:border-sky-200 hover:scale-110 cursor-pointer transition-all duration-300
                                ${hiddenIds.includes(member.id) ? 'opacity-0' : 'opacity-100'}
                              `}
                            >
                              <img 
                                src={member.img} 
                                alt={member.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                         </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div ref={detailsRef} className="max-w-md w-full px-4 relative scroll-mt-32">
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 shadow-xl relative overflow-hidden transition-all duration-500">
                <div key={activeMember.id} className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl animate-in fade-in duration-1000"></div>
                
                <div className="relative z-10">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                      {activeMember.fullRole}
                    </span>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1 animate-in slide-in-from-bottom-2 fade-in duration-500 key={activeMember.id}">
                      {activeMember.name}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mt-2">
                      <GraduationCap size={16} className="text-purple-500" />
                      {activeMember.qualifications}
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-slate-200 mb-6"></div>
                  
                  <p className="text-slate-600 leading-relaxed mb-8 min-h-[80px]">
                    {activeMember.bio}
                  </p>

                  <div className="grid grid-cols-1 gap-3">
                    <a href={`mailto:${activeMember.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all group">
                      <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                        <Mail size={16} />
                      </div>
                      <span className="text-sm font-medium text-slate-600">{activeMember.email}</span>
                      <ArrowRight size={14} className="ml-auto text-slate-300 group-hover:text-sky-500" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="our-values" className="py-32 bg-slate-50 relative">
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Core Values</h2>
            <p className="text-slate-600">The immutable logic behind our operations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Client Centricity", desc: "Accelerate growth.", icon: <Heart size={32} className="text-red-500" />, bg: "bg-red-50" },
              { title: "Radical Innovation", desc: "Disrupt legacy workflows.", icon: <Zap size={32} className="text-amber-500" />, bg: "bg-amber-50" },
              { title: "Absolute Integrity", desc: "Transparency hardcoded.", icon: <ShieldCheck size={32} className="text-emerald-500" />, bg: "bg-emerald-50" },
              { title: "Precision Timing", desc: "Deploy ahead of curve.", icon: <Clock size={32} className="text-sky-500" />, bg: "bg-sky-50" }
            ].map((value, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 text-center group">
                <div className={`w-20 h-20 mx-auto ${value.bg} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h4>
                <p className="text-slate-500 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white">
              <Target className="w-12 h-12 text-sky-400 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                To engineer durable, refined software infrastructure that empowers regional institutions to compete on a global scale.
              </p>
            </div>
            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
              <Lightbulb className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-3xl font-bold mb-4 text-slate-900">Our Vision</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                To become the definitive technology partner for Africa, transforming how value is exchanged, managed, and grown.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustedCustomers />
    </div>
  );
};
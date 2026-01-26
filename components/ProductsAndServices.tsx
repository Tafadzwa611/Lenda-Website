import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Cpu, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

const services = [
  {
    id: 'core-banking',
    title: "Core Banking System",
    short: "CBS",
    desc: "A robust, multi-currency engine for loan management, client tracking, and real-time accounting modules designed for the African financial sector.",
    icon: <Briefcase size={28} className="text-sky-500" />,
    features: ["Loan Origination & Lifecycle", "Integrated GL Accounting", "Deposits & Savings Module"]
  },
  {
    id: 'custom',
    title: "Digitalisation & AI",
    short: "Digital",
    desc: "Modernize manual workflows into automated digital systems including field agent apps, SSB integrations, and intelligent WhatsApp chatbots.",
    icon: <Cpu size={28} className="text-purple-500" />,
    features: ["Field Agent Mobile Apps", "Process Automation", "WhatsApp & Web Chatbots"]
  }
];

interface ProductsAndServicesProps {
  onNavigate?: (view: 'home' | 'about' | 'contact' | 'quote' | 'core-banking' | 'ssb' | 'custom' | 'chatbots' | 'integration') => void;
}

export const ProductsAndServices: React.FC<ProductsAndServicesProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleCardClick = (id: string) => {
    if (onNavigate) {
      if (id === 'core-banking') onNavigate('core-banking');
      else if (id === 'custom') onNavigate('custom');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="products" ref={sectionRef} className="relative bg-white overflow-hidden pb-24">
      
      {/* 1. TOP BANNER: Full-width Image with Dark Overlay */}
      <div className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://i.ibb.co/7J5VTmTL/site.jpg" 
          alt="Expertise Banner" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
        />
        {/* Dark Overlay with Fade */}
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-white"></div>
        
        {/* Title Text Content */}
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <div className={`max-w-4xl mx-auto opacity-0 ${isVisible ? 'animate-slide-in-bottom' : ''}`}>
             <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
               Our <span className="text-sky-400">Core Expertise</span>
             </h2>
             <p className="text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
               Innovative financial technology tailored for growth and operational excellence.
             </p>
          </div>
        </div>
      </div>

      {/* 2. CONTAINERS: Service Cards Overlayed/Below */}
      <div className="container relative z-20 mx-auto px-4 md:px-6 -mt-20 md:-mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <div 
              key={service.id}
              className={`
                group opacity-0 ${isVisible ? 'animate-slide-in-bottom' : ''} 
                bg-white rounded-[2.5rem] p-8 md:p-12 
                border-2 border-slate-200 shadow-2xl hover:border-sky-500 
                transition-all duration-500 hover:-translate-y-2
              `}
              style={{ animationDelay: `${idx * 200 + 400}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${service.id === 'core-banking' ? 'bg-sky-50 text-sky-600' : 'bg-purple-50 text-purple-600'}`}>
                  {service.icon}
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 transition-all">
                  <Zap size={14} className="animate-pulse" />
                  {service.short} Module
                </div>
              </div>

              <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {service.desc}
              </p>

              <div className="space-y-3 mb-10">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex pt-4">
                <button 
                  onClick={() => handleCardClick(service.id)}
                  className="lenda-button w-full sm:w-auto"
                >
                  <span>Explore {service.short} Solution</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                    <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                    <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                    <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute -z-10 bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_30%_70%,#f0f9ff_0%,transparent_50%)] opacity-40"></div>
      <div className="absolute -z-10 top-1/2 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-30"></div>
      
    </section>
  );
};

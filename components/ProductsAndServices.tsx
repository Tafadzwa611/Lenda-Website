import React, { useEffect, useRef, useState } from 'react';

const services = [
  {
    id: 'core-banking',
    cardId: 'service-core-banking',
    title: "Core Banking System",
    short: "CBS",
    desc: "Automate and manage loan processes, clients, groups, and accounting in a flexible way.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    direction: "animate-slide-in-left"
  },
  {
    id: 'custom',
    cardId: 'service-digitalisation',
    title: "Digitalisation",
    short: "Digital",
    desc: "Transforming manual processes into efficient, automated digital workflows to modernize your business operations.",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=800&q=80",
    direction: "animate-slide-in-right"
  }
];

interface ProductsAndServicesProps {
  onNavigate?: (view: 'home' | 'about' | 'contact' | 'quote' | 'core-banking' | 'ssb' | 'custom' | 'chatbots' | 'integration') => void;
}

export const ProductsAndServices: React.FC<ProductsAndServicesProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleCardClick = (id: string) => {
    if (onNavigate) {
      if (id === 'core-banking') {
        onNavigate('core-banking');
      } else if (id === 'custom') {
        onNavigate('custom');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="products" ref={sectionRef} className="relative z-30 py-24 bg-white overflow-hidden min-h-screen flex items-center">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-slate-50/50 pointer-events-none"></div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            What <span className="text-sky-600">We Do</span>
          </h2>
          <p className="text-lg text-slate-600">
            Comprehensive technology solutions designed for the modern financial landscape.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              id={service.cardId}
              className={`lenda-card opacity-0 ${isVisible ? service.direction : ''}`}
              style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'forwards' }}
            >
              {/* Image Section - Top of Card, 0 Margins */}
              <div className="w-full h-56 relative overflow-hidden bg-slate-100">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>

              <div className="card_content p-8 flex flex-col flex-grow">
                <div className="mb-4">
                  <span className="card_title">{service.title}</span>
                  <p className="card_paragraph mt-2">
                    {service.desc}
                  </p>
                </div>
                
                <div className="mt-auto">
                  <button className="animated-button" onClick={() => handleCardClick(service.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                      <path
                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                      ></path>
                    </svg>
                    <span className="text">Find Out More</span>
                    <span className="circle"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                      <path
                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .lenda-card {
          --white: #ffffff;
          --black: #0f172a;
          --paragraph: #475569;
          --line: #0ea5e9; /* Sky Blue */
          
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 0; 
          width: 100%;
          max-width: 350px;
          min-height: 480px; 
          
          background-color: var(--white);
          
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #e2e8f0;
          overflow: hidden; 
        }

        @media (min-width: 768px) {
          .lenda-card {
            max-width: 400px; 
          }
        }
        
        .lenda-card:hover {
           transform: translateY(-8px);
           box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .lenda-card .card_title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--black);
        }

        .lenda-card .card_paragraph {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--paragraph);
        }

        /* Animated Button Styles */
        .lenda-card .animated-button {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 12px 36px;
          border: 2px solid;
          border-color: #0ea5e9; /* Sky 500 */
          font-size: 14px;
          background-color: #ffffff;
          border-radius: 100px;
          font-weight: 600;
          color: #0284c7; /* Sky 600 */
          cursor: pointer;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          width: 100%;
        }

        .lenda-card .animated-button svg {
          position: absolute;
          width: 24px;
          fill: #0284c7;
          z-index: 9;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .lenda-card .animated-button .arr-1 {
          right: 16px;
        }

        .lenda-card .animated-button .arr-2 {
          left: -25%;
        }

        .lenda-card .animated-button .circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background-color: #e0f2fe; /* Sky 100 */
          border-radius: 50%;
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .lenda-card .animated-button .text {
          position: relative;
          z-index: 1;
          transform: translateX(-12px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .lenda-card .animated-button:hover {
          color: #0ea5e9;
          border-color: #0ea5e9;
        }

        .lenda-card .animated-button:hover .arr-1 {
          right: -25%;
        }

        .lenda-card .animated-button:hover .arr-2 {
          left: 16px;
        }

        .lenda-card .animated-button:hover .text {
          transform: translateX(12px);
        }

        .lenda-card .animated-button:hover svg {
          fill: #0ea5e9;
        }

        .lenda-card .animated-button:active {
          scale: 0.95;
        }

        .lenda-card .animated-button:hover .circle {
          width: 220px;
          height: 220px;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};
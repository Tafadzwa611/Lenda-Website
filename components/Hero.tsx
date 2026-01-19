
import React from 'react';

interface HeroProps {
  onNavigate: (view: 'home' | 'about' | 'contact' | 'quote') => void;
  onExplore?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onExplore }) => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-slate-900">
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <img 
              src="https://i.ibb.co/hFJhWYwL/herobg.png" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
            {/* Darken overlay to make text prominent */}
            <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        {/* Floating Animation Styles */}
        <style>{`
          @keyframes float-complex {
            0% { transform: translateY(0px) scale(1); }
            25% { transform: translateY(-15px) scale(1); } /* Bounce 1 Up */
            50% { transform: translateY(0px) scale(1); }   /* Bounce 1 Down */
            75% { transform: translateY(-25px) scale(1.1); } /* Bounce 2 Up + Grow Big */
            100% { transform: translateY(0px) scale(1); }  /* Bounce 2 Down */
          }
          .animate-float {
            animation: float-complex 8s ease-in-out infinite;
          }
          .reflection-mask {
            mask-image: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%);
            -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%);
            transform: scaleY(-1);
            opacity: 0.6;
            transform-origin: bottom;
          }
        `}</style>

        {/* Added -mt-20 to pull content up, reducing space above title */}
        <div className="container mx-auto px-4 md:px-6 relative z-10 -mt-20">
          {/* Changed items-center to lg:items-end to align bottoms on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:items-end">
            
            {/* LEFT SIDE: Text Content */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 animate-in slide-in-from-left-8 duration-700 fade-in order-2 lg:order-1 pt-10 lg:pt-0 pb-12 lg:pb-0">
              <h1 
                className="text-4xl md:text-6xl text-white uppercase tracking-tight leading-none drop-shadow-2xl"
                style={{ fontFamily: '"Franklin Gothic Heavy", "Arial Black", sans-serif', fontWeight: 900 }}
              >
                Indispensable <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">Core Banking</span> System
              </h1>
              
              <div className="max-w-xl w-full">
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                  Streamline your financial operations with a robust, multi-currency Core Banking System designed to bridge the gap in Zimbabwe's financial sector. Focus on delivering new products and expanding efficiently while we handle the backend complexity with automated lending, risk management, and compliance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                <button onClick={onExplore} className="lenda-button w-full sm:w-auto">
                  <span>Explore Solutions</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                    <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                    <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                    <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
                  </svg>
                </button>
                
                <button 
                  onClick={() => onNavigate('quote')}
                  className="lenda-button secondary w-full sm:w-auto border-2 border-slate-100 bg-transparent text-white hover:bg-white hover:text-slate-900"
                >
                  <span>Contact Sales</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                    <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                    <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                    <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
                  </svg>
                </button>
              </div>
            </div>

            {/* RIGHT SIDE: Floating Image with Reflection */}
            {/* Removed fixed lg:h-[700px] and lg:justify-start. Added lg:h-auto and lg:justify-end for bottom alignment */}
            <div className="relative animate-in slide-in-from-right-8 duration-1000 fade-in order-1 lg:order-2 w-full flex flex-col items-center justify-center lg:justify-end h-[500px] lg:h-auto">
               
               {/* Main Floating Container */}
               {/* Adjusted from -mt-10 to mt-12 to push image lower */}
               <div className="relative w-full max-w-lg animate-float z-20 mt-12">
                  {/* The Main Image */}
                  <img 
                    src="https://i.ibb.co/KcKmgLvS/HEROMAN.png" 
                    alt="Lenda Professional" 
                    className="w-full h-auto object-contain drop-shadow-2xl relative z-20" 
                  />
                  
                  {/* The Reflection - Positioned absolutely at the bottom of the image, pulled up with negative margin to touch the feet */}
                  <div className="absolute left-0 w-full h-full pointer-events-none reflection-mask z-10" style={{ top: '95%' }}>
                    <img 
                      src="https://i.ibb.co/KcKmgLvS/HEROMAN.png" 
                      alt="" 
                      className="w-full h-auto object-contain blur-[2px]" 
                    />
                  </div>
               </div>

               {/* Decorative Glow behind */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-sky-500/20 via-purple-500/20 to-transparent rounded-full blur-[100px] -z-10 pointer-events-none"></div>
            </div>

          </div>
        </div>
    </section>
  );
};

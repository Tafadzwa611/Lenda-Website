
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ChevronUp, Briefcase, CreditCard, Code, Bot, Settings, Home, Users, BookOpen, MessageSquare, Zap, Shield, Globe, Check } from 'lucide-react';
import { Button } from './Button';

// Provided Logo URLs
const LOGO_LIGHT_THEME = "https://i.ibb.co/3mQjWbgr/lenda-logo-light.png";
const LOGO_DARK_THEME = "https://i.ibb.co/MyTMSQcr/lenda-logo-dark.png";

const products = [
  { 
    id: "core-banking",
    title: "Core Banking System", 
    desc: "Automate and manage loan processes, clients, groups, and accounting.",
    icon: <Briefcase size={20} />,
  },
  { 
    id: "ssb",
    title: "SSB Deductions", 
    desc: "Manage and effect employee deductions through the SSB.",
    icon: <CreditCard size={20} />,
  },
  { 
    id: "custom",
    title: "Custom Software", 
    desc: "Tailor-made solutions to meet specific needs.",
    icon: <Code size={20} />,
  },
  { 
    id: "chatbots",
    title: "Chatbots", 
    desc: "Automated digital assistants for WhatsApp & Web.",
    icon: <Bot size={20} />,
  },
  { 
    id: "integration",
    title: "Integration", 
    desc: "Seamlessly connect your existing systems.",
    icon: <Settings size={20} />,
  }
];

const SLIDES = [
  {
    id: 1,
    bgImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
    title: "Core Banking Engine",
    subtitle: "Complete Automation",
    icon: <Zap className="text-purple-400" size={24} />,
    features: ["Multi-Currency (ZiG/USD)", "Real-time Accounting", "RBZ Regulatory Reports"]
  },
  {
    id: 2,
    bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    title: "SSB Deductions",
    subtitle: "Guaranteed Collections",
    icon: <Shield className="text-purple-400" size={24} />,
    features: ["Zero Formatting Errors", "Bulk File Processing", "Instant Reconciliation"]
  },
  {
    id: 3,
    bgImage: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1600&q=80",
    title: "Digital & AI",
    subtitle: "Future Ready",
    icon: <Globe className="text-purple-400" size={24} />,
    features: ["WhatsApp Chatbots", "Field Agent Apps", "Cloud Integration"]
  }
];

interface HeaderProps {
  setCurrentView: (view: 'home' | 'about' | 'contact' | 'quote' | 'admin' | 'core-banking' | 'ssb' | 'custom' | 'chatbots' | 'integration' | 'blog') => void;
  currentView: 'home' | 'about' | 'contact' | 'quote' | 'admin' | 'core-banking' | 'ssb' | 'custom' | 'chatbots' | 'integration' | 'blog';
}

export const Header: React.FC<HeaderProps> = ({ setCurrentView, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosingMenu, setIsClosingMenu] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (view: any, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentView(view);
    scrollToTop();
    closeMobileMenu();
    setIsProductDropdownOpen(false);
    (document.activeElement as HTMLElement)?.blur();
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    setIsClosingMenu(false);
  };

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsClosingMenu(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsClosingMenu(false);
        setIsProductDropdownOpen(false);
      }, 400);
    }
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) closeMobileMenu();
    else openMobileMenu();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* 
        PART 1: Promo Banner (Slider)
        Only show on HOME view.
      */}
      {currentView === 'home' && (
        <div className="w-full relative z-[1002] h-[180px] md:h-[220px] bg-slate-900 overflow-hidden group border-b border-slate-800">
           {SLIDES.map((slide, index) => (
             <div 
               key={slide.id}
               className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
             >
               {/* Background Image with Dark Overlay */}
               <div 
                 className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-[10s]"
                 style={{ backgroundImage: `url(${slide.bgImage})` }}
               ></div>
               <div className="absolute inset-0 bg-slate-900/90"></div>

               {/* Purple Illuminating Flares */}
               <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-600/30 blur-[60px] rounded-full mix-blend-screen animate-pulse"></div>
               <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/20 blur-[80px] rounded-full mix-blend-screen"></div>

               {/* Content - Centered */}
               <div className="relative z-10 h-full container mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center">
                  <div className="max-w-4xl w-full">
                    <div className="flex items-center justify-center gap-2 mb-2">
                       <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                         {slide.icon}
                       </div>
                       <span className="text-purple-300 font-bold uppercase tracking-widest text-xs">{slide.subtitle}</span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
                      {slide.title}
                    </h2>

                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                      {slide.features.map((feature, i) => (
                        <div 
                          key={i} 
                          className={`flex items-center gap-2 ${index === currentSlide ? 'animate-flare-in' : 'opacity-0'}`}
                          style={{ animationDelay: `${i * 150 + 200}ms` }}
                        >
                           <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50 shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                             <Check size={10} className="text-white" />
                           </div>
                           <span className="text-slate-300 font-medium text-xs md:text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
             </div>
           ))}
           
           {/* Slide Indicators - Clickable */}
           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {SLIDES.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlide ? 'w-8 bg-purple-500' : 'w-2 bg-slate-600 hover:bg-slate-400'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
           </div>

           <style>{`
            @keyframes flare-in {
              0% { opacity: 0; transform: translateY(10px); filter: brightness(2); }
              100% { opacity: 1; transform: translateY(0); filter: brightness(1); }
            }
            .animate-flare-in {
              animation: flare-in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            }
           `}</style>
        </div>
      )}

      {/* 
        PART 2: Navigation Bar
        Sticky positioning.
      */}
      <header 
        className="sticky top-0 z-[1001] w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-4 transition-all duration-300"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between relative">
            {/* Logo */}
            <div className="flex-shrink-0 z-50">
              <a href="#" onClick={(e) => handleNavClick('home', e)} className="flex items-center group">
                <img 
                  src={LOGO_LIGHT_THEME} 
                  alt="Lenda Technologies" 
                  className="h-10 md:h-12 w-auto" 
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a 
                href="#"
                onClick={(e) => handleNavClick('home', e)}
                className={`relative group text-base font-bold transition-colors duration-300 text-slate-700 hover:text-purple-600 ${currentView === 'home' ? 'text-purple-600' : ''}`}
              >
                Home
                <span className="absolute -bottom-1 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center bg-purple-600"></span>
              </a>

              {/* Products & Services Dropdown */}
              <div className="relative group">
                <button 
                  className={`flex items-center gap-1 text-base font-bold transition-colors duration-300 outline-none text-slate-700 hover:text-purple-600 ${['core-banking', 'ssb', 'custom', 'chatbots', 'integration'].includes(currentView) ? 'text-purple-600' : ''}`}
                >
                  Products & Services
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>
                
                {/* Desktop Dropdown Content */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[700px] bg-white rounded-xl shadow-2xl border border-slate-100 p-6 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500 ease-out z-50">
                  <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
                  <div className="grid grid-cols-2 gap-6">
                    {products.map((product, idx) => (
                      <a 
                        key={idx} 
                        href="#"
                        onClick={(e) => handleNavClick(product.id, e)}
                        className="group/item flex gap-4 p-3 rounded-lg hover:bg-purple-50 transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center group-hover/item:bg-purple-100 group-hover/item:text-purple-600 transition-colors">
                          {product.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 group-hover/item:text-purple-600 transition-colors mb-1">
                            {product.title}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {product.desc}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                
                <span className="absolute -bottom-1 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center bg-purple-600"></span>
              </div>

              <a 
                href="#about"
                onClick={(e) => handleNavClick('about', e)}
                className={`relative group text-base font-bold transition-colors duration-300 text-slate-700 hover:text-purple-600 ${currentView === 'about' ? 'text-purple-600' : ''}`}
              >
                About Us
                <span className="absolute -bottom-1 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center bg-purple-600"></span>
              </a>

              <a 
                href="#blog"
                onClick={(e) => handleNavClick('blog', e)}
                className={`relative group text-base font-bold transition-colors duration-300 text-slate-700 hover:text-purple-600 ${currentView === 'blog' ? 'text-purple-600' : ''}`}
              >
                Blog
                <span className="absolute -bottom-1 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center bg-purple-600"></span>
              </a>

              <a 
                href="#contact"
                onClick={(e) => handleNavClick('contact', e)}
                className={`relative group text-base font-bold transition-colors duration-300 text-slate-700 hover:text-purple-600 ${currentView === 'contact' ? 'text-purple-600' : ''}`}
              >
                Contact Us
                <span className="absolute -bottom-1 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center bg-purple-600"></span>
              </a>

              <button 
                onClick={(e) => handleNavClick('quote', e)}
                className="lenda-button purple scale-90"
              >
                <span>Get Started</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                  <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                  <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                  <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
                </svg>
              </button>
            </nav>

            {/* Mobile Menu Button - Z-index higher than menu */}
            <div className="md:hidden z-50">
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen 
                    ? 'bg-slate-100 text-slate-900 rotate-90' 
                    : 'text-slate-800'
                }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- MODERN MOBILE MENU --- */}
      <style>{`
        @keyframes menu-pop-in {
          0% { transform: scale(0); opacity: 0; border-radius: 100%; }
          60% { transform: scale(1.05); opacity: 1; border-radius: 20px; }
          100% { transform: scale(1); opacity: 1; border-radius: 16px; }
        }
        @keyframes menu-pop-out {
          0% { transform: scale(1); opacity: 1; border-radius: 16px; }
          40% { transform: scale(1.05); opacity: 1; border-radius: 20px; }
          100% { transform: scale(0); opacity: 0; border-radius: 100%; }
        }
        @keyframes item-pop-in {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .mobile-menu-enter {
          animation: menu-pop-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top right;
        }
        .mobile-menu-exit {
          animation: menu-pop-out 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top right;
        }
        .menu-item-enter {
          animation: item-pop-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0; /* Start hidden for stagger */
        }
      `}</style>

      {(isMobileMenuOpen || isClosingMenu) && (
        <div className="fixed inset-0 z-[2000] md:hidden flex justify-end">
           {/* Backdrop */}
           <div 
             className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isClosingMenu ? 'opacity-0' : 'opacity-100'}`}
             onClick={closeMobileMenu}
           ></div>

           {/* Menu Container */}
           <div 
             className={`relative w-[85%] max-w-[320px] bg-white h-auto max-h-[85vh] mt-20 mr-4 shadow-2xl overflow-hidden flex flex-col origin-top-right ${
                isClosingMenu ? 'mobile-menu-exit' : 'mobile-menu-enter'
             }`}
             style={{ borderRadius: '16px' }}
           >
             {/* Header Section inside Menu */}
             <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Navigation</span>
                <span className="text-xs text-slate-300">Lenda v2.0</span>
             </div>

             <div className="flex-1 overflow-y-auto p-4 space-y-2">
                
                {/* Home */}
                <button 
                  onClick={(e) => handleNavClick('home', e)}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left menu-item-enter ${currentView === 'home' ? 'bg-sky-50 text-sky-600' : 'text-slate-700'}`}
                  style={{ animationDelay: '0.1s' }}
                >
                  <div className={`p-2 rounded-lg ${currentView === 'home' ? 'bg-sky-100' : 'bg-slate-100'}`}>
                    <Home size={20} />
                  </div>
                  <span className="font-bold">Home</span>
                </button>

                {/* Products Dropdown */}
                <div 
                  className="menu-item-enter bg-slate-50/50 rounded-xl overflow-hidden border border-slate-100/50"
                  style={{ animationDelay: '0.15s' }}
                >
                  <button 
                    onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-50"
                  >
                     <div className="flex items-center gap-4 text-slate-700">
                        <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                           <Code size={20} />
                        </div>
                        <span className="font-bold">Products</span>
                     </div>
                     {isProductDropdownOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                  </button>
                  
                  {isProductDropdownOpen && (
                    <div className="bg-white px-2 pb-2 space-y-1 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                       {products.map((p, i) => (
                         <button 
                           key={i}
                           onClick={(e) => handleNavClick(p.id, e)}
                           className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 text-slate-600 text-sm"
                         >
                            <span className="text-slate-400 scale-75">{p.icon}</span>
                            <span>{p.title}</span>
                         </button>
                       ))}
                    </div>
                  )}
                </div>

                {/* Other Links */}
                {[
                  { id: 'about', label: 'About Us', icon: Users },
                  { id: 'blog', label: 'Blog', icon: BookOpen },
                  { id: 'contact', label: 'Contact Us', icon: MessageSquare }
                ].map((item, idx) => (
                  <button 
                    key={item.id}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left menu-item-enter ${currentView === item.id ? 'bg-sky-50 text-sky-600' : 'text-slate-700'}`}
                    style={{ animationDelay: `${0.2 + (idx * 0.05)}s` }}
                  >
                    <div className={`p-2 rounded-lg ${currentView === item.id ? 'bg-sky-100' : 'bg-slate-100'}`}>
                      <item.icon size={20} />
                    </div>
                    <span className="font-bold">{item.label}</span>
                  </button>
                ))}
             </div>

             {/* Footer Action */}
             <div className="p-4 border-t border-slate-100 menu-item-enter" style={{ animationDelay: '0.4s' }}>
               <Button 
                  className="w-full" 
                  variant="primary"
                  onClick={(e) => handleNavClick('quote', e)}
                >
                  Get Started
                </Button>
             </div>
           </div>
        </div>
      )}
    </>
  );
};


import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Lock } from 'lucide-react';

const LOGO_DARK_THEME = "https://i.ibb.co/MyTMSQcr/lenda-logo-dark.png";
const FOOTER_BG = "https://i.ibb.co/qFBHvzKt/footerpattern.jpg";

interface FooterProps {
  onNavigate?: (view: 'home' | 'about' | 'contact' | 'quote' | 'admin' | 'core-banking' | 'ssb' | 'custom' | 'chatbots' | 'integration' | 'blog') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  
  const handleLinkClick = (view: 'home' | 'about' | 'contact' | 'quote' | 'admin' | 'core-banking' | 'ssb' | 'custom' | 'chatbots' | 'integration' | 'blog', e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative pt-32 pb-10 bg-slate-900 text-white -mt-20">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${FOOTER_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Column 1: Company Info */}
          <div>
            <img src={LOGO_DARK_THEME} alt="Lenda Logo" className="h-10 mb-6" />
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Alpha-Lend Solutions is a leading technology partner for Zimbabwe’s financial sector. We provide robust, locally compliant software solutions designed to streamline operations and ensure regulatory compliance for Microfinance Institutions.
            </p>
          </div>

          {/* Column 2: Our Solutions */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white border-b border-sky-500/30 inline-block pb-2">Our Solutions</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="#" onClick={(e) => handleLinkClick('core-banking', e)} className="hover:text-sky-400 transition-colors">Loan Management Systems</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('ssb', e)} className="hover:text-sky-400 transition-colors">SSB Deductions Platform</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('custom', e)} className="hover:text-sky-400 transition-colors">Custom Software Development</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('integration', e)} className="hover:text-sky-400 transition-colors">System Integration & API</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('custom', e)} className="hover:text-sky-400 transition-colors">Corporate Website Development</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('chatbots', e)} className="hover:text-sky-400 transition-colors">AI Chatbots</a></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white border-b border-sky-500/30 inline-block pb-2">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="#" onClick={(e) => handleLinkClick('home', e)} className="hover:text-sky-400 transition-colors">Home</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick('about', e)} className="hover:text-sky-400 transition-colors">About Us</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick('about', e)} className="hover:text-sky-400 transition-colors">Our Leadership Team</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('home', e)} className="hover:text-sky-400 transition-colors">Client Portfolio</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('quote', e)} className="hover:text-sky-400 transition-colors">Request a Demo</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick('contact', e)} className="hover:text-sky-400 transition-colors">Contact Support</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick('admin', e)} className="hover:text-sky-400 transition-colors flex items-center gap-1"><Lock size={12} /> Admin</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white border-b border-sky-500/30 inline-block pb-2">Contact Us</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex gap-3 items-start">
                <MapPin className="flex-shrink-0 text-sky-500 mt-1" size={18} />
                <span>
                  <strong className="block text-white mb-1">Head Office:</strong>
                  No. 337 Robert Mugabe Way,<br />Masvingo, Zimbabwe
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <Phone className="flex-shrink-0 text-sky-500 mt-1" size={18} />
                <span>
                  <strong className="block text-white mb-1">Phone Support:</strong>
                  +263 392 261 394<br />
                  +263 778 325 262
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <Mail className="flex-shrink-0 text-sky-500 mt-1" size={18} />
                <span>
                   <strong className="block text-white mb-1">Email:</strong>
                   info@lendatech.co.zw
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2024 Alpha-Lend Solutions (Pvt) Ltd. All Rights Reserved.</p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <span className="hidden md:inline text-slate-700">|</span>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             <span className="hidden md:inline text-slate-700">|</span>
             <a href="#" className="hover:text-white transition-colors">Company Registration</a>
             
             <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-sky-400 px-4 py-2 rounded-full transition-colors border border-slate-700 md:ml-4">
                <ShieldCheck size={14} />
                Compliance & Banking
             </button>
          </div>
        </div>
      </div>
      
      {/* Clip path for diagonal top */}
      <style>{`
        footer {
          clip-path: polygon(0 5vw, 100% 0, 100% 100%, 0% 100%);
        }
        @media (min-width: 768px) {
           footer {
             clip-path: polygon(0 4vw, 100% 0, 100% 100%, 0% 100%);
           }
        }
      `}</style>
    </footer>
  );
};

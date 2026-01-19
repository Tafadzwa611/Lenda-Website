import React, { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustedCustomers } from './components/TrustedCustomers';
import { ProductsAndServices } from './components/ProductsAndServices';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { GetQuote } from './components/GetQuote';
import { Admin } from './components/Admin';
import { CoreBanking } from './components/CoreBanking';
import { SSBDeductions } from './components/SSBDeductions';
import { CustomSoftware } from './components/CustomSoftware';
import { ChatbotPage } from './components/ChatbotPage';
import { SystemIntegration } from './components/SystemIntegration';
import { Blog } from './components/Blog';
import { LatestNews } from './components/LatestNews';
import { AnalyticsTracker } from './components/AnalyticsTracker';
import { PromoModal } from './components/PromoModal';
import { CookieConsent } from './components/CookieConsent';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'contact' | 'quote' | 'admin' | 'core-banking' | 'ssb' | 'custom' | 'chatbots' | 'integration' | 'blog'>('home');
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  // Automatically scroll to top whenever the view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Dynamic SEO Title Switching
  useEffect(() => {
    const baseTitle = "Lenda Technologies";
    switch (currentView) {
      case 'home':
        document.title = `${baseTitle} | #1 Core Banking & Microfinance Software in Zimbabwe`;
        break;
      case 'about':
        document.title = `About Us | ${baseTitle} - Premier Software Developers`;
        break;
      case 'contact':
        document.title = `Contact Us | ${baseTitle} - Support & Inquiries`;
        break;
      case 'quote':
        document.title = `Get a Quote | ${baseTitle} - Tailored Financial Software Pricing`;
        break;
      case 'core-banking':
        document.title = `Core Banking System (LMS) | ${baseTitle} - Secure & Multi-Currency`;
        break;
      case 'ssb':
        document.title = `SSB Deductions Platform | ${baseTitle} - Automated Stop Orders`;
        break;
      case 'custom':
        document.title = `Custom Software Development | ${baseTitle} - Masvingo & Harare`;
        break;
      case 'chatbots':
        document.title = `AI Chatbots & Automation | ${baseTitle} - WhatsApp & Web`;
        break;
      case 'integration':
        document.title = `System Integration | ${baseTitle} - Payments & API`;
        break;
      case 'blog':
        document.title = `Latest News & Insights | ${baseTitle}`;
        break;
      case 'admin':
        document.title = `Admin Portal | ${baseTitle}`;
        break;
      default:
        document.title = baseTitle;
    }
  }, [currentView]);

  useEffect(() => {
    // Only set up observer if we are on home view where the CTA exists
    if (currentView === 'home') {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsCtaVisible(true);
          }
        },
        { threshold: 0.3 }
      );
      if (ctaRef.current) {
        observer.observe(ctaRef.current);
      }
      return () => observer.disconnect();
    }
  }, [currentView]);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBlogNavigation = (id: string | null = null) => {
    if (id) {
      setSelectedBlogId(id);
    }
    setCurrentView('blog');
    // Scroll handling is now done by the useEffect above
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Global Overlays */}
      <AnalyticsTracker currentView={currentView} />
      <PromoModal onNavigate={(view) => setCurrentView(view)} />
      <CookieConsent />

      {currentView !== 'admin' && <Header setCurrentView={setCurrentView} currentView={currentView} />}
      
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero onNavigate={setCurrentView} onExplore={scrollToProducts} />
            
            {/* Trusted Customers Section */}
            <TrustedCustomers />
            
            {/* Products and Services Section */}
            <ProductsAndServices onNavigate={setCurrentView} />

            {/* Latest News Section */}
            <LatestNews 
              onNavigate={setCurrentView} 
              onViewPost={handleBlogNavigation} 
            />

            {/* Call to Action Strip */}
            <section ref={ctaRef} className="bg-slate-900 py-20 relative border-t-8 border-white">
              {/* Triangular Depression (Notch) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[24px] border-t-white"></div>

              <div className="container mx-auto px-4 md:px-6 text-center overflow-hidden">
                <h2 
                  className={`text-3xl font-bold text-white mb-6 opacity-0 ${isCtaVisible ? 'animate-slide-in-right' : ''}`}
                >
                  Ready to transform your lending business?
                </h2>
                <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                  Join leading financial institutions in Zimbabwe who trust Lenda Technologies.
                </p>
                <div className={`opacity-0 ${isCtaVisible ? 'animate-slide-in-top delay-300' : ''}`}>
                  <button 
                    onClick={() => {
                      setCurrentView('quote');
                    }}
                    className="lenda-button secondary mx-auto"
                  >
                    <span>Get Started Today</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                      <polygon
                        points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"
                      ></polygon>
                      <polygon
                        points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"
                      ></polygon>
                      <polygon
                        points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"
                      ></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
        
        {currentView === 'about' && <About />}
        {currentView === 'contact' && <Contact />}
        {currentView === 'quote' && <GetQuote />}
        {currentView === 'core-banking' && <CoreBanking onNavigate={setCurrentView} />}
        {currentView === 'ssb' && <SSBDeductions onNavigate={setCurrentView} />}
        {currentView === 'custom' && <CustomSoftware onNavigate={setCurrentView} />}
        {currentView === 'chatbots' && <ChatbotPage onNavigate={setCurrentView} />}
        {currentView === 'integration' && <SystemIntegration onNavigate={setCurrentView} />}
        {currentView === 'blog' && (
          <Blog 
            onNavigate={setCurrentView} 
            initialPostId={selectedBlogId}
            onClearInitialPost={() => setSelectedBlogId(null)}
          />
        )}
        {currentView === 'admin' && <Admin onNavigate={setCurrentView} />}
      </main>

      {currentView !== 'admin' && <Footer onNavigate={setCurrentView} />}
      {currentView !== 'admin' && <ChatBot onNavigate={setCurrentView} />}
    </div>
  );
};

export default App;

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

type ViewType = 'home' | 'about' | 'contact' | 'quote' | 'admin' | 'core-banking' | 'ssb' | 'custom' | 'chatbots' | 'integration' | 'blog';

const viewToPath: Record<ViewType, string> = {
  home: '/',
  about: '/about',
  contact: '/contact',
  quote: '/quote',
  admin: '/admin',
  'core-banking': '/core-banking',
  ssb: '/ssb',
  custom: '/custom',
  chatbots: '/chatbots',
  integration: '/integration',
  blog: '/blog',
};

const pathToView: Record<string, ViewType> = Object.entries(viewToPath).reduce(
  (acc, [view, path]) => ({ ...acc, [path]: view as ViewType }),
  {}
);

const App: React.FC = () => {
  const [currentView, setCurrentViewInternal] = useState<ViewType>('home');
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  // Helper to update view and URL
  const setCurrentView = (view: ViewType) => {
    setCurrentViewInternal(view);
    const path = viewToPath[view];
    if (window.location.pathname !== path) {
      window.history.pushState({ view }, '', path);
    }
  };

  // Initialize view from URL on mount
  useEffect(() => {
    const path = window.location.pathname;
    const view = pathToView[path] || 'home';
    setCurrentViewInternal(view);

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentViewInternal(event.state.view);
      } else {
        const p = window.location.pathname;
        setCurrentViewInternal(pathToView[p] || 'home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Automatically scroll to top whenever the view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Dynamic SEO Title & Meta Tag Switching
  useEffect(() => {
    const updateMetaTags = (title: string, description: string) => {
      document.title = title;
      
      // Update Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', description);
      
      // Update OG Tags
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);
      
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);
    };

    switch (currentView) {
      case 'home':
        updateMetaTags(
          "Core Banking Software Zimbabwe – Lendatech",
          "Transform your business with scalable core banking & microfinance software. Trusted Zimbabwe digital banking solutions."
        );
        break;
      case 'about':
        updateMetaTags(
          "About Us | Lendatech - Premier Software Developers",
          "Learn about Lenda Technologies, the digital architects of Africa's financial evolution based in Masvingo, Zimbabwe."
        );
        break;
      case 'contact':
        updateMetaTags(
          "Contact Us | Lenda Technologies - Support & Inquiries",
          "Get in touch with Lenda Technologies in Masvingo. We offer 24/7 support for our banking and microfinance software solutions."
        );
        break;
      case 'quote':
        updateMetaTags(
          "Get a Quote | Lenda Technologies - Tailored Financial Software",
          "Request a custom proposal for core banking systems, SSB platforms, and AI chatbots tailored for the Zimbabwean market."
        );
        break;
      case 'core-banking':
        updateMetaTags(
          "Core Banking System (LMS) | Lenda Technologies",
          "A robust, multi-currency Core Banking System (LMS) designed for African Microfinance Institutions and SACCOs. Secure and compliant."
        );
        break;
      case 'ssb':
        updateMetaTags(
          "SSB Deductions Platform | Lenda Technologies",
          "Automate and secure civil servant loan deductions in Zimbabwe with our SSB Deductions Platform. Guaranteed collections."
        );
        break;
      case 'custom':
        updateMetaTags(
          "Custom Software Development Zimbabwe | Lenda Technologies",
          "Tailor-made software, AI chatbots, and system integrations built specifically for your unique operational challenges in Zimbabwe."
        );
        break;
      case 'chatbots':
        updateMetaTags(
          "AI Chatbots & Automation | Lenda Technologies",
          "Automate your customer interactions on WhatsApp and the Web with intelligent AI chatbots for Zimbabwean businesses."
        );
        break;
      case 'integration':
        updateMetaTags(
          "System Integration & API | Lenda Technologies",
          "Connecting EcoCash, Paynow, and banking APIs to your core systems for seamless financial operations in Zimbabwe."
        );
        break;
      case 'blog':
        updateMetaTags(
          "Lenda Insights - Fintech News & Trends Zimbabwe",
          "Stay updated with the latest trends in fintech, microfinance technology, and company news from Lenda Technologies."
        );
        break;
      case 'admin':
        updateMetaTags("Admin Portal | Lenda Technologies", "Internal management dashboard.");
        break;
      default:
        document.title = "Lenda Technologies";
    }
  }, [currentView]);

  useEffect(() => {
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
            <TrustedCustomers />
            <ProductsAndServices onNavigate={setCurrentView} />
            <LatestNews onNavigate={setCurrentView} onViewPost={handleBlogNavigation} />

            <section ref={ctaRef} className="bg-slate-900 py-20 relative border-t-8 border-white">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[24px] border-t-white"></div>
              <div className="container mx-auto px-4 md:px-6 text-center overflow-hidden">
                <h2 className={`text-3xl font-bold text-white mb-6 opacity-0 ${isCtaVisible ? 'animate-slide-in-right' : ''}`}>
                  Ready to transform your lending business?
                </h2>
                <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                  Join leading financial institutions in Zimbabwe who trust Lenda Technologies.
                </p>
                <div className={`opacity-0 ${isCtaVisible ? 'animate-slide-in-top delay-300' : ''}`}>
                  <button onClick={() => setCurrentView('quote')} className="lenda-button secondary mx-auto">
                    <span>Get Started Today</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                      <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                      <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                      <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
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
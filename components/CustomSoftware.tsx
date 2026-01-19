
import React from 'react';
import { Code, Smartphone, Share2, Database, Search, PenTool, Terminal, Rocket, CheckCircle, Globe, DollarSign, Lock } from 'lucide-react';

interface CustomSoftwareProps {
  onNavigate: (view: 'home' | 'about' | 'contact' | 'quote' | 'custom') => void;
}

export const CustomSoftware: React.FC<CustomSoftwareProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Hero Section */}
      <div className="relative min-h-[80vh] flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=1600&q=80" 
            alt="Software Development" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/90"></div>
          {/* Diagonal Clip Path */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-4xl opacity-0 animate-slide-in-left">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-purple-500/20 rounded-lg text-purple-400 backdrop-blur-sm border border-purple-500/30 font-bold tracking-wider uppercase text-xs">
                Tailor-Made Solutions
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Software Built <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">
                Specifically for Your Business.
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-10 border-l-4 border-purple-500 pl-6">
              Off-the-shelf solutions don't fit everyone. We design, build, and deploy tailor-made software that solves your unique operational challenges.
            </p>
            <button 
              onClick={() => onNavigate('quote')}
              className="lenda-button scale-100"
            >
              <span>Start Your Project</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Diagonal Bottom Edge */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }}></div>
      </div>

      {/* 2. Why Go Custom? */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Why Go Custom?</h2>
              <div className="w-20 h-1.5 bg-purple-500"></div>
              <p className="text-lg text-slate-600 leading-relaxed">
                Every business has a unique way of working. Sometimes, buying standard software forces you to change your processes to fit the computer.
              </p>
              <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-sky-500">
                <p className="text-slate-700 font-medium">
                  At Alpha-Lend Solutions, we do the opposite. We build software that fits you.
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Whether you need a specialized internal dashboard, a customer-facing portal, or a mobile app for your field agents, our team in Masvingo allows you to build exactly what you need without the high cost of international development firms.
              </p>
            </div>
            <div className="relative">
              <div className="absolute top-10 right-10 w-full h-full bg-purple-50 rounded-3xl -z-10 transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Development Team" 
                className="rounded-3xl shadow-2xl w-full object-cover h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Development Services */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Development Services</h2>
            <p className="text-slate-600">From concept to deployment, we cover the full stack.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-6">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">1. Web Application Development</h3>
              <p className="text-slate-600 leading-relaxed">
                We build secure, cloud-based applications that your team can access from anywhere. From inventory systems to specialized HR tools, we code robust web platforms that drive efficiency.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Smartphone size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">2. Mobile App Development</h3>
              <p className="text-slate-600 leading-relaxed">
                Equip your customers or staff with powerful mobile tools. We develop Android and iOS applications that work seamlessly, even in low-data environments common in some parts of Zimbabwe.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Share2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">3. API & System Integration</h3>
              <p className="text-slate-500 text-xs uppercase font-bold mb-2">"The Glue Between Systems"</p>
              <p className="text-slate-600 leading-relaxed">
                Do you have an accounting system that doesn't talk to your sales system? We specialize in System Integration—connecting disparate software so they function as a single, cohesive unit. This reduces double-entry and data errors.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Database size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">4. Database Design & Management</h3>
              <p className="text-slate-600 leading-relaxed">
                Data is your most valuable asset. We design structured, secure databases that allow you to store, retrieve, and analyze your business information quickly and safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Process (Timeline) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Process: From Concept to Code</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
             {[
               { icon: <Search size={24} />, title: "Discovery", desc: "Understand your pain points." },
               { icon: <PenTool size={24} />, title: "Design", desc: "Wireframes and prototypes." },
               { icon: <Code size={24} />, title: "Development", desc: "Agile coding (C#, Python, PHP)." },
               { icon: <CheckCircle size={24} />, title: "Testing", desc: "Rigorous QA." },
               { icon: <Rocket size={24} />, title: "Deployment", desc: "Launch & Local Support." }
             ].map((step, idx) => (
               <div key={idx} className="relative flex flex-col items-center text-center p-4">
                 <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center mb-4 z-10 shadow-lg">
                   {step.icon}
                 </div>
                 <h4 className="font-bold text-slate-900 mb-2">{step.title}</h4>
                 <p className="text-sm text-slate-600">{step.desc}</p>
                 
                 {/* Connector Line */}
                 {idx < 4 && (
                   <div className="hidden md:block absolute top-8 left-1/2 w-full h-1 bg-slate-100 -z-0"></div>
                 )}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. Why Hire Lenda Developers */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Hire Lenda Developers?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-sky-500/20 text-sky-400 rounded-lg flex items-center justify-center mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Local Understanding</h3>
              <p className="text-slate-400 leading-relaxed">
                We know the Zimbabwean business environment (connectivity issues, payment gateways, etc.).
              </p>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center mb-4">
                <DollarSign size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Cost-Effective</h3>
              <p className="text-slate-400 leading-relaxed">
                World-class coding standards at competitive local rates.
              </p>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center mb-4">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Ownership</h3>
              <p className="text-slate-400 leading-relaxed">
                You own the intellectual property of the software we build for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="bg-white py-20 relative border-t-8 border-slate-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ready to Build?</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Get a tailored solution that fits your business perfectly.
          </p>
          <div className="flex justify-center">
             <button 
                onClick={() => onNavigate('quote')}
                className="lenda-button scale-100"
              >
                <span>Get a Free Consultation</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                  <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                  <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                  <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
                </svg>
              </button>
          </div>
        </div>
      </section>

    </div>
  );
};

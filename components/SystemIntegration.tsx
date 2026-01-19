
import React from 'react';
import { Network, Database, Layers, ArrowRightLeft, CreditCard, Building2, Server, Shuffle, Cpu, ShieldCheck, Activity, Link, Clock, Globe } from 'lucide-react';

interface SystemIntegrationProps {
  onNavigate: (view: 'home' | 'about' | 'contact' | 'quote' | 'integration') => void;
}

export const SystemIntegration: React.FC<SystemIntegrationProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Hero Section */}
      <div className="relative min-h-[80vh] flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef526b01201b?auto=format&fit=crop&w=1600&q=80" 
            alt="System Integration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/90"></div>
          {/* Diagonal Clip Path */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-4xl opacity-0 animate-slide-in-left">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-orange-500/20 rounded-lg text-orange-400 backdrop-blur-sm border border-orange-500/30 font-bold tracking-wider uppercase text-xs">
                Connectivity Solutions
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Make Your Systems <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                Talk to Each Other.
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-10 border-l-4 border-orange-500 pl-6">
              Stop manually copying data between applications. We connect your disparate software systems into one seamless, efficient digital ecosystem.
            </p>
            <button 
              onClick={() => onNavigate('quote')}
              className="lenda-button scale-100"
            >
              <span>Discuss Your Integration Needs</span>
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

      {/* 2. The Problem: Data Silos */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">The Problem: "Data Silo" Chaos</h2>
              <div className="w-20 h-1.5 bg-orange-500"></div>
              <p className="text-lg text-slate-600 leading-relaxed">
                In many organizations, valuable data is trapped in separate boxes. Your loan records are in one system, your accounting is in another (like Sage or QuickBooks), and your payments are done on a banking platform.
              </p>
              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                <h4 className="font-bold text-red-900 mb-2">This leads to:</h4>
                <ul className="space-y-2 text-red-800 text-sm">
                  <li className="flex gap-2"><ArrowRightLeft size={16} className="mt-1" /> <strong>Double Entry:</strong> Staff typing the same data twice.</li>
                  <li className="flex gap-2"><Activity size={16} className="mt-1" /> <strong>Human Error:</strong> Mistakes happening during manual data transfer.</li>
                  <li className="flex gap-2"><Clock size={16} className="mt-1" /> <strong>Slow Reporting:</strong> Inability to get a "big picture" view instantly.</li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-10 right-10 w-full h-full bg-orange-50 rounded-3xl -z-10 transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" 
                alt="Disconnected Systems" 
                className="rounded-3xl shadow-2xl w-full object-cover h-[400px] grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Solution & Capabilities */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Integration Capabilities</h2>
            <p className="text-slate-600">We build the "digital bridges" that allow your software to communicate, share data, and trigger actions automatically.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Capability 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <CreditCard size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">1. Payment Gateway Integration</h3>
              <p className="text-xs font-bold text-emerald-600 uppercase mb-4">EcoCash, OneMoney, Visa/Mastercard</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                In Zimbabwe, payments are digital. We integrate your core business systems with local payment gateways (like Paynow or direct API links).
              </p>
               <ul className="space-y-2 text-slate-500 text-sm bg-emerald-50/50 p-4 rounded-lg">
                <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div> <strong>Auto-Disbursement:</strong> Send loan payouts directly to client wallets.</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div> <strong>Auto-Receipting:</strong> Balances update instantly upon payment.</li>
              </ul>
            </div>

            {/* Capability 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-6">
                <Building2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2. SSB & Government Payroll</h3>
              <p className="text-xs font-bold text-sky-600 uppercase mb-4">Our Specialty</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                We bridge the gap between your lending platform and the Salary Service Bureau (SSB). We automate the file formats and data exchange required to effect deductions for civil servants seamlessly.
              </p>
            </div>

            {/* Capability 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Database size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">3. Accounting Software Integration</h3>
              <p className="text-xs font-bold text-purple-600 uppercase mb-4">Sage, QuickBooks, Xero</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Don't let your financial data lag behind. We connect your operational software directly to your General Ledger.
              </p>
              <p className="text-slate-500 text-sm italic border-l-2 border-purple-300 pl-3">
                Benefit: When a loan is disbursed, the accounting journal is passed automatically.
              </p>
            </div>

             {/* Capability 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Server size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">4. Banking APIs</h3>
              <p className="text-xs font-bold text-orange-600 uppercase mb-4">Steward Bank, CBZ</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                We connect with major Zimbabwean banks to facilitate "Push and Pull" transactions, statement retrieval, and balance checks directly from your dashboard.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Business Benefits */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Business Benefits</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:bg-slate-750 transition-colors">
               <Activity className="text-sky-400 mb-4" size={32} />
               <h4 className="font-bold text-lg mb-2">Real-Time Data</h4>
               <p className="text-slate-400 text-sm">No more waiting for "end of month" reconciliation. See your cash position instantly.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:bg-slate-750 transition-colors">
               <Cpu className="text-emerald-400 mb-4" size={32} />
               <h4 className="font-bold text-lg mb-2">Productivity</h4>
               <p className="text-slate-400 text-sm">Your staff stops doing data entry and starts doing value-added work.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:bg-slate-750 transition-colors">
               <ShieldCheck className="text-purple-400 mb-4" size={32} />
               <h4 className="font-bold text-lg mb-2">Data Integrity</h4>
               <p className="text-slate-400 text-sm">Computers don't make typing errors. Ensure your financial records are 100% accurate.</p>
            </div>
             <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:bg-slate-750 transition-colors">
               <Layers className="text-orange-400 mb-4" size={32} />
               <h4 className="font-bold text-lg mb-2">Scalability</h4>
               <p className="text-slate-400 text-sm">As you add new tools in the future, we can integrate them into your existing network.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How We Do It */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">How We Do It</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center mb-4 text-slate-700">
                  <Globe size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">REST & SOAP APIs</h4>
                <p className="text-slate-500 text-sm">Secure, standard protocols for web communication.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center mb-4 text-slate-700">
                  <Link size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Middleware Dev</h4>
                <p className="text-slate-500 text-sm">Custom layers to translate data between legacy and modern systems.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center mb-4 text-slate-700">
                  <Shuffle size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Webhooks</h4>
                <p className="text-slate-500 text-sm">Real-time triggers that update one system the moment something happens in another.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="bg-slate-900 py-20 relative border-t-8 border-white">
        {/* Triangular Depression */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[24px] border-t-white"></div>
        
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stop the Manual Work. Start Automating.</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            If your systems aren't working together, they are working against you.
          </p>
          <div className="flex justify-center">
             <button 
                onClick={() => onNavigate('quote')}
                className="lenda-button secondary scale-100"
              >
                <span>Get a Technical Consultation</span>
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

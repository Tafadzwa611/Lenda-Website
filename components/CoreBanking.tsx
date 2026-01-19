
import React from 'react';
import { ShieldCheck, Users, FileText, PieChart, Building2, Landmark, Database, Cloud, Lock, CheckCircle, ArrowRight, Download } from 'lucide-react';

interface CoreBankingProps {
  onNavigate: (view: 'home' | 'about' | 'contact' | 'quote' | 'core-banking') => void;
}

export const CoreBanking: React.FC<CoreBankingProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Hero Section */}
      <div className="relative min-h-[80vh] flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=1600&q=80" 
            alt="Financial Dashboard" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/90"></div>
          {/* Diagonal Clip Path */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-4xl opacity-0 animate-slide-in-left">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-sky-500/20 rounded-lg text-sky-400 backdrop-blur-sm border border-sky-500/30 font-bold tracking-wider uppercase text-xs">
                Product Spotlight
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              The Heart of Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                Financial Operations.
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-10 border-l-4 border-emerald-500 pl-6">
              A robust, all-in-one Core Banking System designed specifically for Zimbabwean Microfinance Institutions and SACCOs. Secure, compliant, and multi-currency ready.
            </p>
            <button 
              onClick={() => onNavigate('quote')}
              className="lenda-button scale-100"
            >
              <span>Request a System Demo</span>
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

      {/* 2. Introduction */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Why Choose Lenda CBS?</h2>
              <div className="w-20 h-1.5 bg-emerald-500"></div>
              <p className="text-lg text-slate-600 leading-relaxed">
                At Alpha-Lend Solutions, we understand that a Core Banking System is more than just software—it is the engine of your business. Our solution is locally developed to handle the unique complexities of the Zimbabwean market, including multi-currency transactions (ZiG/USD) and regulatory compliance, while offering the modern features found in international banking software.
              </p>
              <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
                <p className="text-sky-800 font-medium italic">
                  "Stop relying on disjointed spreadsheets. Centralize your operations into one secure, real-time platform."
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-10 right-10 w-full h-full bg-slate-100 rounded-3xl -z-10 transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
                alt="System Interface Preview" 
                className="rounded-3xl shadow-2xl w-full object-cover h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Key Modules */}
      <section id="cbs-features" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Key Modules & Features</h2>
            <p className="text-slate-600">A comprehensive suite designed to cover every aspect of your financial institution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Module 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">360° Client Management</h3>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span><strong>KYC Compliance:</strong> Store digital IDs, proof of res, & biometrics.</span></li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span><strong>Group Lending:</strong> Track solidarity groups & liabilities.</span></li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span><strong>Customer Profiles:</strong> Single view of all active loans & history.</span></li>
              </ul>
            </div>

            {/* Module 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">End-to-End Loans</h3>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span><strong>Origination to Closure:</strong> Automate the entire lifecycle.</span></li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span><strong>Flexible Products:</strong> Configurable rates, penalties & grace periods.</span></li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span><strong>Auto Calculations:</strong> Error-free amortization schedules.</span></li>
              </ul>
            </div>

            {/* Module 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <PieChart size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Integrated Accounting</h3>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span><strong>Real-Time Posting:</strong> Auto-updates Chart of Accounts.</span></li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span><strong>Expense Mgmt:</strong> Track operational costs directly.</span></li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span><strong>Multi-Currency:</strong> Seamless ZiG/USD handling.</span></li>
              </ul>
            </div>

            {/* Module 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Building2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">SSB & Payroll</h3>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span><strong>Direct Deductions:</strong> Seamless integration with SSB.</span></li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span><strong>Employer Mgmt:</strong> Handle private payroll agreements.</span></li>
              </ul>
            </div>

            {/* Module 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-6">
                <Landmark size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Treasury & Cash</h3>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span><strong>Teller Ops:</strong> Vault limits & end-of-day balancing.</span></li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span><strong>Bank Recs:</strong> Link physical bank accounts with system.</span></li>
              </ul>
            </div>

            {/* Reporting */}
            <div className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 text-white transform md:scale-105 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="w-14 h-14 bg-white/10 text-white rounded-xl flex items-center justify-center mb-6 border border-white/20">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Reporting & Analytics</h3>
              <p className="text-slate-400 text-sm mb-4">Make data-driven decisions with our comprehensive reporting suite.</p>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex gap-2"><ArrowRight size={16} className="text-sky-400 shrink-0 mt-0.5" /> <span>RBZ Regulatory Reports</span></li>
                <li className="flex gap-2"><ArrowRight size={16} className="text-sky-400 shrink-0 mt-0.5" /> <span>Portfolio at Risk (PAR) & NPLs</span></li>
                <li className="flex gap-2"><ArrowRight size={16} className="text-sky-400 shrink-0 mt-0.5" /> <span>Automated Financial Statements</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Security & Technology (Dark Section) */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Security & Technology</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                We prioritize the safety of your financial data. Lenda CBS is built on modern, secure architecture ensuring data integrity and availability.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                   <div className="mt-1 bg-white/10 p-2 rounded-lg"><Cloud size={20} className="text-sky-400" /></div>
                   <div>
                     <h4 className="font-bold text-lg">Cloud or On-Premise</h4>
                     <p className="text-slate-400 text-sm">Flexible deployment. Host on your own servers or use our secure cloud infrastructure.</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="mt-1 bg-white/10 p-2 rounded-lg"><Users size={20} className="text-purple-400" /></div>
                   <div>
                     <h4 className="font-bold text-lg">Role-Based Access Control (RBAC)</h4>
                     <p className="text-slate-400 text-sm">Strict protocols ensure staff only access data relevant to their specific roles.</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="mt-1 bg-white/10 p-2 rounded-lg"><Lock size={20} className="text-emerald-400" /></div>
                   <div>
                     <h4 className="font-bold text-lg">Audit Trails & Backups</h4>
                     <p className="text-slate-400 text-sm">Every action is logged for transparency. Automated daily backups prevent data loss.</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Visual Representation */}
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 relative">
               <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-purple-500/10 rounded-3xl"></div>
               <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 text-center">
                    <Database size={32} className="mx-auto text-sky-500 mb-2" />
                    <p className="font-bold">Encrypted DB</p>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 text-center">
                    <ShieldCheck size={32} className="mx-auto text-emerald-500 mb-2" />
                    <p className="font-bold">Fraud Detection</p>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 text-center col-span-2">
                    <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      System Operational
                    </div>
                    <p className="font-mono text-xs text-slate-500 mt-2">Uptime: 99.99%</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Perfect for Zimbabwe */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Why It’s Perfect for Zimbabwe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-sky-200 transition-colors">
               <h3 className="text-xl font-bold text-slate-900 mb-3">Plug & Play</h3>
               <p className="text-slate-600">Unlike international software requiring expensive customization, Lenda CBS is built for the local market.</p>
             </div>
             <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-sky-200 transition-colors">
               <h3 className="text-xl font-bold text-slate-900 mb-3">Local Support</h3>
               <p className="text-slate-600">Our developers are in Masvingo and Harare, not overseas. Get immediate, local assistance.</p>
             </div>
             <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-sky-200 transition-colors">
               <h3 className="text-xl font-bold text-slate-900 mb-3">Evolving Compliance</h3>
               <p className="text-slate-600">As RBZ regulations change, we update the software immediately to keep you compliant.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="bg-slate-900 py-20 relative border-t-8 border-white">
        {/* Triangular Depression (Notch) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[24px] border-t-white"></div>
        
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Upgrade?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Transform your institution with Alpha-Lend Solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button 
                onClick={() => onNavigate('quote')}
                className="lenda-button secondary scale-100"
              >
                <span>Schedule a Presentation</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                  <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                  <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                  <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
                </svg>
              </button>

              <button 
                onClick={() => alert("Feature List PDF download started...")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-slate-700 text-white font-bold hover:bg-slate-800 transition-colors"
              >
                <Download size={20} />
                Download Feature List (PDF)
              </button>
          </div>
        </div>
      </section>

    </div>
  );
};

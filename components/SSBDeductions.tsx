
import React from 'react';
import { FileCheck, UploadCloud, ShieldCheck, RefreshCw, Lock, CheckCircle, Users, Briefcase, ShoppingBag, Heart, ArrowRight, Download } from 'lucide-react';

interface SSBDeductionsProps {
  onNavigate: (view: 'home' | 'about' | 'contact' | 'quote' | 'ssb') => void;
}

export const SSBDeductions: React.FC<SSBDeductionsProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Hero Section */}
      <div className="relative min-h-[80vh] flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80" 
            alt="Government Payroll Processing" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/90"></div>
          {/* Diagonal Clip Path */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-4xl opacity-0 animate-slide-in-left">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 backdrop-blur-sm border border-emerald-500/30 font-bold tracking-wider uppercase text-xs">
                Government Lending Solutions
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Secure & Automated <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                Civil Servant Lending.
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-10 border-l-4 border-sky-500 pl-6">
              The bridge between your Microfinance Institution and the Salary Service Bureau (SSB). Eliminate manual errors and guarantee your collections directly from the payroll.
            </p>
            <button 
              onClick={() => onNavigate('quote')}
              className="lenda-button scale-100"
            >
              <span>Request a Demo</span>
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
              <h2 className="text-3xl font-bold text-slate-900">What is the SSB Platform?</h2>
              <div className="w-20 h-1.5 bg-sky-500"></div>
              <p className="text-lg text-slate-600 leading-relaxed">
                For Microfinance Institutions in Zimbabwe, lending to civil servants (teachers, uniformed forces, health workers) is a core business. However, managing the "Stop Order" process manually is tedious and prone to rejection.
              </p>
              <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-emerald-500">
                <p className="text-slate-700 font-medium">
                  Alpha-Lend Solutions’ SSB Deductions Platform is a web-based application designed to digitize and automate the submission of loan deductions to the SSB. We ensure your files are formatted correctly, validated instantly, and processed efficiently.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-10 right-10 w-full h-full bg-emerald-50 rounded-3xl -z-10 transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80" 
                alt="SSB Validation Process" 
                className="rounded-3xl shadow-2xl w-full object-cover h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Key Features */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Key Features</h2>
            <p className="text-slate-600">Designed to meet the strict technical requirements of the Salary Service Bureau.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-6">
                <FileCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Automated "Stop Order"</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Stop manually typing out deduction schedules. Compile and format your deduction files automatically to meet SSB standards.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <UploadCloud size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Bulk File Upload</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Whether you have 10 clients or 10,000, our system handles the volume. Upload bulk schedules and let the system prepare the submission file.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Pre-Validation Checks</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Reduce rejection rates. Verify client details against standard rules before submission to ensure regulatory compliance.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <RefreshCw size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Reconciliation</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Automatically compare requested deductions vs. payments received. Instantly identify unmatched reports for follow-up.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mb-6">
                <Lock size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Secure Data Handling</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We use high-level encryption to ensure sensitive borrower government payroll data is protected at all times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (Steps) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 opacity-50"></div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="text-slate-600 mt-2">4 Simple Steps to secure collections.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {[
               { step: "01", title: "Client Onboarding", desc: "Capture client loan details in the Lenda system (or import them)." },
               { step: "02", title: "Generate Schedule", desc: "The system creates a compliant deduction file for the current month." },
               { step: "03", title: "Submission", desc: "Submit the files to the Salary Service Bureau through the workflow." },
               { step: "04", title: "Reconciliation", desc: "Upload the 'Return File' to instantly see who paid and who didn't." }
             ].map((item, idx) => (
               <div key={idx} className="relative group">
                 <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                   <span className="text-6xl font-bold text-slate-100 absolute top-4 right-4 group-hover:text-sky-50 transition-colors">{item.step}</span>
                   <div className="relative z-10">
                     <div className="w-3 h-3 bg-sky-500 rounded-full mb-6"></div>
                     <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                     <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                   </div>
                 </div>
                 {/* Connector Line (Desktop) */}
                 {idx < 3 && (
                   <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-200 z-0"></div>
                 )}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. Who Is This For? */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <div>
                 <h2 className="text-3xl font-bold mb-4">Who Is This For?</h2>
                 <p className="text-slate-400">Our platform supports various institutions relying on SSB deductions.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-start gap-3">
                  <div className="mt-1 bg-emerald-500/20 p-1.5 rounded text-emerald-400"><Briefcase size={18} /></div>
                  <div>
                    <h4 className="font-bold text-white">Microfinance Institutions</h4>
                    <p className="text-slate-400 text-xs mt-1">Offering salary-based loans.</p>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-start gap-3">
                  <div className="mt-1 bg-sky-500/20 p-1.5 rounded text-sky-400"><ShoppingBag size={18} /></div>
                  <div>
                    <h4 className="font-bold text-white">Retailers</h4>
                    <p className="text-slate-400 text-xs mt-1">Furniture & Appliance credit.</p>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-start gap-3">
                  <div className="mt-1 bg-purple-500/20 p-1.5 rounded text-purple-400"><ShieldCheck size={18} /></div>
                  <div>
                    <h4 className="font-bold text-white">Insurance Companies</h4>
                    <p className="text-slate-400 text-xs mt-1">Collecting premiums via SSB.</p>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-start gap-3">
                  <div className="mt-1 bg-orange-500/20 p-1.5 rounded text-orange-400"><Heart size={18} /></div>
                  <div>
                    <h4 className="font-bold text-white">Funeral Assurance</h4>
                    <p className="text-slate-400 text-xs mt-1">Monthly policy payments.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
               <h3 className="text-2xl font-bold mb-6 text-white">Why Use Alpha-Lend for SSB?</h3>
               <div className="space-y-6">
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                     <CheckCircle size={20} />
                   </div>
                   <div>
                     <h4 className="font-bold text-lg">Zero Formatting Errors</h4>
                     <p className="text-slate-400 text-sm">We know the exact file structures required. We eliminate human error.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0">
                     <CheckCircle size={20} />
                   </div>
                   <div>
                     <h4 className="font-bold text-lg">Reduced Admin Costs</h4>
                     <p className="text-slate-400 text-sm">Save the hours your staff spends manually creating Excel sheets.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                     <CheckCircle size={20} />
                   </div>
                   <div>
                     <h4 className="font-bold text-lg">Faster Collections</h4>
                     <p className="text-slate-400 text-sm">Accurate submissions mean fewer rejections and faster cash flow.</p>
                   </div>
                 </div>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Secure Your Collections?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Stop worrying about missed deductions. Switch to a digital system that works.
          </p>
          <div className="flex justify-center">
             <button 
                onClick={() => onNavigate('contact')}
                className="lenda-button secondary scale-100"
              >
                <span>Contact Us for Integration Details</span>
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

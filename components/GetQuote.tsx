
// Fix: Use standard modular Firebase imports
import React, { useState } from 'react';
import { Send, CheckCircle, Calculator, Building2, Users, Calendar, ArrowRight, CheckSquare, Square, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const GetQuote: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    city: '',
    services: [] as string[],
    clientCount: '',
    managementMethod: '',
    startDate: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleService = (service: string) => {
    setFormData(prev => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists 
          ? prev.services.filter(s => s !== service)
          : [...prev.services, service]
      };
    });
  };

  const handleRadioChange = (category: string, value: string) => {
    setFormData(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const quotesRef = ref(db, 'quotes');
      await push(quotesRef, {
        ...formData,
        timestamp: Date.now(),
        status: 'new'
      });
      setStatus('success');
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        city: '',
        services: [],
        clientCount: '',
        managementMethod: '',
        startDate: '',
        message: ''
      });
    } catch (error) {
      console.error("Error sending quote request:", error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full animate-in fade-in zoom-in duration-500">
           <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle size={48} />
           </div>
           <h2 className="text-3xl font-bold text-slate-900 mb-4">Quote Request Received!</h2>
           <p className="text-slate-600 text-lg leading-relaxed mb-8">
             Thank you for providing your details. Our sales team is reviewing your requirements and will send a tailored proposal to your email shortly.
           </p>
           <button 
             onClick={() => setStatus('idle')}
             className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
           >
             Submit Another Request
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. Diagonal Hero Section */}
      <div className="relative min-h-[60vh] flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80" 
            alt="Business Strategy" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/90"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/80 to-sky-900/20" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center md:text-left">
          <div className="max-w-4xl mx-auto md:mx-0 opacity-0 animate-slide-in-left">
             <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <span className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 backdrop-blur-sm border border-emerald-500/30">
                <Calculator size={20} />
              </span>
              <h5 className="text-emerald-400 font-bold tracking-widest uppercase text-sm">Pricing & Proposals</h5>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Get a Tailored Quote <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500">
                For Your Business
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto md:mx-0">
              Tell us about your needs. Select the solutions you are interested in, and our team will prepare a custom proposal specifically for you.
            </p>
          </div>
        </div>

        {/* Diagonal Bottom Edge */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-slate-50" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }}></div>
      </div>

      {/* 2. Main Form Section */}
      <section className="relative z-20 -mt-20 container mx-auto px-4 md:px-6 mb-24">
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          
          {/* Form Header */}
          <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <h2 className="text-2xl font-bold relative z-10">Request a Proposal</h2>
             <p className="text-slate-400 text-sm mt-1 relative z-10">Complete the steps below to help us estimate your costs.</p>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            
            {/* Step 1: Contact Details */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-lg">1</div>
                <h3 className="text-xl font-bold text-slate-900">Your Contact Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 md:pl-14">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Company / MFI Name</label>
                  <input required name="companyName" value={formData.companyName} onChange={handleInputChange} type="text" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all" placeholder="Lenda Finance" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all" placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Phone / WhatsApp</label>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all" placeholder="+263 77..." />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-700">City / Town</label>
                  <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all" placeholder="e.g. Harare" />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Step 2: Services */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">2</div>
                <h3 className="text-xl font-bold text-slate-900">Select Services Required</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-14">
                {[
                  { id: "LMS", label: "Core Banking System (LMS)", sub: "Automate lending, client tracking, and reports" },
                  { id: "SSB", label: "SSB Deductions Platform", sub: "For salary-based lending and collections" },
                  { id: "AI", label: "AI Chatbot Development", sub: "Automated customer support for WhatsApp/Web" },
                  { id: "WEB", label: "Corporate Website Design", sub: "Professional online presence" },
                  { id: "INT", label: "System Integration", sub: "Connecting your existing systems together" },
                  { id: "SUP", label: "General Tech Support / Consultancy", sub: "Expert advice and maintenance" }
                ].map((service) => (
                  <div 
                    key={service.id}
                    onClick={() => toggleService(service.label)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-3 hover:shadow-md ${
                      formData.services.includes(service.label) 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-slate-100 bg-white hover:border-purple-200'
                    }`}
                  >
                    <div className={`mt-1 ${formData.services.includes(service.label) ? 'text-purple-600' : 'text-slate-300'}`}>
                      {formData.services.includes(service.label) ? <CheckSquare size={20} /> : <Square size={20} />}
                    </div>
                    <div>
                      <p className={`font-bold ${formData.services.includes(service.label) ? 'text-purple-900' : 'text-slate-700'}`}>{service.label}</p>
                      <p className="text-xs text-slate-500">{service.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Step 3: Operational Details */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg">3</div>
                <h3 className="text-xl font-bold text-slate-900">Operational Details</h3>
              </div>
              
              <div className="pl-0 md:pl-14 space-y-8">
                {/* Active Clients */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Users size={16} /> Current Number of Active Clients
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["0 - 100 (Start-up)", "100 - 500", "500 - 2,000", "2,000+"].map(opt => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => handleRadioChange('clientCount', opt)}
                        className={`py-3 px-4 rounded-lg text-sm font-medium border transition-all ${
                          formData.clientCount === opt 
                            ? 'bg-slate-900 text-white border-slate-900' 
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Management Method */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Building2 size={16} /> How do you currently manage your loans?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["Excel / Manual Books", "Another Software System", "We are a new business"].map(opt => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => handleRadioChange('managementMethod', opt)}
                        className={`py-3 px-4 rounded-lg text-sm font-medium border transition-all ${
                          formData.managementMethod === opt 
                            ? 'bg-slate-900 text-white border-slate-900' 
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Calendar size={16} /> When are you looking to start?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["Immediately", "Within 1 month", "Just researching"].map(opt => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => handleRadioChange('startDate', opt)}
                        className={`py-3 px-4 rounded-lg text-sm font-medium border transition-all ${
                          formData.startDate === opt 
                            ? 'bg-slate-900 text-white border-slate-900' 
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Step 4: Additional Info */}
            <div>
               <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-lg">4</div>
                <h3 className="text-xl font-bold text-slate-900">Additional Information</h3>
              </div>
              <div className="pl-0 md:pl-14">
                 <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4} 
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all duration-300 font-medium placeholder:text-slate-400 resize-none" 
                  placeholder="Any specific requirements or message for the team..."
                ></textarea>
              </div>
            </div>

            <div className="pt-6">
              <button disabled={status === 'submitting'} type="submit" className="lenda-button w-full justify-between group disabled:opacity-70 disabled:cursor-not-allowed">
                 <span>{status === 'submitting' ? 'Submitting Proposal...' : 'Send Quote Request'}</span>
                 {status === 'submitting' ? (
                   <Loader2 className="animate-spin text-white" />
                 ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43" className="fill-white">
                     <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                     <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                     <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
                   </svg>
                 )}
               </button>
            </div>

          </div>
        </form>
      </section>
    </div>
  );
};

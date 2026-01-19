
// Fix: Use standard modular Firebase imports
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, ShieldCheck, Navigation, ArrowRight, MessageSquare, Clock, Globe, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const Contact: React.FC = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    interest: 'Core Banking System (CBS)',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleGetDirections = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const destination = "WRGM+PFR, Masvingo";
          const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(destination)}`;
          window.open(url, '_blank');
          setIsLocating(false);
        },
        (error) => {
          alert("Unable to retrieve your location. Please check your browser permissions.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsLocating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const contactsRef = ref(db, 'contacts');
      await push(contactsRef, {
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
        interest: 'Core Banking System (CBS)',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. Diagonal Hero Section */}
      <div className="relative min-h-[70vh] flex items-center overflow-hidden pt-44 pb-32">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80" 
            alt="Corporate Office" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/90"></div>
          {/* Diagonal Clip Path Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}></div>
        </div>

        {/* Content - Left Aligned */}
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl opacity-0 animate-slide-in-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 bg-sky-500/20 rounded-lg text-sky-400 backdrop-blur-sm border border-sky-500/30">
                <MessageSquare size={20} />
              </span>
              <h5 className="text-sky-400 font-bold tracking-widest uppercase text-sm">24/7 Support</h5>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Get in Touch with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">
                Lenda Technologies
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed italic border-l-4 border-sky-500 pl-6 max-w-2xl">
              "Ready to modernize your microfinance operations? Whether you need a demo, a quote, or technical support, our team in Masvingo is ready to help."
            </p>
          </div>
        </div>

        {/* Diagonal Bottom Edge */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-slate-50" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }}></div>
      </div>

      {/* 2. Contact Grid Cards */}
      <section className="relative z-20 -mt-24 container mx-auto px-4 md:px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Visit Card */}
          <div 
            className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100 relative overflow-hidden"
            onMouseEnter={() => setActiveCard(0)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl transition-transform duration-500 ${activeCard === 0 ? 'scale-150' : 'scale-100'}`}></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Visit Our Office</h3>
              <p className="text-slate-500 text-sm mb-4 h-10">We are located in the heart of Masvingo.</p>
              <div className="space-y-1">
                <p className="font-semibold text-slate-800">No. 337 Robert Mugabe Way</p>
                <p className="text-slate-600">Masvingo, Zimbabwe</p>
              </div>
            </div>
          </div>

          {/* Call Card */}
          <div 
            className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100 relative overflow-hidden"
            onMouseEnter={() => setActiveCard(1)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl transition-transform duration-500 ${activeCard === 1 ? 'scale-150' : 'scale-100'}`}></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                <Phone size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
              <p className="text-slate-500 text-sm mb-4 h-10">Speak directly to our sales or support team.</p>
              <div className="space-y-1 text-slate-700">
                <p><span className="font-semibold text-slate-900">Landline:</span> +263 392 261 394</p>
                <p><span className="font-semibold text-slate-900">Mobile:</span> +263 778 325 262</p>
                <p className="text-purple-600 font-bold mt-2">Support: +263 785 513 366</p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div 
            className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100 relative overflow-hidden"
            onMouseEnter={() => setActiveCard(2)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl transition-transform duration-500 ${activeCard === 2 ? 'scale-150' : 'scale-100'}`}></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                <Mail size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
              <p className="text-slate-500 text-sm mb-4 h-10">Send us your inquiries, we'll reply within 24h.</p>
              <div className="space-y-1 text-slate-700">
                <p className="font-semibold text-slate-900">info@lendatech.co.zw</p>
                <p className="text-sm">tanaka@lendatech.co.zw</p>
                <a href="#" className="inline-flex items-center gap-1 text-emerald-600 font-medium text-sm mt-2 hover:underline">
                  <Globe size={14} /> www.lenda.co.zw
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Form & Compliance Split Section */}
      <section className="container mx-auto px-4 md:px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7" id="contact-form">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100 relative overflow-hidden">
               {/* Decoration */}
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-500 to-purple-500"></div>
               
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                 <div>
                    <h2 className="text-3xl font-bold text-slate-900">Send us a Message</h2>
                    <p className="text-slate-500 mt-2">Fill out the form below and we'll start a conversation.</p>
                 </div>
                 <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center text-sky-500 animate-pulse">
                   <Send size={24} />
                 </div>
               </div>
               
               {status === 'success' ? (
                 <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
                   <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                     <CheckCircle size={40} />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                   <p className="text-slate-600">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                   <button onClick={() => setStatus('idle')} className="mt-6 text-sky-600 font-medium hover:underline">Send another message</button>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2 group">
                       <label className="text-sm font-bold text-slate-700 ml-1 group-focus-within:text-sky-600 transition-colors">Full Name</label>
                       <input name="fullName" value={formData.fullName} onChange={handleInputChange} required type="text" className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all duration-300 font-medium text-slate-900 placeholder:text-slate-400" placeholder="e.g. Tanaka Moyo" />
                     </div>
                     <div className="space-y-2 group">
                       <label className="text-sm font-bold text-slate-700 ml-1 group-focus-within:text-sky-600 transition-colors">Company Name</label>
                       <input name="companyName" value={formData.companyName} onChange={handleInputChange} required type="text" className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all duration-300 font-medium text-slate-900 placeholder:text-slate-400" placeholder="e.g. Lenda Microfinance" />
                     </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2 group">
                       <label className="text-sm font-bold text-slate-700 ml-1 group-focus-within:text-sky-600 transition-colors">Email Address</label>
                       <input name="email" value={formData.email} onChange={handleInputChange} required type="email" className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all duration-300 font-medium text-slate-900 placeholder:text-slate-400" placeholder="name@company.com" />
                     </div>
                     <div className="space-y-2 group">
                       <label className="text-sm font-bold text-slate-700 ml-1 group-focus-within:text-sky-600 transition-colors">Phone Number</label>
                       <input name="phone" value={formData.phone} onChange={handleInputChange} required type="tel" className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all duration-300 font-medium text-slate-900 placeholder:text-slate-400" placeholder="+263 77..." />
                     </div>
                   </div>

                   <div className="space-y-2 group">
                     <label className="text-sm font-bold text-slate-700 ml-1 group-focus-within:text-sky-600 transition-colors">I am interested in</label>
                     <div className="relative">
                       <select name="interest" value={formData.interest} onChange={handleInputChange} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all duration-300 font-medium text-slate-900 appearance-none cursor-pointer">
                         <option>Core Banking System (CBS)</option>
                         <option>SSB Deductions Platform</option>
                         <option>Custom Software Development</option>
                         <option>General Inquiry</option>
                       </select>
                       <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                         <ArrowRight size={16} className="rotate-90" />
                       </div>
                     </div>
                   </div>

                   <div className="space-y-2 group">
                     <label className="text-sm font-bold text-slate-700 ml-1 group-focus-within:text-sky-600 transition-colors">Message</label>
                     <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={4} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all duration-300 font-medium text-slate-900 placeholder:text-slate-400 resize-none" placeholder="Tell us about your project requirements..."></textarea>
                   </div>

                   <button disabled={status === 'submitting'} type="submit" className="lenda-button w-full justify-between group disabled:opacity-70 disabled:cursor-not-allowed">
                     <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
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
                 </form>
               )}
            </div>
          </div>

          {/* Right: Compliance & Map */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Business & Compliance Information (Premium Card) */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
               {/* Animated Background */}
               <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-sky-500/30 transition-colors duration-500"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 group-hover:bg-purple-500/30 transition-colors duration-500"></div>
               
               {/* Texture */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="p-3.5 bg-gradient-to-br from-white/10 to-transparent rounded-xl backdrop-blur-md border border-white/20 shadow-lg">
                     <ShieldCheck size={28} className="text-emerald-400" />
                   </div>
                   <div>
                     <h2 className="text-2xl font-bold tracking-tight">Business Profile</h2>
                     <p className="text-slate-400 text-sm">Verified Entity Status</p>
                   </div>
                 </div>

                 <div className="space-y-5">
                   <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center hover:bg-white/10 transition-colors">
                     <div>
                       <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Legal Entity</p>
                       <p className="font-bold text-white">Alpha-Lend Solutions</p>
                     </div>
                     <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded border border-emerald-500/30">Active</span>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Est.</p>
                        <p className="font-bold text-xl">2020</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Status</p>
                        <p className="font-bold text-emerald-400 flex items-center gap-2 text-sm">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                          Compliant
                        </p>
                      </div>
                   </div>

                   <div className="bg-white/5 p-5 rounded-xl border border-white/10 relative overflow-hidden">
                      <div className="absolute top-2 right-2 text-white/10">
                         <Clock size={40} />
                      </div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">Banking Partners</p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="font-medium text-white">Nostro</span>
                          <span className="text-slate-300 text-sm">Steward Bank</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-white">ZiG</span>
                          <span className="text-slate-300 text-sm">Steward Bank</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-3 pt-3 border-t border-white/5 italic">
                        * Full details provided on official invoices.
                      </p>
                   </div>
                 </div>
               </div>
            </div>

            {/* Map Section */}
            <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-100 group hover:shadow-2xl transition-all duration-300" id="office-map">
              <div className="rounded-2xl overflow-hidden h-[250px] w-full relative mb-4 shadow-inner">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3731.8744081698246!2d30.832!3d-20.071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1eb553556f8740d7%3A0x89221124628!2s337%20Robert%20Mugabe%20Way%2C%20Masvingo%2C%20Zimbabwe!5e0!3m2!1sen!2szw!4v1620000000000!5m2!1sen!2szw" 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0, filter: 'grayscale(0.2)' }} 
                   allowFullScreen={true} 
                   loading="lazy"
                   title="Lenda Technologies Office Location"
                 ></iframe>
              </div>
              
              <button 
                onClick={handleGetDirections}
                disabled={isLocating}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-sky-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20 active:scale-95 duration-200"
              >
                {isLocating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Getting Location...
                  </>
                ) : (
                  <>
                    <Navigation size={18} />
                    Get Directions
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};


import React from 'react';
import { Bot, MessageSquare, Globe, Terminal, Clock, DollarSign, UserPlus, CheckCircle } from 'lucide-react';

interface ChatbotPageProps {
  onNavigate: (view: 'home' | 'about' | 'contact' | 'quote' | 'chatbots') => void;
}

export const ChatbotPage: React.FC<ChatbotPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Hero Section */}
      <div className="relative min-h-[80vh] flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1600&q=80" 
            alt="AI Communication" 
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
                AI & Automation
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              24/7 Customer Service <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                Without the Call Center.
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-10 border-l-4 border-emerald-500 pl-6">
              Automate your customer interactions on WhatsApp and the Web. Let our intelligent Chatbots handle inquiries, loan applications, and support instantly.
            </p>
            <button 
              onClick={() => onNavigate('quote')}
              className="lenda-button scale-100"
            >
              <span>See a Demo</span>
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

      {/* 2. What is a Chatbot? */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">What is a Chatbot?</h2>
              <div className="w-20 h-1.5 bg-sky-500"></div>
              <p className="text-lg text-slate-600 leading-relaxed">
                As described in our profile, a chatbot is a computer program that simulates human conversation.
              </p>
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">Basic Bots</h4>
                  <p className="text-slate-600">Answer simple queries instantly (e.g., "What are your requirements?").</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">Smart Bots</h4>
                  <p className="text-slate-600">Learn from interactions and handle complex tasks (e.g., "Apply for a loan").</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed italic">
                In today's fast-paced world, your customers expect instant answers. If you don't reply in minutes, they go to your competitor. A chatbot ensures you are "open for business" 24 hours a day, 7 days a week.
              </p>
            </div>
            <div className="relative">
              <div className="absolute top-10 right-10 w-full h-full bg-emerald-50 rounded-3xl -z-10 transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=800&q=80" 
                alt="Chat Interaction" 
                className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Solutions */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Solutions</h2>
            <p className="text-slate-600">Automation tools tailored for the Zimbabwean market.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* WhatsApp */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">1. WhatsApp Chatbots</h3>
              <p className="text-xs font-bold text-green-600 uppercase mb-4">Business Essential</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                In Zimbabwe, WhatsApp is the internet. We build verified WhatsApp bots that allow your customers to:
              </p>
              <ul className="space-y-2 text-slate-600 text-sm">
                 <li className="flex gap-2"><CheckCircle size={14} className="text-green-500 mt-0.5" /> Check loan balance</li>
                 <li className="flex gap-2"><CheckCircle size={14} className="text-green-500 mt-0.5" /> Submit loan applications</li>
                 <li className="flex gap-2"><CheckCircle size={14} className="text-green-500 mt-0.5" /> Request statements</li>
                 <li className="flex gap-2"><CheckCircle size={14} className="text-green-500 mt-0.5" /> Get price lists</li>
              </ul>
            </div>

            {/* Website */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-6">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2. Website Assistants</h3>
              <p className="text-xs font-bold text-sky-600 uppercase mb-4">Lead Generation</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Engage visitors the moment they land on your site. Our web-based bots can guide users to the right products, capture their contact details (Lead Generation), and answer FAQs automatically.
              </p>
            </div>

            {/* Internal */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Terminal size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">3. Internal Operations</h3>
              <p className="text-xs font-bold text-purple-600 uppercase mb-4">Efficiency</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Chatbots aren't just for customers. We can build internal bots for your staff to quickly query databases (e.g., "Show me sales for today") using simple chat commands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Benefits */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Benefits for Your Business</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
               <Clock className="text-sky-400 mb-4" size={32} />
               <h4 className="font-bold text-lg mb-2">Instant Response</h4>
               <p className="text-slate-400 text-sm">Zero waiting time for your customers.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
               <DollarSign className="text-emerald-400 mb-4" size={32} />
               <h4 className="font-bold text-lg mb-2">Reduce Costs</h4>
               <p className="text-slate-400 text-sm">One bot can handle 1,000 customers at once.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
               <UserPlus className="text-purple-400 mb-4" size={32} />
               <h4 className="font-bold text-lg mb-2">Lead Capture</h4>
               <p className="text-slate-400 text-sm">Never miss a sales lead. Always ask for details.</p>
            </div>
             <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
               <Bot className="text-orange-400 mb-4" size={32} />
               <h4 className="font-bold text-lg mb-2">Consistency</h4>
               <p className="text-slate-400 text-sm">The bot always gives the correct, approved answer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Who Needs This? */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Who Needs This?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2">Microfinance</h4>
              <p className="text-slate-600 text-xs">Automate balance checks & application pre-screening.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2">Retail</h4>
              <p className="text-slate-600 text-xs">Automate orders and price inquiries.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2">Insurance</h4>
              <p className="text-slate-600 text-xs">Automate claim status checks and policy renewals.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2">Education</h4>
              <p className="text-slate-600 text-xs">Automate student inquiries and fee structures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="bg-slate-50 py-20 relative border-t-8 border-slate-200">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ready to Automate?</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Don't let missed calls turn into lost business.
          </p>
          <div className="flex justify-center">
             <button 
                onClick={() => onNavigate('quote')}
                className="lenda-button scale-100"
              >
                <span>Build Your Bot Today</span>
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

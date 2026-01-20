// Fix: Use standard modular Firebase imports and updated Gemini SDK patterns
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, Minus, Loader2, ArrowUpRight, Mic, Volume2, VolumeX, Eye } from 'lucide-react';
import { GoogleGenAI, Chat, FunctionDeclaration, Type, Modality } from "@google/genai";

// --- SITE CONTEXT FOR AI ---
const LENDA_CONTEXT = `
You are the AI assistant for Lenda Technologies.
Your goal is to answer questions about Lenda's products and services based strictly on the information below.

COMPANY PROFILE:
- Name: Lenda Technologies.
- Location: No. 337 Robert Mugabe Way, Masvingo, Zimbabwe.
- Contacts: +263 392 261 394 (Landline), +263 778 325 262 (Mobile/WhatsApp), info@lendatech.co.zw.
- Mission: To engineer durable software infrastructure for Africa's financial sector.

PRODUCTS & SERVICES:

1. CORE BANKING SYSTEM (CBS) - "The Heart of Your Financial Operations"
   - For: African Microfinance Institutions (MFIs) and SACCOs.
   - Key Features:
     - Client Management: KYC compliance (digital IDs, biometrics), Group Lending tracking.
     - Loan Management: Automates origination to closure. Configurable rates, penalties, grace periods. Auto-amortization schedules.
     - Integrated Accounting: Real-time GL posting, Expense management, Multi-currency (ZiG/USD/African Currencies).
     - Treasury & Cash: Vault limits, Teller operations.
     - Reporting: Regulatory reports, Portfolio at Risk (PAR), NPLs.
   - Tech Specs: Cloud or On-Premise deployment, Role-Based Access Control (RBAC), Audit Trails, Encrypted Files.
   - Target: Plug & Play for African regional compliance.

2. SSB DEDUCTIONS PLATFORM
   - Function: Automates "Stop Order" loan deductions for civil servants.
   - Key Features: 
     - Automated "Stop Order" file generation.
     - Bulk File Upload (handles 10 to 10,000+ clients).
     - Pre-Validation Checks to reduce rejections.
     - Reconciliation: Auto-compares requests vs. payments received.
   - Benefits: Zero formatting errors, reduced admin costs, faster collections.

3. CUSTOM SOFTWARE DEVELOPMENT (Includes AI Chatbots & Integrations)
   - Services: 
     - Web & Mobile App Development (Android/iOS).
     - AI Chatbots: WhatsApp (Business Essential) and Web assistants.
     - System Integrations: EcoCash, OneMoney, Paynow, Accounting (Sage, QuickBooks, Xero), Banking APIs.
   - Why Lenda?: Local understanding, cost-effective local rates, intellectual property ownership.

PRICING & QUOTES:
- Do not provide specific dollar amounts besides "Lenda Starter" which starts at $100/Mo.
- Encourage users to use the "Get a Quote" feature for a tailored proposal.

NAVIGATION INSTRUCTIONS:
- You have access to a tool called 'navigate_to_page'.
- WHENEVER the user asks about a specific product, service, or section, you MUST call this tool to open the relevant page for them.
- Page IDs: 'home', 'about', 'contact', 'quote', 'core-banking', 'ssb', 'custom', 'blog'.
`;

// --- AUDIO HELPERS ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  pendingNavigation?: {
    page: string;
    section?: string;
    label: string;
  };
}

interface ChatBotProps {
  onNavigate: (view: any) => void;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const navigationTool: FunctionDeclaration = {
  name: "navigate_to_page",
  description: "Suggests a navigation action to the user to see a specific page or section.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      page: {
        type: Type.STRING,
        description: "The view ID to navigate to.",
        enum: ['home', 'about', 'contact', 'quote', 'core-banking', 'ssb', 'custom', 'blog']
      },
      section: {
        type: Type.STRING,
        description: "The HTML ID of the section or card to highlight."
      },
      label: {
        type: Type.STRING,
        description: "Short label for the button."
      }
    },
    required: ["page", "label"]
  }
};

export const ChatBot: React.FC<ChatBotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! 👋 I'm the Lenda AI Assistant. Ask me anything about our Core Banking System, SSB Platform, or Custom Development services.", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatSessionRef = useRef<Chat | null>(null);
  const [aiError, setAiError] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const recognitionRef = useRef<any>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    if (!chatSessionRef.current) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chatSessionRef.current = ai.chats.create({
                model: 'gemini-3-flash-preview',
                config: {
                    systemInstruction: LENDA_CONTEXT,
                    tools: [{ functionDeclarations: [navigationTool] }]
                }
            });
        } catch (error) {
            console.error("Failed to initialize Gemini AI:", error);
            setAiError(true);
        }
    }
  }, []);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      
      recognitionRef.current.onresult = (event: any) => {
         const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
         setInputValue(transcript);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isMinimized && isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, isListening, isMinimized]);

  const toggleVoice = () => {
    if (voiceEnabled) {
      if (currentSourceRef.current) {
        currentSourceRef.current.stop();
      }
    } else {
        initAudioContext();
    }
    setVoiceEnabled(!voiceEnabled);
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    initAudioContext();
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setInputValue(""); 
      recognitionRef.current.start();
    }
  };

  const initAudioContext = async () => {
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
    }
    if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
    }
  };

  const speak = async (text: string) => {
    if (!voiceEnabled) return;
    
    try {
        const cleanText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1').replace(/\*/g, '');
        if (!cleanText.trim()) return;

        await initAudioContext();

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: cleanText }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) return;

        if (audioContextRef.current) {
            const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                audioContextRef.current,
                24000,
                1
            );

            if (currentSourceRef.current) {
                try {
                    currentSourceRef.current.stop();
                } catch (e) {}
            }

            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContextRef.current.destination);
            source.onended = () => {
                if (currentSourceRef.current === source) {
                    currentSourceRef.current = null;
                }
            };
            currentSourceRef.current = source;
            source.start();
        }

    } catch (error) {
        console.error("Gemini TTS Error:", error);
    }
  };

  const handleInputFocus = () => {
    if (isMinimized) {
      setIsMinimized(false);
    }
    initAudioContext();
  };

  const executeNavigation = (page: any, section: string | undefined) => {
      onNavigate(page);
      if (section) {
          setTimeout(() => {
              const element = document.getElementById(section);
              if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  element.classList.add('animate-pulse-thrice');
                  setTimeout(() => element.classList.remove('animate-pulse-thrice'), 2500);
              }
          }, 800);
      }
      setIsMinimized(true);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
    }

    initAudioContext();

    const userMsgText = inputValue;
    const newMessage: Message = {
      id: Date.now(),
      text: userMsgText,
      sender: 'user'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);
    setIsMinimized(false);

    if (currentSourceRef.current) {
        currentSourceRef.current.stop();
    }

    try {
        if (!chatSessionRef.current) {
             throw new Error("AI not initialized");
        }

        let response = await chatSessionRef.current.sendMessage({ message: userMsgText });

        let botMessageText = response.text || "";
        let pendingNav = undefined;

        if (response.functionCalls && response.functionCalls.length > 0) {
            const functionResponseParts = [];
            
            for (const call of response.functionCalls) {
                if (call.name === "navigate_to_page") {
                    const { page, section, label } = call.args as any;
                    pendingNav = { page, section, label };
                    functionResponseParts.push({
                        functionResponse: {
                            name: call.name,
                            response: { result: `Navigation button for ${page} created successfully.` }
                        }
                    });
                }
            }

            if (functionResponseParts.length > 0) {
                const toolResponse = await chatSessionRef.current.sendMessage({ message: functionResponseParts });
                if (toolResponse.text) {
                    botMessageText = botMessageText ? `${botMessageText}\n${toolResponse.text}` : toolResponse.text;
                }
            }
        }

        if (botMessageText || pendingNav) {
            const botResponse: Message = {
                id: Date.now() + 1,
                text: botMessageText || "Here is the information you requested.",
                sender: 'bot',
                pendingNavigation: pendingNav
            };
            setMessages(prev => [...prev, botResponse]);
            if (botMessageText) speak(botMessageText);
        }

    } catch (error) {
        console.error("AI Error:", error);
        const fallbackText = "I'm having trouble connecting to the server right now. Please try again later.";
        const fallbackResponse: Message = {
            id: Date.now() + 1,
            text: fallbackText,
            sender: 'bot'
        };
        setMessages(prev => [...prev, fallbackResponse]);
        speak(fallbackText);
    } finally {
        setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const renderMessageText = (msg: Message) => {
    const text = msg.text;
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      const label = match[1];
      const viewId = match[2];
      
      parts.push(
        <button
          key={match.index}
          onClick={() => onNavigate(viewId)}
          className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 rounded px-1 -mx-0.5 font-semibold inline-flex items-center gap-0.5 transition-colors underline decoration-sky-300 underline-offset-2"
        >
          {label} <ArrowUpRight size={10} strokeWidth={3} />
        </button>
      );
      
      lastIndex = regex.lastIndex;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return (
      <div className="flex flex-col gap-2">
        <div>{parts.length > 0 ? parts : text}</div>
        
        {msg.pendingNavigation && (
          <button 
            onClick={() => executeNavigation(msg.pendingNavigation?.page, msg.pendingNavigation?.section)}
            className="self-start mt-2 flex items-center gap-2 bg-sky-50 text-sky-600 px-4 py-2 rounded-xl border border-sky-100 hover:bg-sky-100 hover:shadow-sm transition-all font-bold text-xs group"
          >
            <Eye size={14} className="group-hover:scale-110 transition-transform" />
            {msg.pendingNavigation.label || `Open ${msg.pendingNavigation.page}`}
            <ArrowUpRight size={14} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div 
          className={`mb-4 w-[350px] md:w-[400px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-700 transition-all duration-500 ease-in-out origin-bottom-right ${
            isMinimized ? 'h-[80px]' : 'h-[550px]'
          }`}
        >
          <div className={`bg-slate-900 p-4 flex items-center justify-between text-white border-b border-slate-800 transition-opacity duration-300 ${isMinimized ? 'opacity-0 h-0 p-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/20">
                <Bot size={20} className="text-sky-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">Lenda AI</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full inline-block shadow-[0_0_8px_rgba(34,197,94,0.6)] ${aiError ? 'bg-red-500' : 'bg-green-500'}`}></span>
                  {aiError ? 'Offline' : 'Online'}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
               <button 
                onClick={toggleVoice} 
                className={`p-1.5 rounded-full transition-colors ${voiceEnabled ? 'bg-sky-500/20 text-sky-400' : 'hover:bg-white/10 text-slate-400 hover:text-white'}`}
                title={voiceEnabled ? "Mute Voice Output" : "Enable Voice Output"}
              >
                {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
               <button 
                onClick={() => setIsOpen(false)} 
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <Minus size={18} />
              </button>
            </div>
          </div>

          <div className={`flex-grow p-4 overflow-y-auto bg-slate-50 space-y-4 transition-all duration-300 ${isMinimized ? 'opacity-0 hidden' : 'opacity-100 block'}`}>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user' 
                      ? 'bg-slate-900 text-white rounded-tr-none border border-slate-800' 
                      : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {renderMessageText(msg)}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 shadow-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={`p-4 bg-white border-t border-slate-100 relative ${isMinimized ? 'h-full flex flex-col justify-center' : ''}`}>
            {isListening && (
              <div className="absolute top-0 left-0 right-0 -mt-8 flex justify-center pointer-events-none">
                 <div className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Listening...
                 </div>
              </div>
            )}

            <div className="flex gap-2">
              <div className="relative flex-grow">
                 <input 
                   type="text" 
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   onKeyDown={handleKeyPress}
                   onFocus={handleInputFocus}
                   placeholder={isListening ? "Listening..." : "Ask about our software..."}
                   disabled={aiError}
                   className={`w-full bg-slate-50 border text-slate-800 text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all placeholder:text-slate-400 disabled:opacity-50 ${isListening ? 'border-sky-500 ring-2 ring-sky-100' : 'border-slate-200'}`}
                 />
                 <button 
                   onClick={toggleMic}
                   className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
                     isListening 
                       ? 'bg-red-500 text-white animate-pulse' 
                       : 'text-slate-400 hover:bg-slate-200 hover:text-slate-600'
                   }`}
                   title="Speak Command"
                 >
                   <Mic size={16} />
                 </button>
              </div>
              
              <button 
                onClick={handleSendMessage}
                disabled={isTyping || inputValue.trim() === "" || aiError}
                className="bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
              >
                {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            
            <div className={`text-center mt-3 transition-opacity duration-200 ${isMinimized ? 'opacity-0 hidden' : 'opacity-100'}`}>
               <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1 font-medium tracking-wide">
                 POWERED BY LENDA AI <Sparkles size={10} className="text-sky-500" />
               </span>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setIsMinimized(false);
          if (!isOpen) initAudioContext();
        }}
        className={`group relative shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center border-2 border-slate-700/50 ${
          isOpen 
            ? 'p-3 rounded-full bg-slate-800 text-white' 
            : 'px-5 py-3 rounded-full bg-slate-900 text-white gap-2'
        }`}
      >
        {isOpen ? (
          <X size={20} className="animate-in spin-in-90 duration-300" />
        ) : (
          <>
            <div className="relative">
              <Bot size={20} className="text-sky-400" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
              </span>
            </div>
            <span className="font-bold tracking-wide text-xs whitespace-nowrap">Ask Lenda AI</span>
          </>
        )}
        
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-slate-900 opacity-20 animate-ping -z-10"></span>
        )}
      </button>
    </div>
  );
};
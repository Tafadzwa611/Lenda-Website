
// Fix: Use standard modular Firestore imports
import React, { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Calendar, Clock, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  coverImage: string;
  content: string; // HTML string
  createdAt: number;
}

interface BlogProps {
  onNavigate: (view: 'home' | 'about' | 'contact' | 'quote' | 'blog') => void;
  initialPostId?: string | null;
  onClearInitialPost?: () => void;
}

export const Blog: React.FC<BlogProps> = ({ onNavigate, initialPostId, onClearInitialPost }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Animation States
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(firestore, 'blog_posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      setPosts(postsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Intersection Observer for Reveal Animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [loading]);

  // Handle deep link from home page
  useEffect(() => {
    if (initialPostId && posts.length > 0) {
      const post = posts.find(p => p.id === initialPostId);
      if (post) {
        setSelectedPost(post);
      }
    }
  }, [initialPostId, posts]);

  // Helper to strip HTML and get excerpt
  const getExcerpt = (html: string, length: number = 100) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const handleBackToArticles = () => {
    setSelectedPost(null);
    if (onClearInitialPost) onClearInitialPost();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Custom Styles for specific animations requested
  const customStyles = `
    @keyframes enter-pop-left {
      0% { opacity: 0; transform: translateX(-60px) scale(0.8); }
      70% { opacity: 1; transform: translateX(0) scale(1.05); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes enter-pop-bottom {
      0% { opacity: 0; transform: translateY(60px) scale(0.8); }
      70% { opacity: 1; transform: translateY(0) scale(1.05); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes enter-pop-right {
      0% { opacity: 0; transform: translateX(60px) scale(0.8); }
      70% { opacity: 1; transform: translateX(0) scale(1.05); }
      100% { opacity: 1; transform: scale(1); }
    }
    
    .animate-pop-left { animation: enter-pop-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-pop-bottom { animation: enter-pop-bottom 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-pop-right { animation: enter-pop-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

    .typing-container {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      width: 0;
      transition: width 0.5s steps(15, end);
    }
    
    .group:hover .typing-container {
      width: 100px; /* Approximate width of 'Read Article' */
    }
  `;

  if (selectedPost) {
    return (
      <div className="bg-white min-h-screen">
        {/* Detail View */}
        <div className="relative h-[60vh] flex items-end">
          <div className="absolute inset-0">
             <img 
               src={selectedPost.coverImage} 
               alt={selectedPost.title} 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4 md:px-6 pb-12">
            <button 
              onClick={handleBackToArticles}
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Articles
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight shadow-sm">{selectedPost.title}</h1>
            <div className="flex items-center gap-4 text-slate-300 text-sm">
              <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(selectedPost.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {new Date(selectedPost.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 md:px-6 py-20">
          <div 
            className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-sky-600 hover:prose-a:text-sky-500 prose-img:rounded-2xl prose-img:shadow-xl"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          ></div>
        </article>
        
        {/* Navigation Footer for Blog with Spacing & Line Separator */}
        <div className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
          <div className="container mx-auto px-4 text-center mb-16">
            <button 
              onClick={handleBackToArticles}
              className="lenda-button scale-100"
            >
              <span>Read More Articles</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
              </svg>
            </button>
          </div>
          
          {/* Separator Line */}
          <div className="container mx-auto px-4">
            <div className="w-full h-px bg-slate-300"></div>
            <div className="h-10"></div> {/* Extra space below line */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <style>{customStyles}</style>
      
      {/* List View Hero */}
      <div className="relative min-h-[50vh] flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0">
          <img 
             src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80" 
             alt="Lenda Blog" 
             className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-4xl opacity-0 animate-slide-in-left">
            <div className="flex items-center gap-3 mb-6">
               <span className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400 backdrop-blur-sm border border-indigo-500/30 font-bold tracking-wider uppercase text-xs">
                 Thoughts & News
               </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Lenda <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">Insights</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl pl-6 border-l-4 border-indigo-500">
              Stay updated with the latest trends in fintech, microfinance technology, and company news.
            </p>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-6 py-20 relative z-20">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <BookOpen className="text-indigo-500" /> Recent Articles
            </h2>
            <p className="text-slate-500 mt-2 text-lg">Explore our library of guides, updates, and success stories.</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow-xl h-96 animate-pulse">
                <div className="h-48 bg-slate-200 rounded-t-2xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-slate-100">
             <h3 className="text-2xl font-bold text-slate-900 mb-2">No Posts Yet</h3>
             <p className="text-slate-600">Check back soon for updates from our team.</p>
          </div>
        ) : (
          /* Grid Container with group for B&W hover effect */
          <div 
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 group/list"
          >
            {posts.map((post, index) => {
              // Determine entrance animation based on column position (approximate)
              let animClass = "";
              if (index % 3 === 0) animClass = "animate-pop-left";
              else if (index % 3 === 1) animClass = "animate-pop-bottom";
              else animClass = "animate-pop-right";

              return (
                <div 
                  key={post.id} 
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-slate-100 overflow-hidden flex flex-col cursor-pointer
                    opacity-0 ${isVisible ? animClass : ''}
                    transition-all duration-500 ease-in-out
                    grayscale-0 group-hover/list:grayscale hover:!grayscale-0 hover:z-10 hover:scale-[1.02]
                  `}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredPostId(post.id)}
                  onMouseLeave={() => setHoveredPostId(null)}
                  onClick={() => {
                     setSelectedPost(post);
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="h-56 relative overflow-hidden">
                     <img 
                       src={post.coverImage || "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"} 
                       alt={post.title} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                     <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                       {new Date(post.createdAt).toLocaleDateString()}
                     </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                     <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                       {post.title}
                     </h3>
                     <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                       {getExcerpt(post.content)}
                     </p>
                     
                     {/* Read Article Button with Typing Animation */}
                     <div className="mt-auto flex items-center gap-2 text-sky-600 font-bold text-sm h-6">
                       <span className="typing-container">Read Article</span>
                       <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

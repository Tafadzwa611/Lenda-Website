
// Fix: Use standard modular Firestore imports
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  coverImage: string;
  content: string;
  createdAt: number;
}

interface LatestNewsProps {
  onNavigate: (view: 'home' | 'about' | 'contact' | 'quote' | 'blog') => void;
  onViewPost: (id: string) => void;
}

export const LatestNews: React.FC<LatestNewsProps> = ({ onNavigate, onViewPost }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(firestore, 'blog_posts'), 
      orderBy('createdAt', 'desc'), 
      limit(3)
    );
    
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

  const getExcerpt = (html: string, length: number = 100) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  if (loading || posts.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Latest News & Insights</h2>
          <p className="text-slate-600">
            Updates on technology, microfinance trends, and Lenda company news.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map(post => (
            <div 
              key={post.id} 
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 overflow-hidden flex flex-col cursor-pointer"
              onClick={() => onViewPost(post.id)}
            >
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={post.coverImage || "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {getExcerpt(post.content)}
                </p>
                <div className="mt-auto inline-flex items-center gap-2 text-sky-600 font-bold text-sm group-hover:gap-3 transition-all">
                  Read Article <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => onNavigate('blog')}
            className="lenda-button secondary scale-100 border-2 border-slate-200"
          >
            <span>Read More News</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
              <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
              <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
              <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

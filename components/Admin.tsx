
// Fix: Use standard modular Firebase imports
import React, { useState, useEffect, useRef } from 'react';
import { db, firestore } from '../firebase';
import { ref, onValue, get, set, update } from 'firebase/database';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { Lock, LayoutDashboard, MessageSquare, FileText, Settings, LogOut, User, Mail, Phone, Bell, Save, Key, ArrowLeft, Home, Plus, Image as ImageIcon, Trash2, Edit, Bold, Italic, Underline, List, ChevronDown, Check, X, Link as LinkIcon, Type, AlignLeft, AlignCenter, AlignRight, AlignJustify, Undo, Redo, Palette, Menu, TrendingUp, Clock, Eye, MousePointer, Calendar, Filter, MousePointerClick } from 'lucide-react';

interface Quote {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  services: string[];
  clientCount: string;
  managementMethod: string;
  startDate: string;
  message: string;
  timestamp: number;
  status?: 'new' | 'read';
}

interface ContactMessage {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  timestamp: number;
  status?: 'new' | 'read';
}

interface BlogPost {
  id?: string;
  title: string;
  coverImage: string;
  content: string; // HTML string
  createdAt: number;
}

interface AnalyticsLog {
  page: string;
  duration: number;
  timestamp: number;
  sessionId?: string;
  clicks?: string[];
}

interface AdminProps {
  onNavigate: (view: 'home' | 'about' | 'contact' | 'quote' | 'admin') => void;
}

// --- Custom SVG Chart Components ---

const SimpleLineChart: React.FC<{ data: { label: string; value: number }[]; color: string }> = ({ data, color }) => {
  if (data.length < 2) return <div className="h-40 flex items-center justify-center text-slate-500 text-xs">Not enough data</div>;

  const height = 160;
  const width = 1000;
  const padding = 20;

  const maxValue = Math.max(...data.map(d => d.value)) || 1;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - (d.value / maxValue) * (height - padding * 2) - padding;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-40 relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#334155" strokeWidth="1" />
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="3"
          points={points}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-lg"
        />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
          const y = height - (d.value / maxValue) * (height - padding * 2) - padding;
          return (
             <g key={i} className="group cursor-pointer">
                <circle cx={x} cy={y} r="4" fill="#0f172a" stroke={color} strokeWidth="2" />
                <foreignObject x={x - 50} y={y - 45} width="100" height="40" className="opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg text-center border border-slate-600">
                      {d.label}: {d.value}
                   </div>
                </foreignObject>
             </g>
          );
        })}
      </svg>
      <div className="flex justify-between text-[10px] text-slate-400 mt-2 px-2">
         <span>{data[0]?.label}</span>
         <span>{data[Math.floor(data.length / 2)]?.label}</span>
         <span>{data[data.length - 1]?.label}</span>
      </div>
    </div>
  );
};

const SimpleBarChart: React.FC<{ data: { label: string; value: number }[]; color: string; onClick?: (label: string) => void }> = ({ data, color, onClick }) => {
   if (data.length === 0) return <div className="h-40 flex items-center justify-center text-slate-500 text-xs">No data available</div>;

   const maxValue = Math.max(...data.map(d => d.value)) || 1;
   const yAxisLabels = [maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0].map(Math.round);

   return (
     <div className="flex w-full h-56 pt-6 pb-2">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between text-[10px] text-slate-500 pr-2 h-[85%] text-right w-8 shrink-0">
           {yAxisLabels.map((val, i) => (
             <span key={i}>{val}</span>
           ))}
        </div>

        {/* Chart Area */}
        <div className="flex-1 flex items-end justify-between gap-2 h-full border-l border-b border-slate-700 pl-2">
          {data.map((d, i) => (
             <div 
               key={i} 
               onClick={() => onClick && onClick(d.label)}
               className="flex-1 flex flex-col items-center group relative cursor-pointer"
             >
                {/* Tooltip */}
                <div className="absolute -top-10 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-slate-600 pointer-events-none">
                   {d.label}: {Math.round(d.value)}s
                </div>
                
                <div 
                  className="w-full rounded-t-sm transition-all duration-300 group-hover:opacity-80"
                  style={{ 
                     height: `${(d.value / maxValue) * 85}%`, // Scale to 85% to match axis roughly
                     backgroundColor: color,
                     minHeight: '4px' 
                  }}
                ></div>
                <span className="text-[10px] text-slate-400 mt-2 truncate w-full text-center" title={d.label}>
                   {d.label.substring(0, 3)}
                </span>
             </div>
          ))}
        </div>
     </div>
   );
};

// --- Admin Component ---

export const Admin: React.FC<AdminProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'quotes' | 'messages' | 'blog' | 'analytics' | 'settings'>('quotes');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Analytics State
  const [analyticsData, setAnalyticsData] = useState<AnalyticsLog[]>([]);
  const [dateFilter, setDateFilter] = useState<'today' | 'yesterday' | 'week' | 'month' | 'year'>('week');
  const [pageFilter, setPageFilter] = useState<string>('all');
  const [stats, setStats] = useState({
    totalVisits: 0,
    avgTime: 0,
    popularPage: '-',
    uniqueVisitors: 0,
    viewsOverTime: [] as { label: string, value: number }[],
    timePerPage: [] as { label: string, value: number }[],
    visitorLogs: [] as AnalyticsLog[]
  });

  // Blog State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost>({ title: '', coverImage: '', content: '', createdAt: Date.now() });
  const editorRef = useRef<HTMLDivElement>(null);
  const savedSelection = useRef<Range | null>(null);
  
  // Editor UI
  const [showListDropdown, setShowListDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [textColor, setTextColor] = useState('#ffffff');
  const [selectedImg, setSelectedImg] = useState<HTMLImageElement | null>(null);
  const [resizeOverlay, setResizeOverlay] = useState<{ top: number, left: number, width: number, height: number } | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [mediaModal, setMediaModal] = useState<{ isOpen: boolean; type: 'image' | 'link'; url: string; text?: string; editingNode?: HTMLElement; }>({ isOpen: false, type: 'image', url: '' });

  // Settings State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // --- Auth & Initial Load ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const adminRef = ref(db, 'admin/accessKey');
      const snapshot = await get(adminRef);
      // Default password seeded as 123456
      const currentKey = snapshot.val() || '123456';
      if (password === currentKey) setIsAuthenticated(true);
      else alert('Invalid Password');
    } catch (error) { console.error("Auth Error:", error); alert('Error verifying credentials.'); }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { alert("Passwords do not match"); return; }
    if (newPassword.length < 4) { alert("Password is too short"); return; }
    try {
      const adminRef = ref(db, 'admin/accessKey');
      await set(adminRef, newPassword);
      setPasswordStatus('success');
      setNewPassword(''); setConfirmPassword('');
      setTimeout(() => setPasswordStatus('idle'), 3000);
    } catch (error) { console.error("Error updating password:", error); setPasswordStatus('error'); }
  };

  // --- Analytics Logic ---
  const filterLogsByDate = (logs: AnalyticsLog[], filter: typeof dateFilter) => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterdayStart = todayStart - 86400000;
    const weekStart = todayStart - (86400000 * 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const yearStart = new Date(now.getFullYear(), 0, 1).getTime();

    return logs.filter(log => {
      if (filter === 'today') return log.timestamp >= todayStart;
      if (filter === 'yesterday') return log.timestamp >= yesterdayStart && log.timestamp < todayStart;
      if (filter === 'week') return log.timestamp >= weekStart;
      if (filter === 'month') return log.timestamp >= monthStart;
      if (filter === 'year') return log.timestamp >= yearStart;
      return true;
    });
  };

  const processAnalytics = (allLogs: AnalyticsLog[]) => {
    if (allLogs.length === 0) return;

    // 1. Filter by Date
    let filteredLogs = filterLogsByDate(allLogs, dateFilter);

    // 2. Filter by Page (if selected)
    if (pageFilter !== 'all') {
      filteredLogs = filteredLogs.filter(log => log.page === pageFilter);
    }

    // --- KPIs ---
    const totalVisits = filteredLogs.length;
    const totalDuration = filteredLogs.reduce((acc, log) => acc + log.duration, 0);
    const avgTime = totalVisits > 0 ? Math.round(totalDuration / totalVisits) : 0;
    
    // Unique Visitors (based on sessionId)
    const uniqueSessionIds = new Set(filteredLogs.map(log => log.sessionId).filter(Boolean));
    const uniqueVisitors = uniqueSessionIds.size;

    // Popular Page (if not filtered by page)
    const pageCounts: Record<string, number> = {};
    const pageDurations: Record<string, number> = {};
    filteredLogs.forEach(log => {
      pageCounts[log.page] = (pageCounts[log.page] || 0) + 1;
      pageDurations[log.page] = (pageDurations[log.page] || 0) + log.duration;
    });
    const popularPage = Object.entries(pageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

    // --- Charts ---
    // Bar Chart: Time Per Page
    const timePerPage = Object.entries(pageDurations).map(([page, duration]) => ({
       label: page,
       value: pageCounts[page] ? duration / pageCounts[page] : 0
    }));

    // Line Chart: Visits Over Time
    // Bucket logic depending on filter
    const viewsOverTime: { label: string, value: number }[] = [];
    const sortedLogs = [...filteredLogs].sort((a, b) => a.timestamp - b.timestamp);
    
    // Simple bucketing for graph visualization
    // If 'today' or 'yesterday', bucket by Hour. Else bucket by Date.
    const isDayView = dateFilter === 'today' || dateFilter === 'yesterday';
    const timeMap: Record<string, number> = {};

    sortedLogs.forEach(log => {
        const date = new Date(log.timestamp);
        if (isDayView) {
            date.setMinutes(0, 0, 0);
        }
        const key = isDayView 
            ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            : date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        
        timeMap[key] = (timeMap[key] || 0) + 1;
    });

    for (const [label, value] of Object.entries(timeMap)) {
        viewsOverTime.push({ label, value });
    }
    
    setStats({
      totalVisits,
      avgTime,
      popularPage,
      uniqueVisitors,
      viewsOverTime,
      timePerPage,
      visitorLogs: filteredLogs.sort((a, b) => b.timestamp - a.timestamp) // Newest first
    });
  };

  useEffect(() => {
    if (activeTab === 'analytics') {
       processAnalytics(analyticsData);
    }
  }, [dateFilter, pageFilter, analyticsData]); // Re-run when filters change

  // --- Tab Switching ---
  const handleSwitchTab = async (tab: 'quotes' | 'messages' | 'blog' | 'analytics' | 'settings') => {
    setActiveTab(tab);
    setIsEditingBlog(false);
    setIsMobileMenuOpen(false);

    if (tab === 'quotes') {
      const updates: any = {};
      quotes.forEach(q => { if (q.status === 'new' || !q.status) updates[`quotes/${q.id}/status`] = 'read'; });
      if (Object.keys(updates).length > 0) await update(ref(db), updates);
    }
    if (tab === 'messages') {
      const updates: any = {};
      contacts.forEach(c => { if (c.status === 'new' || !c.status) updates[`contacts/${c.id}/status`] = 'read'; });
      if (Object.keys(updates).length > 0) await update(ref(db), updates);
    }
    if (tab === 'blog') fetchBlogPosts();
    if (tab === 'analytics') {
      const analyticsRef = ref(db, 'analytics/logs');
      onValue(analyticsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const logs = Object.values(data) as AnalyticsLog[];
          setAnalyticsData(logs);
          processAnalytics(logs);
        }
      }, { onlyOnce: true });
    }
  };

  // --- Blog & Editor Logic ---
  const fetchBlogPosts = async () => {
    const q = query(collection(firestore, 'blog_posts'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    setBlogPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[]);
  };

  useEffect(() => {
    if (isEditingBlog && editorRef.current && editorRef.current.innerHTML !== currentPost.content) {
      editorRef.current.innerHTML = currentPost.content;
    }
  }, [isEditingBlog, currentPost.id]);

  const handleSavePost = async () => {
    if (!currentPost.title) { alert("Title is required."); return; }
    try {
      const content = editorRef.current?.innerHTML || currentPost.content;
      if (!content) { alert("Content is required."); return; }
      const postData = { ...currentPost, content, createdAt: currentPost.createdAt || Date.now() };
      if (currentPost.id) await updateDoc(doc(firestore, 'blog_posts', currentPost.id), { ...postData });
      else await addDoc(collection(firestore, 'blog_posts'), postData);
      setIsEditingBlog(false); setCurrentPost({ title: '', coverImage: '', content: '', createdAt: Date.now() }); fetchBlogPosts();
    } catch (error) { console.error("Error saving post:", error); alert("Failed to save post."); }
  };

  const handleDeletePost = async (id: string) => { if (window.confirm("Delete this post?")) { try { await deleteDoc(doc(firestore, 'blog_posts', id)); fetchBlogPosts(); } catch (error) { console.error(error); } } };
  
  // Editor Helpers
  const execCmd = (cmd: string, val?: string) => { document.execCommand(cmd, false, val); editorRef.current?.focus(); updateActiveFormats(); };
  
  const updateActiveFormats = () => {
    const formats = [];
    if (document.queryCommandState('bold')) formats.push('bold');
    if (document.queryCommandState('italic')) formats.push('italic');
    if (document.queryCommandState('underline')) formats.push('underline');
    if (document.queryCommandState('justifyLeft')) formats.push('justifyLeft');
    if (document.queryCommandState('justifyCenter')) formats.push('justifyCenter');
    if (document.queryCommandState('justifyRight')) formats.push('justifyRight');
    if (document.queryCommandState('insertUnorderedList')) formats.push('insertUnorderedList');
    if (document.queryCommandState('insertOrderedList')) formats.push('insertOrderedList');
    setActiveFormats(formats);
  };

  const handleListStyle = (type: string) => {
    if (type === 'disc') {
      execCmd('insertUnorderedList');
    } else {
      execCmd('insertOrderedList');
      // Apply type attribute to the closest ol
      const sel = window.getSelection();
      if (sel?.anchorNode) {
        const list = sel.anchorNode.parentElement?.closest('ol');
        if (list) {
          list.style.listStyleType = type;
          if (type === 'lower-roman') list.className = "list-inside list-lower-roman pl-5";
          if (type === 'decimal') list.className = "list-inside list-decimal pl-5";
        }
      }
    }
    setShowListDropdown(false);
  };

  const handleFontSize = (size: string) => { execCmd('fontSize', size); setShowSizeDropdown(false); };
  
  const handleColorChange = (e: any) => { setTextColor(e.target.value); execCmd('foreColor', e.target.value); };
  
  const openMediaModal = (type: 'image' | 'link') => { 
      const sel = window.getSelection(); 
      if (sel && sel.rangeCount > 0) savedSelection.current = sel.getRangeAt(0);
      setMediaModal({ isOpen: true, type, url: '', text: type === 'link' ? window.getSelection()?.toString() : '' }); 
  };

  const getEmbedUrl = (inputUrl: string) => {
    const url = inputUrl.trim();
    const origin = window.location.origin;
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?.*v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?origin=${origin}`;
    }
    const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    return url;
  };

  const handleMediaSubmit = () => { 
      const { type, url, text, editingNode } = mediaModal; if (!url) return;
      const sel = window.getSelection(); 
      if (savedSelection.current && sel) { 
        sel.removeAllRanges(); 
        sel.addRange(savedSelection.current); 
      }
      if (editingNode) {
        if (type === 'image' && editingNode.tagName === 'IMG') {
          editingNode.setAttribute('src', url);
        } else if (type === 'link' && editingNode.tagName === 'A') {
          editingNode.setAttribute('href', url);
          editingNode.textContent = text || url;
        }
      } else { 
          if (type === 'image') {
            document.execCommand('insertHTML', false, `<img src="${url}" draggable="true" style="max-width: 100%; border-radius: 8px; cursor: pointer; display: inline-block;" />`);
          } else if (type === 'link') {
            document.execCommand('insertHTML', false, `<a href="${url}" target="_blank" class="text-sky-500 hover:underline">${text||url}</a>`);
          }
      }
      setMediaModal({ isOpen: false, type: 'image', url: '' });
  };

  const handleRemoveMedia = () => { 
    mediaModal.editingNode?.remove(); 
    setMediaModal({ isOpen: false, type: 'image', url: '' }); 
  };

  // Image Resizing Logic
  useEffect(() => {
    if (!isEditingBlog) return;
    const handleImageClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' && editorRef.current?.contains(target)) {
        setSelectedImg(target as HTMLImageElement);
        const rect = target.getBoundingClientRect();
        const editorRect = editorRef.current.getBoundingClientRect();
        setResizeOverlay({
          top: rect.top - editorRect.top + editorRef.current.scrollTop,
          left: rect.left - editorRect.left + editorRef.current.scrollLeft,
          width: rect.width,
          height: rect.height
        });
      } else if (!target.closest('.resize-overlay-ui')) {
        setSelectedImg(null);
        setResizeOverlay(null);
      }
    };
    const handleEditorInput = () => {
      if (selectedImg) {
        const rect = selectedImg.getBoundingClientRect();
        const editorRect = editorRef.current?.getBoundingClientRect();
        if (editorRect) {
          setResizeOverlay({
            top: rect.top - editorRect.top + (editorRef.current?.scrollTop || 0),
            left: rect.left - editorRect.left + (editorRef.current?.scrollLeft || 0),
            width: rect.width,
            height: rect.height
          });
        }
      }
    };
    document.addEventListener('click', handleImageClick);
    editorRef.current?.addEventListener('input', handleEditorInput);
    return () => {
      document.removeEventListener('click', handleImageClick);
      editorRef.current?.removeEventListener('input', handleEditorInput);
    };
  }, [selectedImg, isEditingBlog]);

  const handleResizeStart = (e: React.MouseEvent, corner: string) => {
    e.preventDefault();
    setIsResizing(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = selectedImg?.clientWidth || 0;
    const startHeight = selectedImg?.clientHeight || 0;
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!selectedImg) return;
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      let newWidth = startWidth;
      let newHeight = startHeight;
      if (corner.includes('e')) newWidth += deltaX;
      if (corner.includes('w')) newWidth -= deltaX;
      if (corner.includes('s')) newHeight += deltaY;
      if (corner.includes('n')) newHeight -= deltaY;
      if (newWidth > 20) selectedImg.style.width = `${newWidth}px`;
      if (newHeight > 20) selectedImg.style.height = `${newHeight}px`;
      const rect = selectedImg.getBoundingClientRect();
      const editorRect = editorRef.current?.getBoundingClientRect();
      if (editorRect) {
        setResizeOverlay({
          top: rect.top - editorRect.top + (editorRef.current?.scrollTop || 0),
          left: rect.left - editorRect.left + (editorRef.current?.scrollLeft || 0),
          width: rect.width,
          height: rect.height
        });
      }
    };
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    onValue(ref(db, 'quotes'), (snap) => setQuotes(snap.val() ? Object.keys(snap.val()).map(k => ({id:k, ...snap.val()[k]})).sort((a,b)=>b.timestamp-a.timestamp) : []));
    onValue(ref(db, 'contacts'), (snap) => setContacts(snap.val() ? Object.keys(snap.val()).map(k => ({id:k, ...snap.val()[k]})).sort((a,b)=>b.timestamp-a.timestamp) : []));
    fetchBlogPosts();
  }, [isAuthenticated]);

  if (!isAuthenticated) return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <button onClick={() => onNavigate('home')} className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-2"><ArrowLeft size={20} /> Back to Site</button>
        <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700 w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Admin Portal</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase font-bold tracking-wider ml-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  value="admin@lenda.co.zw" 
                  disabled 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 text-slate-400 cursor-not-allowed outline-none" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase font-bold tracking-wider ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 text-white focus:border-sky-500 outline-none" 
                  placeholder="Password" 
                  autoFocus
                />
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-sky-600 to-purple-600 text-white font-bold py-3 rounded-xl">Unlock Dashboard</button>
          </form>
        </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white flex relative">
      {isMobileMenuOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-slate-800 z-50 transition-transform duration-300 border-r border-slate-700 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
         <div className="p-6 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sky-400 font-bold tracking-wider"><LayoutDashboard size={20} /><span>ADMIN</span></div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400"><X size={24} /></button>
         </div>
         <nav className="flex-1 p-4 space-y-2">
            {[
              { id: 'quotes', icon: FileText, label: 'Quotes', count: quotes.filter(q => q.status === 'new').length },
              { id: 'messages', icon: MessageSquare, label: 'Messages', count: contacts.filter(c => c.status === 'new').length },
              { id: 'blog', icon: Type, label: 'Blog' },
              { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
              { id: 'settings', icon: Settings, label: 'Settings' }
            ].map(item => (
              <button key={item.id} onClick={() => handleSwitchTab(item.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-sky-500/20 text-sky-400' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
                <item.icon size={18} /><span>{item.label}</span>
                {item.count ? <span className="ml-auto bg-sky-500 text-white text-[10px] px-2 py-0.5 rounded-full">{item.count}</span> : null}
              </button>
            ))}
         </nav>
         <div className="p-4 border-t border-slate-700 space-y-2">
            <button onClick={() => onNavigate('home')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-700"><Home size={18} /><span>Website</span></button>
            <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400"><LogOut size={18} /><span>Sign Out</span></button>
         </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
        <div className="flex justify-between items-center mb-8">
           <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-slate-400"><Menu size={24} /></button>
           <h1 className="text-2xl font-bold capitalize hidden md:block">{activeTab}</h1>
           <div className="flex gap-4">
              <div className="relative"><Bell size={20} className="text-slate-400" /></div>
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center"><User size={16} /></div>
           </div>
        </div>

        {activeTab === 'analytics' && (
           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col md:flex-row gap-4 justify-between bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-lg">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                   <Calendar size={18} className="text-slate-400 mr-2 shrink-0" />
                   {['today', 'yesterday', 'week', 'month', 'year'].map(filter => (
                      <button 
                        key={filter}
                        onClick={() => setDateFilter(filter as any)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${dateFilter === filter ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
                      >
                        {filter}
                      </button>
                   ))}
                </div>
                <div className="flex items-center gap-2 border-l border-slate-700 pl-0 md:pl-4">
                   <Filter size={18} className="text-slate-400 shrink-0" />
                   <select 
                     value={pageFilter} 
                     onChange={(e) => setPageFilter(e.target.value)}
                     className="bg-slate-900 text-white text-sm rounded-lg px-3 py-2 border border-slate-600 outline-none focus:border-sky-500"
                   >
                      <option value="all">All Pages</option>
                      {Array.from(new Set(analyticsData.map(l => l.page))).map(page => (
                         <option key={page} value={page}>{page}</option>
                      ))}
                   </select>
                </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between h-32 relative overflow-hidden group">
                   <div className="absolute right-0 top-0 w-24 h-24 bg-sky-500/10 rounded-bl-full group-hover:bg-sky-500/20 transition-colors"></div>
                   <p className="text-slate-400 text-xs uppercase font-bold tracking-wider z-10 flex items-center gap-2"><Eye size={14} /> Total Visits</p>
                   <h3 className="text-3xl font-bold text-white z-10">{stats.totalVisits}</h3>
                </div>
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between h-32 relative overflow-hidden group">
                   <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full group-hover:bg-emerald-500/20 transition-colors"></div>
                   <p className="text-slate-400 text-xs uppercase font-bold tracking-wider z-10 flex items-center gap-2"><Clock size={14} /> Avg. Time</p>
                   <h3 className="text-3xl font-bold text-white z-10">{stats.avgTime}s</h3>
                </div>
                {pageFilter === 'all' ? (
                  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between h-32 relative overflow-hidden group">
                     <div className="absolute right-0 top-0 w-24 h-24 bg-purple-500/10 rounded-bl-full group-hover:bg-purple-500/20 transition-colors"></div>
                     <p className="text-slate-400 text-xs uppercase font-bold tracking-wider z-10 flex items-center gap-2"><MousePointer size={14} /> Top Page</p>
                     <h3 className="text-2xl font-bold text-white z-10 capitalize truncate">{stats.popularPage}</h3>
                  </div>
                ) : (
                  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between h-32 relative overflow-hidden group border-l-4 border-l-purple-500">
                     <div className="absolute right-0 top-0 w-24 h-24 bg-purple-500/10 rounded-bl-full group-hover:bg-purple-500/20 transition-colors"></div>
                     <p className="text-slate-400 text-xs uppercase font-bold tracking-wider z-10 flex items-center gap-2"><User size={14} /> Unique Visitors</p>
                     <h3 className="text-3xl font-bold text-white z-10">{stats.uniqueVisitors}</h3>
                  </div>
                )}
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-sm font-bold text-slate-300 mb-6 flex items-center gap-2 uppercase tracking-wider"><TrendingUp size={16} className="text-sky-500" /> Visits Over Time</h3>
                  <SimpleLineChart data={stats.viewsOverTime} color="#0ea5e9" />
               </div>
               <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-sm font-bold text-slate-300 mb-6 flex items-center gap-2 uppercase tracking-wider"><Clock size={16} className="text-emerald-500" /> Avg Time / Page</h3>
                  <SimpleBarChart data={stats.timePerPage} color="#10b981" onClick={(label) => setPageFilter(label)} />
               </div>
             </div>
           </div>
        )}

        {activeTab === 'quotes' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {quotes.length === 0 ? <div className="col-span-full text-center py-20 bg-slate-800/50 rounded-3xl border border-slate-700 border-dashed"><FileText size={48} className="mx-auto text-slate-600 mb-4" /><p className="text-slate-400">No quote requests yet.</p></div> : quotes.map((quote) => (
                <div key={quote.id} className={`bg-slate-800 rounded-2xl p-6 border transition-all group ${quote.status === 'new' ? 'border-sky-500/50 shadow-lg shadow-sky-900/10' : 'border-slate-700 hover:border-sky-500/30'}`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors flex items-center gap-2 flex-wrap">
                        {quote.companyName}
                        {quote.status === 'new' && <span className="bg-sky-500 text-[10px] text-white px-2 rounded-full">NEW</span>}
                      </h3>
                      <p className="text-slate-400 text-sm flex items-center gap-2"><User size={12} /> {quote.fullName}</p>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">{new Date(quote.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="flex-wrap gap-2 mb-4">
                    {quote.services.map((service, idx) => (<span key={idx} className="text-[10px] font-bold bg-sky-500/10 text-sky-400 px-2 py-1 rounded border border-sky-500/20">{service}</span>))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm text-slate-300 bg-slate-900/50 p-4 rounded-xl">
                    <div><span className="block text-xs text-slate-500 mb-1">Active Clients</span><span className="font-medium">{quote.clientCount}</span></div>
                    <div><span className="block text-xs text-slate-500 mb-1">Management</span><span className="font-medium">{quote.managementMethod}</span></div>
                    <div><span className="block text-xs text-slate-500 mb-1">Start Date</span><span className="font-medium">{quote.startDate}</span></div>
                     <div><span className="block text-xs text-slate-500 mb-1">City</span><span className="font-medium">{quote.city}</span></div>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 mb-4"><p className="text-slate-400 text-xs uppercase mb-1">Additional Message</p><p className="text-sm text-slate-300 italic">"{quote.message || 'No specific message.'}"</p></div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a href={`mailto:${quote.email}`} className="flex-1 bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold py-2 rounded-lg text-center flex items-center justify-center gap-2 transition-colors"><Mail size={14} /> Reply Email</a>
                    <a href={`tel:${quote.phone}`} className="sm:px-4 bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold py-2 rounded-lg text-center flex items-center justify-center gap-2 transition-colors"><Phone size={14} /> Call</a>
                  </div>
                </div>
              ))}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-4">
             {contacts.length === 0 ? <div className="text-center py-20 bg-slate-800/50 rounded-3xl border border-slate-700 border-dashed"><MessageSquare size={48} className="mx-auto text-slate-600 mb-4" /><p className="text-slate-400">No messages yet.</p></div> : contacts.map((contact) => (
                <div key={contact.id} className={`bg-slate-800 rounded-xl p-6 border transition-all flex flex-col lg:flex-row gap-6 ${contact.status === 'new' ? 'border-purple-500/50 shadow-lg shadow-purple-900/10' : 'border-slate-700 hover:border-purple-500/30'}`}>
                  <div className="min-w-[200px]">
                    <div className="flex items-center gap-2 mb-1"><h3 className="font-bold text-white text-lg">{contact.fullName}</h3>{contact.status === 'new' && <span className="bg-purple-500 text-[10px] text-white px-2 rounded-full">NEW</span>}</div>
                    <p className="text-sky-400 text-sm mb-1">{contact.companyName}</p>
                    <p className="text-slate-500 text-xs">{new Date(contact.timestamp).toLocaleString()}</p>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2"><span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-1 rounded border border-purple-500/20">Interested in: {contact.interest}</span></div>
                    <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800">{contact.message}</p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm">
                       <a href={`mailto:${contact.email}`} className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"><Mail size={14} /> {contact.email}</a>
                       <a href={`tel:${contact.phone}`} className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"><Phone size={14} /> {contact.phone}</a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="space-y-6">
            {!isEditingBlog ? (
              <>
                 <button onClick={() => { setCurrentPost({ title: '', coverImage: '', content: '', createdAt: Date.now() }); setIsEditingBlog(true); }} className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-700 text-slate-400 hover:border-indigo-500 hover:text-indigo-400 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 font-bold"><Plus size={20} /> Create New Blog Post</button>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   {blogPosts.map(post => (
                     <div key={post.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col sm:flex-row gap-4 hover:border-indigo-500/50 transition-colors">
                        <div className="w-full sm:w-24 h-48 sm:h-24 bg-slate-900 rounded-lg overflow-hidden shrink-0">
                          {post.coverImage ? <img src={post.coverImage} alt="Cover" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-600"><ImageIcon size={24} /></div>}
                        </div>
                        <div className="flex-1 min-w-0">
                           <h3 className="font-bold text-white truncate">{post.title}</h3>
                           <p className="text-xs text-slate-500 mb-2">{new Date(post.createdAt).toLocaleDateString()}</p>
                           <div className="text-sm text-slate-400 line-clamp-2">{post.content.replace(/<[^>]+>/g, '')}</div>
                        </div>
                        <div className="flex flex-row sm:flex-col gap-2 mt-2 sm:mt-0">
                           <button onClick={() => { setCurrentPost(post); setIsEditingBlog(true); }} className="flex-1 sm:flex-none p-2 bg-slate-700 rounded-lg text-sky-400 hover:bg-sky-500 hover:text-white transition-colors flex items-center justify-center"><Edit size={16} /></button>
                           <button onClick={() => post.id && handleDeletePost(post.id)} className="flex-1 sm:flex-none p-2 bg-slate-700 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center"><Trash2 size={16} /></button>
                        </div>
                     </div>
                   ))}
                 </div>
              </>
            ) : (
              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col h-[calc(100vh-160px)]">
                 <div className="p-4 md:p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800 sticky top-0 z-30">
                    <h2 className="text-lg md:text-xl font-bold text-white">{currentPost.id ? 'Edit Post' : 'New Post'}</h2>
                    <div className="flex gap-2 md:gap-3">
                       <button onClick={() => setIsEditingBlog(false)} className="px-3 md:px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-700 transition-colors text-sm">Cancel</button>
                       <button onClick={handleSavePost} className="px-4 md:px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2 text-sm"><Save size={16} /> <span className="hidden sm:inline">Save Post</span><span className="sm:hidden">Save</span></button>
                    </div>
                 </div>
                 <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1">
                    <div className="space-y-2"><label className="text-sm font-medium text-slate-400">Title</label><input type="text" value={currentPost.title} onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none text-lg font-bold" placeholder="Enter blog title..." /></div>
                    <div className="space-y-2"><label className="text-sm font-medium text-slate-400">Cover Image URL</label><div className="flex flex-col sm:flex-row gap-2"><input type="text" value={currentPost.coverImage} onChange={(e) => setCurrentPost({...currentPost, coverImage: e.target.value})} className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none" placeholder="https://..." /><div className="w-full sm:w-12 h-32 sm:h-12 bg-slate-900 border border-slate-600 rounded-lg overflow-hidden flex items-center justify-center shrink-0">{currentPost.coverImage ? <img src={currentPost.coverImage} className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-slate-600" />}</div></div></div>
                    <div className="space-y-2 flex-1 flex flex-col relative"><label className="text-sm font-medium text-slate-400">Content</label><div className="border border-slate-600 rounded-xl overflow-hidden bg-slate-900 flex-1 flex flex-col relative">
                          <div className="bg-slate-800 p-2 flex flex-wrap gap-1 border-b border-slate-700 sticky top-0 z-20 shadow-md" onMouseDown={(e) => e.preventDefault()}>
                             <button onClick={() => execCmd('undo')} className="p-1.5 md:p-2 rounded hover:bg-slate-700 transition-colors text-slate-300"><Undo size={16} /></button>
                             <button onClick={() => execCmd('redo')} className="p-1.5 md:p-2 rounded hover:bg-slate-700 transition-colors text-slate-300"><Redo size={16} /></button>
                             <div className="w-px h-6 bg-slate-700 mx-1 self-center hidden sm:block"></div>
                             <button onClick={() => execCmd('bold')} className={`p-1.5 md:p-2 rounded hover:bg-slate-700 transition-colors ${activeFormats.includes('bold') ? 'text-indigo-400 bg-slate-700' : 'text-slate-300'}`}><Bold size={16} /></button>
                             <button onClick={() => execCmd('italic')} className={`p-1.5 md:p-2 rounded hover:bg-slate-700 transition-colors ${activeFormats.includes('italic') ? 'text-indigo-400 bg-slate-700' : 'text-slate-300'}`}><Italic size={16} /></button>
                             <button onClick={() => execCmd('underline')} className={`p-1.5 md:p-2 rounded hover:bg-slate-700 transition-colors ${activeFormats.includes('underline') ? 'text-indigo-400 bg-slate-700' : 'text-slate-300'}`}><Underline size={16} /></button>
                             <div className="w-px h-6 bg-slate-700 mx-1 self-center hidden sm:block"></div>
                             <div className="flex gap-1">
                               <button onClick={() => execCmd('justifyLeft')} className={`p-1.5 md:p-2 rounded hover:bg-slate-700 transition-colors ${activeFormats.includes('justifyLeft') ? 'text-indigo-400 bg-slate-700' : 'text-slate-300'}`}><AlignLeft size={16} /></button>
                               <button onClick={() => execCmd('justifyCenter')} className={`p-1.5 md:p-2 rounded hover:bg-slate-700 transition-colors ${activeFormats.includes('justifyCenter') ? 'text-indigo-400 bg-slate-700' : 'text-slate-300'}`}><AlignCenter size={16} /></button>
                               <button onClick={() => execCmd('justifyRight')} className={`p-1.5 md:p-2 rounded hover:bg-slate-700 transition-colors ${activeFormats.includes('justifyRight') ? 'text-indigo-400 bg-slate-700' : 'text-slate-300'}`}><AlignRight size={16} /></button>
                             </div>
                             <div className="w-px h-6 bg-slate-700 mx-1 self-center hidden sm:block"></div>
                             <div className="relative">
                               <button onClick={() => setShowListDropdown(!showListDropdown)} className={`p-1.5 md:p-2 rounded hover:bg-slate-700 transition-colors flex items-center gap-1 ${activeFormats.includes('insertUnorderedList') || activeFormats.includes('insertOrderedList') ? 'text-indigo-400' : 'text-slate-300'}`}><List size={16} /> <ChevronDown size={12} /></button>
                               {showListDropdown && (
                                 <div className="absolute top-full left-0 mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl py-1 z-30 w-32">
                                   <button onClick={() => handleListStyle('disc')} className="w-full text-left px-4 py-2 hover:bg-slate-700 text-sm">Bullet</button>
                                   <button onClick={() => handleListStyle('decimal')} className="w-full text-left px-4 py-2 hover:bg-slate-700 text-sm">Numbers</button>
                                   <button onClick={() => handleListStyle('lower-roman')} className="w-full text-left px-4 py-2 hover:bg-slate-700 text-sm">Roman</button>
                                 </div>
                               )}
                             </div>
                             <div className="relative">
                               <button onClick={() => setShowSizeDropdown(!showSizeDropdown)} className="p-1.5 md:p-2 rounded hover:bg-slate-700 transition-colors flex items-center gap-1 text-slate-300 font-serif"><Type size={16} /> <ChevronDown size={12} /></button>
                               {showSizeDropdown && (<div className="absolute top-full left-0 mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl py-1 z-30 w-16">{[1,2,3,4,5,6,7].map(size => (<button key={size} onClick={() => handleFontSize(size.toString())} className="w-full text-center py-1 hover:bg-slate-700 text-sm">{size}</button>))}</div>)}
                             </div>
                             <div className="relative p-1.5 md:p-2 rounded hover:bg-slate-700 transition-colors cursor-pointer"><label className="cursor-pointer flex items-center justify-center"><Palette size={16} style={{ color: textColor }} /><input type="color" className="absolute opacity-0 inset-0 w-full h-full cursor-pointer" onChange={handleColorChange} value={textColor} /></label></div>
                             <div className="w-px h-6 bg-slate-700 mx-1 self-center hidden sm:block"></div>
                             <button onClick={() => openMediaModal('image')} className="p-1.5 md:p-2 rounded hover:bg-slate-700 transition-colors text-slate-300"><ImageIcon size={16} /></button>
                             <button onClick={() => openMediaModal('link')} className="p-1.5 md:p-2 rounded hover:bg-slate-700 transition-colors text-slate-300"><LinkIcon size={16} /></button>
                          </div>
                          <div className="flex-1 relative bg-slate-900">
                             <div ref={editorRef} contentEditable className="w-full h-full min-h-[500px] p-4 md:p-6 text-slate-200 outline-none overflow-y-auto prose prose-invert prose-lg max-w-none" style={{ fontFamily: 'Inter, sans-serif' }}></div>
                             {resizeOverlay && selectedImg && (
                               <div className="absolute border-2 border-indigo-500 pointer-events-none z-10 resize-overlay-ui" style={{ top: resizeOverlay.top, left: resizeOverlay.left, width: resizeOverlay.width, height: resizeOverlay.height }}>
                                  <button className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full shadow-md pointer-events-auto hover:bg-red-600 transition-colors z-20" onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); selectedImg.remove(); setSelectedImg(null); }}><Trash2 size={12} /></button>
                                  {['nw', 'ne', 'se', 'sw'].map(corner => (<div key={corner} className={`resize-handle absolute w-3 h-3 bg-white border border-indigo-500 pointer-events-auto cursor-${corner}-resize`} style={{ top: corner.includes('n') ? -6 : 'auto', bottom: corner.includes('s') ? -6 : 'auto', left: corner.includes('w') ? -6 : 'auto', right: corner.includes('e') ? -6 : 'auto', }} onMouseDown={(e) => handleResizeStart(e, corner)}></div>))}
                               </div>
                             )}
                          </div>
                       </div>
                    </div>
                 </div>
                 {mediaModal.isOpen && (
                   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
                         <h3 className="text-lg font-bold text-white mb-4">{mediaModal.editingNode ? 'Edit' : 'Insert'} {mediaModal.type === 'image' ? 'Image' : 'Link'}</h3>
                         <div className="space-y-4">
                            <div><label className="text-xs text-slate-400 uppercase font-bold block mb-1">URL</label><input type="text" value={mediaModal.url} onChange={(e) => setMediaModal({...mediaModal, url: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-indigo-500" placeholder="https://..." autoFocus /></div>
                            {mediaModal.type === 'link' && (<div><label className="text-xs text-slate-400 uppercase font-bold block mb-1">Text to Display</label><input type="text" value={mediaModal.text || ''} onChange={(e) => setMediaModal({...mediaModal, text: e.target.value})} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-indigo-500" /></div>)}
                            <div className="flex gap-2 pt-2">
                               {mediaModal.editingNode && (<button onClick={handleRemoveMedia} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors border border-red-500/20"><Trash2 size={18} /></button>)}
                               <button onClick={() => setMediaModal({...mediaModal, isOpen: false})} className="flex-1 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 text-sm font-bold">Cancel</button>
                               <button onClick={handleMediaSubmit} className="flex-1 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 text-sm font-bold">{mediaModal.editingNode ? 'Update' : 'Insert'}</button>
                            </div>
                         </div>
                      </div>
                   </div>
                 )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <div className="bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-700">
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Key size={20} className="text-sky-400" /> Security Settings</h3>
               <form onSubmit={handleChangePassword} className="space-y-6">
                 <div className="space-y-2"><label className="text-sm font-medium text-slate-300">New Password</label><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none" placeholder="Minimum 4 characters" /></div>
                 <div className="space-y-2"><label className="text-sm font-medium text-slate-300">Confirm Password</label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none" placeholder="Re-enter new password" /></div>
                 <div className="pt-2"><button className="w-full md:w-auto bg-sky-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-sky-500 transition-colors shadow-lg shadow-sky-900/20">Update Password</button></div>
                 {passwordStatus === 'success' && (<div className="bg-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center gap-2 border border-emerald-500/30"><Check size={18} /> Password updated successfully.</div>)}
                 {passwordStatus === 'error' && (<div className="bg-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-2 border border-red-500/30"><X size={18} /> Failed to update key. Try again.</div>)}
               </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

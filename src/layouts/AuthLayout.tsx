import { Outlet, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, Utensils, Compass } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#07090e] text-foreground relative flex flex-col justify-between overflow-x-hidden selection:bg-amber-400/30">
      {/* 🌟 Unified Ambient Background (Spans 100% of the entire viewport) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Ambient Food Backdrop */}
        <img 
          src="https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2000&auto=format&fit=crop" 
          alt="Ambient culinary background" 
          className="w-full h-full object-cover opacity-15 mix-blend-overlay filter blur-[1px]"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/85 via-[#07090e]/95 to-[#07090e]" />
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-aurora-cyan/10 rounded-full blur-[120px]" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* 🧭 Top Navigation Header */}
      <header className="relative z-20 w-full border-b border-white/8 bg-[#0b0e14]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Utensils size={20} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white">
                Aurora<span className="text-amber-400">Food</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase -mt-0.5">
                Campus & City Dining
              </span>
            </div>
          </Link>

          {/* Quick Nav Links & Back Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              to="/explore" 
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Compass size={14} className="text-slate-400" />
              <span>Explore Menu</span>
            </Link>
            <Link 
              to="/subscriptions" 
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 px-3 py-1.5 rounded-lg hover:bg-amber-400/10 transition-colors"
            >
              <span>Tiffin Plans [AI]</span>
            </Link>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 hover:text-white transition-all shadow-sm"
            >
              <ArrowLeft size={14} /> Back to Website
            </Link>
          </div>
        </div>
      </header>

      {/* 🛡️ Option 1: Clean Minimalist Centered Card (Swiggy / Zomato Modern Style) */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md mx-auto rounded-3xl border border-white/10 bg-[#0e1320]/90 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.8)] p-6 sm:p-9 relative z-10">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname} className="w-full">
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </div>
      </main>

      {/* 📄 Minimal Footer Bar */}
      <footer className="relative z-10 w-full py-4 text-center border-t border-white/5 bg-[#0b0e14]/50 text-xs text-slate-500">
        <p>© 2026 AuroraFood. All rights reserved. • Fast, Fresh & Hygienic Campus Dining.</p>
      </footer>
    </div>
  );
}

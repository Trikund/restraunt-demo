import { Outlet, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Utensils, Clock3, ShieldCheck, Flame, Compass } from 'lucide-react';
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

      {/* 🛡️ Centered Unified Auth Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Visual Showcase Panel (5 of 12 cols, visible on desktop) */}
          <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-8 overflow-hidden bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-black/90 border-r border-white/10">
            {/* Background culinary image with dark fade */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop" 
                alt="Culinary showcase" 
                className="w-full h-full object-cover opacity-25 filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/85" />
            </div>

            {/* Top Badge & Pitch */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold mb-6">
                <Sparkles size={13} />
                <span>Student & Foodie Hub</span>
              </div>

              <h2 className="text-2xl xl:text-3xl font-extrabold text-white leading-tight mb-3">
                Good food for every study hour & craving.
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect your account to order fast meals, manage monthly tiffin plans, and unlock campus canteen discounts.
              </p>
            </div>

            {/* Highlight Perks List */}
            <div className="relative z-10 space-y-3.5 my-6">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                  <Flame size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Daily Tiffin Subscriptions</h4>
                  <p className="text-[11px] text-slate-400">Home-style hygienic meals on daily schedule</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Clock3 size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">20-Min Fast Campus Delivery</h4>
                  <p className="text-[11px] text-slate-400">Direct to hostel drop-offs & doorstep</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Verified Hygiene & Taste</h4>
                  <p className="text-[11px] text-slate-400">Fresh ingredients & student-trusted kitchens</p>
                </div>
              </div>
            </div>

            {/* Bottom Trust Stat */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1 font-bold text-amber-400">
                ★ 4.9/5 Rating
              </span>
              <span className="text-slate-400 text-[11px]">
                12,000+ orders served
              </span>
            </div>
          </div>

          {/* Right Column: Outlet Form (7 of 12 cols, full width on mobile) */}
          <div className="col-span-1 lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-slate-900/40">
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname} className="w-full">
                <Outlet />
              </PageTransition>
            </AnimatePresence>
          </div>

        </div>
      </main>

      {/* 📄 Minimal Footer Bar */}
      <footer className="relative z-10 w-full py-4 text-center border-t border-white/5 bg-[#0b0e14]/50 text-xs text-slate-500">
        <p>© 2026 AuroraFood. All rights reserved. • Fast, Fresh & Hygienic Campus Dining.</p>
      </footer>
    </div>
  );
}

import { Outlet, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, Utensils, Compass, Clock3, Star, Sparkles, Tag, Users } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#07090e] text-foreground relative flex flex-col justify-between overflow-x-hidden selection:bg-amber-400/30">
      {/* 🌟 Full-Screen Vibrant Culinary Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Warm Ambient Food Spread Wallpaper */}
        <img 
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop" 
          alt="Warm culinary ambiance" 
          className="w-full h-full object-cover opacity-20 filter contrast-125 saturate-150"
        />
        {/* Warm Golden & Amber Gradient Vignette (Never Pitch Black) */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/60 via-[#0a0e18]/85 to-[#07090e]/95" />
        
        {/* Vibrant Glowing Orbs */}
        <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-amber-500/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-orange-600/15 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-400/10 rounded-full blur-[180px]" />
      </div>

      {/* 🧭 Top Navigation Header */}
      <header className="relative z-20 w-full border-b border-white/10 bg-[#0a0e18]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
              <Utensils size={20} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Aurora<span className="text-amber-400">Food</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 tracking-wider">
                  Campus
                </span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase -mt-0.5">
                Hostel Delivery & Student Mess
              </span>
            </div>
          </Link>

          {/* Quick Nav Links & Back Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              to="/explore" 
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors"
            >
              <Compass size={14} className="text-amber-400" />
              <span>Explore Menu</span>
            </Link>
            <Link 
              to="/subscriptions" 
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
            >
              <span>🍱 Tiffin Plans [AI]</span>
            </Link>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white transition-all shadow-md backdrop-blur-md"
            >
              <ArrowLeft size={14} /> Back to Website
            </Link>
          </div>
        </div>
      </header>

      {/* 🍱 Main Vibrant Showcase Content Grid */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* 🌟 LEFT SIDE: Vibrant Food Photography, Trending Thalis & Deals (7 of 12 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Header Badge & Tagline */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3 shadow-sm">
                <Sparkles size={14} className="text-amber-400" />
                <span>Special Student Campus Rates</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                Ghar Jaisa Swad, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
                  Student Budget Par! 🍛
                </span>
              </h1>
              <p className="text-sm text-slate-300 max-w-xl mt-2.5 leading-relaxed">
                Daily hygienic tiffin subscriptions, hostel midnight cravings till 4 AM, aur delicious campus street thalis — direct to your gate in 20 minutes!
              </p>
            </div>

            {/* 🍲 Trending Dish Cards Grid (3 Colorful Visual Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              
              {/* Dish Card 1: Deluxe Thali */}
              <div className="group rounded-2xl bg-[#0e1320]/80 border border-white/10 p-3 hover:border-amber-500/40 transition-all hover:-translate-y-1 shadow-lg backdrop-blur-md">
                <div className="relative h-28 rounded-xl overflow-hidden mb-2.5">
                  <img 
                    src="https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=600&auto=format&fit=crop" 
                    alt="Deluxe Punjabi Thali" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-bold text-amber-400 border border-white/10">
                    🍱 Best Seller
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-xs font-black shadow-md">
                    ₹89
                  </span>
                </div>
                <h3 className="font-bold text-xs text-white line-clamp-1">Deluxe North Indian Thali</h3>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star size={11} fill="currentColor" /> 4.9
                  </span>
                  <span>Pure Desi Ghee</span>
                </div>
              </div>

              {/* Dish Card 2: Midnight Roll */}
              <div className="group rounded-2xl bg-[#0e1320]/80 border border-white/10 p-3 hover:border-amber-500/40 transition-all hover:-translate-y-1 shadow-lg backdrop-blur-md">
                <div className="relative h-28 rounded-xl overflow-hidden mb-2.5">
                  <img 
                    src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=600&auto=format&fit=crop" 
                    alt="Midnight Roll & Maggi" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-bold text-cyan-400 border border-white/10">
                    🌙 Till 4 AM
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-xs font-black shadow-md">
                    ₹49
                  </span>
                </div>
                <h3 className="font-bold text-xs text-white line-clamp-1">Hostel Egg Roll & Chai</h3>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span className="flex items-center gap-1 text-cyan-400 font-bold">
                    <Clock3 size={11} /> 12 Min
                  </span>
                  <span>Exam Night</span>
                </div>
              </div>

              {/* Dish Card 3: Monthly Tiffin */}
              <div className="group rounded-2xl bg-[#0e1320]/80 border border-white/10 p-3 hover:border-amber-500/40 transition-all hover:-translate-y-1 shadow-lg backdrop-blur-md">
                <div className="relative h-28 rounded-xl overflow-hidden mb-2.5">
                  <img 
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop" 
                    alt="Daily Homestyle Tiffin" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-bold text-emerald-400 border border-white/10">
                    🥗 Home Style
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-xs font-black shadow-md">
                    ₹79/meal
                  </span>
                </div>
                <h3 className="font-bold text-xs text-white line-clamp-1">Daily Student Mess Plan</h3>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span className="text-emerald-400 font-bold">7-Day Menu</span>
                  <span>Zero Soda</span>
                </div>
              </div>

            </div>

            {/* 🎁 Student Discount Voucher Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-transparent border border-amber-500/30 flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-md">
                  <Tag size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white">
                    Special Welcome Offer: Flat 20% OFF on First 3 Tiffins!
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    Use coupon code <strong className="text-amber-400 tracking-wider">CAMPUS20</strong> on your first order.
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold tracking-wider">
                CAMPUS20
              </span>
            </div>

            {/* Live Student Community Proof */}
            <div className="flex items-center gap-3 text-xs text-slate-300 pt-1">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" alt="Student 1" />
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" alt="Student 2" />
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop" alt="Student 3" />
              </div>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Users size={14} className="text-amber-400" />
                <strong>12,500+ students & hostellers</strong> ordering daily across campus.
              </span>
            </div>

          </div>

          {/* 🛡️ RIGHT SIDE: Vibrant Auth Card (5 of 12 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-3xl border border-amber-500/30 bg-[#0d121e]/90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(245,158,11,0.15)] p-6 sm:p-8 relative z-10">
              <AnimatePresence mode="wait">
                <PageTransition key={location.pathname} className="w-full">
                  <Outlet />
                </PageTransition>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </main>

      {/* 📄 Minimal Footer Bar */}
      <footer className="relative z-10 w-full py-4 text-center border-t border-white/5 bg-[#0a0e18]/60 text-xs text-slate-500">
        <p>© 2026 AuroraFood. All rights reserved. • Fast, Fresh & Hygienic Campus Dining.</p>
      </footer>
    </div>
  );
}

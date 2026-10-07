import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Pizza, Leaf } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-foreground overflow-hidden selection:bg-aurora-cyan/30">
      {/* LEFT SIDE - VISUAL EXPERIENCE (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        {/* Animated Aurora Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background z-0" />
        <div className="absolute inset-0 aurora-bg opacity-30 z-0 dark:opacity-100" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-aurora-cyan/30 rounded-full blur-[100px] animate-float z-0" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-aurora-purple/30 rounded-full blur-[100px] animate-float z-0" style={{ animationDelay: '2s' }} />

        {/* Content */}
        <div className="relative z-10">
          <Link to="/" className="text-3xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-500 dark:from-aurora-cyan dark:via-aurora-blue dark:to-aurora-purple bg-clip-text text-transparent tracking-tight inline-block mb-12 drop-shadow-sm">
            AuroraFood
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl mt-12"
          >
            <h1 className="text-5xl font-bold leading-tight mb-6 text-slate-900 dark:text-foreground drop-shadow-sm dark:drop-shadow-lg">
              Savor the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500 dark:from-aurora-gold dark:to-food-amber">Extraordinary.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-muted-foreground font-medium">
              Join our premium culinary ecosystem. Discover exclusive menus and world-class chefs delivered directly to your door.
            </p>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="relative z-10 flex-1 w-full mt-12">
          {/* Main Food Imagery */}
          <motion.div 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] rounded-full overflow-hidden border-[8px] border-white dark:border-foreground/5 shadow-2xl shadow-slate-300/50 dark:shadow-[0_0_50px_rgba(34,211,238,0.2)]"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, type: 'spring' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop" 
              alt="Culinary masterpiece" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Floating Badges */}
          <motion.div 
            className="absolute top-1/4 left-1/4 glass bg-white/95 dark:bg-background/40 backdrop-blur-xl px-5 py-3.5 rounded-2xl flex items-center gap-4 shadow-xl shadow-slate-200/50 dark:shadow-2xl border border-slate-100 dark:border-foreground/10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.5, delay: 0.6 } }}
          >
            <div className="bg-amber-100 dark:bg-aurora-gold/20 p-3 rounded-full text-amber-600 dark:text-aurora-gold dark:shadow-[0_0_15px_rgba(255,184,0,0.3)]">
              <Pizza size={22} />
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900 dark:text-foreground">Artisan</p>
              <p className="text-xs text-slate-500 dark:text-muted-foreground font-medium">Handcrafted</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-1/4 left-10 glass bg-white/95 dark:bg-background/40 backdrop-blur-xl px-5 py-3.5 rounded-2xl flex items-center gap-4 shadow-xl shadow-slate-200/50 dark:shadow-2xl border border-slate-100 dark:border-foreground/10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: [0, 10, 0], opacity: 1 }}
            transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.5, delay: 0.8 } }}
          >
            <div className="bg-emerald-100 dark:bg-status-success/20 p-3 rounded-full text-emerald-600 dark:text-status-success dark:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Leaf size={22} />
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900 dark:text-foreground">Fresh</p>
              <p className="text-xs text-slate-500 dark:text-muted-foreground font-medium">Organic sources</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE - AUTH PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative min-h-screen">
        {/* Mobile background (since left side is hidden) */}
        <div className="absolute inset-0 bg-background z-0 lg:hidden" />
        <div className="absolute inset-0 aurora-bg opacity-30 z-0 lg:hidden" />
        <div className="absolute top-0 right-0 w-full h-full bg-aurora-cyan/10 blur-[100px] lg:hidden z-0" />
        
        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="text-4xl font-extrabold aurora-text tracking-tight inline-block">
              AuroraFood
            </Link>
          </div>

          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname} className="w-full">
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

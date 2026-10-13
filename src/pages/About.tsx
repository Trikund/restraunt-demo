import { 
  Sparkles, Calendar, 
  Cpu, ArrowRight, TrendingDown, Store
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

export default function About() {
  return (
    <div className="pt-28 pb-24 container mx-auto px-4 lg:px-8 min-h-screen max-w-6xl">
      {/* Header */}
      <SectionHeading 
        title="About AuroraFood Platform" 
        subtitle="AI-Powered Local Food Subscription & Hyper-Local Delivery Platform" 
      />

      {/* Hero Mission Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center mt-8 mb-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
          <img 
            src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1000&auto=format&fit=crop" 
            alt="Fresh tiffin preparation" 
            className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
            <span className="text-xs font-bold text-aurora-cyan uppercase tracking-wider block mb-1">
              Mission Statement
            </span>
            <p className="text-sm text-slate-200 font-medium">
              Bridging the gap between hostel students seeking healthy, pocket-friendly homestyle food and local tiffin providers operating on paper records.
            </p>
          </div>
        </div>

        <div className="space-y-6 text-slate-300">
          <div className="w-14 h-14 rounded-2xl bg-aurora-cyan/10 border border-aurora-cyan/30 flex items-center justify-center text-aurora-cyan">
            <Sparkles size={28} />
          </div>

          <h3 className="text-3xl font-extrabold text-white tracking-tight leading-snug">
            Transforming Campus Dining Through <span className="text-aurora-cyan">Intelligent Subscriptions</span>
          </h3>

          <p className="text-sm leading-relaxed text-slate-300">
            Mainstream food delivery aggregators charge hefty delivery fees, packaging costs, and surge rates designed for one-off gourmet orders. For college students living in hostels and PGs, ordering every day is financially unsustainable, while hostel messes often suffer from repetitive, unmonitored nutrition.
          </p>

          <p className="text-sm leading-relaxed text-slate-300">
            <strong>AuroraFood</strong> is built specifically for university ecosystems. We empower verified local dhabas, messes, and home chefs with automated subscriber dispatch tools, while giving students complete control over their daily meal timetable with weekend pauses and meal skipping.
          </p>

          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10">
            <div>
              <h4 className="text-3xl font-black text-aurora-cyan mb-1">₹2,400+</h4>
              <p className="text-xs text-slate-400 font-medium">Monthly Savings / Student</p>
            </div>
            <div>
              <h4 className="text-3xl font-black text-emerald-400 mb-1">35%</h4>
              <p className="text-xs text-slate-400 font-medium">Kitchen Food Waste Prevented</p>
            </div>
            <div>
              <h4 className="text-3xl font-black text-white mb-1">100%</h4>
              <p className="text-xs text-slate-400 font-medium">Campus Doorstep Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars */}
      <div className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-aurora-cyan uppercase tracking-wider px-3 py-1 rounded-full bg-aurora-cyan/10 border border-aurora-cyan/20 inline-block mb-3">
            Core Architecture
          </span>
          <h2 className="text-3xl font-extrabold text-white">Four Architectural Innovations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1 */}
          <GlassCard className="p-6 border-white/10 bg-white/5 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-aurora-cyan/10 border border-aurora-cyan/20 text-aurora-cyan flex items-center justify-center">
              <Calendar size={22} />
            </div>
            <h4 className="text-lg font-bold text-white">1. Flexible Tiffin Subscription Engine</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides students with 1, 2, or 3 meals/day plans on weekly or monthly cycles. Integrated with a 30-day interactive punch-card calendar where weekend pauses automatically extend the subscription validity.
            </p>
          </GlassCard>

          {/* Pillar 2 */}
          <GlassCard className="p-6 border-white/10 bg-white/5 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Cpu size={22} />
            </div>
            <h4 className="text-lg font-bold text-white">2. AI Student Budget & Nutrition Optimizer</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Synthesizes student pocket money, dietary goals (High-Protein, Pure Veg, Budget Saver), and hostel locations to compute mathematically optimal meal combinations and exact daily calories, protein, and fat counts.
            </p>
          </GlassCard>

          {/* Pillar 3 */}
          <GlassCard className="p-6 border-white/10 bg-white/5 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <TrendingDown size={22} />
            </div>
            <h4 className="text-lg font-bold text-white">3. B2B Vendor SaaS & Zero-Waste Controller</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Replaces error-prone manual paper registers for tiffin providers. Calculates live daily raw ingredient requirements (rotis, dal volume) based on active subscribers, eliminating kitchen food wastage.
            </p>
          </GlassCard>

          {/* Pillar 4 */}
          <GlassCard className="p-6 border-white/10 bg-white/5 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Store size={22} />
            </div>
            <h4 className="text-lg font-bold text-white">4. Hyper-Local Campus Vendor Network</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Classifies neighborhood food providers into functional archetypes (Tiffin Center, Student Mess, Home Chef, Pocket Dhaba) with 7-day rotating thali timetables and hostel gate proximity tags.
            </p>
          </GlassCard>
        </div>
      </div>

      {/* Tech Stack Matrix */}
      <GlassCard className="p-8 border-aurora-cyan/30 bg-gradient-to-r from-aurora-cyan/10 via-background to-aurora-purple/10 mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-aurora-cyan bg-aurora-cyan/20 px-2.5 py-1 rounded-full border border-aurora-cyan/30 inline-block mb-2">
              Technology Stack
            </span>
            <h3 className="text-2xl font-extrabold text-white">Engineered with Modern Web Standards</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Constructed with React 19, TypeScript for strict end-to-end typing, Tailwind CSS for dark/light glassmorphic styling, Context API for persistent reactive state, and Lucide React icons.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Context API'].map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-bold text-white border border-white/10">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Ready to experience smarter campus dining?</h3>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/subscriptions">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight size={16} />}>
              Explore Tiffin Plans
            </Button>
          </Link>
          <Link to="/restaurants">
            <Button variant="glass" size="lg">
              Browse Campus Providers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

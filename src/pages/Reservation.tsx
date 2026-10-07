import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, Gift, MessageSquare, CheckCircle2,
  ChevronRight, ChevronLeft, Store, Users, Clock,
  Heart, Briefcase, User, PartyPopper
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import SectionHeading from '../components/SectionHeading';
import { restaurants } from '../data/mockData';

// ─── Constants ───────────────────────────────────────────────────────────────
const TIME_SLOTS = ['12:00', '12:30', '13:00', '13:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
const SEATING_PREFS = [
  { label: 'Indoor', emoji: '🏠' },
  { label: 'Outdoor', emoji: '🌿' },
  { label: 'Rooftop', emoji: '🌃' },
  { label: 'Window Seat', emoji: '🪟' },
  { label: 'Private Room', emoji: '🔒' },
  { label: 'Bar Counter', emoji: '🍸' },
];
const GROUP_TYPES = [
  { label: 'Couple', emoji: '💑', icon: Heart, desc: '2 people, romantic' },
  { label: 'Friends Group', emoji: '👥', icon: Users, desc: 'Fun with friends' },
  { label: 'Birthday Bash', emoji: '🎂', icon: PartyPopper, desc: 'Special celebration' },
  { label: 'Family Gathering', emoji: '👨‍👩‍👧‍👦', icon: Users, desc: 'Family occasion' },
  { label: 'Corporate', emoji: '💼', icon: Briefcase, desc: 'Business meeting' },
  { label: 'Solo Dining', emoji: '🧘', icon: User, desc: 'Me-time' },
];
const OCCASIONS = [
  { label: 'Casual Dining', emoji: '🍽️' },
  { label: 'Birthday', emoji: '🎂' },
  { label: 'Anniversary', emoji: '💍' },
  { label: 'Date Night', emoji: '🕯️' },
  { label: 'Proposal', emoji: '💍' },
  { label: 'Business Lunch', emoji: '📊' },
  { label: 'Farewell Party', emoji: '👋' },
  { label: 'Baby Shower', emoji: '🍼' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const today = new Date().toISOString().split('T')[0];

// ─── Step Indicator ──────────────────────────────────────────────────────────
function StepIndicator({ step }: { step: number }) {
  const steps = ['When & Where', 'Your Group', 'Your Details'];
  return (
    <div className="flex items-center justify-between mb-10 relative">
      <div className="absolute left-0 top-5 w-full h-[2px] bg-white/5 -z-10" />
      <div
        className="absolute left-0 top-5 h-[2px] bg-gradient-to-r from-aurora-cyan to-aurora-blue rounded-full transition-all duration-500 -z-10"
        style={{ width: `${((step - 1) / 2) * 100}%` }}
      />
      {steps.map((label, i) => (
        <div key={label} className="flex flex-col items-center gap-2 z-10">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
            step > i + 1
              ? 'bg-aurora-cyan text-[#111111] shadow-[0_0_15px_rgba(34,211,238,0.5)]'
              : step === i + 1
              ? 'bg-[#0d1117] border-2 border-aurora-cyan text-aurora-cyan shadow-[0_0_10px_rgba(34,211,238,0.3)]'
              : 'bg-[#0d1117] border border-white/10 text-slate-500'
          }`}>
            {step > i + 1 ? <CheckCircle2 size={20} /> : i + 1}
          </div>
          <span className={`text-xs font-semibold hidden sm:block ${step >= i + 1 ? 'text-white' : 'text-slate-500'}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Reservation() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form state
  const [restaurantId, setRestaurantId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState('Indoor');
  const [groupType, setGroupType] = useState('Couple');
  const [occasion, setOccasion] = useState('Casual Dining');
  const [details, setDetails] = useState({ name: '', phone: '', email: '', requests: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const step1Valid = !!restaurantId && !!date && !!time;

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (!details.name.trim()) e.name = 'Name is required';
    if (!details.phone.trim()) e.phone = 'Phone is required';
    if (!details.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) e.email = 'Enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;
    setIsSubmitted(true);
  };

  const selectedRestaurant = restaurants.find(r => r.id.toString() === restaurantId);

  // ── Confirmation Screen ────────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full"
        >
          <GlassCard className="p-8 text-center relative overflow-hidden border-aurora-cyan/30 bg-aurora-cyan/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-aurora-cyan via-aurora-blue to-aurora-purple" />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-24 h-24 bg-aurora-cyan/10 rounded-full flex items-center justify-center mx-auto mb-6 text-aurora-cyan shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <h2 className="text-3xl font-extrabold text-white mb-3">Table Booked! 🎉</h2>
            <p className="text-slate-300 mb-2 text-sm">A confirmation has been sent to <span className="text-aurora-cyan font-bold">{details.email}</span></p>

            <div className="bg-white/5 rounded-xl p-4 text-left mt-6 mb-8 space-y-2 text-sm border border-white/5">
              <div className="flex justify-between"><span className="text-slate-400">Restaurant</span><span className="text-white font-bold">{selectedRestaurant?.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Date & Time</span><span className="text-white font-bold">{date} at {time}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Guests</span><span className="text-white font-bold">{guests} people</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Group</span><span className="text-white font-bold">{groupType}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Occasion</span><span className="text-white font-bold">{occasion}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Seating</span><span className="text-white font-bold">{seating}</span></div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => navigate('/')} className="flex-1 bg-aurora-cyan text-[#111111] font-bold py-3 rounded-xl hover:bg-aurora-blue hover:text-white transition-all">
                Go Home
              </button>
              <button onClick={() => { setIsSubmitted(false); setStep(1); setRestaurantId(''); setDate(''); setTime(''); setGuests(2); setGroupType('Couple'); setOccasion('Casual Dining'); setDetails({ name: '', phone: '', email: '', requests: '' }); }} className="flex-1 border border-white/10 text-slate-300 font-bold py-3 rounded-xl hover:bg-white/5 transition-all">
                New Booking
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 container mx-auto px-4 lg:px-8 relative min-h-screen">
      <div className="fixed top-40 left-0 w-[500px] h-[500px] bg-aurora-cyan/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-aurora-gold/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <SectionHeading
        title="Reserve a Table"
        subtitle="Experience premium dining with customized seating and special arrangements."
      />

      <div className="max-w-3xl mx-auto mt-12">
        <StepIndicator step={step} />

        <GlassCard className="p-6 sm:p-10">
          <AnimatePresence mode="wait">

            {/* ── STEP 1: Restaurant, Date, Guests, Time ─────────────────── */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                <h3 className="text-2xl font-extrabold text-white mb-1 flex items-center gap-2">
                  <Calendar size={22} className="text-aurora-cyan" /> When are you joining us?
                </h3>
                <p className="text-slate-400 text-sm mb-8">Select your restaurant, date, and preferred time.</p>

                <div className="space-y-6">
                  {/* Restaurant */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      <Store size={14} className="inline mr-1 text-aurora-cyan" /> Restaurant
                    </label>
                    <div className="relative">
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      <select
                        value={restaurantId}
                        onChange={(e) => setRestaurantId(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-aurora-cyan focus:ring-1 focus:ring-aurora-cyan/30 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-slate-900">Choose a restaurant…</option>
                        {restaurants.map(r => (
                          <option key={r.id} value={r.id} className="bg-slate-900">{r.name} — {r.cuisine}</option>
                        ))}
                      </select>
                      <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
                    </div>
                    {selectedRestaurant && (
                      <p className="mt-2 text-xs text-aurora-cyan flex items-center gap-1">
                        <MapPin size={12} /> {selectedRestaurant.location}
                      </p>
                    )}
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      <Calendar size={14} className="inline mr-1 text-aurora-cyan" /> Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      <input
                        type="date"
                        value={date}
                        min={today}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-aurora-cyan focus:ring-1 focus:ring-aurora-cyan/30 transition-all [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Guests counter */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                      <Users size={14} className="inline mr-1 text-aurora-cyan" /> Number of Guests
                    </label>
                    <div className="flex items-center gap-0 w-fit border border-white/10 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setGuests(g => Math.max(1, g - 1))}
                        disabled={guests <= 1}
                        className="w-12 h-12 flex items-center justify-center text-xl font-bold text-white hover:bg-white/10 disabled:opacity-30 transition-colors"
                      >−</button>
                      <div className="w-16 h-12 flex items-center justify-center bg-white/5 border-x border-white/10">
                        <span className="text-xl font-extrabold text-aurora-cyan">{guests}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setGuests(g => Math.min(20, g + 1))}
                        disabled={guests >= 20}
                        className="w-12 h-12 flex items-center justify-center text-xl font-bold text-white hover:bg-white/10 disabled:opacity-30 transition-colors"
                      >+</button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Max 20 guests per reservation</p>
                  </div>

                  {/* Time slots */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                      <Clock size={14} className="inline mr-1 text-aurora-cyan" /> Time Slot
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {TIME_SLOTS.map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTime(t)}
                          className={`py-2.5 rounded-lg text-sm font-bold transition-all ${
                            time === t
                              ? 'bg-aurora-cyan text-[#111111] shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                              : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    type="button"
                    onClick={() => step1Valid && setStep(2)}
                    disabled={!step1Valid}
                    className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all ${
                      step1Valid
                        ? 'bg-aurora-cyan text-[#111111] hover:bg-aurora-blue hover:text-white shadow-lg shadow-aurora-cyan/20'
                        : 'bg-white/10 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Next Step <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Group Type, Occasion, Seating ─────────────────── */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                <h3 className="text-2xl font-extrabold text-white mb-1 flex items-center gap-2">
                  <Users size={22} className="text-aurora-cyan" /> Customize Your Experience
                </h3>
                <p className="text-slate-400 text-sm mb-8">Tell us who's coming and what you're celebrating.</p>

                <div className="space-y-8">
                  {/* Group Type */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                      👥 Who's coming?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {GROUP_TYPES.map(g => (
                        <button
                          key={g.label}
                          type="button"
                          onClick={() => setGroupType(g.label)}
                          className={`p-3 rounded-xl text-left transition-all border ${
                            groupType === g.label
                              ? 'bg-aurora-cyan/10 border-aurora-cyan shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-xl mb-1">{g.emoji}</div>
                          <div className={`text-sm font-bold ${groupType === g.label ? 'text-aurora-cyan' : 'text-white'}`}>{g.label}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{g.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Occasion */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                      <Gift size={14} className="inline mr-1 text-aurora-gold" /> What's the occasion?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {OCCASIONS.map(o => (
                        <button
                          key={o.label}
                          type="button"
                          onClick={() => setOccasion(o.label)}
                          className={`py-2 px-4 rounded-full text-sm font-semibold transition-all border flex items-center gap-1.5 ${
                            occasion === o.label
                              ? 'bg-aurora-gold/20 border-aurora-gold text-aurora-gold shadow-[0_0_10px_rgba(255,184,0,0.2)]'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          <span>{o.emoji}</span> {o.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seating */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                      <MapPin size={14} className="inline mr-1 text-food-coral" /> Seating Preference
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {SEATING_PREFS.map(s => (
                        <button
                          key={s.label}
                          type="button"
                          onClick={() => setSeating(s.label)}
                          className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all border flex items-center gap-2 ${
                            seating === s.label
                              ? 'bg-aurora-gold/10 border-aurora-gold text-aurora-gold'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-base">{s.emoji}</span> {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-slate-300 font-bold text-sm hover:bg-white/5 transition-all">
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button type="button" onClick={() => setStep(3)} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-aurora-cyan text-[#111111] hover:bg-aurora-blue hover:text-white shadow-lg shadow-aurora-cyan/20 transition-all">
                    Next Step <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Contact Details & Confirmation ─────────────────── */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                <h3 className="text-2xl font-extrabold text-white mb-1 flex items-center gap-2">
                  <MessageSquare size={22} className="text-aurora-cyan" /> Final Details
                </h3>
                <p className="text-slate-400 text-sm mb-8">Almost done! Enter your contact details to confirm.</p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          value={details.name}
                          onChange={e => { setDetails({ ...details, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                          placeholder="e.g. Shivam Kumar"
                          className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-aurora-cyan focus:ring-aurora-cyan/20'}`}
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1.5">Phone Number *</label>
                        <input
                          type="tel"
                          value={details.phone}
                          onChange={e => { setDetails({ ...details, phone: e.target.value }); setErrors({ ...errors, phone: '' }); }}
                          placeholder="+91 98765 43210"
                          className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-aurora-cyan focus:ring-aurora-cyan/20'}`}
                        />
                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        value={details.email}
                        onChange={e => { setDetails({ ...details, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                        placeholder="you@example.com"
                        className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-aurora-cyan focus:ring-aurora-cyan/20'}`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                        Special Requests <span className="text-slate-500 font-normal">(optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        value={details.requests}
                        onChange={e => setDetails({ ...details, requests: e.target.value })}
                        placeholder={`Any special arrangements for your ${groupType} — ${occasion}?`}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-aurora-cyan focus:ring-1 focus:ring-aurora-cyan/20 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-white/3 border border-white/5 rounded-2xl p-5 mt-7">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Booking Summary</h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div className="flex justify-between col-span-2 sm:col-span-1">
                        <span className="text-slate-400">Restaurant</span>
                        <span className="text-white font-semibold">{selectedRestaurant?.name || '—'}</span>
                      </div>
                      <div className="flex justify-between col-span-2 sm:col-span-1">
                        <span className="text-slate-400">Date & Time</span>
                        <span className="text-white font-semibold">{date} @ {time}</span>
                      </div>
                      <div className="flex justify-between col-span-2 sm:col-span-1">
                        <span className="text-slate-400">Guests</span>
                        <span className="text-white font-semibold">{guests} people</span>
                      </div>
                      <div className="flex justify-between col-span-2 sm:col-span-1">
                        <span className="text-slate-400">Group</span>
                        <span className="text-white font-semibold">{groupType}</span>
                      </div>
                      <div className="flex justify-between col-span-2 sm:col-span-1">
                        <span className="text-slate-400">Occasion</span>
                        <span className="text-aurora-gold font-semibold">{occasion}</span>
                      </div>
                      <div className="flex justify-between col-span-2 sm:col-span-1">
                        <span className="text-slate-400">Seating</span>
                        <span className="text-white font-semibold">{seating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-slate-300 font-bold text-sm hover:bg-white/5 transition-all">
                      <ChevronLeft size={18} /> Back
                    </button>
                    <button type="submit" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-aurora-cyan text-[#111111] hover:bg-aurora-blue hover:text-white shadow-lg shadow-aurora-cyan/20 transition-all">
                      <CheckCircle2 size={18} /> Confirm Reservation
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </div>
  );
}

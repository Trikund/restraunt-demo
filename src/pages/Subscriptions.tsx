import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, CheckCircle2, ShieldCheck, 
  MapPin, Clock, ArrowRight, X
} from 'lucide-react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { useLocationContext } from '../context/LocationContext';
import type { SubscriptionPlan, PlanDuration, MealSlot } from '../types/subscription';
import SubscriptionCard from '../components/SubscriptionCard';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';

export default function Subscriptions() {
  const navigate = useNavigate();
  const { plans, activeSubscription, subscribeToPlan } = useSubscriptions();
  const { city, area } = useLocationContext();

  const [selectedFrequency, setSelectedFrequency] = useState<number | 'ALL'>('ALL');
  const [selectedVendorType, setSelectedVendorType] = useState<string>('ALL');
  const [selectedDiet, setSelectedDiet] = useState<string>('ALL');

  // Modal State for Subscription Confirmation
  const [checkoutModal, setCheckoutModal] = useState<{
    isOpen: boolean;
    plan: SubscriptionPlan | null;
    duration: PlanDuration;
    slots: MealSlot[];
    address: string;
  }>({
    isOpen: false,
    plan: null,
    duration: 'monthly',
    slots: [],
    address: `${area}, ${city} (Hostel / Flat)`
  });

  const handleOpenSubscribe = (plan: SubscriptionPlan, duration: PlanDuration, selectedSlots: MealSlot[]) => {
    setCheckoutModal({
      isOpen: true,
      plan,
      duration,
      slots: selectedSlots,
      address: `${area}, ${city} (Hostel / Flat)`
    });
  };

  const handleConfirmSubscription = () => {
    if (!checkoutModal.plan) return;
    subscribeToPlan(
      checkoutModal.plan,
      checkoutModal.duration,
      checkoutModal.slots,
      checkoutModal.address
    );
    setCheckoutModal(prev => ({ ...prev, isOpen: false }));
    navigate('/subscriptions/manage');
  };

  const filteredPlans = plans.filter(p => {
    if (selectedFrequency !== 'ALL' && p.mealFrequency !== selectedFrequency) return false;
    if (selectedVendorType !== 'ALL' && p.vendorType !== selectedVendorType) return false;
    if (selectedDiet !== 'ALL' && p.dietaryType !== selectedDiet) return false;
    return true;
  });

  return (
    <div className="pt-28 pb-24 container mx-auto px-4 lg:px-8 relative min-h-screen">
      {/* Background Glow */}
      <div className="fixed top-24 left-10 w-96 h-96 bg-aurora-cyan/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-aurora-purple/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header Banner */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-aurora-cyan/10 text-aurora-cyan border border-aurora-cyan/20 text-xs font-bold uppercase tracking-wider mb-4">
          <Calendar size={14} /> Daily Meal & Tiffin Subscriptions
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Ghar Jaisa Khana, <span className="text-aurora-cyan">Har Roz</span> On Time
        </h1>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
          Flexible 1, 2, or 3 meals-per-day subscriptions from verified local dhabas, messes, and home chefs. 
          Pause on weekends, skip meals, and save up to 40% over daily ordering.
        </p>
      </div>

      {/* Active Subscription Quick Reminder Banner */}
      {activeSubscription && (
        <div className="max-w-5xl mx-auto mb-10">
          <GlassCard className="p-5 border-aurora-cyan/40 bg-aurora-cyan/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-aurora-cyan/20 border border-aurora-cyan text-aurora-cyan flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <span className="text-xs font-bold text-aurora-cyan uppercase tracking-wider">Active Meal Plan</span>
                <h4 className="text-lg font-bold text-white">{activeSubscription.planTitle}</h4>
                <p className="text-xs text-slate-400">
                  {activeSubscription.vendorName} • {activeSubscription.totalDays - activeSubscription.consumedDays} Days Remaining
                </p>
              </div>
            </div>

            <Link to="/subscriptions/manage">
              <Button variant="primary" size="md" rightIcon={<ArrowRight size={16} />}>
                Manage Calendar & Pause Days
              </Button>
            </Link>
          </GlassCard>
        </div>
      )}

      {/* Value Pillars */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <GlassCard className="p-4 border-white/5 bg-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h5 className="text-sm font-bold text-white">Full Pause/Skip Flexibility</h5>
            <p className="text-xs text-slate-400">Going home? Pause your days easily.</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4 border-white/5 bg-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-aurora-cyan/10 text-aurora-cyan border border-aurora-cyan/20 flex items-center justify-center shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <h5 className="text-sm font-bold text-white">Guaranteed Delivery Slot</h5>
            <p className="text-xs text-slate-400">Hot insulated lunchbox before meal times.</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4 border-white/5 bg-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-aurora-purple/10 text-aurora-purple border border-aurora-purple/20 flex items-center justify-center shrink-0">
            <MapPin size={20} />
          </div>
          <div>
            <h5 className="text-sm font-bold text-white">Hostel & PG Doorstep Delivery</h5>
            <p className="text-xs text-slate-400">Direct delivery to your room or gate.</p>
          </div>
        </GlassCard>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Frequency Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Meals / Day:</span>
          {(['ALL', 1, 2, 3] as const).map(freq => (
            <button
              key={freq}
              onClick={() => setSelectedFrequency(freq)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFrequency === freq 
                  ? 'bg-aurora-cyan text-[#111111] shadow-md shadow-aurora-cyan/20' 
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {freq === 'ALL' ? 'All Plans' : `${freq} Meal${freq > 1 ? 's' : ''}/Day`}
            </button>
          ))}
        </div>

        {/* Vendor & Diet Filter Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Vendor Type */}
          <select
            value={selectedVendorType}
            onChange={e => setSelectedVendorType(e.target.value)}
            className="flex-1 md:flex-none bg-background/80 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-300 focus:outline-none focus:border-aurora-cyan"
          >
            <option value="ALL">All Providers</option>
            <option value="Tiffin Service">Tiffin Services</option>
            <option value="Student Mess">Student Messes</option>
            <option value="Home Chef">Home Chefs</option>
            <option value="Dhaba">Local Dhabas</option>
          </select>

          {/* Diet Type */}
          <select
            value={selectedDiet}
            onChange={e => setSelectedDiet(e.target.value)}
            className="flex-1 md:flex-none bg-background/80 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-300 focus:outline-none focus:border-aurora-cyan"
          >
            <option value="ALL">All Diets</option>
            <option value="veg">Pure Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
        </div>
      </div>

      {/* Subscription Cards Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map(plan => (
          <SubscriptionCard 
            key={plan.id} 
            plan={plan} 
            onSelect={handleOpenSubscribe}
          />
        ))}
      </div>

      {/* Confirmation Modal */}
      {checkoutModal.isOpen && checkoutModal.plan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <GlassCard className="max-w-md w-full p-6 border-aurora-cyan/30 shadow-2xl relative">
            <button 
              onClick={() => setCheckoutModal(prev => ({ ...prev, isOpen: false }))}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <span className="text-xs font-bold text-aurora-cyan uppercase tracking-wider block mb-1">
              Confirm Subscription
            </span>
            <h3 className="text-xl font-bold text-white mb-2">
              {checkoutModal.plan.title}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Provider: <span className="text-slate-200 font-semibold">{checkoutModal.plan.vendorName}</span> ({checkoutModal.plan.vendorType})
            </p>

            {/* Plan Details Summary */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 mb-4 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Duration:</span>
                <span className="font-bold text-white capitalize">{checkoutModal.duration} ({checkoutModal.duration === 'weekly' ? '7 Days' : '30 Days'})</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Included Slots:</span>
                <span className="font-bold text-aurora-cyan capitalize">{checkoutModal.slots.join(', ')}</span>
              </div>
              <div className="flex justify-between text-slate-300 border-t border-white/5 pt-2">
                <span>Total Amount:</span>
                <span className="text-lg font-extrabold text-white">
                  ₹{checkoutModal.duration === 'weekly' ? checkoutModal.plan.weeklyPrice : checkoutModal.plan.monthlyPrice}
                </span>
              </div>
            </div>

            {/* Delivery Room/Address Input */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Delivery Address / Hostel Room No.
              </label>
              <input
                type="text"
                value={checkoutModal.address}
                onChange={e => setCheckoutModal({ ...checkoutModal, address: e.target.value })}
                placeholder="e.g. Block B, Room 204, Campus Hostel"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-aurora-cyan"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Deliveries are scheduled to your doorstep before lunch & dinner times.
              </span>
            </div>

            {/* Confirm CTA */}
            <div className="flex gap-3">
              <Button 
                variant="ghost" 
                fullWidth 
                onClick={() => setCheckoutModal(prev => ({ ...prev, isOpen: false }))}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                fullWidth 
                onClick={handleConfirmSubscription}
              >
                Start Subscription
              </Button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, PauseCircle, PlayCircle, 
  MapPin, Clock, AlertCircle, ArrowLeft,
  Utensils, Moon, Sun, Check, Sparkles, Phone, MessageSquare
} from 'lucide-react';
import { useSubscriptions } from '../context/SubscriptionContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Badge from '../components/Badge';
import type { MealSlot } from '../types/subscription';

export default function SubscriptionManage() {
  const { 
    activeSubscription, 
    pauseDates, 
    unpauseDate, 
    skipMealSlot, 
    unskipMealSlot, 
    updateDeliveryAddress 
  } = useSubscriptions();

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState(activeSubscription?.deliveryAddress || '');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);

  if (!activeSubscription) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mb-4">
          <Calendar size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No Active Meal Subscription</h2>
        <p className="text-slate-400 mb-6 max-w-md text-sm">
          You don't have an active recurring meal subscription plan right now. Browse our verified local tiffin centers and student messes to start fresh!
        </p>
        <Link to="/subscriptions">
          <Button variant="primary" size="md">Browse Tiffin & Meal Plans</Button>
        </Link>
      </div>
    );
  }

  // Generate date list for the duration
  const startObj = new Date(activeSubscription.startDate);
  const daysArray = Array.from({ length: activeSubscription.totalDays }, (_, i) => {
    const d = new Date(startObj.getTime() + i * 24 * 60 * 60 * 1000);
    return d.toISOString().split('T')[0];
  });

  const todayStr = new Date().toISOString().split('T')[0];

  // Quick Action: Pause upcoming weekend
  const handlePauseWeekend = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday, 6 is Saturday
    const daysUntilSat = (6 - currentDay + 7) % 7;
    
    const sat = new Date(today.getTime() + daysUntilSat * 24 * 60 * 60 * 1000);
    const sun = new Date(sat.getTime() + 24 * 60 * 60 * 1000);

    const satStr = sat.toISOString().split('T')[0];
    const sunStr = sun.toISOString().split('T')[0];

    pauseDates([satStr, sunStr]);
  };

  const isDatePaused = (dateStr: string) => activeSubscription.pausedDates.includes(dateStr);
  const isDateSkipped = (dateStr: string) => activeSubscription.skippedMeals.some(s => s.date === dateStr);

  const handleSaveAddress = () => {
    if (addressInput.trim()) {
      updateDeliveryAddress(addressInput);
      setIsEditingAddress(false);
    }
  };

  const slotIcons: Record<MealSlot, typeof Sun> = {
    breakfast: Sun,
    lunch: Utensils,
    dinner: Moon
  };

  return (
    <div className="pt-28 pb-24 container mx-auto px-4 lg:px-8 relative min-h-screen max-w-6xl">
      {/* Background Gradients */}
      <div className="fixed top-24 left-10 w-96 h-96 bg-aurora-cyan/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-aurora-purple/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Back button */}
      <Link 
        to="/subscriptions" 
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm font-semibold"
      >
        <ArrowLeft size={16} /> Back to all meal plans
      </Link>

      {/* Top Header Card */}
      <GlassCard className="p-6 md:p-8 border-aurora-cyan/30 mb-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold text-aurora-cyan uppercase tracking-wider px-2.5 py-0.5 rounded bg-aurora-cyan/10 border border-aurora-cyan/20">
                {activeSubscription.vendorType}
              </span>
              <Badge variant="success" className="text-xs flex items-center gap-1">
                <Check size={12} /> Active Plan
              </Badge>
              <span className="text-xs text-slate-400 capitalize">
                {activeSubscription.duration} Plan ({activeSubscription.totalDays} Days)
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1">
              {activeSubscription.planTitle}
            </h1>
            <p className="text-sm text-slate-300">
              Provider: <span className="text-white font-semibold">{activeSubscription.vendorName}</span>
            </p>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="glass"
              size="sm"
              leftIcon={<PauseCircle size={16} className="text-amber-400" />}
              onClick={handlePauseWeekend}
              title="Pause next Saturday and Sunday and extend subscription"
            >
              Pause Weekend (Sat & Sun)
            </Button>

            <a href="tel:9876543210" className="inline-flex">
              <Button
                variant="glass"
                size="sm"
                leftIcon={<Phone size={15} className="text-emerald-400" />}
              >
                Call Delivery Partner
              </Button>
            </a>
          </div>
        </div>

        {/* Progress Bar & Days Remaining */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-400">
              Subscription Progress: <span className="text-white font-bold">{activeSubscription.consumedDays} / {activeSubscription.totalDays} days consumed</span>
            </span>
            <span className="text-aurora-cyan font-bold">
              {activeSubscription.totalDays - activeSubscription.consumedDays} Days Remaining
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-aurora-cyan to-aurora-blue rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (activeSubscription.consumedDays / activeSubscription.totalDays) * 100)}%` }}
            />
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        
        {/* LEFT 2 COLS: 30-Day Punch-Card Calendar Matrix */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar size={18} className="text-aurora-cyan" /> 30-Day Meal Attendance & Schedule
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click on any upcoming day to pause meal or skip a specific slot.
                </p>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500" /> Done
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-aurora-cyan text-black" /> Today
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500" /> Paused
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-food-coral/20 border border-food-coral" /> Skipped
                </span>
              </div>
            </div>

            {/* Calendar Grid (Days 1 to TotalDays) */}
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2.5">
              {daysArray.map((dateStr, idx) => {
                const dayNumber = idx + 1;
                const isPast = dateStr < todayStr;
                const isToday = dateStr === todayStr;
                const paused = isDatePaused(dateStr);
                const skipped = isDateSkipped(dateStr);
                const isSelected = selectedCalendarDate === dateStr;

                let cardStyle = "bg-white/5 border-white/10 text-slate-300 hover:border-aurora-cyan/50";
                if (isPast) cardStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
                if (isToday) cardStyle = "bg-aurora-cyan text-[#111111] font-extrabold border-aurora-cyan shadow-[0_0_15px_rgba(34,211,238,0.3)]";
                if (paused) cardStyle = "bg-amber-500/15 border-amber-500/40 text-amber-300";
                if (skipped) cardStyle = "bg-food-coral/15 border-food-coral/40 text-food-coral";
                if (isSelected) cardStyle += " ring-2 ring-white";

                return (
                  <button
                    key={dateStr}
                    type="button"
                    onClick={() => setSelectedCalendarDate(dateStr)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer relative ${cardStyle}`}
                  >
                    <span className="text-[10px] uppercase opacity-70">
                      {new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className="text-base font-extrabold my-0.5">{dayNumber}</span>
                    <span className="text-[9px] truncate max-w-full">
                      {isToday ? 'Today' : paused ? 'Paused' : skipped ? 'Skipped' : isPast ? 'Eaten' : 'Active'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Day Action Drawer / Details when a date is selected */}
            {selectedCalendarDate && (
              <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 animate-fade-in">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles size={16} className="text-aurora-cyan" />
                    Manage Date: {new Date(selectedCalendarDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'long' })}
                  </h4>
                  <button 
                    onClick={() => setSelectedCalendarDate(null)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {/* Pause / Resume date */}
                  {isDatePaused(selectedCalendarDate) ? (
                    <Button 
                      variant="primary" 
                      size="sm" 
                      leftIcon={<PlayCircle size={15} />}
                      onClick={() => unpauseDate(selectedCalendarDate)}
                    >
                      Resume This Day
                    </Button>
                  ) : (
                    <Button 
                      variant="glass" 
                      size="sm" 
                      leftIcon={<PauseCircle size={15} className="text-amber-400" />}
                      onClick={() => pauseDates([selectedCalendarDate])}
                    >
                      Pause Entire Day
                    </Button>
                  )}

                  {/* Skip Specific Slots */}
                  {activeSubscription.selectedSlots.map(slot => {
                    const slotSkipped = activeSubscription.skippedMeals.some(s => s.date === selectedCalendarDate && s.slot === slot);
                    return (
                      <Button
                        key={slot}
                        variant="glass"
                        size="sm"
                        className={slotSkipped ? "border-food-coral/50 text-food-coral" : ""}
                        onClick={() => {
                          if (slotSkipped) {
                            unskipMealSlot(selectedCalendarDate, slot);
                          } else {
                            skipMealSlot(selectedCalendarDate, slot, 'Student schedule conflict');
                          }
                        }}
                      >
                        {slotSkipped ? `Unskip ${slot}` : `Skip ${slot}`}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </GlassCard>

          {/* Today's Delivery Timetable */}
          <GlassCard className="p-6 border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Clock size={18} className="text-aurora-cyan" /> Daily Meal Delivery Slots
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {activeSubscription.selectedSlots.map(slot => {
                const Icon = slotIcons[slot];
                const time = activeSubscription.deliveryTimeSlots[slot] || '1:00 PM';
                return (
                  <div key={slot} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-aurora-cyan/10 text-aurora-cyan flex items-center justify-center shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider capitalize">{slot}</span>
                      <h5 className="text-sm font-bold text-white">{time}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* RIGHT COL: Delivery Address & Vendor Info */}
        <div className="space-y-6">
          {/* Room / Address Card */}
          <GlassCard className="p-6 border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin size={16} className="text-aurora-cyan" /> Delivery Location
              </h4>
              {!isEditingAddress ? (
                <button 
                  onClick={() => setIsEditingAddress(true)}
                  className="text-xs font-semibold text-aurora-cyan hover:underline cursor-pointer"
                >
                  Edit Room
                </button>
              ) : null}
            </div>

            {!isEditingAddress ? (
              <p className="text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5 leading-relaxed">
                {activeSubscription.deliveryAddress}
              </p>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  value={addressInput}
                  onChange={e => setAddressInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-aurora-cyan"
                  placeholder="Hostel, Flat or Room No."
                />
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" onClick={handleSaveAddress}>Save</Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditingAddress(false)}>Cancel</Button>
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-2 text-[11px] text-slate-400">
              <AlertCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
              <span>Insulated tiffins are handed over directly to you or deposited at the hostel security desk.</span>
            </div>
          </GlassCard>

          {/* Provider Contact Card */}
          <GlassCard className="p-6 border-white/10">
            <h4 className="text-sm font-bold text-white mb-3">Tiffin Provider Helpdesk</h4>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                🍱
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">{activeSubscription.vendorName}</h5>
                <span className="text-[11px] text-slate-400">Dispatches from Rajpur Road Hub</span>
              </div>
            </div>

            <div className="space-y-2">
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-500/20 transition-all"
              >
                <MessageSquare size={14} /> WhatsApp Tiffin Coordinator
              </a>

              <a 
                href="tel:9876543210" 
                className="w-full py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
              >
                <Phone size={14} /> Direct Emergency Hotline
              </a>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}

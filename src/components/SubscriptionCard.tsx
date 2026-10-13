import { useState } from 'react';
import { Star, Check, Clock, Utensils, Sun, Moon, Sparkles } from 'lucide-react';
import type { SubscriptionPlan, PlanDuration, MealSlot } from '../types/subscription';
import GlassCard from './GlassCard';
import Button from './Button';
import Badge from './Badge';
import NutritionBadge from './NutritionBadge';

interface Props {
  plan: SubscriptionPlan;
  onSelect: (plan: SubscriptionPlan, duration: PlanDuration, selectedSlots: MealSlot[]) => void;
}

export default function SubscriptionCard({ plan, onSelect }: Props) {
  const [duration, setDuration] = useState<PlanDuration>('monthly');

  const currentPrice = duration === 'monthly' ? plan.monthlyPrice : plan.weeklyPrice;
  const perDayPrice = duration === 'monthly' ? Math.round(plan.monthlyPrice / 30) : Math.round(plan.weeklyPrice / 7);

  const slotIcons: Record<MealSlot, { label: string; icon: typeof Sun }> = {
    breakfast: { label: 'Breakfast', icon: Sun },
    lunch: { label: 'Lunch', icon: Utensils },
    dinner: { label: 'Dinner', icon: Moon },
  };

  return (
    <GlassCard className="flex flex-col justify-between p-6 border-white/10 hover:border-aurora-cyan/40 transition-all duration-300 relative group overflow-hidden">
      {/* Top Banner */}
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-aurora-cyan via-aurora-blue to-aurora-purple opacity-40 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Vendor Header */}
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={plan.vendorImage} 
            alt={plan.vendorName}
            className="w-12 h-12 rounded-xl object-cover border border-white/10 shadow-md"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-aurora-cyan uppercase tracking-wider px-2 py-0.5 rounded bg-aurora-cyan/10">
                {plan.vendorType}
              </span>
              <div className="flex items-center text-amber-400 text-xs font-bold gap-1 ml-auto">
                <Star size={13} fill="currentColor" />
                <span>{plan.vendorRating}</span>
              </div>
            </div>
            <h4 className="text-sm font-semibold text-slate-300 truncate mt-1">{plan.vendorName}</h4>
          </div>
        </div>

        {/* Plan Title & Frequency */}
        <div className="mb-4">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-xl font-bold text-white group-hover:text-aurora-cyan transition-colors">
              {plan.title}
            </h3>
            {plan.dietaryType === 'veg' ? (
              <Badge variant="success" className="text-[10px] shrink-0">Veg</Badge>
            ) : (
              <Badge variant="food" className="text-[10px] shrink-0">Non-Veg</Badge>
            )}
          </div>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{plan.description}</p>
        </div>

        {/* Meal Slots Included */}
        <div className="flex flex-wrap items-center gap-2 mb-5 p-2.5 rounded-xl bg-white/5 border border-white/5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Clock size={12} className="text-aurora-cyan" /> Includes:
          </span>
          {plan.includedSlots.map((slot) => {
            const SlotIcon = slotIcons[slot].icon;
            return (
              <span 
                key={slot}
                className="text-xs font-semibold px-2 py-1 rounded-lg bg-aurora-cyan/10 text-aurora-cyan border border-aurora-cyan/20 flex items-center gap-1 capitalize"
              >
                <SlotIcon size={12} />
                {slotIcons[slot].label}
              </span>
            );
          })}
        </div>

        {/* Nutrition Macros */}
        {plan.macros && (
          <div className="mb-4">
            <NutritionBadge nutrition={plan.macros} variant="compact" />
          </div>
        )}

        {/* Duration Switcher */}
        <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 mb-5">
          <button
            type="button"
            onClick={() => setDuration('weekly')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              duration === 'weekly' 
                ? 'bg-aurora-cyan text-[#111111] shadow-md shadow-aurora-cyan/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Weekly (7 Days)
          </button>
          <button
            type="button"
            onClick={() => setDuration('monthly')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
              duration === 'monthly' 
                ? 'bg-aurora-cyan text-[#111111] shadow-md shadow-aurora-cyan/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly (30 Days)
            <span className="text-[9px] px-1 rounded bg-amber-400 text-black font-extrabold">Save 15%</span>
          </button>
        </div>

        {/* Price Tag */}
        <div className="flex items-baseline justify-between mb-5 px-1">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-white">₹{currentPrice}</span>
              <span className="text-xs text-slate-400 font-medium">/ {duration === 'monthly' ? 'month' : 'week'}</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">≈ ₹{perDayPrice} / day</span>
          </div>

          <div className="text-right text-[11px] text-slate-400">
            <span className="block text-slate-300 font-semibold">{plan.mealFrequency} Meals / Day</span>
            <span>Flexible Pause/Skip</span>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
          {plan.features.map((feat) => (
            <div key={feat} className="flex items-start gap-2 text-xs text-slate-300">
              <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <Button
        variant="primary"
        fullWidth
        className="py-3 font-bold shadow-lg shadow-aurora-cyan/15 group-hover:shadow-aurora-cyan/30 transition-all cursor-pointer"
        rightIcon={<Sparkles size={16} />}
        onClick={() => onSelect(plan, duration, plan.includedSlots)}
      >
        Select {duration === 'monthly' ? 'Monthly' : 'Weekly'} Plan
      </Button>
    </GlassCard>
  );
}

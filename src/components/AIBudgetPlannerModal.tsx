import { useState, useMemo } from 'react';
import { 
  X, Sparkles, Wallet, Dumbbell, ShieldCheck, 
  ArrowRight, Utensils, CheckCircle2, TrendingDown,
  Sun, MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from './GlassCard';
import Button from './Button';
import VendorTypeBadge from './VendorTypeBadge';
import NutritionBadge from './NutritionBadge';
import { mockSubscriptionPlans } from '../data/mockSubscriptions';
import type { PlanDuration, MealFrequency } from '../types/subscription';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type DietaryGoal = 'budget_saver' | 'pure_veg' | 'high_protein' | 'ghar_jaisa';

export default function AIBudgetPlannerModal({ isOpen, onClose }: Props) {
  const navigate = useNavigate();

  // State inputs
  const [duration, setDuration] = useState<PlanDuration>('monthly');
  const [budget, setBudget] = useState<number>(3600);
  const [mealFrequency, setMealFrequency] = useState<MealFrequency>(2);
  const [dietaryGoal, setDietaryGoal] = useState<DietaryGoal>('pure_veg');
  const [campusArea, setCampusArea] = useState<string>('Hostel Block A & B');

  // Realistic budget bounds
  const minBudget = duration === 'weekly' ? 500 : 2000;
  const maxBudget = duration === 'weekly' ? 2200 : 7000;
  const budgetStep = duration === 'weekly' ? 50 : 100;

  // Preset quick chips
  const weeklyPresets = [750, 1000, 1350, 1700];
  const monthlyPresets = [2500, 3500, 4500, 5800];
  const currentPresets = duration === 'weekly' ? weeklyPresets : monthlyPresets;

  // AI Optimizer Algorithm
  const optimizationResult = useMemo(() => {
    // 1. Filter eligible plans based on dietary goal & frequency
    let candidates = mockSubscriptionPlans.filter(p => {
      if (dietaryGoal === 'pure_veg' && p.dietaryType !== 'veg') return false;
      if (dietaryGoal === 'high_protein') {
        // Prefer high protein mess if available
        return (p.macros?.protein || 0) >= 40;
      }
      return true;
    });

    if (candidates.length === 0) {
      candidates = mockSubscriptionPlans;
    }

    // 2. Score candidates by mealFrequency match and cost proximity to budget
    const scored = candidates.map(plan => {
      const planCost = duration === 'monthly' ? plan.monthlyPrice : plan.weeklyPrice;
      const freqDelta = Math.abs(plan.mealFrequency - mealFrequency);
      const costDelta = Math.abs(planCost - budget);

      let fitnessBonus = 0;
      if (dietaryGoal === 'high_protein' && plan.id.includes('fitness')) fitnessBonus = 200;
      if (dietaryGoal === 'ghar_jaisa' && plan.vendorType === 'Home Chef') fitnessBonus = 150;
      if (dietaryGoal === 'budget_saver' && planCost <= budget) fitnessBonus = 180;

      const score = 1000 - (freqDelta * 250) - (costDelta * 0.4) + fitnessBonus;
      return { plan, score, planCost };
    });

    scored.sort((a, b) => b.score - a.score);
    const best = scored[0] || { plan: mockSubscriptionPlans[0], planCost: 3599 };
    const plan = best.plan;
    const planCost = duration === 'monthly' ? plan.monthlyPrice : plan.weeklyPrice;

    // Financial calculations
    const budgetDifference = budget - planCost; // positive = under budget, negative = over budget
    const perDayCost = duration === 'monthly' ? Math.round(planCost / 30) : Math.round(planCost / 7);
    const adHocDeliveryPerDay = plan.mealFrequency * 120; // Avg standalone Zomato/Swiggy order per meal is ~₹120
    const monthlyAdHocCost = adHocDeliveryPerDay * (duration === 'monthly' ? 30 : 7);
    const estimatedSavings = monthlyAdHocCost - planCost;

    // AI Match Percentage
    const matchPercentage = Math.min(99, Math.max(82, Math.round(94 - Math.abs(budgetDifference) / 80)));

    return {
      plan,
      planCost,
      budgetDifference,
      perDayCost,
      estimatedSavings,
      matchPercentage
    };
  }, [duration, budget, mealFrequency, dietaryGoal]);

  if (!isOpen) return null;

  const handleAdoptPlan = () => {
    onClose();
    navigate(`/subscriptions?dietary=${optimizationResult.plan.dietaryType}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <GlassCard className="max-w-4xl w-full p-5 sm:p-7 md:p-8 border-aurora-cyan/40 bg-background/95 shadow-2xl relative my-6 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-aurora-cyan uppercase tracking-wider px-2.5 py-0.5 rounded bg-aurora-cyan/10 border border-aurora-cyan/20 flex items-center gap-1.5 shadow-sm">
              <Sparkles size={13} className="text-aurora-cyan" /> AI Student Budget & Nutrition Engine
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Smart Meal Allocation Algorithm
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Personalized <span className="text-aurora-cyan">Hostel Meal & Budget</span> Planner
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure your target stipend, campus delivery spot, and dietary target. Our algorithm matches optimal verified tiffin plans.
          </p>
        </div>

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto pr-1 flex-1 hide-scrollbar">
          
          {/* LEFT: Inputs & Preferences (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* 1. Duration & Budget */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Wallet size={14} className="text-aurora-cyan" /> 1. Budget & Plan Cycle
                </label>
                <div className="flex rounded-lg bg-background/60 p-0.5 border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setDuration('weekly');
                      setBudget(1200);
                    }}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      duration === 'weekly' ? 'bg-aurora-cyan text-[#111111]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDuration('monthly');
                      setBudget(3600);
                    }}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      duration === 'monthly' ? 'bg-aurora-cyan text-[#111111]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Monthly (30 Days)
                  </button>
                </div>
              </div>

              {/* Slider */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs text-slate-400">Target Stipend / Budget:</span>
                  <span className="text-2xl font-black text-white">
                    ₹{budget.toLocaleString('en-IN')}
                    <span className="text-xs text-slate-400 font-normal"> / {duration === 'monthly' ? 'month' : 'week'}</span>
                  </span>
                </div>
                <input 
                  type="range"
                  min={minBudget}
                  max={maxBudget}
                  step={budgetStep}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-aurora-cyan cursor-pointer"
                />
                
                {/* Preset Chips */}
                <div className="flex gap-2 mt-2.5">
                  <span className="text-[10px] text-slate-500 uppercase font-bold self-center">Quick:</span>
                  {currentPresets.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setBudget(val)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        budget === val
                          ? 'bg-aurora-cyan/20 border-aurora-cyan text-aurora-cyan font-bold'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                      }`}
                    >
                      ₹{val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Meal Frequency */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2.5">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Utensils size={14} className="text-aurora-cyan" /> 2. Meal Frequency
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { freq: 1, label: '1 Meal / Day', sub: 'Lunch OR Dinner' },
                  { freq: 2, label: '2 Meals / Day', sub: 'Lunch + Dinner' },
                  { freq: 3, label: '3 Meals / Day', sub: 'Breakfast + 2 Meals' },
                ].map(({ freq, label, sub }) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setMealFrequency(freq as MealFrequency)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      mealFrequency === freq 
                        ? 'bg-aurora-cyan/15 border-aurora-cyan ring-1 ring-aurora-cyan shadow-md shadow-aurora-cyan/10'
                        : 'bg-white/5 border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <span className={`text-xs font-bold block ${mealFrequency === freq ? 'text-aurora-cyan' : 'text-white'}`}>
                      {label}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Dietary Goal */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2.5">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Dumbbell size={14} className="text-aurora-cyan" /> 3. Diet & Lifestyle Goal
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'pure_veg', label: 'Pure Veg Homestyle', icon: '🥗', desc: 'Sattvik, low oil, balanced thali' },
                  { id: 'budget_saver', label: 'Maximum Pocket Saver', icon: '💰', desc: 'Cheapest per meal rate' },
                  { id: 'high_protein', label: 'High Protein / Gym Fit', icon: '💪', desc: '80g-110g daily protein' },
                  { id: 'ghar_jaisa', label: 'Mother’s Recipe (Desi Ghee)', icon: '👩‍🍳', desc: 'Small batch home-chef meals' },
                ].map(({ id, label, icon, desc }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setDietaryGoal(id as DietaryGoal)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      dietaryGoal === id
                        ? 'bg-aurora-cyan/15 border-aurora-cyan ring-1 ring-aurora-cyan'
                        : 'bg-white/5 border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-white mb-0.5">
                      <span>{icon}</span> {label}
                    </div>
                    <span className="text-[10px] text-slate-400 block">{desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Campus Delivery Spot */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={14} className="text-aurora-cyan" /> 4. Campus Delivery Area
              </label>
              <select 
                value={campusArea}
                onChange={(e) => setCampusArea(e.target.value)}
                className="w-full bg-background/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-aurora-cyan cursor-pointer"
              >
                <option value="Hostel Block A & B">Hostel Block A & B (Near North Gate)</option>
                <option value="Girls Hostel Campus Gate 2">Girls Hostel Campus Gate 2</option>
                <option value="Premnagar PG Hub">Premnagar PG Hub (Near Chowk)</option>
                <option value="Main Campus Road">Main Campus Road / Faculty Flats</option>
              </select>
            </div>
          </div>

          {/* RIGHT: AI Recommendation Output (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* AI Synthesized Match Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-aurora-cyan/15 via-aurora-blue/10 to-transparent border border-aurora-cyan/40 shadow-xl relative overflow-hidden flex-1">
              
              {/* Match Header */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-aurora-cyan text-[#111111] flex items-center justify-center font-black text-xs shadow-md">
                    AI
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Algorithm Match</h3>
                    <span className="text-[11px] text-aurora-cyan font-bold">{optimizationResult.matchPercentage}% Proximity Score</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={10} /> Verified Kitchen
                </span>
              </div>

              {/* Recommended Plan Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={optimizationResult.plan.vendorImage} 
                    alt={optimizationResult.plan.vendorName}
                    className="w-12 h-12 rounded-xl object-cover border border-white/10 shadow-md"
                  />
                  <div className="min-w-0 flex-1">
                    <VendorTypeBadge type={optimizationResult.plan.vendorType} className="mb-1" />
                    <h4 className="text-base font-extrabold text-white truncate">
                      {optimizationResult.plan.title}
                    </h4>
                    <span className="text-xs text-slate-300 truncate block">
                      {optimizationResult.plan.vendorName}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-white/5 p-2.5 rounded-xl border border-white/5">
                  {optimizationResult.plan.description}
                </p>
              </div>

              {/* Nutrition Macros if available */}
              {optimizationResult.plan.macros && (
                <div className="mb-4 p-2.5 rounded-xl bg-background/50 border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1.5">
                    Estimated Daily Macro Intake:
                  </span>
                  <NutritionBadge nutrition={optimizationResult.plan.macros} variant="compact" />
                </div>
              )}

              {/* Financial Metrics Breakdown */}
              <div className="space-y-2 mb-4 bg-background/40 p-3 rounded-xl border border-white/10">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Total Subscription Cost:</span>
                  <span className="text-base font-extrabold text-white">
                    ₹{optimizationResult.planCost}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Effective Cost Per Day:</span>
                  <span className="font-bold text-aurora-cyan">
                    ₹{optimizationResult.perDayCost} / day
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5">
                  <span className="text-slate-400 flex items-center gap-1">
                    <TrendingDown size={13} className="text-emerald-400" /> Projected Savings:
                  </span>
                  <span className="font-extrabold text-emerald-400">
                    Save ₹{optimizationResult.estimatedSavings.toLocaleString('en-IN')}
                  </span>
                </div>

                {optimizationResult.budgetDifference >= 0 ? (
                  <div className="text-[11px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg text-center font-bold">
                    🎉 ₹{optimizationResult.budgetDifference} under your budget limit!
                  </div>
                ) : (
                  <div className="text-[11px] text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg text-center font-medium">
                    ₹{Math.abs(optimizationResult.budgetDifference)} above target, includes premium portions.
                  </div>
                )}
              </div>

              {/* Security & Flexibility Guarantees */}
              <div className="text-[10px] text-slate-400 space-y-1 mb-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-aurora-cyan" /> Free doorstep delivery to {campusArea}
                </div>
                <div className="flex items-center gap-1.5">
                  <Sun size={12} className="text-amber-400" /> Weekend pause & single-meal skip allowed anytime
                </div>
              </div>
            </div>

            {/* Adopt Plan CTA */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              className="py-3.5 font-extrabold shadow-lg shadow-aurora-cyan/20 cursor-pointer"
              rightIcon={<ArrowRight size={16} />}
              onClick={handleAdoptPlan}
            >
              Choose This Recommended Plan
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

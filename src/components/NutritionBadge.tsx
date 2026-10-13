import { Flame, Dumbbell, Wheat, Droplets } from 'lucide-react';

export interface NutritionInfo {
  calories: number; // kcal
  protein: number;  // grams
  carbs: number;    // grams
  fats: number;     // grams
}

interface Props {
  nutrition?: NutritionInfo;
  variant?: 'compact' | 'detailed';
  className?: string;
}

export default function NutritionBadge({ 
  nutrition, 
  variant = 'compact', 
  className = '' 
}: Props) {
  if (!nutrition) return null;

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 text-xs font-semibold ${className}`}>
        <span className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
          <Flame size={11} className="text-amber-400 shrink-0" />
          {nutrition.calories} kcal
        </span>
        <span className="flex items-center gap-1 text-aurora-cyan bg-aurora-cyan/10 px-2 py-0.5 rounded-md border border-aurora-cyan/20">
          <Dumbbell size={11} className="text-aurora-cyan shrink-0" />
          {nutrition.protein}g protein
        </span>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 ${className}`}>
      {/* Calories */}
      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
          <Flame size={15} />
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Energy</span>
          <span className="text-xs font-extrabold text-amber-300">{nutrition.calories} kcal</span>
        </div>
      </div>

      {/* Protein */}
      <div className="p-2.5 rounded-xl bg-aurora-cyan/10 border border-aurora-cyan/20 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-aurora-cyan/20 text-aurora-cyan flex items-center justify-center shrink-0">
          <Dumbbell size={15} />
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Protein</span>
          <span className="text-xs font-extrabold text-aurora-cyan">{nutrition.protein}g</span>
        </div>
      </div>

      {/* Carbs */}
      <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
          <Wheat size={15} />
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Carbs</span>
          <span className="text-xs font-extrabold text-blue-200">{nutrition.carbs}g</span>
        </div>
      </div>

      {/* Fats */}
      <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
          <Droplets size={15} />
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Healthy Fats</span>
          <span className="text-xs font-extrabold text-purple-200">{nutrition.fats}g</span>
        </div>
      </div>
    </div>
  );
}

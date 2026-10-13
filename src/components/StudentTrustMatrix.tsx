import { useState } from 'react';
import { Sparkles, Utensils, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface StudentTrustScore {
  gharJaisaRating: number;
  rotiFreshnessRating: number;
  portionQuantityPercent: number;
}

interface StudentTrustMatrixProps {
  score?: StudentTrustScore;
  compact?: boolean;
}

export default function StudentTrustMatrix({ score, compact = false }: StudentTrustMatrixProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!score) return null;

  if (compact) {
    return (
      <div className="w-full">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="w-full flex items-center justify-between text-[11px] font-semibold py-1.5 px-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/15 transition-all text-left"
          title="Student Verified Quality Index"
        >
          <span className="flex items-center gap-1.5 truncate">
            <Sparkles size={12} className="text-emerald-400 shrink-0" />
            <span className="font-bold">Student Quality Matrix</span>
            <span className="text-emerald-400/70 font-normal">({score.gharJaisaRating}% Ghar-Jaisa)</span>
          </span>
          {isExpanded ? <ChevronUp size={12} className="shrink-0" /> : <ChevronDown size={12} className="shrink-0" />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 p-2.5 rounded-xl bg-black/60 border border-emerald-500/30 text-xs space-y-2 overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold text-slate-400 border-b border-white/10 pb-1">
                <span>Verified Hostel Metric</span>
                <span className="text-emerald-400">Student Score</span>
              </div>

              {/* Metric 1 */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300 flex items-center gap-1">
                    <Heart size={10} className="text-rose-400" /> Ghar-Jaisa / Low Oil
                  </span>
                  <span className="font-bold text-emerald-400">{score.gharJaisaRating}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    style={{ width: `${score.gharJaisaRating}%` }}
                  />
                </div>
              </div>

              {/* Metric 2 */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300 flex items-center gap-1">
                    <Utensils size={10} className="text-amber-400" /> Roti Softness & Heat
                  </span>
                  <span className="font-bold text-amber-400">{score.rotiFreshnessRating} / 5.0</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                    style={{ width: `${(score.rotiFreshnessRating / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Metric 3 */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300 flex items-center gap-1">
                    <Sparkles size={10} className="text-cyan-400" /> Pet-Bharo Portion Size
                  </span>
                  <span className="font-bold text-cyan-400">{score.portionQuantityPercent}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"
                    style={{ width: `${score.portionQuantityPercent}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/20 space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Sparkles size={14} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Student Quality Matrix</h4>
            <p className="text-[10px] text-slate-400">Real verified feedback from campus hostel residents</p>
          </div>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Top Rated
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Metric 1 */}
        <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-300 flex items-center gap-1 text-[11px]">
              <Heart size={12} className="text-rose-400 shrink-0" /> Ghar-Jaisa (Low Oil)
            </span>
            <span className="font-bold text-emerald-400">{score.gharJaisaRating}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
              style={{ width: `${score.gharJaisaRating}%` }}
            />
          </div>
          <p className="text-[9px] text-slate-400 mt-1">Light on stomach & zero heavy grease</p>
        </div>

        {/* Metric 2 */}
        <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-300 flex items-center gap-1 text-[11px]">
              <Utensils size={12} className="text-amber-400 shrink-0" /> Roti Softness & Freshness
            </span>
            <span className="font-bold text-amber-400">{score.rotiFreshnessRating} / 5</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
              style={{ width: `${(score.rotiFreshnessRating / 5) * 100}%` }}
            />
          </div>
          <p className="text-[9px] text-slate-400 mt-1">Fresh tawa phulkas in heat-lock box</p>
        </div>

        {/* Metric 3 */}
        <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-300 flex items-center gap-1 text-[11px]">
              <Sparkles size={12} className="text-cyan-400 shrink-0" /> Pet-Bharo Portion Size
            </span>
            <span className="font-bold text-cyan-400">{score.portionQuantityPercent}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"
              style={{ width: `${score.portionQuantityPercent}%` }}
            />
          </div>
          <p className="text-[9px] text-slate-400 mt-1">Sufficient for 1 hungry student</p>
        </div>
      </div>
    </div>
  );
}

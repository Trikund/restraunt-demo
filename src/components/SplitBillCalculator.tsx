import { useState } from 'react';
import { Users, Minus, Plus, Share2, Check, Calculator } from 'lucide-react';
import GlassCard from './GlassCard';

interface Props {
  totalAmount: number;
  className?: string;
}

export default function SplitBillCalculator({ totalAmount, className = '' }: Props) {
  const [numPeople, setNumPeople] = useState<number>(3);
  const [copied, setCopied] = useState<boolean>(false);

  const perPersonAmount = (totalAmount / numPeople).toFixed(2);

  const shareText = `Hey roomies! Our food bill is ₹${totalAmount.toFixed(2)}. Each share is ₹${perPersonAmount}. Please pay your share via UPI!`;

  const handleCopyShare = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <GlassCard className={`p-4 sm:p-5 border-aurora-purple/30 bg-aurora-purple/5 relative overflow-hidden ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-aurora-purple">
          <Calculator size={18} />
          <h4 className="font-bold text-sm text-white">Roommate Split-Bill Calculator</h4>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-aurora-purple/20 text-aurora-purple border border-aurora-purple/30">
          Hostel Group Order
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 border-y border-white/10 my-2">
        {/* Counter */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
            <Users size={14} className="text-aurora-cyan" /> Split with:
          </span>
          <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-1">
            <button
              type="button"
              onClick={() => setNumPeople(Math.max(2, numPeople - 1))}
              disabled={numPeople <= 2}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 cursor-pointer"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center font-extrabold text-sm text-white">
              {numPeople}
            </span>
            <button
              type="button"
              onClick={() => setNumPeople(Math.min(8, numPeople + 1))}
              disabled={numPeople >= 8}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 cursor-pointer"
            >
              <Plus size={14} />
            </button>
          </div>
          <span className="text-xs text-slate-400">people</span>
        </div>

        {/* Per-person calculation */}
        <div className="text-center sm:text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
            Each Person Pays:
          </span>
          <span className="text-2xl font-black text-aurora-cyan">
            ₹{perPersonAmount}
          </span>
        </div>
      </div>

      {/* Shareable WhatsApp snippet button */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <p className="text-[11px] text-slate-400 truncate">
          {shareText}
        </p>
        <button
          type="button"
          onClick={handleCopyShare}
          className="shrink-0 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-aurora-purple/30 text-white text-xs font-bold transition-all border border-white/15 flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-300">Copied!</span>
            </>
          ) : (
            <>
              <Share2 size={13} />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </GlassCard>
  );
}

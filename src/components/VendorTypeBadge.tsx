import { Utensils, ChefHat, Flame, Store, PackageCheck } from 'lucide-react';

export type VendorArchetype = 'Tiffin Service' | 'Student Mess' | 'Home Chef' | 'Dhaba' | 'Restaurant';

interface Props {
  type?: VendorArchetype;
  className?: string;
}

export default function VendorTypeBadge({ type = 'Restaurant', className = '' }: Props) {
  const configs: Record<VendorArchetype, {
    label: string;
    icon: typeof Store;
    style: string;
  }> = {
    'Tiffin Service': {
      label: 'Tiffin Service',
      icon: PackageCheck,
      style: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
    },
    'Student Mess': {
      label: 'Student Mess',
      icon: Utensils,
      style: 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
    },
    'Home Chef': {
      label: 'Home Chef',
      icon: ChefHat,
      style: 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
    },
    'Dhaba': {
      label: 'Pocket Dhaba',
      icon: Flame,
      style: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
    },
    'Restaurant': {
      label: 'Restaurant',
      icon: Store,
      style: 'bg-white/10 text-slate-200 border-white/20'
    }
  };

  const config = configs[type] || configs['Restaurant'];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-bold backdrop-blur-md ${config.style} ${className}`}>
      <Icon size={12} />
      {config.label}
    </span>
  );
}

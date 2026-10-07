import type { ReactNode } from 'react';

type BadgeVariant = 'aurora' | 'glass' | 'success' | 'warning' | 'error' | 'food';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  icon?: ReactNode;
}

export default function Badge({ children, variant = 'glass', className = '', icon }: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide';
  
  const variantStyles = {
    aurora: 'bg-gradient-to-r from-aurora-cyan/20 to-aurora-blue/20 text-aurora-cyan border border-aurora-cyan/30',
    glass: 'glass text-foreground',
    success: 'bg-status-success/20 text-status-success border border-status-success/30',
    warning: 'bg-status-warning/20 text-status-warning border border-status-warning/30',
    error: 'bg-status-error/20 text-status-error border border-status-error/30',
    food: 'bg-food-coral/20 text-food-orange border border-food-coral/30',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {icon && <span className="w-3.5 h-3.5 flex items-center justify-center">{icon}</span>}
      {children}
    </span>
  );
}

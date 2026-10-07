import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

type IconButtonVariant = 'glass' | 'ghost' | 'solid' | 'food';

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  badge?: number;
}

export default function IconButton({
  icon,
  variant = 'glass',
  size = 'md',
  className = '',
  badge,
  ...props
}: IconButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center rounded-full transition-all duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background';
  
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const variantStyles = {
    glass: 'glass glass-hover text-foreground focus:ring-white/50',
    ghost: 'text-muted hover:text-foreground hover:bg-white/10 focus:ring-white/20',
    solid: 'bg-white text-background hover:bg-slate-200 focus:ring-white',
    food: 'bg-gradient-to-r from-food-coral to-food-orange text-white hover:opacity-90 focus:ring-food-coral glow-food',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props as any}
    >
      {icon}
      
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-status-error text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-background">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </motion.button>
  );
}

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'ghost' | 'food';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 overflow-hidden outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background';
  
  const sizeStyles = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  };

  const variantStyles = {
    primary: 'bg-aurora-blue text-white hover:bg-blue-600 focus:ring-aurora-blue shadow-lg hover:shadow-aurora-blue/50',
    secondary: 'bg-white text-background hover:bg-slate-200 focus:ring-white',
    glass: 'glass glass-hover text-foreground focus:ring-white/50',
    ghost: 'text-muted hover:text-foreground hover:bg-white/5 focus:ring-white/20',
    food: 'bg-gradient-to-r from-food-coral to-food-orange text-white hover:opacity-90 focus:ring-food-coral shadow-lg glow-food',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props as any}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span className="relative z-10">{children}</span>
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      
      {/* Subtle shine effect for primary and food buttons */}
      {(variant === 'primary' || variant === 'food') && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hover:animate-[shimmer_1.5s_infinite]" />
      )}
    </motion.button>
  );
}

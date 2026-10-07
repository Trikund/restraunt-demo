import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function GlassCard({ children, className = '', hoverable = false, ...props }: GlassCardProps) {
  const hoverClass = hoverable ? 'glass-hover hover-elevation cursor-pointer' : '';
  
  return (
    <motion.div 
      className={`glass rounded-2xl shadow-xl overflow-hidden ${hoverClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

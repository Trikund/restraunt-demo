import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionHeading({ 
  title, 
  subtitle, 
  align = 'left',
  className = '' 
}: SectionHeadingProps) {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-10 ${alignStyles[align]} ${className}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-3"
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted text-lg max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

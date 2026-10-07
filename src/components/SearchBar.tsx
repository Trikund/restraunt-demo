import type { InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onSearch?: (value: string) => void;
}

export default function SearchBar({ className = '', onSearch, ...props }: SearchBarProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative group ${className}`}
    >
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted group-focus-within:text-aurora-cyan transition-colors" />
      </div>
      
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-3 glass bg-white/5 rounded-xl border border-glass-border focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/50 focus:outline-none transition-all placeholder-muted text-foreground"
        placeholder="Search for restaurants, cuisines, or dishes..."
        onChange={(e) => onSearch?.(e.target.value)}
        {...props}
      />
      
      {/* Subtle glow effect behind search when focused */}
      <div className="absolute inset-0 rounded-xl bg-aurora-cyan/0 group-focus-within:bg-aurora-cyan/5 -z-10 transition-colors duration-500 blur-xl"></div>
    </motion.div>
  );
}

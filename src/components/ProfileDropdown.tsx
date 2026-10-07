import { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, ChevronDown, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import IconButton from './IconButton';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="flex items-center cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconButton icon={<User size={20} />} variant="ghost" className="pointer-events-none" />
        <ChevronDown size={14} className={`text-muted transition-transform duration-300 ml-1 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-56 glass rounded-2xl shadow-2xl border-white/10 overflow-hidden z-50 origin-top-right"
          >
            <div className="p-4 border-b border-glass-border bg-white/5">
              <p className="text-sm font-bold text-foreground">John Doe</p>
              <p className="text-xs text-muted">john@example.com</p>
            </div>
            <div className="p-2">
              <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-white/10 transition-colors" onClick={() => setIsOpen(false)}>
                <User size={16} className="text-muted" /> My Profile
              </Link>
              <Link to="/wishlist" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-white/10 transition-colors" onClick={() => setIsOpen(false)}>
                <Heart size={16} className="text-aurora-purple" /> Wishlist
              </Link>
              <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-white/10 transition-colors" onClick={() => setIsOpen(false)}>
                <Settings size={16} className="text-muted" /> Settings
              </Link>
            </div>
            <div className="p-2 border-t border-glass-border">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-status-error hover:bg-status-error/10 transition-colors" onClick={() => setIsOpen(false)}>
                <LogOut size={16} /> Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

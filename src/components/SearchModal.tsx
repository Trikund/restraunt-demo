import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Utensils, ChefHat, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allDishes, restaurants } from '../data/mockData';
import GlassCard from './GlassCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleResultClick = (path: string) => {
    navigate(path);
    handleClose();
  };

  const filteredDishes = query.length > 1 
    ? allDishes.filter(d => d.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : [];
    
  const filteredRestaurants = query.length > 1
    ? restaurants.filter(r => r.name.toLowerCase().includes(query.toLowerCase()) || r.cuisine.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : [];

  const hasResults = query.length > 1 && (filteredDishes.length > 0 || filteredRestaurants.length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-20 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[600px] z-[101]"
          >
            <GlassCard className="p-2 border-aurora-cyan/30 shadow-[0_10px_50px_-10px_rgba(34,211,238,0.2)]">
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-aurora-cyan" size={24} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for restaurants, dishes, or cuisines..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-white text-lg py-5 pl-14 pr-12 focus:outline-none focus:ring-0 placeholder-slate-500"
                />
                <button 
                  onClick={handleClose}
                  className="absolute right-4 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {query.length > 1 && (
                <div className="border-t border-white/10 p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                  {!hasResults ? (
                    <div className="text-center py-8 text-slate-400">
                      <p>No results found for "{query}"</p>
                      <p className="text-sm mt-2">Try searching for "pizza", "burger", or "asian"</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredRestaurants.length > 0 && (
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-2 flex items-center gap-2">
                            <Utensils size={14} /> Restaurants
                          </h3>
                          <div className="space-y-2">
                            {filteredRestaurants.map(r => (
                              <button 
                                key={r.id}
                                onClick={() => handleResultClick(`/restaurant/${r.id}`)}
                                className="w-full flex items-center gap-4 p-2 rounded-xl hover:bg-white/5 transition-colors text-left group"
                              >
                                <img src={r.image} alt={r.name} className="w-12 h-12 rounded-lg object-cover" />
                                <div className="flex-1">
                                  <h4 className="font-bold text-white group-hover:text-aurora-cyan transition-colors">{r.name}</h4>
                                  <p className="text-xs text-slate-400">{r.cuisine}</p>
                                </div>
                                <div className="pr-2 text-slate-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                                  <ArrowRight size={16} />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {filteredDishes.length > 0 && (
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-2 flex items-center gap-2">
                            <ChefHat size={14} /> Dishes
                          </h3>
                          <div className="space-y-2">
                            {filteredDishes.map(d => (
                              <button 
                                key={d.id}
                                onClick={() => handleResultClick(`/food/${d.id}`)}
                                className="w-full flex items-center gap-4 p-2 rounded-xl hover:bg-white/5 transition-colors text-left group"
                              >
                                <img src={d.image} alt={d.name} className="w-12 h-12 rounded-lg object-cover" />
                                <div className="flex-1">
                                  <h4 className="font-bold text-white group-hover:text-aurora-cyan transition-colors">{d.name}</h4>
                                  <p className="text-xs text-slate-400">₹{d.price.toFixed(2)}</p>
                                </div>
                                <div className="pr-2 text-slate-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                                  <ArrowRight size={16} />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </GlassCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

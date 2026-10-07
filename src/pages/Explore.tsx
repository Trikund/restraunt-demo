import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Sparkles, Flame, Leaf, Cake, PartyPopper, 
  Heart, X, ShoppingBag, Shuffle, ChevronRight, ChefHat 
} from 'lucide-react';
import { allDishes, restaurants } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Rating from '../components/Rating';
import MenuItemCard from '../components/MenuItemCard';

const MOODS = [
  { id: 'hungry', label: 'Hungry', icon: ChefHat, color: 'from-orange-400 to-red-500' },
  { id: 'spicy', label: 'Spicy', icon: Flame, color: 'from-red-500 to-rose-600' },
  { id: 'healthy', label: 'Healthy', icon: Leaf, color: 'from-emerald-400 to-green-600' },
  { id: 'sweet', label: 'Sweet', icon: Cake, color: 'from-pink-400 to-purple-500' },
  { id: 'party', label: 'Party', icon: PartyPopper, color: 'from-indigo-400 to-aurora-purple' },
  { id: 'comfort', label: 'Comfort Food', icon: Heart, color: 'from-amber-400 to-orange-500' },
];

export default function Explore() {
  const [activeTab, setActiveTab] = useState<'explorer' | 'mood' | 'surprise'>('explorer');

  // EXPLORER STATE
  const [explorerStack] = useState(() => [...allDishes]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();
  const { toggleDish, isDishSaved } = useWishlist();

  // MOOD STATE
  const [activeMood, setActiveMood] = useState<string | null>(null);

  // SURPRISE STATE
  const [surpriseDish, setSurpriseDish] = useState<typeof allDishes[0] | null>(null);
  const [surpriseRest, setSurpriseRest] = useState<typeof restaurants[0] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSkip = () => {
    setCurrentIndex(prev => Math.min(prev + 1, explorerStack.length - 1));
  };

  const handleLike = () => {
    const currentDish = explorerStack[currentIndex];
    if (!isDishSaved(currentDish.id)) {
      toggleDish(currentDish.id);
    }
    setCurrentIndex(prev => Math.min(prev + 1, explorerStack.length - 1));
  };

  const handleAddToCart = () => {
    const currentDish = explorerStack[currentIndex];
    addToCart({
      id: `exp-${currentDish.id}`,
      foodId: currentDish.id,
      name: currentDish.name,
      restaurant: 'Local Restaurant', // Mock
      price: currentDish.price,
      image: currentDish.image,
      quantity: 1,
      customizations: {}
    });
    handleSkip();
  };

  const generateSurprise = () => {
    setIsSpinning(true);
    setSurpriseDish(null);
    setSurpriseRest(null);
    
    setTimeout(() => {
      const randomDish = allDishes[Math.floor(Math.random() * allDishes.length)];
      const randomRest = restaurants[Math.floor(Math.random() * restaurants.length)];
      setSurpriseDish(randomDish);
      setSurpriseRest(randomRest);
      setIsSpinning(false);
    }, 1000);
  };

  const moodDishes = useMemo(() => {
    if (!activeMood) return [];
    
    let filtered = [...allDishes];
    switch (activeMood) {
      case 'spicy':
        filtered = filtered.filter(d => d.name.toLowerCase().includes('spicy') || d.description.toLowerCase().includes('spicy'));
        break;
      case 'healthy':
        filtered = filtered.filter(d => d.vegetarian || d.name.toLowerCase().includes('salad') || d.name.toLowerCase().includes('bowl'));
        break;
      case 'sweet':
        filtered = filtered.filter(d => d.name.toLowerCase().includes('sweet') || d.name.toLowerCase().includes('pancake') || d.name.toLowerCase().includes('tiramisu'));
        break;
      case 'party':
        filtered = filtered.filter(d => d.name.toLowerCase().includes('pizza') || d.name.toLowerCase().includes('platter') || d.name.toLowerCase().includes('wings'));
        break;
      case 'comfort':
        filtered = filtered.filter(d => d.name.toLowerCase().includes('burger') || d.name.toLowerCase().includes('mac') || d.name.toLowerCase().includes('fried'));
        break;
      case 'hungry':
      default:
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
    }
    return filtered.length > 0 ? filtered.slice(0, 6) : allDishes.slice(0, 6);
  }, [activeMood]);

  return (
    <div className="pt-24 pb-32 container mx-auto px-4 lg:px-8 relative min-h-screen">
      <div className="fixed top-20 right-10 w-[500px] h-[500px] bg-aurora-cyan/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <SectionHeading 
        title={<span className="flex items-center gap-3"><Compass className="text-aurora-cyan" /> Discover</span>} 
        subtitle="Find your next favorite meal through our unique discovery experiences." 
      />

      <div className="flex gap-2 mb-8 bg-background/50 p-1.5 rounded-2xl border border-white/10 inline-flex overflow-x-auto hide-scrollbar max-w-full">
        {[
          { id: 'explorer', label: 'Food Explorer', icon: Compass },
          { id: 'mood', label: 'Food Mood', icon: Heart },
          { id: 'surprise', label: 'Surprise Me', icon: Sparkles }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-aurora-cyan text-background shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        
        {/* FOOD EXPLORER */}
        {activeTab === 'explorer' && (
          <motion.div
            key="explorer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center max-w-sm mx-auto"
          >
            <p className="text-slate-400 mb-6 text-center">Swipe through our curated dishes. Like what you see? Add it to cart instantly.</p>
            
            <div className="relative w-full aspect-[4/5] perspective-1000">
              {explorerStack.slice(currentIndex, currentIndex + 3).map((dish, idx) => {
                return (
                  <motion.div
                    key={dish.id + '-' + idx}
                    initial={false}
                    animate={{ 
                      scale: 1 - idx * 0.05, 
                      y: idx * 20, 
                      zIndex: 3 - idx,
                      opacity: 1 - idx * 0.2
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute inset-0"
                  >
                    <GlassCard className="w-full h-full p-0 overflow-hidden bg-background/60 backdrop-blur-xl border-white/10 flex flex-col shadow-2xl">
                      <div className="relative h-[60%] overflow-hidden">
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <Rating score={dish.rating} />
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{dish.name}</h3>
                          <p className="text-slate-400 text-sm line-clamp-2">{dish.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xl font-extrabold text-aurora-cyan">₹{dish.price.toFixed(2)}</span>
                          {dish.vegetarian && (
                            <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-bold uppercase border border-green-500/30">
                              Veg
                            </span>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
              {currentIndex >= explorerStack.length && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-md">
                  <Compass size={48} className="text-slate-500 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">You've seen it all!</h3>
                  <p className="text-slate-400 mb-6">Check back later for more delicious discoveries.</p>
                  <Button variant="primary" onClick={() => setCurrentIndex(0)}>Start Over</Button>
                </div>
              )}
            </div>

            {/* Controls */}
            {currentIndex < explorerStack.length && (
              <div className="flex items-center justify-center gap-6 mt-8">
                <button 
                  onClick={handleSkip}
                  className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors shadow-lg"
                >
                  <X size={24} />
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-aurora-cyan to-aurora-blue flex items-center justify-center text-background shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-105 transition-transform"
                >
                  <ShoppingBag size={28} />
                </button>
                <button 
                  onClick={handleLike}
                  className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-food-coral hover:bg-food-coral/10 hover:border-food-coral/30 transition-colors shadow-lg"
                >
                  <Heart size={24} fill={isDishSaved(explorerStack[currentIndex]?.id) ? "currentColor" : "none"} />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* FOOD MOOD */}
        {activeTab === 'mood' && (
          <motion.div
            key="mood"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {MOODS.map(mood => (
                <button
                  key={mood.id}
                  onClick={() => setActiveMood(mood.id)}
                  className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 group overflow-hidden relative ${
                    activeMood === mood.id 
                      ? 'border-aurora-cyan shadow-[0_0_30px_rgba(34,211,238,0.15)] bg-white/10' 
                      : 'border-white/10 bg-background/50 hover:bg-white/5'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${mood.color} opacity-0 group-hover:opacity-10 transition-opacity ${activeMood === mood.id ? '!opacity-20' : ''}`} />
                  <mood.icon size={32} className={activeMood === mood.id ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                  <span className={`font-bold text-sm ${activeMood === mood.id ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'}`}>
                    {mood.label}
                  </span>
                </button>
              ))}
            </div>

            {activeMood && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {moodDishes.map(dish => (
                  <MenuItemCard 
                    key={dish.id} 
                    item={dish} 
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* SURPRISE ME */}
        {activeTab === 'surprise' && (
          <motion.div
            key="surprise"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center min-h-[500px]"
          >
            {!surpriseDish && !isSpinning && (
              <div className="text-center max-w-md mx-auto">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-aurora-purple to-pink-500 p-[2px] mx-auto mb-8 shadow-[0_0_50px_rgba(168,85,247,0.4)]">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <Sparkles size={40} className="text-aurora-purple" />
                  </div>
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-4">Can't decide?</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">Let fate decide your next meal. We'll pick a highly-rated dish or restaurant just for you.</p>
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="px-10 py-6 text-lg rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.3)] bg-gradient-to-r from-aurora-cyan to-aurora-purple border-none"
                  onClick={generateSurprise}
                  leftIcon={<Shuffle size={24} />}
                >
                  Surprise Me
                </Button>
              </div>
            )}

            {isSpinning && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-4 border-aurora-cyan/30 border-t-aurora-cyan"
              />
            )}

            {surpriseDish && surpriseRest && !isSpinning && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl"
              >
                <h3 className="text-2xl font-bold text-center text-white mb-8">We think you'll love this!</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-aurora-cyan font-bold tracking-wider text-sm uppercase mb-4">Suggested Dish</h4>
                    <MenuItemCard item={surpriseDish} />
                  </div>
                  <div>
                    <h4 className="text-aurora-purple font-bold tracking-wider text-sm uppercase mb-4">Suggested Restaurant</h4>
                    <GlassCard className="p-0 overflow-hidden h-full flex flex-col">
                      <div className="h-48 relative">
                        <img src={surpriseRest.image} alt={surpriseRest.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <Rating score={surpriseRest.rating} />
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-2">{surpriseRest.name}</h3>
                        <p className="text-slate-400 mb-4">{surpriseRest.cuisine}</p>
                        <Button variant="ghost" className="mt-auto w-full bg-white/5 hover:bg-white/10" rightIcon={<ChevronRight size={16} />}>
                          View Menu
                        </Button>
                      </div>
                    </GlassCard>
                  </div>
                </div>
                <div className="mt-12 text-center">
                  <Button variant="ghost" onClick={generateSurprise} leftIcon={<Shuffle size={18} />}>
                    Spin Again
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

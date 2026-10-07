import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Minus, Plus, ShoppingBag, Info, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { allDishes, restaurants } from '../data/mockData';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Badge from '../components/Badge';
import LoadingState from '../components/LoadingState';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleDish, isDishSaved } = useWishlist();
  const { addToCart } = useCart();
  
  const [food, setFood] = useState<typeof allDishes[0] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, string>>({});

  const saved = food ? isDishSaved(food.id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
    const dishId = Number(id);
    if (!id || isNaN(dishId)) {
      setNotFound(true);
      return;
    }
    const found = allDishes.find(d => d.id === dishId);
    if (found) {
      setFood(found as any);
      
      // Initialize default customizations
      const defaults: Record<string, string> = {};
      found.customizations?.forEach(cust => {
        if (cust.options.length > 0) {
          defaults[cust.name] = cust.options[0].name;
        }
      });
      setSelectedCustomizations(defaults);
    } else {
      setNotFound(true);
    }
  }, [id]);

  if (notFound) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-extrabold text-white mb-3">Dish Not Found</h1>
        <p className="text-slate-400 mb-8 max-w-md">The dish you're looking for doesn't exist or may have been removed from the menu.</p>
        <div className="flex gap-4">
          <Button variant="glass" onClick={() => navigate(-1)}>Go Back</Button>
          <Button variant="primary" onClick={() => navigate('/explore')}>Explore Dishes</Button>
        </div>
      </div>
    );
  }

  if (!food) {
    return <LoadingState fullScreen message="Loading dish details..." />;
  }

  // Calculate final price based on base price + customizations * quantity
  const calculateTotal = () => {
    let extraCost = 0;
    
    Object.entries(selectedCustomizations).forEach(([custName, optName]) => {
      const customization = food.customizations?.find(c => c.name === custName);
      if (customization) {
        const option = customization.options.find(o => o.name === optName);
        if (option) {
          extraCost += option.extraPrice;
        }
      }
    });

    return (food.price + extraCost) * quantity;
  };

  const handleCustomizationChange = (custName: string, optName: string) => {
    setSelectedCustomizations(prev => ({
      ...prev,
      [custName]: optName
    }));
  };

  return (
    <div className="pt-24 pb-32 container mx-auto px-4 lg:px-8 relative min-h-screen">
      {/* Background Orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-aurora-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-aurora-purple/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 font-medium cursor-pointer"
      >
        <ArrowLeft size={18} /> Back to menu
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        
        {/* LEFT: IMAGE & TAGS */}
        <div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-square md:aspect-video lg:aspect-square rounded-[3rem] overflow-hidden bg-background/50 border border-white/10 shadow-2xl image-zoom-container"
          >
            <img 
              src={food.image} 
              alt={food.name} 
              className="w-full h-full object-cover image-zoom"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop';
              }}
            />
            
            <div className="absolute top-6 left-6 flex flex-col gap-3 z-10">
              {food.vegetarian ? (
                <Badge variant="success" className="shadow-lg backdrop-blur-md bg-status-success/20">Vegetarian</Badge>
              ) : (
                <Badge variant="food" className="shadow-lg backdrop-blur-md bg-food-coral/20">Non-Vegetarian</Badge>
              )}
            </div>

            <button 
              className={`absolute top-6 right-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                saved 
                  ? 'bg-food-coral text-white border border-food-coral shadow-[0_0_20px_rgba(244,63,94,0.4)]' 
                  : 'bg-background/50 backdrop-blur-md border border-white/20 text-white hover:text-food-coral hover:bg-white/20'
              }`}
              onClick={() => toggleDish(food.id)}
            >
              <Heart size={22} fill={saved ? 'currentColor' : 'none'} className={saved ? 'scale-110' : ''} />
            </button>
          </motion.div>
        </div>

        {/* RIGHT: DETAILS & ACTIONS */}
        <div className="flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3 text-food-amber">
              <Star size={20} fill="currentColor" />
              <span className="font-bold text-lg text-white">{food.rating}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              {food.name}
            </h1>
            
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              {food.description}
            </p>

            {/* Ingredients & Allergens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {food.ingredients && food.ingredients.length > 0 && (
                <GlassCard className="p-4 bg-background/40">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-2">
                    <Info size={16} className="text-aurora-cyan" /> Ingredients
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {food.ingredients.join(', ')}
                  </p>
                </GlassCard>
              )}
              
              {food.allergens && food.allergens.length > 0 && (
                <GlassCard className="p-4 bg-status-error/5 border-status-error/20">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-2">
                    <AlertTriangle size={16} className="text-status-error" /> Allergens
                  </h3>
                  <p className="text-sm text-slate-400">
                    Contains: <span className="font-medium text-status-error">{food.allergens.join(', ')}</span>
                  </p>
                </GlassCard>
              )}
            </div>

            {/* Customizations */}
            {food.customizations && food.customizations.length > 0 && (
              <div className="space-y-6 mb-10">
                {food.customizations.map(cust => (
                  <div key={cust.name} className="border-t border-glass-border pt-6">
                    <div className="flex justify-between items-end mb-4">
                      <h3 className="text-lg font-bold text-white">{cust.name}</h3>
                      <span className="text-xs font-semibold px-2 py-1 bg-white/5 rounded text-slate-400 uppercase tracking-wider">Required</span>
                    </div>
                    
                    <div className="space-y-3">
                      {cust.options.map(opt => {
                        const isSelected = selectedCustomizations[cust.name] === opt.name;
                        return (
                          <label 
                            key={opt.name} 
                            onClick={() => handleCustomizationChange(cust.name, opt.name)}
                            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                              isSelected 
                                ? 'bg-aurora-cyan/10 border-aurora-cyan text-white shadow-[0_0_15px_rgba(34,211,238,0.15)]' 
                                : 'bg-background/50 border-white/5 text-slate-300 hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-aurora-cyan' : 'border-muted'}`}>
                                {isSelected && <div className="w-2.5 h-2.5 bg-aurora-cyan rounded-full" />}
                              </div>
                              <span className="font-medium">{opt.name}</span>
                            </div>
                            {opt.extraPrice > 0 && (
                              <span className="text-sm font-medium text-slate-400">
                                +${opt.extraPrice.toFixed(2)}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
          </motion.div>
        </div>
      </div>

      {/* FIXED BOTTOM ACTION BAR */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pb-8 pointer-events-none"
      >
        <div className="container mx-auto max-w-4xl">
          <GlassCard className="p-4 md:p-6 bg-background/80 backdrop-blur-3xl border-t-white/20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto rounded-3xl">
            
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10 shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-bold text-lg text-white">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              
              <div className="flex flex-col flex-1 md:hidden">
                <span className="text-xs text-slate-400">Total Price</span>
                <span className="text-2xl font-bold text-aurora-cyan">
                  ₹{calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm text-slate-400 font-medium">Total Price</span>
                <span className="text-3xl font-extrabold text-aurora-cyan drop-shadow-md">
                  ₹{calculateTotal().toFixed(2)}
                </span>
              </div>
              
              <Button 
                variant="primary" 
                size="lg" 
                className="flex-1 md:flex-none px-8 py-4 text-lg font-bold shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                leftIcon={<ShoppingBag size={20} />}
                onClick={() => {
                  addToCart({
                    id: `${food.id}-${JSON.stringify(selectedCustomizations)}`,
                    foodId: food.id,
                    name: food.name,
                    restaurant: restaurants.find(r => r.menu.some(m => m.id === food.id))?.name || 'Unknown Restaurant',
                    price: food.price,
                    image: food.image,
                    quantity: quantity,
                    customizations: Object.entries(selectedCustomizations).reduce((acc, [key, val]) => {
                      const cust = food.customizations?.find(c => c.name === key);
                      const opt = cust?.options.find(o => o.name === val);
                      acc[key] = { option: val, extraPrice: opt?.extraPrice || 0 };
                      return acc;
                    }, {} as Record<string, { option: string, extraPrice: number }>)
                  });
                }}
              >
                Add to Cart
              </Button>
            </div>
            
          </GlassCard>
        </div>
      </motion.div>
    </div>
  );
}

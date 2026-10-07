import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Star, Heart, Clock, ChefHat, 
  Users, Flame, PlayCircle, ShoppingBag, CheckCircle2,
  Plus, ShoppingCart, Play, X, ChevronRight, ChevronLeft
} from 'lucide-react';
import { recipes } from '../data/mockData';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Badge from '../components/Badge';
import LoadingState from '../components/LoadingState';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function RecipeDetails() {
  const { id } = useParams();
  const { toggleRecipe, isRecipeSaved } = useWishlist();
  
  const [recipe, setRecipe] = useState<typeof recipes[0] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'nutrition'>('ingredients');
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isCookingMode, setIsCookingMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    const recipeId = Number(id);
    if (!id || isNaN(recipeId)) {
      setNotFound(true);
      return;
    }
    const found = recipes.find(r => r.id === recipeId);
    if (found) {
      setRecipe(found as any);
      // Select all ingredients by default
      if (found.ingredients) {
        setSelectedIngredients(new Set(found.ingredients));
      }
    } else {
      setNotFound(true);
    }
  }, [id]);

  if (notFound) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-extrabold text-white mb-3">Recipe Not Found</h1>
        <p className="text-slate-400 mb-8 max-w-md">The recipe you're looking for doesn't exist or is no longer available.</p>
        <Link to="/recipes">
          <Button variant="primary">Browse Recipes</Button>
        </Link>
      </div>
    );
  }

  if (!recipe) {
    return <LoadingState fullScreen message="Loading recipe details..." />;
  }

  const saved = isRecipeSaved(recipe.id);

  const toggleIngredient = (ing: string) => {
    setSelectedIngredients(prev => {
      const next = new Set(prev);
      if (next.has(ing)) {
        next.delete(ing);
      } else {
        next.add(ing);
      }
      return next;
    });
  };

  const addIngredientToCart = (ingredientName: string) => {
    addToCart({
      id: `ing-${recipe.id}-${ingredientName.replace(/\s+/g, '-')}`,
      foodId: -1, // Use -1 to indicate an ingredient
      name: ingredientName,
      restaurant: 'Pantry Store', // Generic store for ingredients
      price: 2.50, // Mock fixed price per ingredient
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop',
      quantity: 1,
      customizations: {}
    });
  };

  const addAllSelectedToCart = () => {
    selectedIngredients.forEach(ing => {
      addIngredientToCart(ing);
    });
  };

  return (
    <div className="pt-24 pb-32 container mx-auto px-4 lg:px-8 relative min-h-screen">
      {/* Background Orbs */}
      <div className="fixed top-20 right-10 w-96 h-96 bg-aurora-purple/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-10 w-[500px] h-[500px] bg-aurora-cyan/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <Link to="/recipes" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 font-medium">
        <ArrowLeft size={18} /> Back to recipes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: HERO IMAGE & VIDEO CTA */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden bg-background/50 border border-white/10 shadow-2xl group"
          >
            <img 
              src={recipe.image} 
              alt={recipe.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            
            <div className="absolute top-6 left-6 flex flex-col gap-3 z-10">
              <Badge variant="aurora" className="shadow-lg backdrop-blur-md">{recipe.cuisine}</Badge>
              {recipe.vegetarian && <Badge variant="success">Vegetarian</Badge>}
              {recipe.highProtein && <Badge variant="food">High Protein</Badge>}
            </div>

            <button 
              className={`absolute top-6 right-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                saved 
                  ? 'bg-food-coral text-white border border-food-coral shadow-[0_0_20px_rgba(244,63,94,0.4)]' 
                  : 'bg-background/50 backdrop-blur-md border border-white/20 text-white hover:text-food-coral hover:bg-white/20'
              }`}
              onClick={() => toggleRecipe(recipe.id)}
            >
              <Heart size={22} fill={saved ? 'currentColor' : 'none'} className={saved ? 'scale-110' : ''} />
            </button>

            {recipe.video && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div 
                  className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer pointer-events-auto hover:bg-aurora-cyan hover:border-aurora-cyan transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                  onClick={() => setIsVideoOpen(true)}
                >
                  <PlayCircle size={32} />
                </div>
              </div>
            )}
          </motion.div>

          <GlassCard className="p-6 bg-gradient-to-br from-aurora-cyan/10 to-aurora-purple/10 border-aurora-cyan/20">
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <ShoppingBag size={18} className="text-aurora-cyan" /> Complete Recipe Kit
            </h3>
            <p className="text-sm text-slate-300 mb-4">Get every ingredient delivered fresh to your door in exactly the right portions.</p>
            <Button 
              variant="primary" 
              fullWidth 
              className="shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              onClick={() => {
                recipe.ingredients?.forEach(ing => addIngredientToCart(ing));
              }}
            >
              Add Full Kit to Cart
            </Button>
          </GlassCard>
        </div>

        {/* RIGHT COLUMN: DETAILS */}
        <div className="lg:col-span-7 flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4 text-food-amber">
              <Star size={20} fill="currentColor" />
              <span className="font-bold text-lg text-white">{recipe.rating}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-8 leading-tight">
              {recipe.name}
            </h1>
            
            {/* Meta stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <GlassCard className="p-4 bg-white/5 border-white/5 text-center">
                <Clock size={24} className="text-aurora-cyan mx-auto mb-2" />
                <p className="text-xs text-slate-400 mb-1">Time</p>
                <p className="font-bold text-white">{recipe.time}</p>
              </GlassCard>
              <GlassCard className="p-4 bg-white/5 border-white/5 text-center">
                <ChefHat size={24} className="text-aurora-purple mx-auto mb-2" />
                <p className="text-xs text-slate-400 mb-1">Difficulty</p>
                <p className="font-bold text-white">{recipe.difficulty}</p>
              </GlassCard>
              <GlassCard className="p-4 bg-white/5 border-white/5 text-center">
                <Users size={24} className="text-food-amber mx-auto mb-2" />
                <p className="text-xs text-slate-400 mb-1">Servings</p>
                <p className="font-bold text-white">{recipe.servings} people</p>
              </GlassCard>
              <GlassCard className="p-4 bg-white/5 border-white/5 text-center">
                <Flame size={24} className="text-food-coral mx-auto mb-2" />
                <p className="text-xs text-slate-400 mb-1">Calories</p>
                <p className="font-bold text-white">{recipe.nutrition?.calories || '---'} kcal</p>
              </GlassCard>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 mb-8">
              {(['ingredients', 'instructions', 'nutrition'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-semibold text-sm capitalize relative transition-colors ${
                    activeTab === tab ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="recipe-tab-indicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-aurora-cyan"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'ingredients' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold text-white">What you'll need</h3>
                    <Button 
                      variant="primary"
                      size="sm"
                      onClick={addAllSelectedToCart}
                      disabled={selectedIngredients.size === 0}
                      leftIcon={<ShoppingCart size={16} />}
                      className="shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    >
                      Add Selected ({selectedIngredients.size})
                    </Button>
                  </div>
                  
                  <ul className="space-y-3">
                    {recipe.ingredients?.map((ing, idx) => {
                      const isSelected = selectedIngredients.has(ing);
                      return (
                        <li 
                          key={idx} 
                          className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-aurora-cyan/5 border-aurora-cyan/30 text-white shadow-[0_0_15px_rgba(34,211,238,0.05)]' 
                              : 'bg-background/50 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-300'
                          }`}
                          onClick={() => toggleIngredient(ing)}
                        >
                          <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 border transition-colors ${
                            isSelected ? 'bg-aurora-cyan border-aurora-cyan text-background' : 'border-slate-600'
                          }`}>
                            {isSelected && <CheckCircle2 size={16} />}
                          </div>
                          <span className="flex-1">{ing}</span>
                          <button 
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              addIngredientToCart(ing);
                            }}
                          >
                            <Plus size={16} />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}

              {activeTab === 'instructions' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-xl font-bold text-white">Step-by-step Guide</h3>
                    <Button 
                      variant="glass" 
                      onClick={() => setIsCookingMode(true)}
                      leftIcon={<Play size={16} fill="currentColor" />}
                      className="border-aurora-purple/50 text-aurora-purple hover:bg-aurora-purple/10 hover:border-aurora-purple"
                    >
                      Start Cooking Mode
                    </Button>
                  </div>
                  
                  {recipe.instructions?.map((step, idx) => (
                    <div key={idx} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-aurora-purple/20 text-aurora-purple font-bold flex items-center justify-center shrink-0 border border-aurora-purple/30">
                          {idx + 1}
                        </div>
                        {idx !== recipe.instructions!.length - 1 && (
                          <div className="w-px h-full bg-white/10 my-2" />
                        )}
                      </div>
                      <div className="pt-2 pb-6">
                        <p className="text-slate-300 leading-relaxed text-lg">{step}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'nutrition' && recipe.nutrition && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-xl font-bold text-white mb-6">Nutritional Information</h3>
                  <p className="text-slate-400 mb-6 text-sm">Amount per serving</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <GlassCard className="p-6 flex items-center justify-between border-white/5 bg-background/50">
                      <span className="text-slate-300 font-medium">Calories</span>
                      <span className="text-xl font-bold text-white">{recipe.nutrition.calories} kcal</span>
                    </GlassCard>
                    <GlassCard className="p-6 flex items-center justify-between border-white/5 bg-background/50">
                      <span className="text-slate-300 font-medium">Protein</span>
                      <span className="text-xl font-bold text-white">{recipe.nutrition.protein}g</span>
                    </GlassCard>
                    <GlassCard className="p-6 flex items-center justify-between border-white/5 bg-background/50">
                      <span className="text-slate-300 font-medium">Carbohydrates</span>
                      <span className="text-xl font-bold text-white">{recipe.nutrition.carbs}g</span>
                    </GlassCard>
                    <GlassCard className="p-6 flex items-center justify-between border-white/5 bg-background/50">
                      <span className="text-slate-300 font-medium">Fat</span>
                      <span className="text-xl font-bold text-white">{recipe.nutrition.fat}g</span>
                    </GlassCard>
                  </div>
                </motion.div>
              )}
            </div>
            
          </motion.div>
        </div>
      </div>
      
      {/* VIDEO PLAYER MODAL */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-background/90 backdrop-blur-xl"
          >
            <div className="absolute inset-0 cursor-pointer" onClick={() => setIsVideoOpen(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden bg-black shadow-[0_0_50px_rgba(34,211,238,0.2)] border border-white/10 z-10"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>
              
              {/* Simulated Video Player */}
              <div className="w-full h-full relative group">
                <img src={recipe.image} alt="Video thumbnail" className="w-full h-full object-cover brightness-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-aurora-cyan animate-pulse">
                    <PlayCircle size={80} />
                  </div>
                </div>
                {/* Fake Controls */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={20} fill="white" className="text-white cursor-pointer" />
                  <div className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer relative">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-aurora-cyan rounded-full" />
                  </div>
                  <span className="text-white text-xs">01:23 / 04:56</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COOKING MODE OVERLAY */}
      <AnimatePresence>
        {isCookingMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">{recipe.name}</h2>
                <p className="text-sm text-aurora-purple font-medium">Step {currentStep + 1} of {recipe.instructions?.length}</p>
              </div>
              <button 
                onClick={() => {
                  setIsCookingMode(false);
                  setCurrentStep(0);
                }}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                <motion.div 
                  className="h-full bg-aurora-purple"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / (recipe.instructions?.length || 1)) * 100}%` }}
                />
              </div>

              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl text-center"
              >
                <div className="w-20 h-20 rounded-full bg-aurora-purple/10 text-aurora-purple text-2xl font-bold flex items-center justify-center mx-auto mb-8 border border-aurora-purple/30">
                  {currentStep + 1}
                </div>
                <p className="text-2xl sm:text-4xl text-white leading-relaxed font-medium">
                  {recipe.instructions?.[currentStep]}
                </p>
              </motion.div>
            </div>

            <div className="p-6 border-t border-white/10 flex justify-between items-center bg-black/20">
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                leftIcon={<ChevronLeft size={20} />}
                className={currentStep === 0 ? 'opacity-0' : ''}
              >
                Previous
              </Button>
              
              {currentStep === (recipe.instructions?.length || 1) - 1 ? (
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => setIsCookingMode(false)}
                  rightIcon={<CheckCircle2 size={20} />}
                  className="shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                >
                  Finish Recipe
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => setCurrentStep(prev => Math.min((recipe.instructions?.length || 1) - 1, prev + 1))}
                  rightIcon={<ChevronRight size={20} />}
                >
                  Next Step
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

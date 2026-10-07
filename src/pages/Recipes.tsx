import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChefHat, Filter, X } from 'lucide-react';
import { recipes } from '../data/mockData';
import SectionHeading from '../components/SectionHeading';
import RecipeCard from '../components/RecipeCard';
import Input from '../components/Input';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';

const CUISINES = ['All', 'British', 'Italian', 'Japanese Fusion', 'Global'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

export default function Recipes() {
  const [search, setSearch] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isHealthy, setIsHealthy] = useState(false);
  const [isHighProtein, setIsHighProtein] = useState(false);
  const [isDessert, setIsDessert] = useState(false);
  const [maxTime, setMaxTime] = useState(120);
  const [showFilters, setShowFilters] = useState(false);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      if (search && !recipe.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCuisine !== 'All' && recipe.cuisine !== selectedCuisine) return false;
      if (selectedDifficulty !== 'All' && recipe.difficulty !== selectedDifficulty) return false;
      if (isVegetarian && !recipe.vegetarian) return false;
      if (isHealthy && !recipe.healthy) return false;
      if (isHighProtein && !recipe.highProtein) return false;
      if (isDessert && !recipe.dessert) return false;
      if (recipe.timeValue && recipe.timeValue > maxTime) return false;
      return true;
    });
  }, [search, selectedCuisine, selectedDifficulty, isVegetarian, isHealthy, isHighProtein, isDessert, maxTime]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCuisine('All');
    setSelectedDifficulty('All');
    setIsVegetarian(false);
    setIsHealthy(false);
    setIsHighProtein(false);
    setIsDessert(false);
    setMaxTime(120);
  };

  return (
    <div className="pt-24 pb-32 container mx-auto px-4 lg:px-8 relative min-h-screen">
      <div className="fixed top-20 left-10 w-96 h-96 bg-aurora-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-aurora-purple/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <SectionHeading 
        title={<span className="flex items-center gap-3"><ChefHat className="text-aurora-purple" /> Discover Recipes</span>} 
        subtitle="Cook premium restaurant-quality meals at home." 
      />

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* DESKTOP FILTERS */}
        <div className="hidden lg:block w-72 shrink-0">
          <GlassCard className="p-6 sticky top-28 bg-background/60 border-white/5 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Filter size={18} /> Filters
              </h3>
              <button onClick={clearFilters} className="text-xs text-aurora-cyan hover:text-white transition-colors">
                Clear all
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Max Cooking Time */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Max Cooking Time</h4>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Any</span>
                  <span>{maxTime} mins</span>
                </div>
                <input 
                  type="range" 
                  min="15" 
                  max="120" 
                  step="15" 
                  value={maxTime} 
                  onChange={(e) => setMaxTime(Number(e.target.value))}
                  className="w-full accent-aurora-cyan h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" 
                />
              </div>

              {/* Cuisine */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Cuisine</h4>
                <div className="flex flex-wrap gap-2">
                  {CUISINES.map(cuisine => (
                    <button
                      key={cuisine}
                      onClick={() => setSelectedCuisine(cuisine)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedCuisine === cuisine ? 'bg-aurora-purple text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Difficulty</h4>
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map(diff => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedDifficulty === diff ? 'bg-aurora-cyan text-background' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Dietary & Preferences</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isVegetarian ? 'bg-status-success border-status-success' : 'border-white/20 group-hover:border-white/40'}`}>
                      {isVegetarian && <div className="w-2.5 h-2.5 bg-background rounded-sm" />}
                    </div>
                    <span className="text-sm text-slate-300">Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isHealthy ? 'bg-aurora-cyan border-aurora-cyan' : 'border-white/20 group-hover:border-white/40'}`}>
                      {isHealthy && <div className="w-2.5 h-2.5 bg-background rounded-sm" />}
                    </div>
                    <span className="text-sm text-slate-300">Healthy Options</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isHighProtein ? 'bg-food-amber border-food-amber' : 'border-white/20 group-hover:border-white/40'}`}>
                      {isHighProtein && <div className="w-2.5 h-2.5 bg-background rounded-sm" />}
                    </div>
                    <span className="text-sm text-slate-300">High Protein</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isDessert ? 'bg-aurora-purple border-aurora-purple' : 'border-white/20 group-hover:border-white/40'}`}>
                      {isDessert && <div className="w-2.5 h-2.5 bg-background rounded-sm" />}
                    </div>
                    <span className="text-sm text-slate-300">Desserts</span>
                  </label>
                </div>
              </div>

            </div>
          </GlassCard>
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <div className="flex gap-4 mb-8">
            <div className="flex-1">
              <Input 
                placeholder="Search recipes, ingredients..." 
                leftIcon={<Search size={18} />} 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 bg-background/50 backdrop-blur-md border-white/10"
              />
            </div>
            <Button 
              variant="glass" 
              className="lg:hidden h-12 w-12 p-0 flex items-center justify-center bg-background/50 backdrop-blur-md border-white/10"
              onClick={() => setShowFilters(true)}
            >
              <Filter size={18} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map(recipe => (
                  <motion.div
                    key={recipe.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RecipeCard recipe={recipe} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-muted">
                    <ChefHat size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No recipes found</h3>
                  <p className="text-slate-400 mb-6">Try adjusting your filters or search query.</p>
                  <Button variant="primary" onClick={clearFilters}>Clear All Filters</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* MOBILE FILTERS DRAWER */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 w-full h-[85vh] bg-background border-t border-white/10 rounded-t-3xl z-[101] flex flex-col lg:hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-300">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-8">
                {/* Re-use exact same filter blocks as desktop for simplicity */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-3">Max Cooking Time</h4>
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Any</span>
                    <span>{maxTime} mins</span>
                  </div>
                  <input 
                    type="range" 
                    min="15" 
                    max="120" 
                    step="15" 
                    value={maxTime} 
                    onChange={(e) => setMaxTime(Number(e.target.value))}
                    className="w-full accent-aurora-cyan h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" 
                  />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-3">Cuisine</h4>
                  <div className="flex flex-wrap gap-2">
                    {CUISINES.map(cuisine => (
                      <button
                        key={cuisine}
                        onClick={() => setSelectedCuisine(cuisine)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedCuisine === cuisine ? 'bg-aurora-purple text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {cuisine}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-3">Difficulty</h4>
                  <div className="flex flex-wrap gap-2">
                    {DIFFICULTIES.map(diff => (
                      <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(diff)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedDifficulty === diff ? 'bg-aurora-cyan text-background' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-3">Dietary & Preferences</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isVegetarian ? 'bg-status-success border-status-success' : 'border-white/20'}`}>
                        {isVegetarian && <div className="w-2.5 h-2.5 bg-background rounded-sm" />}
                      </div>
                      <span className="text-sm text-slate-300">Vegetarian</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isHealthy ? 'bg-aurora-cyan border-aurora-cyan' : 'border-white/20'}`}>
                        {isHealthy && <div className="w-2.5 h-2.5 bg-background rounded-sm" />}
                      </div>
                      <span className="text-sm text-slate-300">Healthy Options</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isHighProtein ? 'bg-food-amber border-food-amber' : 'border-white/20'}`}>
                        {isHighProtein && <div className="w-2.5 h-2.5 bg-background rounded-sm" />}
                      </div>
                      <span className="text-sm text-slate-300">High Protein</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isDessert ? 'bg-aurora-purple border-aurora-purple' : 'border-white/20'}`}>
                        {isDessert && <div className="w-2.5 h-2.5 bg-background rounded-sm" />}
                      </div>
                      <span className="text-sm text-slate-300">Desserts</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-white/10 flex gap-4">
                <Button variant="ghost" className="flex-1" onClick={clearFilters}>Clear</Button>
                <Button variant="primary" className="flex-1" onClick={() => setShowFilters(false)}>Show Results</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

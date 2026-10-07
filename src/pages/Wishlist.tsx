import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, UtensilsCrossed, ChefHat, Store } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { restaurants, allDishes, recipes } from '../data/mockData';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import RestaurantCard from '../components/RestaurantCard';
import MenuItemCard from '../components/MenuItemCard';
import RecipeCard from '../components/RecipeCard';
import GlassCard from '../components/GlassCard';

type Tab = 'restaurants' | 'dishes' | 'recipes';

export default function Wishlist() {
  const { savedRestaurants, savedDishes, savedRecipes } = useWishlist();
  const [activeTab, setActiveTab] = useState<Tab>('restaurants');

  // Resolve mock data based on saved IDs
  const favoriteRestaurants = useMemo(() => 
    restaurants.filter(r => savedRestaurants.includes(r.id)),
  [savedRestaurants]);

  const favoriteDishes = useMemo(() => 
    allDishes.filter(d => savedDishes.includes(d.id)),
  [savedDishes]);

  const favoriteRecipes = useMemo(() => 
    recipes.filter(r => savedRecipes.includes(r.id)),
  [savedRecipes]);

  const TABS = [
    { id: 'restaurants' as Tab, label: 'Restaurants', icon: Store, count: savedRestaurants.length },
    { id: 'dishes' as Tab, label: 'Dishes', icon: UtensilsCrossed, count: savedDishes.length },
    { id: 'recipes' as Tab, label: 'Recipes', icon: ChefHat, count: savedRecipes.length },
  ];

  return (
    <div className="pt-24 pb-32 container mx-auto px-4 lg:px-8 relative min-h-screen">
      {/* Background Orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-aurora-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-aurora-purple/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <SectionHeading 
        title={
          <span className="flex items-center gap-3">
            <Heart className="text-food-coral" fill="currentColor" /> My Wishlist
          </span>
        } 
        subtitle="Your curated collection of culinary favorites." 
      />

      {/* TABS */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-10 pb-2">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap font-semibold transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-aurora-cyan text-background shadow-[0_0_20px_rgba(34,211,238,0.3)]' 
                : 'glass text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.id ? 'bg-background/20' : 'bg-white/10'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* RESTAURANTS TAB */}
          {activeTab === 'restaurants' && (
            favoriteRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {favoriteRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={<Store size={48} />} 
                title="No saved restaurants" 
                message="You haven't added any restaurants to your wishlist yet." 
                actionLabel="Explore Restaurants"
                actionTo="/restaurants"
              />
            )
          )}

          {/* DISHES TAB */}
          {activeTab === 'dishes' && (
            favoriteDishes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {favoriteDishes.map(dish => (
                  <MenuItemCard key={dish.id} item={dish as any} />
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={<UtensilsCrossed size={48} />} 
                title="No saved dishes" 
                message="You haven't saved any dishes yet. Start exploring menus!" 
                actionLabel="Explore Restaurants"
                actionTo="/restaurants"
              />
            )
          )}

          {/* RECIPES TAB */}
          {activeTab === 'recipes' && (
            favoriteRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {favoriteRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={<ChefHat size={48} />} 
                title="No saved recipes" 
                message="Ready to cook? Find your favorite recipes and save them here." 
                actionLabel="Discover Recipes"
                actionTo="/"
              />
            )
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}

// Empty State Component
function EmptyState({ icon, title, message, actionLabel, actionTo }: { icon: React.ReactNode, title: string, message: string, actionLabel: string, actionTo: string }) {
  return (
    <GlassCard className="p-12 flex flex-col items-center justify-center text-center bg-background/40 max-w-2xl mx-auto border-white/5">
      <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-muted mb-6 shadow-inner">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 mb-8 max-w-md">{message}</p>
      <Button 
        variant="primary" 
        onClick={() => { window.location.href = actionTo; }} // Simple routing for mock action
      >
        {actionLabel}
      </Button>
    </GlassCard>
  );
}

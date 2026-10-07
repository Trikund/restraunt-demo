import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type WishlistContextType = {
  savedRestaurants: number[];
  savedDishes: number[];
  savedRecipes: number[];
  toggleRestaurant: (id: number) => void;
  toggleDish: (id: number) => void;
  toggleRecipe: (id: number) => void;
  isRestaurantSaved: (id: number) => boolean;
  isDishSaved: (id: number) => boolean;
  isRecipeSaved: (id: number) => boolean;
  totalSaved: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [savedRestaurants, setSavedRestaurants] = useState<number[]>(() => {
    const saved = localStorage.getItem('aurora_wishlist_restaurants');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [savedDishes, setSavedDishes] = useState<number[]>(() => {
    const saved = localStorage.getItem('aurora_wishlist_dishes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [savedRecipes, setSavedRecipes] = useState<number[]>(() => {
    const saved = localStorage.getItem('aurora_wishlist_recipes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('aurora_wishlist_restaurants', JSON.stringify(savedRestaurants));
  }, [savedRestaurants]);

  useEffect(() => {
    localStorage.setItem('aurora_wishlist_dishes', JSON.stringify(savedDishes));
  }, [savedDishes]);

  useEffect(() => {
    localStorage.setItem('aurora_wishlist_recipes', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const toggleRestaurant = (id: number) => {
    setSavedRestaurants(prev => 
      prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]
    );
  };

  const toggleDish = (id: number) => {
    setSavedDishes(prev => 
      prev.includes(id) ? prev.filter(dId => dId !== id) : [...prev, id]
    );
  };

  const toggleRecipe = (id: number) => {
    setSavedRecipes(prev => 
      prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]
    );
  };

  const isRestaurantSaved = (id: number) => savedRestaurants.includes(id);
  const isDishSaved = (id: number) => savedDishes.includes(id);
  const isRecipeSaved = (id: number) => savedRecipes.includes(id);
  
  const totalSaved = savedRestaurants.length + savedDishes.length + savedRecipes.length;

  return (
    <WishlistContext.Provider value={{
      savedRestaurants, savedDishes, savedRecipes,
      toggleRestaurant, toggleDish, toggleRecipe,
      isRestaurantSaved, isDishSaved, isRecipeSaved,
      totalSaved
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

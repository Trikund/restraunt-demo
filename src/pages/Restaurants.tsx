import React, { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, MapPin, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { restaurants, type Restaurant } from '../data/mockData';

const CUISINES = ['All', 'Italian', 'Japanese', 'Indian', 'Healthy', 'Pizza', 'Chinese'];
const RATINGS = [0, 4.0, 4.5, 4.8];

import { useSearchParams } from 'react-router-dom';

export default function Restaurants() {
  const [searchParams] = useSearchParams();
  const initialCuisine = searchParams.get('cuisine') || 'All';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine);
  const [minRating, setMinRating] = useState(0);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [hasOffers, setHasOffers] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [currentLocation, setCurrentLocation] = useState('Current Location');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedCity, setDetectedCity] = useState('');
  const [localizedRestaurants, setLocalizedRestaurants] = useState<Restaurant[]>(restaurants);

  const handleDetectLocation = () => {
    setIsDetecting(true);
    if (!navigator.geolocation) {
      setCurrentLocation('Location access denied');
      setIsDetecting(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.state_district || 'Your Location';
          setCurrentLocation(city);
          setDetectedCity(city);
          
          // Dynamically adapt mock restaurants to the user's real city to simulate local backend
          const adapted: Restaurant[] = restaurants.map((restaurant) => {
            const randomDistance = (Math.random() * 3.5 + 0.5).toFixed(1);
            return {
              ...restaurant,
              // Update name to reflect city automatically!
              name: `${restaurant.name} ${city}`,
              city: city,
              distanceKm: parseFloat(randomDistance),
              location: `${restaurant.location.split(',')[0]}, ${city}`
            };
          });
          setLocalizedRestaurants(adapted);
          
        } catch {
          setCurrentLocation('Network Error');
        }
        setIsDetecting(false);
      },
      (error) => {
        console.error(error);
        setCurrentLocation('Location Denied');
        setIsDetecting(false);
      }
    );
  };

  // Automatically detect location when page loads!
  React.useEffect(() => {
    // Only detect if it's the initial state
    if (currentLocation === 'Current Location' && !isDetecting) {
      handleDetectLocation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRestaurants = useMemo(() => {
    let result = localizedRestaurants.filter(restaurant => {
      // 3km Radius Location Filter Integration
      if (detectedCity) {
        if (restaurant.distanceKm && restaurant.distanceKm > 3.0) {
          return false;
        }
      }

      // Search
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // Cuisine
      if (selectedCuisine !== 'All' && !restaurant.cuisine.includes(selectedCuisine)) return false;

      // Rating
      if (restaurant.rating < minRating) return false;

      // Toggles
      if (isVegetarian && !restaurant.vegetarian) return false;
      if (hasOffers && !restaurant.hasOffers) return false;
      if (isOpenNow && !restaurant.isOpenNow) return false;

      return true;
    });

    return result;
  }, [searchQuery, selectedCuisine, minRating, isVegetarian, hasOffers, isOpenNow, detectedCity, localizedRestaurants]);

  const renderFilters = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-bold mb-4 text-white">Cuisine</h3>
        <div className="flex flex-wrap gap-2">
          {CUISINES.map(cuisine => (
            <button
              key={cuisine}
              onClick={() => setSelectedCuisine(cuisine)}
              className={`px-3 py-1.5 rounded-xl text-sm transition-all ${
                selectedCuisine === cuisine 
                  ? 'bg-aurora-cyan text-background font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
                  : 'glass text-muted hover:text-white'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4 text-white">Minimum Rating</h3>
        <div className="flex flex-wrap gap-2">
          {RATINGS.map(rating => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={`px-3 py-1.5 rounded-xl text-sm transition-all flex items-center gap-1 ${
                minRating === rating 
                  ? 'bg-food-amber text-background font-bold shadow-[0_0_15px_rgba(251,191,36,0.4)]' 
                  : 'glass text-muted hover:text-white'
              }`}
            >
              {rating === 0 ? 'Any' : `${rating}+ ⭐️`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4 text-white">Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="sr-only" checked={isVegetarian} onChange={() => setIsVegetarian(!isVegetarian)} />
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isVegetarian ? 'bg-status-success border-status-success' : 'border-muted'}`}>
              {isVegetarian && <div className="w-2.5 h-2.5 bg-background rounded-sm" />}
            </div>
            <span className="text-sm text-slate-300">Vegetarian Friendly</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="sr-only" checked={hasOffers} onChange={() => setHasOffers(!hasOffers)} />
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${hasOffers ? 'bg-aurora-purple border-aurora-purple' : 'border-muted'}`}>
              {hasOffers && <div className="w-2.5 h-2.5 bg-background rounded-sm" />}
            </div>
            <span className="text-sm text-slate-300">Has Offers</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="sr-only" checked={isOpenNow} onChange={() => setIsOpenNow(!isOpenNow)} />
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isOpenNow ? 'bg-aurora-cyan border-aurora-cyan' : 'border-muted'}`}>
              {isOpenNow && <div className="w-2.5 h-2.5 bg-background rounded-sm" />}
            </div>
            <span className="text-sm text-slate-300">Open Now</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 container mx-auto px-4 lg:px-8">
      {/* Background Orbs */}
      <div className="fixed top-20 left-0 w-96 h-96 bg-aurora-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-aurora-purple/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <SectionHeading 
            title="Explore Restaurants" 
            subtitle={
              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-aurora-cyan" /> Delivery to: <strong className="text-white">{currentLocation}</strong>
                </span>
                <button 
                  onClick={handleDetectLocation}
                  disabled={isDetecting}
                  className="ml-2 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Navigation size={12} className={isDetecting ? 'animate-spin' : ''} />
                  {isDetecting ? 'Detecting...' : 'Update Location'}
                </button>
              </div>
            } 
            className="mb-0"
          />
        </div>
        
        <div className="w-full md:w-96 flex gap-2">
          <SearchBar 
            className="flex-1" 
            placeholder="Search restaurants or cuisines..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            variant="glass" 
            className="px-4 lg:hidden"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <SlidersHorizontal size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Filters Toggle */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden mb-8 overflow-hidden"
          >
            <GlassCard className="p-6 bg-background/80">
              {renderFilters()}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-72 shrink-0">
          <GlassCard className="p-6 sticky top-28 bg-background/50">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
              <SlidersHorizontal size={20} className="text-aurora-cyan" />
              <h2 className="text-lg font-bold text-white">Filters</h2>
            </div>
            {renderFilters()}
          </GlassCard>
        </div>

        {/* Results Grid */}
        <div className="flex-1">
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant, idx) => (
                <motion.div 
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="h-full"
                >
                  <RestaurantCard restaurant={restaurant} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <SlidersHorizontal size={32} className="text-muted" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No restaurants found</h3>
              <p className="text-muted">Try adjusting your filters or search query.</p>
              <Button 
                variant="ghost" 
                className="mt-6"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCuisine('All');
                  setMinRating(0);
                  setIsVegetarian(false);
                  setHasOffers(false);
                  setIsOpenNow(false);
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { SlidersHorizontal, MapPin, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { useLocationContext } from '../context/LocationContext';

const CUISINES = ['All', 'Italian', 'Japanese', 'Indian', 'Healthy', 'Pizza', 'Chinese'];
const RATINGS = [0, 4.0, 4.5, 4.8];
const DISTANCES = [
  { label: 'All Distances', maxKm: 99 },
  { label: 'Under 2 km', maxKm: 2.0 },
  { label: 'Under 4 km', maxKm: 4.0 },
  { label: 'Under 6 km', maxKm: 6.0 },
];

export default function Restaurants() {
  const [searchParams] = useSearchParams();
  const initialCuisine = searchParams.get('cuisine') || 'All';
  
  const { city, fullAddress, setIsModalOpen, isDetecting, getLocalizedRestaurants } = useLocationContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine);
  const [minRating, setMinRating] = useState(0);
  const [maxDistance, setMaxDistance] = useState(99);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [hasOffers, setHasOffers] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const localizedRestaurants = useMemo(() => getLocalizedRestaurants(), [getLocalizedRestaurants]);

  const filteredRestaurants = useMemo(() => {
    return localizedRestaurants.filter(restaurant => {
      // Distance filter
      if (restaurant.distanceKm && restaurant.distanceKm > maxDistance) {
        return false;
      }

      // Search
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            restaurant.location.toLowerCase().includes(searchQuery.toLowerCase());
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
  }, [searchQuery, selectedCuisine, minRating, maxDistance, isVegetarian, hasOffers, isOpenNow, localizedRestaurants]);

  const renderFilters = () => (
    <div className="space-y-8">
      {/* Distance Filter */}
      <div>
        <h3 className="font-bold mb-3 text-white text-sm">Delivery Distance</h3>
        <div className="grid grid-cols-2 gap-2">
          {DISTANCES.map(d => (
            <button
              key={d.label}
              onClick={() => setMaxDistance(d.maxKm)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                maxDistance === d.maxKm
                  ? 'bg-aurora-cyan text-[#111111] shadow-[0_0_12px_rgba(255,184,0,0.35)] font-bold'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine */}
      <div>
        <h3 className="font-bold mb-3 text-white text-sm">Cuisine</h3>
        <div className="flex flex-wrap gap-2">
          {CUISINES.map(cuisine => (
            <button
              key={cuisine}
              onClick={() => setSelectedCuisine(cuisine)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCuisine === cuisine 
                  ? 'bg-aurora-cyan text-[#111111] font-bold shadow-[0_0_12px_rgba(255,184,0,0.35)]' 
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-bold mb-3 text-white text-sm">Minimum Rating</h3>
        <div className="flex flex-wrap gap-2">
          {RATINGS.map(rating => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                minRating === rating 
                  ? 'bg-aurora-blue text-[#111111] font-bold shadow-[0_0_12px_rgba(242,201,76,0.35)]' 
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {rating === 0 ? 'Any' : `${rating}+ ⭐️`}
            </button>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div>
        <h3 className="font-bold mb-3 text-white text-sm">Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="sr-only" checked={isVegetarian} onChange={() => setIsVegetarian(!isVegetarian)} />
            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${isVegetarian ? 'bg-status-success border-status-success' : 'border-white/20 bg-white/5'}`}>
              {isVegetarian && <div className="w-2.5 h-2.5 bg-background rounded-sm" />}
            </div>
            <span className="text-xs font-medium text-slate-300">Vegetarian Friendly</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="sr-only" checked={hasOffers} onChange={() => setHasOffers(!hasOffers)} />
            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${hasOffers ? 'bg-aurora-purple border-aurora-purple' : 'border-white/20 bg-white/5'}`}>
              {hasOffers && <div className="w-2.5 h-2.5 bg-background rounded-sm" />}
            </div>
            <span className="text-xs font-medium text-slate-300">Has Offers</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="sr-only" checked={isOpenNow} onChange={() => setIsOpenNow(!isOpenNow)} />
            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${isOpenNow ? 'bg-aurora-cyan border-aurora-cyan' : 'border-white/20 bg-white/5'}`}>
              {isOpenNow && <div className="w-2.5 h-2.5 bg-background rounded-sm" />}
            </div>
            <span className="text-xs font-medium text-slate-300">Open Now</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 container mx-auto px-4 lg:px-8">
      {/* Background Orbs */}
      <div className="fixed top-20 left-0 w-96 h-96 bg-aurora-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-aurora-purple/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <SectionHeading 
            title="Explore Restaurants" 
            subtitle={
              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1.5 text-sm text-slate-300">
                  <MapPin size={16} className="text-aurora-cyan" /> Delivery to: <strong className="text-white font-bold">{fullAddress}</strong>
                </span>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="ml-2 text-xs bg-aurora-cyan/10 hover:bg-aurora-cyan text-aurora-cyan hover:text-[#111111] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all font-bold border border-aurora-cyan/30 cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(255,184,0,0.3)]"
                >
                  <Navigation size={12} className={isDetecting ? 'animate-spin' : ''} />
                  Change Location
                </button>
              </div>
            } 
            className="mb-0"
          />
        </div>
        
        <div className="w-full md:w-96 flex gap-2">
          <SearchBar 
            className="flex-1" 
            placeholder="Search restaurants, cuisines, or area..." 
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
          <GlassCard className="p-6 sticky top-28 bg-background/50 border-white/8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-aurora-cyan" />
                <h2 className="text-base font-bold text-white">Filters</h2>
              </div>
              <span className="text-xs text-aurora-cyan font-bold">{filteredRestaurants.length} found</span>
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
                  transition={{ delay: idx * 0.04 }}
                  className="h-full"
                >
                  <RestaurantCard restaurant={restaurant} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 p-8">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-aurora-cyan">
                <MapPin size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No restaurants delivering in this range</h3>
              <p className="text-slate-400 max-w-md mx-auto text-sm mb-6">
                Try widening your delivery distance filter or select another locality in <strong className="text-white">{city}</strong>.
              </p>
              <div className="flex justify-center gap-3">
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setMaxDistance(99);
                    setSelectedCuisine('All');
                    setMinRating(0);
                    setIsVegetarian(false);
                    setHasOffers(false);
                    setIsOpenNow(false);
                    setSearchQuery('');
                  }}
                >
                  Clear all filters
                </Button>
                <Button 
                  variant="glass" 
                  onClick={() => setIsModalOpen(true)}
                >
                  Change Location
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

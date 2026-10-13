import { useState, useMemo } from 'react';
import { SlidersHorizontal, MapPin, Navigation, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { useLocationContext } from '../context/LocationContext';

const CUISINES = ['All', 'Italian', 'Japanese', 'Indian', 'Healthy', 'Pizza', 'Chinese'];
const VENDOR_TYPES = ['All', 'Tiffin Service', 'Student Mess', 'Home Chef', 'Dhaba', 'Restaurant'];
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
  const initialVendorType = searchParams.get('vendorType') || 'All';
  const initialMidnight = searchParams.get('midnight') === 'true' || searchParams.get('lateNight') === 'true';
  
  const { city, fullAddress, setIsModalOpen, isDetecting, getLocalizedRestaurants } = useLocationContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine);
  const [selectedVendorType, setSelectedVendorType] = useState(initialVendorType);
  const [minRating, setMinRating] = useState(0);
  const [maxDistance, setMaxDistance] = useState(99);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [hasOffers, setHasOffers] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [isMidnightMode, setIsMidnightMode] = useState(initialMidnight);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const localizedRestaurants = useMemo(() => getLocalizedRestaurants(), [getLocalizedRestaurants]);

  const filteredRestaurants = useMemo(() => {
    return localizedRestaurants.filter(restaurant => {
      // Midnight / Exam Night Filter
      if (isMidnightMode && !restaurant.isLateNightCanteen) {
        return false;
      }

      // Distance filter
      if (restaurant.distanceKm && restaurant.distanceKm > maxDistance) {
        return false;
      }

      // Vendor Type
      if (selectedVendorType !== 'All' && (restaurant.vendorType || 'Restaurant') !== selectedVendorType) {
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
  }, [searchQuery, selectedCuisine, selectedVendorType, minRating, maxDistance, isVegetarian, hasOffers, isOpenNow, isMidnightMode, localizedRestaurants]);

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

      {/* Provider Type */}
      <div>
        <h3 className="font-bold mb-3 text-white text-sm">Provider Type</h3>
        <div className="flex flex-wrap gap-2">
          {VENDOR_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setSelectedVendorType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedVendorType === type 
                  ? 'bg-aurora-cyan text-[#111111] font-bold shadow-[0_0_12px_rgba(255,184,0,0.35)]' 
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {type}
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
            <input type="checkbox" className="sr-only" checked={isMidnightMode} onChange={() => setIsMidnightMode(!isMidnightMode)} />
            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${isMidnightMode ? 'bg-purple-600 border-purple-400' : 'border-white/20 bg-white/5'}`}>
              {isMidnightMode && <div className="w-2.5 h-2.5 bg-background rounded-sm" />}
            </div>
            <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Moon size={12} className="text-purple-400" /> Exam Night Canteen
            </span>
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
        
        <div className="w-full md:w-auto flex flex-wrap items-center gap-2">
          {/* Midnight Canteen Mode Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMidnightMode(!isMidnightMode)}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 border ${
              isMidnightMode
                ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-purple-950/40 text-purple-200 border-purple-500/30 hover:bg-purple-900/50'
            }`}
            title="Toggle Late-Night Campus Canteens & Dhabas"
          >
            <Moon size={14} className={isMidnightMode ? 'fill-current text-amber-300 animate-pulse' : 'text-purple-300'} />
            <span className="truncate">🌙 Exam Night Canteen (11 PM - 4 AM)</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isMidnightMode ? 'bg-amber-400 text-black font-extrabold' : 'bg-white/10 text-slate-300'}`}>
              {isMidnightMode ? 'ON' : 'OFF'}
            </span>
          </button>

          <SearchBar 
            className="flex-1 min-w-[220px]" 
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

      {/* Midnight Canteen Active Banner */}
      {isMidnightMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-purple-950/80 via-indigo-950/80 to-background border border-purple-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-purple-950/30"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-300 flex items-center justify-center shrink-0">
              <Moon size={20} className="fill-current text-amber-300" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                Exam Night / Midnight Canteen Mode Active
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  ⚡ 15-Min Express Delivery
                </span>
              </h4>
              <p className="text-xs text-purple-200/80 mt-0.5">
                Showing late-night campus dhabas & midnight canteens open till 4:30 AM for hostel night studies.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMidnightMode(false)}
            className="text-xs font-bold text-slate-400 hover:text-white underline shrink-0 cursor-pointer"
          >
            Show All Providers
          </button>
        </motion.div>
      )}

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
          {/* Quick Provider Type Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-3 mb-6">
            {VENDOR_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setSelectedVendorType(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedVendorType === type
                    ? 'bg-aurora-cyan text-[#111111] font-bold shadow-md shadow-aurora-cyan/20 ring-1 ring-aurora-cyan'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

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
                    setSelectedVendorType('All');
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

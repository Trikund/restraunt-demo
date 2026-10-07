import { Heart, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from './GlassCard';
import Rating from './Rating';
import Badge from './Badge';
import { useWishlist } from '../context/WishlistContext';

export interface RestaurantProps {
  restaurant: {
    id: number;
    name: string;
    rating: number;
    reviews: number;
    cuisine: string;
    deliveryTimeString: string;
    priceRange: string;
    image: string;
    featured?: boolean;
    hasOffers?: boolean;
    offerDetails?: string | null;
  };
}

export default function RestaurantCard({ restaurant }: RestaurantProps) {
  const { toggleRestaurant, isRestaurantSaved } = useWishlist();
  const saved = isRestaurantSaved(restaurant.id);

  return (
    <Link to={`/restaurant/${restaurant.id}`} className="block h-full outline-none">
      <GlassCard hoverable className="group flex flex-col h-full bg-background/60 border-white/5 relative overflow-hidden">
        <div className="relative h-48 w-full image-zoom-container rounded-t-2xl rounded-b-none">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="image-zoom"
            loading="lazy"
          />
          
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {restaurant.featured && (
              <Badge variant="aurora">Featured</Badge>
            )}
            {restaurant.hasOffers && (
              <Badge variant="food" icon={<Tag size={12} />}>
                Offer
              </Badge>
            )}
          </div>
          
          <button 
            className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              saved ? 'bg-food-coral text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'bg-background/50 backdrop-blur-md text-white hover:text-food-coral hover:bg-white/20'
            }`}
            onClick={(e) => {
              e.preventDefault();
              toggleRestaurant(restaurant.id);
            }}
          >
            <Heart size={16} fill={saved ? 'currentColor' : 'none'} className={saved ? 'scale-110' : ''} />
          </button>
        </div>
        
        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-aurora-cyan transition-colors truncate pr-2">
              {restaurant.name}
            </h3>
            <span className="text-sm font-medium text-slate-400 bg-white/5 px-2 py-1 rounded-md shrink-0">
              {restaurant.priceRange}
            </span>
          </div>
          
          <p className="text-sm text-slate-400 mb-3">{restaurant.cuisine}</p>
          
          <div className="mt-auto pt-4 border-t border-glass-border flex items-center justify-between">
            <Rating score={restaurant.rating} reviews={restaurant.reviews} showReviews />
            
            <div className="flex items-center text-sm font-medium text-slate-300">
              <Clock size={14} className="mr-1 text-aurora-blue" />
              {restaurant.deliveryTimeString}
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-white/5 overflow-hidden">
            <span className="text-sm font-semibold text-aurora-cyan flex items-center justify-center group-hover:tracking-wider transition-all duration-300">
              View Menu <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

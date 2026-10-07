import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Star, Info, ArrowLeft, Tag } from 'lucide-react';
import { restaurants } from '../data/mockData';
import GlassCard from '../components/GlassCard';
import MenuItemCard from '../components/MenuItemCard';
import Badge from '../components/Badge';
import Button from '../components/Button';
import LoadingState from '../components/LoadingState';

import { useLocationContext } from '../context/LocationContext';

export default function RestaurantDetails() {
  const { id } = useParams();
  const { getLocalizedRestaurants } = useLocationContext();
  const [restaurant, setRestaurant] = useState<typeof restaurants[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const restId = Number(id);
    if (!id || isNaN(restId)) {
      setNotFound(true);
      return;
    }
    const localized = getLocalizedRestaurants();
    const found = localized.find(r => r.id === restId) || restaurants.find(r => r.id === restId);
    if (found) {
      setRestaurant(found);
      setActiveCategory(found.menuCategories[0]);
    } else {
      setNotFound(true);
    }
  }, [id, getLocalizedRestaurants]);

  if (notFound) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-extrabold text-white mb-3">Restaurant Not Found</h1>
        <p className="text-slate-400 mb-8 max-w-md">The restaurant you're looking for doesn't exist or is no longer listed on our platform.</p>
        <Link to="/restaurants">
          <Button variant="primary">Browse Restaurants</Button>
        </Link>
      </div>
    );
  }

  if (!restaurant) {
    return <LoadingState fullScreen message="Loading restaurant details..." />;
  }

  const activeMenuItems = restaurant.menu.filter(item => item.category === activeCategory);

  return (
    <div className="pb-24">
      {/* HERO BANNER */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <div className="absolute inset-0 bg-background/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop';
          }}
        />
        
        <div className="absolute top-24 left-4 lg:left-8 z-20">
          <Link to="/restaurants" className="flex items-center gap-2 px-4 py-2 glass rounded-full text-white hover:text-aurora-cyan transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Back to restaurants
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-20 -mt-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* MAIN CONTENT */}
          <div className="flex-1">
            {/* Restaurant Info Card */}
            <GlassCard className="p-6 md:p-8 mb-8 bg-background/80 backdrop-blur-2xl">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {restaurant.featured && <Badge variant="aurora">Featured</Badge>}
                    {restaurant.vegetarian && <Badge variant="success">Vegetarian Options</Badge>}
                    {restaurant.isOpenNow ? (
                      <Badge variant="glass" className="border-status-success/50 text-status-success">Open Now</Badge>
                    ) : (
                      <Badge variant="glass" className="border-status-error/50 text-status-error">Closed</Badge>
                    )}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                    {restaurant.name}
                  </h1>
                  <p className="text-lg text-slate-300">{restaurant.cuisine} • {restaurant.priceRange}</p>
                </div>
                
                <div className="flex flex-col items-start md:items-end gap-2">
                  <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl">
                    <Star size={20} className="text-food-amber" fill="currentColor" />
                    <span className="font-bold text-lg text-white">{restaurant.rating}</span>
                    <span className="text-muted text-sm">({restaurant.reviews}+)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin size={20} className="text-aurora-cyan mt-0.5 shrink-0" />
                  <span>{restaurant.location}</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <Clock size={20} className="text-aurora-purple mt-0.5 shrink-0" />
                  <span>Delivery in {restaurant.deliveryTimeString}</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300 md:col-span-2 mt-2">
                  <Info size={20} className="text-muted mt-0.5 shrink-0" />
                  <p className="text-sm leading-relaxed">{restaurant.about}</p>
                </div>
              </div>
            </GlassCard>

            {/* Menu Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Menu</h2>
              
              {/* Menu Categories */}
              <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6 pb-2">
                {restaurant.menuCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-sm font-semibold transition-all ${
                      activeCategory === cat 
                        ? 'bg-aurora-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                        : 'glass text-muted hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeMenuItems.map(item => (
                  <MenuItemCard key={item.id} item={item as any} />
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Reviews</h2>
              {restaurant.reviewsList.length > 0 ? (
                <div className="space-y-4">
                  {restaurant.reviewsList.map(review => (
                    <GlassCard key={review.id} className="p-5 bg-background/40">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-white">{review.user}</span>
                        <span className="text-xs text-muted">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3 text-food-amber">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-muted opacity-30" : ""} />
                        ))}
                      </div>
                      <p className="text-sm text-slate-300">{review.text}</p>
                    </GlassCard>
                  ))}
                </div>
              ) : (
                <p className="text-muted italic">No reviews yet.</p>
              )}
            </div>

          </div>

          {/* SIDEBAR (Offers & Related) */}
          <div className="w-full lg:w-80 shrink-0 space-y-6">
            {restaurant.hasOffers && restaurant.offerDetails && (
              <GlassCard className="p-6 bg-gradient-to-br from-food-coral/20 to-food-amber/20 border-food-amber/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20"><Tag size={64} /></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-food-amber mb-2">Special Offer</h3>
                  <p className="text-slate-200 mb-4 font-medium">{restaurant.offerDetails}</p>
                  <Button variant="food" fullWidth>Claim Offer</Button>
                </div>
              </GlassCard>
            )}

            <GlassCard className="p-6 bg-background/50">
              <h3 className="font-bold text-white mb-4">Delivery Information</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted">Minimum Order</span>
                  <span className="font-medium text-white">₹15.00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted">Delivery Fee</span>
                  <span className="font-medium text-aurora-cyan">Free</span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}

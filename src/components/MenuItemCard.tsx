import { Plus, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from './GlassCard';
import Rating from './Rating';
import { useWishlist } from '../context/WishlistContext';

interface MenuItemProps {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    image: string;
    vegetarian: boolean;
  };
}

export default function MenuItemCard({ item }: MenuItemProps) {
  const { toggleDish, isDishSaved } = useWishlist();
  const saved = isDishSaved(item.id);

  return (
    <Link to={`/food/${item.id}`} className="block outline-none h-full">
      <GlassCard 
        hoverable 
        className="p-3 flex flex-col gap-3 bg-background/50 border-white/5 relative group overflow-hidden h-full transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:border-aurora-cyan/30"
      >
        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden image-zoom-container shadow-md relative">
          <img src={item.image} alt={item.name} className="image-zoom" />
          
          <button 
            className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-all ${
              saved 
                ? 'bg-food-coral text-white opacity-100 scale-100 shadow-[0_0_15px_rgba(244,63,94,0.4)]' 
                : 'bg-background/70 backdrop-blur-md text-white hover:text-food-coral hover:bg-white/20'
            }`}
            onClick={(e) => { 
              e.preventDefault();
              toggleDish(item.id); 
            }}
          >
            <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="flex-1 flex flex-col px-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-bold text-white text-lg line-clamp-1 group-hover:text-aurora-cyan transition-colors" title={item.name}>{item.name}</h4>
            <div className={`mt-1.5 shrink-0 w-4 h-4 rounded-sm border flex items-center justify-center ${item.vegetarian ? 'border-green-500' : 'border-red-500'}`}>
              <div className={`w-2 h-2 rounded-full ${item.vegetarian ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-2 mt-1">
             <Rating score={item.rating} />
             <span className="text-xs text-slate-400">({Math.floor(item.rating * 123)})</span>
             <span className="text-xs text-slate-400 border-l border-slate-700 pl-2">20 min</span>
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="font-bold text-lg text-white group-hover:text-aurora-cyan transition-colors">
              ₹{item.price.toFixed(2)}
            </div>
            <button 
              className="w-8 h-8 rounded-md bg-aurora-cyan/20 text-aurora-cyan hover:bg-aurora-cyan hover:text-background flex items-center justify-center transition-all duration-300"
              onClick={(e) => { e.preventDefault(); /* Quick Add */ }}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

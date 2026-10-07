import { Plus, Heart } from 'lucide-react';
import GlassCard from './GlassCard';
import Rating from './Rating';

interface DishProps {
  dish: {
    id: number;
    name: string;
    restaurant: string;
    rating: number;
    price: number;
    image: string;
  };
}

export default function DishCard({ dish }: DishProps) {
  return (
    <GlassCard hoverable className="p-4 bg-background/60 border-white/5 flex gap-4 items-center">
      <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden shadow-lg image-zoom-container">
        <img 
          src={dish.image} 
          alt={dish.name} 
          className="image-zoom"
        />
        <button className="absolute top-1.5 left-1.5 z-10 p-1.5 rounded-full bg-background/50 backdrop-blur-md text-white hover:text-food-coral hover:bg-white/20 transition-colors">
          <Heart size={12} />
        </button>
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-foreground truncate">{dish.name}</h4>
        <p className="text-xs text-muted truncate mb-2">{dish.restaurant}</p>
        
        <div className="flex items-center justify-between mt-1">
          <Rating score={dish.rating} />
          
          <div className="flex items-center gap-3">
            <span className="font-bold text-aurora-cyan">₹{dish.price.toFixed(2)}</span>
            <button className="w-8 h-8 rounded-full bg-aurora-blue hover:bg-blue-500 text-white flex items-center justify-center transition-colors shadow-lg shadow-aurora-blue/30">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

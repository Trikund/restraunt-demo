import { Clock, ChefHat, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from './GlassCard';
import Rating from './Rating';
import Badge from './Badge';
import { useWishlist } from '../context/WishlistContext';

interface RecipeProps {
  recipe: {
    id: number;
    name: string;
    time: string;
    difficulty: string;
    rating: number;
    image: string;
  };
}

export default function RecipeCard({ recipe }: RecipeProps) {
  const { toggleRecipe, isRecipeSaved } = useWishlist();
  const saved = isRecipeSaved(recipe.id);

  return (
    <Link to={`/recipes/${recipe.id}`} className="block h-full outline-none">
      <GlassCard hoverable className="group relative h-80 overflow-hidden rounded-3xl border-white/10">
        <div className="absolute inset-0 image-zoom-container rounded-3xl">
          <img 
            src={recipe.image} 
            alt={recipe.name} 
            className="image-zoom brightness-75 group-hover:brightness-50 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
        </div>
        
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="mb-auto self-end flex items-center gap-2">
            <button 
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                saved 
                  ? 'bg-food-coral text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]' 
                  : 'bg-background/40 backdrop-blur-md text-white hover:bg-white/20'
              }`}
              onClick={(e) => {
                e.preventDefault();
                toggleRecipe(recipe.id);
              }}
            >
              <Heart size={14} fill={saved ? 'currentColor' : 'none'} className={saved ? 'scale-110' : ''} />
            </button>
            
            <Badge variant="glass" className="bg-black/40 backdrop-blur-md">
              {recipe.difficulty}
            </Badge>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md">
            {recipe.name}
          </h3>
          
          <div className="flex items-center gap-4 text-sm text-slate-300 font-medium mb-4">
            <span className="flex items-center gap-1.5"><Clock size={16} className="text-aurora-cyan" /> {recipe.time}</span>
            <span className="flex items-center gap-1.5"><ChefHat size={16} className="text-aurora-purple" /> Recipe</span>
          </div>
          
          <div className="flex items-center justify-between">
            <Rating score={recipe.rating} />
            
            <div className="flex items-center gap-2 text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
              View <ArrowRight size={16} className="text-aurora-cyan" />
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

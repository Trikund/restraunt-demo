import { Star, StarHalf } from 'lucide-react';

interface RatingProps {
  score: number;
  maxScore?: number;
  reviews?: number;
  showReviews?: boolean;
  className?: string;
}

export default function Rating({ 
  score, 
  maxScore = 5, 
  reviews, 
  showReviews = false, 
  className = '' 
}: RatingProps) {
  const fullStars = Math.floor(score);
  const hasHalfStar = score % 1 >= 0.5;
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center text-food-amber">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={16} fill="currentColor" />
        ))}
        {hasHalfStar && <StarHalf size={16} fill="currentColor" />}
        {[...Array(maxScore - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} size={16} className="text-muted opacity-30" />
        ))}
      </div>
      
      <div className="flex items-center gap-1.5 text-sm font-medium">
        <span className="text-foreground">{score.toFixed(1)}</span>
        {showReviews && reviews !== undefined && (
          <span className="text-muted">({reviews.toLocaleString()})</span>
        )}
      </div>
    </div>
  );
}


import { motion } from 'framer-motion';
import { MapPin, Navigation, Store } from 'lucide-react';

interface MapMockProps {
  progress: number; // 0 to 1
  className?: string;
}

export default function MapMock({ progress, className = '' }: MapMockProps) {
  // We'll use a simple SVG curve to simulate a delivery route
  // The route goes from bottom-left (Restaurant) to top-right (Home)
  
  const pathData = "M 20 80 Q 40 20, 80 50 T 180 20";

  return (
    <div className={`relative bg-[#0F172A] rounded-[2rem] overflow-hidden ${className}`}>
      {/* Mock Map Background Patterns */}
      <div className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '24px 24px' 
        }} 
      />
      <div className="absolute top-10 left-20 w-32 h-32 bg-white/5 rounded-3xl rotate-12 blur-sm" />
      <div className="absolute bottom-20 right-20 w-48 h-24 bg-white/5 rounded-3xl -rotate-12 blur-sm" />
      
      {/* Map Content */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <svg 
          viewBox="0 0 200 100" 
          className="w-full h-full max-w-2xl drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Route Background Line */}
          <path 
            d={pathData} 
            fill="none" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeDasharray="4 4"
          />
          
          {/* Active Route Line */}
          <motion.path 
            d={pathData} 
            fill="none" 
            stroke="#22D3EE" // aurora-cyan
            strokeWidth="3" 
            strokeLinecap="round" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: Math.max(0.01, progress) }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Overlays for absolute positioning markers based on percentage */}
      {/* We estimate the pixel positions based on the SVG viewBox for visual simplicity */}
      {/* Restaurant (Start: ~10% X, 80% Y) */}
      <div className="absolute" style={{ left: '10%', top: '80%', transform: 'translate(-50%, -50%)' }}>
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
            <Store size={20} className="text-aurora-purple" />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-white whitespace-nowrap border border-white/10">
            Restaurant
          </div>
        </div>
      </div>

      {/* Destination (End: ~90% X, 20% Y) */}
      <div className="absolute" style={{ left: '90%', top: '20%', transform: 'translate(-50%, -50%)' }}>
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
            <MapPin size={20} className="text-food-coral" />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-white whitespace-nowrap border border-white/10">
            Home
          </div>
        </div>
      </div>

      {/* Driver (Moving) */}
      {/* Interpolating positions roughly to match the bezier curve manually for visual effect */}
      {progress > 0 && (
        <motion.div 
          className="absolute z-10" 
          initial={{ left: '10%', top: '80%' }}
          animate={{ 
            left: `${10 + (progress * 80)}%`, 
            top: `${80 - (progress * 60) + (Math.sin(progress * Math.PI) * 15)}%` 
          }}
          transition={{ duration: 1, ease: "linear" }}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-aurora-cyan text-background flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)] border-[3px] border-background">
              <Navigation size={24} className="fill-background -rotate-45 ml-1" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-status-success rounded-full border-2 border-background" />
          </div>
        </motion.div>
      )}
    </div>
  );
}

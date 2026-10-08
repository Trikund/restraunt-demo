import { useEffect, useState } from 'react';
import { Store, Home, Navigation, MapPin } from 'lucide-react';
import { OrderStatus } from '../types/order';

interface Coordinates {
  lat: number;
  lng: number;
}

interface DeliveryTrackingMapProps {
  restaurantCoordinates?: Coordinates;
  deliveryCoordinates?: Coordinates;
  partnerCoordinates?: Coordinates;
  status: OrderStatus;
  height?: string;
  className?: string;
}

export default function DeliveryTrackingMap({
  restaurantCoordinates: _rc,
  deliveryCoordinates: _dc,
  partnerCoordinates: _pc,
  status,
  height = 'h-full',
  className = ''
}: DeliveryTrackingMapProps) {
  const [partnerPos, setPartnerPos] = useState(() => (
    status === OrderStatus.DELIVERED ? { x: 80, y: 50 } : { x: 20, y: 80 }
  ));
  const isMoving = status === OrderStatus.OUT_FOR_DELIVERY;

  // Animation logic for when OUT_FOR_DELIVERY
  useEffect(() => {
    if (status === OrderStatus.OUT_FOR_DELIVERY) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 0.01;
        if (progress >= 1) {
          progress = 1;
          clearInterval(interval);
        }
        
        // Simple bezier curve interpolation
        // Start: 20, 80 (Restaurant)
        // Control: 40, 20
        // End: 80, 50 (Home)
        const t = progress;
        const x = Math.pow(1 - t, 2) * 20 + 2 * (1 - t) * t * 40 + Math.pow(t, 2) * 80;
        const y = Math.pow(1 - t, 2) * 80 + 2 * (1 - t) * t * 20 + Math.pow(t, 2) * 50;
        
        setPartnerPos({ x, y });
      }, 50);

      return () => clearInterval(interval);
    }

    if (status === OrderStatus.DELIVERED) {
      const timer = setTimeout(() => setPartnerPos({ x: 80, y: 50 }), 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setPartnerPos({ x: 20, y: 80 }), 0);
    return () => clearTimeout(timer);
  }, [status]);

  const showPartner = ([
    OrderStatus.PARTNER_GOING_TO_RESTAURANT,
    OrderStatus.PARTNER_ARRIVED,
    OrderStatus.ORDER_PICKED_UP,
    OrderStatus.OUT_FOR_DELIVERY,
    OrderStatus.DELIVERED
  ] as string[]).includes(status);

  return (
    <div className={`relative bg-[#0F172A] rounded-[2rem] overflow-hidden ${height} ${className}`}>
      {/* Mock Map Background Patterns */}
      <div className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '24px 24px' 
        }} 
      />
      
      {/* City blocks abstract mock */}
      <div className="absolute top-10 left-10 w-32 h-20 border border-white/5 bg-white/5 rounded-lg opacity-30 transform -skew-x-12" />
      <div className="absolute bottom-20 right-10 w-48 h-32 border border-white/5 bg-white/5 rounded-lg opacity-30 transform skew-x-12" />
      <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-white/5 bg-white/5 rounded-lg opacity-20 rotate-45" />

      {/* Map Content SVG */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Route path (dashed) */}
          <path 
            d="M 20 80 Q 40 20, 80 50" 
            fill="none" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="2" 
            strokeDasharray="4 4"
          />
          
          {/* Active Route path (animated or static based on status) */}
          <path 
            d="M 20 80 Q 40 20, 80 50" 
            fill="none" 
            stroke="#22D3EE" 
            strokeWidth="3" 
            strokeDasharray="100 100"
            strokeDashoffset={status === OrderStatus.DELIVERED ? 0 : 100}
            className={`transition-all ${isMoving ? 'duration-[8000ms]' : 'duration-1000'} ease-linear`}
            style={{ 
              strokeDashoffset: status === OrderStatus.OUT_FOR_DELIVERY ? 0 : 
                               (status === OrderStatus.DELIVERED ? 0 : 100)
            }}
          />
        </svg>
      </div>

      {/* Map Markers */}
      
      {/* Restaurant Marker (20, 80) */}
      <div 
        className="absolute w-10 h-10 -ml-5 -mt-5 bg-background rounded-full border-2 border-white/10 flex items-center justify-center shadow-xl shadow-black/50 z-10"
        style={{ left: '20%', top: '80%' }}
      >
        <Store size={18} className="text-white" />
      </div>

      {/* Customer / Home Marker (80, 50) */}
      <div 
        className="absolute w-12 h-12 -ml-6 -mt-6 bg-aurora-cyan rounded-full border-4 border-background flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] z-10"
        style={{ left: '80%', top: '50%' }}
      >
        <Home size={20} className="text-[#111111] fill-current" />
      </div>

      {/* Delivery Partner Marker */}
      {showPartner && (
        <div 
          className="absolute w-10 h-10 -ml-5 -mt-5 bg-aurora-purple rounded-full border-2 border-background flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)] z-20 transition-all duration-75"
          style={{ 
            left: `${partnerPos.x}%`, 
            top: `${partnerPos.y}%`,
          }}
        >
          <Navigation size={18} className="text-white fill-current" style={{ transform: 'rotate(45deg)' }} />
          
          {/* Radar ping effect when moving */}
          {isMoving && (
            <div className="absolute inset-0 bg-aurora-purple rounded-full animate-ping opacity-50" />
          )}
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute right-4 bottom-4 flex flex-col gap-2">
        <button className="w-10 h-10 bg-background/80 backdrop-blur border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-colors">
          +
        </button>
        <button className="w-10 h-10 bg-background/80 backdrop-blur border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-colors">
          -
        </button>
        <button className="w-10 h-10 bg-background/80 backdrop-blur border border-white/10 rounded-xl flex items-center justify-center text-aurora-cyan mt-2 hover:bg-white/10 transition-colors">
          <MapPin size={18} />
        </button>
      </div>
    </div>
  );
}

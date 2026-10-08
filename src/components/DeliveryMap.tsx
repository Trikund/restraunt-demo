import { OrderStatus } from '../types/order';
import { Store, User, Bike } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  label?: string;
}

interface Props {
  pickupLocation: Location;
  dropoffLocation: Location;
  status: OrderStatus;
  height?: string;
}

const PICKUP_POS = { x: 25, y: 35 };
const DROPOFF_POS = { x: 75, y: 65 };

function getPartnerPosition(status: OrderStatus) {
  switch (status) {
    case OrderStatus.DELIVERY_ASSIGNED:
    case OrderStatus.PARTNER_GOING_TO_RESTAURANT:
      return { x: 15, y: 60 };
    case OrderStatus.PARTNER_ARRIVED:
    case OrderStatus.ORDER_PICKED_UP:
      return PICKUP_POS;
    case OrderStatus.OUT_FOR_DELIVERY:
      return { x: 50, y: 50 };
    case OrderStatus.DELIVERED:
      return DROPOFF_POS;
    default:
      return { x: 10, y: 90 };
  }
}

export default function DeliveryMap({ status, height = 'h-[300px]' }: Props) {
  const partnerPos = getPartnerPosition(status);

  return (
    <div className={`w-full ${height} bg-[var(--color-glass-surface)] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center`}>
      {/* Mock Map Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Mock Route Line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <path 
          d={`M ${pickupPos.x}% ${pickupPos.y}% L ${dropoffPos.x}% ${pickupPos.y}% L ${dropoffPos.x}% ${dropoffPos.y}%`} 
          stroke="url(#route-gradient)" 
          strokeWidth="4" 
          fill="none" 
          strokeDasharray="8 8"
        />
        <defs>
          <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Restaurant Marker */}
      <div 
        className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 z-10"
        style={{ left: `${pickupPos.x}%`, top: `${pickupPos.y}%` }}
      >
        <div className="w-10 h-10 rounded-full bg-aurora-cyan/20 border border-aurora-cyan text-aurora-cyan flex items-center justify-center shadow-[0_0_15px_rgba(255,184,0,0.3)] backdrop-blur-md">
          <Store size={20} />
        </div>
        <span className="text-[10px] font-bold mt-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">Restaurant</span>
      </div>

      {/* Customer Marker */}
      <div 
        className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 z-10"
        style={{ left: `${dropoffPos.x}%`, top: `${dropoffPos.y}%` }}
      >
        <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500 text-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-md">
          <User size={20} />
        </div>
        <span className="text-[10px] font-bold mt-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">Customer</span>
      </div>

      {/* Delivery Partner Marker */}
      {status !== OrderStatus.PLACED && status !== OrderStatus.RESTAURANT_ACCEPTED && status !== OrderStatus.PREPARING && status !== OrderStatus.READY_FOR_PICKUP && (
        <div 
          className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out z-20"
          style={{ left: `${partnerPos.x}%`, top: `${partnerPos.y}%` }}
        >
          <div className="w-12 h-12 rounded-full bg-white text-[#111111] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.5)] relative">
            <Bike size={24} className="animate-bounce" />
            <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-50" />
          </div>
        </div>
      )}

      {/* Label for development/UI context */}
      <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md text-xs text-slate-400">
        Simulated Map View (Backend Ready)
      </div>
    </div>
  );
}

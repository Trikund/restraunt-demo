import { OrderStatus } from '../types/order';
import { Clock, CheckCircle, ChefHat, Package, Bike, MapPin, Navigation, Home, XCircle } from 'lucide-react';

interface Props {
  status: OrderStatus;
  className?: string;
}

export default function OrderStatusBadge({ status, className = '' }: Props) {
  const getStatusConfig = () => {
    switch (status) {
      case OrderStatus.PLACED:
        return { label: 'Placed', color: 'bg-blue-500/20 text-blue-500 border-blue-500/30', icon: Clock };
      case OrderStatus.RESTAURANT_ACCEPTED:
        return { label: 'Accepted', color: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30', icon: CheckCircle };
      case OrderStatus.PREPARING:
        return { label: 'Preparing', color: 'bg-amber-500/20 text-amber-500 border-amber-500/30', icon: ChefHat };
      case OrderStatus.READY_FOR_PICKUP:
        return { label: 'Ready', color: 'bg-food-coral/20 text-food-coral border-food-coral/30', icon: Package };
      case OrderStatus.DELIVERY_ASSIGNED:
        return { label: 'Driver Assigned', color: 'bg-purple-500/20 text-purple-500 border-purple-500/30', icon: Bike };
      case OrderStatus.PARTNER_GOING_TO_RESTAURANT:
        return { label: 'Driver on the way', color: 'bg-indigo-500/20 text-indigo-500 border-indigo-500/30', icon: Navigation };
      case OrderStatus.PARTNER_ARRIVED:
        return { label: 'At Restaurant', color: 'bg-cyan-500/20 text-cyan-500 border-cyan-500/30', icon: MapPin };
      case OrderStatus.ORDER_PICKED_UP:
        return { label: 'Picked Up', color: 'bg-aurora-blue/20 text-aurora-blue border-aurora-blue/30', icon: Package };
      case OrderStatus.OUT_FOR_DELIVERY:
        return { label: 'Out for Delivery', color: 'bg-aurora-cyan/20 text-aurora-cyan border-aurora-cyan/30', icon: Navigation };
      case OrderStatus.DELIVERED:
        return { label: 'Delivered', color: 'bg-green-500/20 text-green-500 border-green-500/30', icon: Home };
      case OrderStatus.RESTAURANT_REJECTED:
      case OrderStatus.CUSTOMER_CANCELLED:
      case OrderStatus.DELIVERY_CANCELLED:
        return { label: 'Cancelled', color: 'bg-red-500/20 text-red-500 border-red-500/30', icon: XCircle };
      default:
        return { label: status, color: 'bg-gray-500/20 text-gray-500 border-gray-500/30', icon: Clock };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${config.color} ${className}`}>
      <Icon size={12} />
      <span>{config.label}</span>
    </div>
  );
}

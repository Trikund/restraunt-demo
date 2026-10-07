import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Phone, MessageSquare, CheckCircle2, ChefHat, 
  Package, Navigation, Home, Store, Star, Clock, MapPin, Check
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import DeliveryTrackingMap from '../components/DeliveryTrackingMap';
import { useOrders } from '../context/OrderContext';
import { OrderStatus } from '../types/order';
import { trackingService } from '../services/trackingService';

// Add the notification dispatch if it exists globally, else we mock it
const notify = (title: string, message: string) => {
  // Use existing notification mechanism here, or fallback to native
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body: message });
  } else {
    console.log(`[Notification] ${title}: ${message}`);
  }
};

const STATUS_STEPS = [
  { id: OrderStatus.PLACED, label: 'Order Confirmed', icon: CheckCircle2, msg: 'Your order has been received.' },
  { id: OrderStatus.RESTAURANT_ACCEPTED, label: 'Accepted', icon: CheckCircle2, msg: 'Restaurant is preparing your food.' },
  { id: OrderStatus.PREPARING, label: 'Preparing', icon: ChefHat, msg: 'Chefs are working their magic.' },
  { id: OrderStatus.READY_FOR_PICKUP, label: 'Ready for Pickup', icon: Package, msg: 'Order is packed and ready.' },
  { id: OrderStatus.DELIVERY_ASSIGNED, label: 'Partner Assigned', icon: Navigation, msg: 'A delivery partner is assigned.' },
  { id: OrderStatus.PARTNER_GOING_TO_RESTAURANT, label: 'Heading to Store', icon: Navigation, msg: 'Partner is on the way to pick up.' },
  { id: OrderStatus.PARTNER_ARRIVED, label: 'Arrived at Store', icon: Store, msg: 'Partner is waiting for your order.' },
  { id: OrderStatus.ORDER_PICKED_UP, label: 'Picked Up', icon: Package, msg: 'Partner has picked up your food.' },
  { id: OrderStatus.OUT_FOR_DELIVERY, label: 'On the Way', icon: Navigation, msg: 'Your food is out for delivery!' },
  { id: OrderStatus.DELIVERED, label: 'Delivered', icon: Home, msg: 'Enjoy your meal!' },
];

export default function Tracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById, updateOrderTracking } = useOrders();
  const [showReview, setShowReview] = useState(false);
  const [showDevControls, setShowDevControls] = useState(false);
  
  const order = getOrderById(orderId || '');
  const prevStatus = useRef<OrderStatus | null>(null);

  // Background auto-simulation
  useEffect(() => {
    if (!order) return;
    
    // Notification on status change
    if (prevStatus.current && prevStatus.current !== order.orderStatus) {
      const step = STATUS_STEPS.find(s => s.id === order.orderStatus);
      if (step) {
        notify('Order Update', step.msg);
      }
    }
    prevStatus.current = order.orderStatus;

    if (order.orderStatus === OrderStatus.DELIVERED && !showReview) {
      const timer = setTimeout(() => setShowReview(true), 2000);
      return () => clearTimeout(timer);
    }

    // Call our tracking service simulation
    const timeoutId = trackingService.simulateOrderProgress(
      order.orderStatus,
      (updates) => {
        updateOrderTracking(order.orderId, updates);
      }
    );

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [order?.orderStatus, order?.orderId, showReview]);

  if (!order) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-white mb-4">Order Not Found</h1>
        <p className="text-slate-400 mb-8">We couldn't find the tracking details for this order.</p>
        <Button onClick={() => navigate('/')}>Return Home</Button>
      </div>
    );
  }

  const currentStatusIndex = STATUS_STEPS.findIndex(step => step.id === order.orderStatus);
  const currentStepInfo = STATUS_STEPS[currentStatusIndex] || STATUS_STEPS[0];

  return (
    <div className="pt-24 pb-20 container mx-auto px-4 lg:px-8 relative min-h-screen flex flex-col">
      {/* Back Link */}
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors self-start"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        
        {/* Map Area (Desktop: 7 cols, Mobile: top) */}
        <div className="lg:col-span-7 h-[400px] lg:h-[calc(100vh-180px)] sticky top-24 z-10">
          <GlassCard className="p-1 h-full overflow-hidden shadow-2xl shadow-black/50 border-white/10">
             <DeliveryTrackingMap 
               restaurantCoordinates={order.restaurantCoordinates}
               deliveryCoordinates={{ lat: order.deliveryLatitude, lng: order.deliveryLongitude }}
               partnerCoordinates={order.deliveryPartnerCoordinates}
               status={order.orderStatus}
             />
          </GlassCard>
          
          {/* Hidden Developer Controls Trigger */}
          <button 
            className="absolute bottom-4 left-4 w-10 h-10 bg-transparent opacity-0 cursor-default hover:cursor-pointer hover:opacity-10"
            onClick={() => setShowDevControls(!showDevControls)}
            title="Toggle Dev Controls"
          />
        </div>

        {/* Tracking Panel Area (Desktop: 5 cols, Mobile: bottom sheet style) */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:overflow-y-auto lg:pb-32 pb-10">
          
          {/* Main Status Header */}
          <GlassCard className="p-6 bg-background/80 backdrop-blur-xl border-t-aurora-cyan/30">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-semibold">Order #{order.orderId}</p>
                <h1 className="text-2xl font-extrabold text-white">{currentStepInfo.msg}</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="w-12 h-12 bg-aurora-cyan/10 rounded-full flex items-center justify-center text-aurora-cyan">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-400">Estimated Delivery</p>
                <p className="text-xl font-bold text-white">{order.estimatedDeliveryTime}</p>
              </div>
            </div>
          </GlassCard>

          {/* Delivery Partner Card */}
          <GlassCard className="p-6">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Navigation size={18} className="text-aurora-purple" /> Delivery Details
            </h3>
            
            {order.deliveryPartnerId ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-slate-800 overflow-hidden border-2 border-aurora-purple">
                      <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" alt="Driver" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-background border border-white/10 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-lg">
                      <Star size={10} className="text-aurora-gold fill-current" />
                      <span className="text-xs font-bold text-white">{order.deliveryPartnerRating}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Your Rider</p>
                    <p className="font-bold text-white text-lg">{order.deliveryPartnerName}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-aurora-cyan hover:bg-white/10 transition-colors shadow-lg shadow-black/20">
                    <MessageSquare size={20} />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-aurora-cyan/20 border border-aurora-cyan/30 flex items-center justify-center text-aurora-cyan hover:bg-aurora-cyan/30 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                    <Phone size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 py-2">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center animate-spin-slow">
                  <Navigation size={20} className="text-slate-500" />
                </div>
                <div>
                  <p className="font-bold text-white">Assigning a partner...</p>
                  <p className="text-sm text-slate-400">Finding the nearest rider.</p>
                </div>
              </div>
            )}
          </GlassCard>

          {/* Timeline */}
          <GlassCard className="p-6">
            <h3 className="font-bold text-white mb-6">Live Status</h3>
            <div className="space-y-6">
              {STATUS_STEPS.map((step, index) => {
                const isCompleted = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;
                const Icon = step.icon;
                
                // Show past steps, current step, and at most one future step
                if (index > currentStatusIndex + 1 && index !== STATUS_STEPS.length - 1) return null;
                // If it's the last step and we are far from it, we might just skip rendering intermediate steps
                if (index === STATUS_STEPS.length - 1 && currentStatusIndex < STATUS_STEPS.length - 3) return null;

                return (
                  <div key={step.id} className="flex gap-4 relative">
                    {/* Connecting line */}
                    {index < STATUS_STEPS.length - 1 && index <= currentStatusIndex && (
                      <div className="absolute left-6 top-10 bottom-[-24px] w-0.5 bg-aurora-gold/50 shadow-[0_0_8px_rgba(255,215,0,0.4)]" />
                    )}
                    {index < STATUS_STEPS.length - 1 && index > currentStatusIndex && (
                       <div className="absolute left-6 top-10 bottom-[-24px] w-0.5 bg-white/5" />
                    )}
                    
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors duration-500 relative ${
                      isCompleted 
                        ? 'bg-aurora-gold text-[#111111] shadow-[0_0_15px_rgba(255,215,0,0.4)]' 
                        : 'bg-background border-2 border-white/5 text-slate-500'
                    }`}>
                      {isCompleted && !isCurrent ? <Check size={20} strokeWidth={3} /> : <Icon size={20} />}
                      {isCurrent && (
                        <div className="absolute inset-0 rounded-full border-2 border-aurora-gold animate-ping opacity-50" />
                      )}
                    </div>
                    
                    <div className="pt-3">
                      <h3 className={`font-bold ${isCurrent ? 'text-white text-lg' : isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
                        {step.label}
                      </h3>
                      {isCurrent && <p className="text-sm text-aurora-gold mt-1">Right now</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Order Summary & Address */}
          <GlassCard className="p-6">
            <h3 className="font-bold text-white mb-4">Order Details</h3>
            
            <div className="mb-6 pb-6 border-b border-white/10">
              <div className="flex items-start gap-3 mb-4">
                <Store size={18} className="text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">{order.restaurantName}</p>
                  <p className="text-sm text-slate-400">{order.restaurantAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">{order.deliveryAddress.label}</p>
                  <p className="text-sm text-slate-400">{order.deliveryAddress.addressLine}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <div className="flex gap-2">
                    <span className="text-aurora-cyan font-bold">{item.quantity}x</span>
                    <span className="text-slate-200">{item.name}</span>
                  </div>
                  <span className="text-white">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
              <span className="font-bold text-white">Total</span>
              <span className="text-xl font-bold text-aurora-cyan">₹{order.totalAmount.toFixed(2)}</span>
            </div>
          </GlassCard>

        </div>
      </div>

      {/* Developer Controls Overlay */}
      {showDevControls && (
        <div className="fixed bottom-4 left-4 z-50 p-4 bg-black/90 border border-aurora-purple rounded-xl shadow-2xl max-w-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-aurora-purple font-bold text-sm">Developer Controls</h4>
            <button onClick={() => setShowDevControls(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {STATUS_STEPS.map(step => (
              <button 
                key={step.id} 
                onClick={() => updateOrderTracking(order.orderId, { orderStatus: step.id })}
                className={`p-2 rounded border text-left ${order.orderStatus === step.id ? 'border-aurora-cyan bg-aurora-cyan/20 text-white' : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'}`}
              >
                {step.id}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <GlassCard className="w-full max-w-md p-8 animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-aurora-gold/20 text-aurora-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white">Order Delivered!</h2>
              <p className="text-slate-400 mt-2">Enjoy your food from {order.restaurantName}</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <p className="font-bold text-white text-center">Rate your experience</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} className="text-slate-600 hover:text-aurora-gold transition-colors focus:text-aurora-gold">
                    <Star size={32} fill="currentColor" />
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full" onClick={() => setShowReview(false)}>Submit Feedback</Button>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

import { createElement } from 'react';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { OrderStatus, UserRole } from '../types/order';
import OrderStatusBadge from '../components/OrderStatusBadge';
import DeliveryMap from '../components/DeliveryMap';
import { Bike, Check, Navigation, MapPin, Package, Home, Store } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function DeliveryDashboard() {
  const { currentUser } = useAuth();
  const { getAvailableDeliveryRequests, getPartnerActiveDelivery, assignDeliveryPartner, updateOrderStatus } = useOrders();

  if (currentUser.role !== UserRole.DELIVERY_PARTNER) {
    return <Navigate to="/" />;
  }

  const availableRequests = getAvailableDeliveryRequests();
  const activeDelivery = getPartnerActiveDelivery(currentUser.partnerId!);

  const handleAcceptRequest = (orderId: string) => {
    assignDeliveryPartner(orderId, currentUser.partnerId!, currentUser.name);
  };

  const handleDeliveryAction = (currentStatus: OrderStatus) => {
    if (!activeDelivery) return;
    
    switch(currentStatus) {
      case OrderStatus.DELIVERY_ASSIGNED:
        updateOrderStatus(activeDelivery.orderId, OrderStatus.PARTNER_GOING_TO_RESTAURANT);
        break;
      case OrderStatus.PARTNER_GOING_TO_RESTAURANT:
        updateOrderStatus(activeDelivery.orderId, OrderStatus.PARTNER_ARRIVED);
        break;
      case OrderStatus.PARTNER_ARRIVED:
        updateOrderStatus(activeDelivery.orderId, OrderStatus.ORDER_PICKED_UP);
        break;
      case OrderStatus.ORDER_PICKED_UP:
        updateOrderStatus(activeDelivery.orderId, OrderStatus.OUT_FOR_DELIVERY);
        break;
      case OrderStatus.OUT_FOR_DELIVERY:
        updateOrderStatus(activeDelivery.orderId, OrderStatus.DELIVERED);
        break;
    }
  };

  const getDeliveryActionConfig = (status: OrderStatus) => {
    switch(status) {
      case OrderStatus.DELIVERY_ASSIGNED: return { label: 'Start journey to restaurant', icon: Navigation };
      case OrderStatus.PARTNER_GOING_TO_RESTAURANT: return { label: 'Arrived at Restaurant', icon: MapPin };
      case OrderStatus.PARTNER_ARRIVED: return { label: 'Pick Up Order', icon: Package };
      case OrderStatus.ORDER_PICKED_UP: return { label: 'Start Delivery to Customer', icon: Navigation };
      case OrderStatus.OUT_FOR_DELIVERY: return { label: 'Mark as Delivered', icon: Home };
      default: return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 container mx-auto px-4 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Bike className="text-aurora-cyan" size={32} />
            Delivery Partner
          </h1>
          <p className="text-slate-400 mt-1">Hello, {currentUser.name}</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 px-4 py-2 rounded-full font-bold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Online
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Active Delivery or Available Requests */}
        <div className="flex flex-col gap-6">
          {activeDelivery ? (
            <div className="bg-white/5 rounded-2xl border border-aurora-cyan/30 p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-aurora-cyan" />
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Active Delivery</h2>
                  <p className="text-aurora-cyan mt-1">{activeDelivery.orderId}</p>
                </div>
                <OrderStatusBadge status={activeDelivery.orderStatus} />
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="mt-1"><Store className="text-slate-400" size={20} /></div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Pickup</p>
                    <p className="text-white font-bold">{activeDelivery.restaurantName}</p>
                    <p className="text-slate-400 text-sm mt-1">{activeDelivery.restaurantAddress}</p>
                  </div>
                </div>

                <div className="flex gap-4 border-t border-white/10 pt-6">
                  <div className="mt-1"><Home className="text-slate-400" size={20} /></div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Drop-off</p>
                    <p className="text-white font-bold">{activeDelivery.deliveryAddress.name}</p>
                    <p className="text-slate-400 text-sm mt-1">
                      {activeDelivery.deliveryAddress.addressLine}, {activeDelivery.deliveryAddress.city} - {activeDelivery.deliveryAddress.pincode}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">Phone: {activeDelivery.deliveryAddress.phone}</p>
                  </div>
                </div>
              </div>

              {getDeliveryActionConfig(activeDelivery.orderStatus) && (
                <button 
                  onClick={() => handleDeliveryAction(activeDelivery.orderStatus)}
                  className="w-full bg-aurora-cyan text-[#111111] font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-aurora-blue transition-colors text-lg"
                >
                  {createElement(getDeliveryActionConfig(activeDelivery.orderStatus)!.icon, { size: 20 })}
                  {getDeliveryActionConfig(activeDelivery.orderStatus)!.label}
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Available Requests ({availableRequests.length})</h2>
              
              <div className="space-y-4">
                {availableRequests.length === 0 ? (
                  <p className="text-slate-500 text-center py-10">Waiting for new orders...</p>
                ) : (
                  availableRequests.map(req => {
                    const estPayout = (req.orderId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 50) + 40;
                    return (
                    <div key={req.orderId} className="bg-black/30 border border-white/5 p-4 rounded-xl hover:border-aurora-cyan/30 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-white font-bold">{req.restaurantName}</h3>
                        <span className="text-emerald-500 font-bold">₹{estPayout} Est.</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                        <Navigation size={14} />
                        <span>2.4 km away</span>
                      </div>

                      <div className="text-sm text-slate-300 mb-4">
                        <p className="truncate">Drop: {req.deliveryAddress.city}</p>
                      </div>

                      <button 
                        onClick={() => handleAcceptRequest(req.orderId)}
                        className="w-full bg-white/10 hover:bg-aurora-cyan hover:text-[#111111] text-white font-bold py-2 rounded-lg transition-colors flex justify-center items-center gap-2"
                      >
                        <Check size={16} /> Accept Delivery
                      </button>
                    </div>
                  );
                })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Map */}
        <div className="sticky top-28">
          <h2 className="text-xl font-bold text-white mb-6">Live Navigation</h2>
          {activeDelivery ? (
            <DeliveryMap 
              pickupLocation={{ lat: activeDelivery.restaurantLatitude, lng: activeDelivery.restaurantLongitude }}
              dropoffLocation={{ lat: activeDelivery.deliveryLatitude, lng: activeDelivery.deliveryLongitude }}
              status={activeDelivery.orderStatus}
              height="h-[600px]"
            />
          ) : (
            <div className="w-full h-[600px] bg-[var(--color-glass-surface)] rounded-2xl border border-white/10 flex items-center justify-center">
              <p className="text-slate-500">Map will appear when you accept a delivery</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

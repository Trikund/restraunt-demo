import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Navigation, RotateCw, ChevronRight, ShoppingBag, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { OrderStatus } from '../types/order';
import OrderStatusBadge from '../components/OrderStatusBadge';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

export default function Orders() {
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getCustomerOrders } = useOrders();

  const allOrders = getCustomerOrders(currentUser.id);
  const activeOrders = allOrders.filter(o => o.orderStatus !== OrderStatus.DELIVERED && o.orderStatus !== OrderStatus.CUSTOMER_CANCELLED && o.orderStatus !== OrderStatus.RESTAURANT_REJECTED);
  const pastOrders = allOrders.filter(o => o.orderStatus === OrderStatus.DELIVERED || o.orderStatus === OrderStatus.CUSTOMER_CANCELLED || o.orderStatus === OrderStatus.RESTAURANT_REJECTED);

  const renderOrderList = (orders: any[]) => {
    if (orders.length === 0) {
      return (
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-muted">
            <Package size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No orders found</h3>
          <p className="text-slate-400 mb-6">Looks like you don't have any {activeTab} orders.</p>
          <Button variant="primary" onClick={() => navigate('/restaurants')}>Browse Restaurants</Button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {orders.map(order => (
          <GlassCard key={order.orderId} className="p-0 overflow-hidden bg-background/50 border-white/10 group">
            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 shrink-0">
                  <Store size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{order.restaurantName}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="font-mono">{order.orderId}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <span className="font-bold text-xl text-aurora-cyan">₹{order.totalAmount.toFixed(2)}</span>
                <OrderStatusBadge status={order.orderStatus} />
              </div>
            </div>

            <div className="p-6 flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-2 flex-1">
                <p className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <ShoppingBag size={14} /> Order Items
                </p>
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-xs font-bold text-slate-400 border border-white/10">
                      {item.quantity}x
                    </div>
                    <span className="text-slate-200">{item.name}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 md:self-end shrink-0 w-full md:w-auto">
                <Button variant="ghost" size="sm" className="w-full sm:w-auto bg-white/5 hover:bg-white/10" rightIcon={<ChevronRight size={16} />}>
                  View Details
                </Button>
                
                {order.orderStatus !== OrderStatus.DELIVERED ? (
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="w-full sm:w-auto shadow-[0_0_15px_rgba(255,184,0,0.2)]"
                    onClick={() => navigate(`/tracking/${order.orderId}`)}
                    leftIcon={<Navigation size={16} />}
                  >
                    Track Order
                  </Button>
                ) : (
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="w-full sm:w-auto shadow-[0_0_15px_rgba(255,184,0,0.2)]"
                    leftIcon={<RotateCw size={16} />}
                  >
                    Reorder
                  </Button>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    );
  };

  return (
    <div className="pt-24 pb-32 container mx-auto px-4 lg:px-8 relative min-h-screen">
      <div className="fixed top-20 right-10 w-96 h-96 bg-aurora-purple/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <SectionHeading 
        title={<span className="flex items-center gap-3"><Package className="text-aurora-cyan" /> Your Orders</span>} 
        subtitle="Track your deliveries and reorder your favorites." 
      />

      <div className="max-w-4xl">
        <div className="flex gap-2 mb-8 bg-background/50 p-1.5 rounded-2xl border border-white/10 inline-flex">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
              activeTab === 'active' ? 'bg-aurora-cyan text-background shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Active Orders ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
              activeTab === 'past' ? 'bg-aurora-purple text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Past Orders ({pastOrders.length})
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderOrderList(activeTab === 'active' ? activeOrders : pastOrders)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { OrderStatus, UserRole } from '../types/order';
import OrderStatusBadge from '../components/OrderStatusBadge';
import { Store, Check, ChefHat, Package, AlertTriangle, Plus } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function RestaurantDashboard() {
  const { currentUser } = useAuth();
  const { getRestaurantOrders, updateOrderStatus, createOrder } = useOrders();

  if (currentUser.role !== UserRole.RESTAURANT) {
    return <Navigate to="/" />;
  }

  const restaurantId = currentUser.restaurantId || 1;
  const orders = getRestaurantOrders(restaurantId);

  // Group orders
  const newOrders = orders.filter(o => o.orderStatus === OrderStatus.PLACED);
  const activeOrders = orders.filter(o => ([OrderStatus.RESTAURANT_ACCEPTED, OrderStatus.PREPARING] as OrderStatus[]).includes(o.orderStatus));
  const readyOrders = orders.filter(o => o.orderStatus === OrderStatus.READY_FOR_PICKUP);

  const generateMockOrder = () => {
    const mockNames = ['Alex Johnson', 'Sarah Smith', 'Michael Chen', 'Emma Davis'];
    const mockItems = [
      { id: 1, name: "Truffle Pasta", price: 24.99, quantity: 1, image: "https://images.unsplash.com/photo-1476124369491-e73f50715200?q=80&w=1000&auto=format&fit=crop" },
      { id: 2, name: "Spicy Tuna Roll", price: 18.50, quantity: 2, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1000&auto=format&fit=crop" },
      { id: 3, name: "Wagyu Burger", price: 32.00, quantity: 1, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop" }
    ];
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const randomItem = mockItems[Math.floor(Math.random() * mockItems.length)];

    createOrder({
        customerId: "CUST-MOCK",
        customerName: randomName,
        customerPhone: "555-0192",
        restaurantId: restaurantId,
        restaurantName: "FlavorNest Local",
        restaurantAddress: "123 Gourmet Lane",
        restaurantLatitude: 28.6139,
        restaurantLongitude: 77.2090,
        items: [randomItem],
        subtotal: randomItem.price * randomItem.quantity,
        deliveryFee: 3.99,
        tax: 2.00,
        discount: 0,
        totalAmount: (randomItem.price * randomItem.quantity) + 5.99,
        paymentMethod: "card",
        paymentStatus: "COMPLETED",
        deliveryAddress: {
            label: "Home",
            name: randomName,
            phone: "555-0192",
            addressLine: "45 Sunset Blvd",
            city: "Metropolis",
            state: "NY",
            pincode: "10001"
        },
        deliveryLatitude: 28.62,
        deliveryLongitude: 77.22,
        estimatedDeliveryTime: "30 mins"
    });
  };

  const handleAction = (orderId: string, currentStatus: OrderStatus) => {
    switch(currentStatus) {
      case OrderStatus.PLACED:
        updateOrderStatus(orderId, OrderStatus.RESTAURANT_ACCEPTED);
        break;
      case OrderStatus.RESTAURANT_ACCEPTED:
        updateOrderStatus(orderId, OrderStatus.PREPARING);
        break;
      case OrderStatus.PREPARING:
        updateOrderStatus(orderId, OrderStatus.READY_FOR_PICKUP);
        break;
    }
  };

  const getActionLabel = (status: OrderStatus) => {
    switch(status) {
      case OrderStatus.PLACED: return { label: 'Accept Order', icon: Check, color: 'bg-emerald-500 hover:bg-emerald-600' };
      case OrderStatus.RESTAURANT_ACCEPTED: return { label: 'Start Preparing', icon: ChefHat, color: 'bg-amber-500 hover:bg-amber-600' };
      case OrderStatus.PREPARING: return { label: 'Mark Ready', icon: Package, color: 'bg-aurora-cyan text-[#111111] hover:bg-aurora-blue' };
      default: return null;
    }
  };

  const OrderCard = ({ order }: { order: any }) => {
    const action = getActionLabel(order.orderStatus);
    const ActionIcon = action?.icon;

    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-aurora-cyan font-bold">{order.orderId}</span>
              <span className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleTimeString()}</span>
            </div>
            <h3 className="text-white font-bold">{order.customerName}</h3>
          </div>
          <OrderStatusBadge status={order.orderStatus} />
        </div>

        <div className="bg-black/30 rounded-lg p-3 border border-white/5">
          <ul className="space-y-2">
            {order.items.map((item: any, idx: number) => (
              <li key={idx} className="flex justify-between text-sm">
                <span className="text-slate-300"><span className="text-white font-bold mr-2">{item.quantity}x</span> {item.name}</span>
                <span className="text-white">₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm">
            <span className="text-slate-400">Total: </span>
            <span className="text-white font-bold">₹{order.totalAmount.toFixed(2)}</span>
          </div>
          
          {action && (
            <button 
              onClick={() => handleAction(order.orderId, order.orderStatus)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-lg text-white ${action.color}`}
            >
              {ActionIcon && <ActionIcon size={16} />}
              {action.label}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-20 container mx-auto px-4 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Store className="text-aurora-cyan" size={32} />
            Restaurant Dashboard
          </h1>
          <p className="text-slate-400 mt-1">Manage orders for Restaurant ID: {restaurantId}</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={generateMockOrder}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            Simulate New Order
          </button>
          <div className="bg-aurora-cyan/10 border border-aurora-cyan/30 text-aurora-cyan px-4 py-2 rounded-lg font-bold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse" />
            Receiving Orders
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Orders */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-5 flex flex-col h-[70vh]">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="text-amber-500" />
            New Requests ({newOrders.length})
          </h2>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {newOrders.length === 0 ? (
              <p className="text-slate-500 text-center py-10">No new orders</p>
            ) : (
              newOrders.map(o => <OrderCard key={o.orderId} order={o} />)
            )}
          </div>
        </div>

        {/* Active/Preparing */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-5 flex flex-col h-[70vh]">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <ChefHat className="text-food-coral" />
            Preparing ({activeOrders.length})
          </h2>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {activeOrders.length === 0 ? (
              <p className="text-slate-500 text-center py-10">No orders being prepared</p>
            ) : (
              activeOrders.map(o => <OrderCard key={o.orderId} order={o} />)
            )}
          </div>
        </div>

        {/* Ready for Pickup */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-5 flex flex-col h-[70vh]">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Package className="text-emerald-500" />
            Ready for Pickup ({readyOrders.length})
          </h2>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {readyOrders.length === 0 ? (
              <p className="text-slate-500 text-center py-10">No orders waiting for pickup</p>
            ) : (
              readyOrders.map(o => <OrderCard key={o.orderId} order={o} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { OrderStatus, UserRole } from '../types/order';
import OrderStatusBadge from '../components/OrderStatusBadge';
import { 
  Store, Check, ChefHat, Package, AlertTriangle, Plus, 
  CalendarCheck, UtensilsCrossed, Sun, Moon, Utensils, 
  Search, Truck, RefreshCw, CheckCircle2, ShieldAlert 
} from 'lucide-react';
import { Navigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { initialVendorSubscribers, type VendorSubscriber } from '../data/mockVendorSubscribers';

export default function RestaurantDashboard() {
  const { currentUser } = useAuth();
  const { getRestaurantOrders, updateOrderStatus, createOrder } = useOrders();

  const [dashboardTab, setDashboardTab] = useState<'dispatch' | 'orders'>('dispatch');
  const [subscribers, setSubscribers] = useState<VendorSubscriber[]>(initialVendorSubscribers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'PAUSED_SKIPPED'>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (currentUser.role !== UserRole.RESTAURANT) {
    return <Navigate to="/" />;
  }

  const restaurantId = currentUser.restaurantId || 1;
  const orders = getRestaurantOrders(restaurantId);

  // Group instant orders
  const newOrders = orders.filter(o => o.orderStatus === OrderStatus.PLACED);
  const activeOrders = orders.filter(o => ([OrderStatus.RESTAURANT_ACCEPTED, OrderStatus.PREPARING] as OrderStatus[]).includes(o.orderStatus));
  const readyOrders = orders.filter(o => o.orderStatus === OrderStatus.READY_FOR_PICKUP);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const generateMockOrder = () => {
    const mockNames = ['Alex Johnson', 'Sarah Smith', 'Michael Chen', 'Emma Davis'];
    const mockItems = [
      { id: 1, name: "Truffle Pasta", price: 24.99, quantity: 1, image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=1000&auto=format&fit=crop" },
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

  // Dispatch Tab Calculations
  const breakfastSubscribers = subscribers.filter(s => s.mealSlots.includes('breakfast'));
  const lunchSubscribers = subscribers.filter(s => s.mealSlots.includes('lunch'));
  const dinnerSubscribers = subscribers.filter(s => s.mealSlots.includes('dinner'));

  const activeLunchCount = lunchSubscribers.filter(s => s.todayStatus === 'ACTIVE').length;
  const pausedLunchCount = lunchSubscribers.length - activeLunchCount;

  const activeDinnerCount = dinnerSubscribers.filter(s => s.todayStatus === 'ACTIVE').length;
  const pausedDinnerCount = dinnerSubscribers.length - activeDinnerCount;

  // Food prep quantities
  const totalRotiCount = (activeLunchCount * 4) + (activeDinnerCount * 4);
  const totalDalLiters = ((activeLunchCount + activeDinnerCount) * 0.25).toFixed(1);

  // Toggle dispatch state
  const handleAdvanceDispatch = (subscriberId: string) => {
    setSubscribers(prev => prev.map(s => {
      if (s.id !== subscriberId) return s;
      const orderFlow: Record<VendorSubscriber['dispatchStatus'], VendorSubscriber['dispatchStatus']> = {
        'PENDING': 'PREPARING',
        'PREPARING': 'DISPATCHED',
        'DISPATCHED': 'DELIVERED',
        'DELIVERED': 'PENDING'
      };
      const nextStatus = orderFlow[s.dispatchStatus];
      showToast(`Tiffin ${s.tiffinBoxNumber} for ${s.customerName} set to ${nextStatus}`);
      return { ...s, dispatchStatus: nextStatus };
    }));
  };

  // Toggle student pause state (for live demonstration)
  const handleToggleStudentPause = (subscriberId: string) => {
    setSubscribers(prev => prev.map(s => {
      if (s.id !== subscriberId) return s;
      const nextStatus: VendorSubscriber['todayStatus'] = 
        s.todayStatus === 'ACTIVE' ? 'WEEKEND_PAUSED' : 
        s.todayStatus === 'WEEKEND_PAUSED' ? 'SLOT_SKIPPED' : 'ACTIVE';
      showToast(`Student ${s.customerName} status updated to: ${nextStatus}`);
      return { ...s, todayStatus: nextStatus };
    }));
  };

  // Batch action: Mark all lunch active dispatched
  const handleBatchDispatchLunch = () => {
    setSubscribers(prev => prev.map(s => {
      if (s.mealSlots.includes('lunch') && s.todayStatus === 'ACTIVE') {
        return { ...s, dispatchStatus: 'DISPATCHED' };
      }
      return s;
    }));
    showToast(`🚀 All ${activeLunchCount} active Lunch tiffins marked DISPATCHED! Dispatch riders notified.`);
  };

  const filteredSubscribers = subscribers.filter(s => {
    const matchesSearch = s.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.tiffinBoxNumber.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (statusFilter === 'ACTIVE' && s.todayStatus !== 'ACTIVE') return false;
    if (statusFilter === 'PAUSED_SKIPPED' && s.todayStatus === 'ACTIVE') return false;
    return true;
  });

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
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 p-4 rounded-xl bg-aurora-cyan text-[#111111] font-bold text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={16} />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Store className="text-aurora-cyan" size={32} />
            Vendor Operations Portal
          </h1>
          <p className="text-slate-400 mt-1">
            Maa Annapurna Tiffin Center • Restaurant ID: #{restaurantId}
          </p>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          {dashboardTab === 'orders' ? (
            <button 
              onClick={generateMockOrder}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors cursor-pointer text-xs"
            >
              <Plus size={16} />
              Simulate Instant Order
            </button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleBatchDispatchLunch}
              className="font-bold cursor-pointer"
              leftIcon={<Truck size={14} />}
            >
              Mark All Lunch Dispatched ({activeLunchCount})
            </Button>
          )}

          <div className="bg-aurora-cyan/10 border border-aurora-cyan/30 text-aurora-cyan px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse" />
            Live Kitchen Sync
          </div>
        </div>
      </div>

      {/* Top Tab Switcher */}
      <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 mb-8 max-w-lg">
        <button
          onClick={() => setDashboardTab('dispatch')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
            dashboardTab === 'dispatch'
              ? 'bg-aurora-cyan text-[#111111] shadow-md shadow-aurora-cyan/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <CalendarCheck size={15} />
          Daily Tiffin Subscribers & Dispatch
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-black">
            {subscribers.length}
          </span>
        </button>
        <button
          onClick={() => setDashboardTab('orders')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
            dashboardTab === 'orders'
              ? 'bg-aurora-cyan text-[#111111] shadow-md shadow-aurora-cyan/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <UtensilsCrossed size={15} />
          Instant Orders (Kanban)
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-black">
            {orders.length}
          </span>
        </button>
      </div>

      {/* TAB 1: DAILY TIFFIN DISPATCH & SUBSCRIBERS */}
      {dashboardTab === 'dispatch' && (
        <div className="space-y-8">
          
          {/* 3 Live Meal Slot Dispatch Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Breakfast Card */}
            <GlassCard className="p-5 border-amber-500/30 bg-amber-500/5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-amber-400">
                  <Sun size={18} />
                  <h3 className="font-bold text-sm uppercase tracking-wider">Breakfast Slot</h3>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Completed (8:30 AM)
                </span>
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl font-black text-white">
                  {breakfastSubscribers.filter(s => s.todayStatus === 'ACTIVE').length}
                  <span className="text-xs text-slate-400 font-normal"> / {breakfastSubscribers.length} active</span>
                </span>
                <span className="text-xs text-slate-400">
                  {breakfastSubscribers.filter(s => s.todayStatus !== 'ACTIVE').length} paused
                </span>
              </div>
              <p className="text-xs text-slate-400">Poha + Boiled Eggs & Chai dispatched to hostels</p>
            </GlassCard>

            {/* Lunch Card */}
            <GlassCard className="p-5 border-aurora-cyan/40 bg-aurora-cyan/5 relative overflow-hidden ring-1 ring-aurora-cyan/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-aurora-cyan">
                  <Utensils size={18} />
                  <h3 className="font-bold text-sm uppercase tracking-wider">Lunch Slot (Active)</h3>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-aurora-cyan/20 text-aurora-cyan border border-aurora-cyan/30 animate-pulse">
                  Packing in Progress
                </span>
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl font-black text-white">
                  {activeLunchCount}
                  <span className="text-xs text-slate-400 font-normal"> / {lunchSubscribers.length} active</span>
                </span>
                <span className="text-xs text-amber-400 font-medium">
                  {pausedLunchCount} paused/skipped
                </span>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                <span className="text-xs text-slate-300">Target Delivery: 12:45 PM</span>
                <button
                  onClick={handleBatchDispatchLunch}
                  className="text-xs font-bold text-aurora-cyan hover:underline flex items-center gap-1"
                >
                  Dispatch All →
                </button>
              </div>
            </GlassCard>

            {/* Dinner Card */}
            <GlassCard className="p-5 border-indigo-500/30 bg-indigo-500/5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Moon size={18} />
                  <h3 className="font-bold text-sm uppercase tracking-wider">Dinner Slot</h3>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">
                  Scheduled (7:45 PM)
                </span>
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl font-black text-white">
                  {activeDinnerCount}
                  <span className="text-xs text-slate-400 font-normal"> / {dinnerSubscribers.length} active</span>
                </span>
                <span className="text-xs text-amber-400 font-medium">
                  {pausedDinnerCount} paused/skipped
                </span>
              </div>
              <p className="text-xs text-slate-400">Cooking begins at 5:30 PM</p>
            </GlassCard>
          </div>

          {/* Kitchen Batch Preparation & Zero-Food-Waste Summary */}
          <GlassCard className="p-6 bg-gradient-to-r from-emerald-500/10 via-background to-transparent border-emerald-500/30">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                  Automated Kitchen Portion Controller
                </span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Today's Exact Raw Ingredient Prep List
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Calculated automatically based on active subscribers minus weekend pauses & meal skips.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-xl">
                <ShieldAlert size={20} className="text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-emerald-300 block">Zero Food Waste Safeguard</span>
                  <span className="text-slate-300">Prevented 3 surplus tiffins from cooking waste</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-white/10 text-center">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Phulkas to Knead</span>
                <span className="text-2xl font-black text-white">{totalRotiCount}</span>
                <span className="text-[10px] text-slate-400 block">4 per active thali</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Dal Volume</span>
                <span className="text-2xl font-black text-white">{totalDalLiters} L</span>
                <span className="text-[10px] text-slate-400 block">250ml per subscriber</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Vegetarian Thalis</span>
                <span className="text-2xl font-black text-white">
                  {subscribers.filter(s => s.dietary === 'Veg' && s.todayStatus === 'ACTIVE').length}
                </span>
                <span className="text-[10px] text-emerald-400 block">Pure Veg</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Gym High-Protein</span>
                <span className="text-2xl font-black text-white">
                  {subscribers.filter(s => s.dietary === 'Non-Veg' && s.todayStatus === 'ACTIVE').length}
                </span>
                <span className="text-[10px] text-aurora-cyan block">Boiled Eggs / Chicken</span>
              </div>
            </div>
          </GlassCard>

          {/* Subscribers Roster & Dispatch Tracker */}
          <GlassCard className="p-6 border-white/10 bg-background/60">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Truck size={18} className="text-aurora-cyan" />
                  Active Student Subscriber Dispatch Roster
                </h3>
                <span className="text-xs text-slate-400">
                  Showing {filteredSubscribers.length} registered subscription accounts
                </span>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-60">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search student or room..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-aurora-cyan"
                  />
                </div>

                <div className="flex rounded-lg bg-white/5 p-0.5 border border-white/10 text-xs">
                  <button
                    onClick={() => setStatusFilter('ALL')}
                    className={`px-2.5 py-1 rounded-md font-semibold ${statusFilter === 'ALL' ? 'bg-aurora-cyan text-[#111111]' : 'text-slate-400'}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setStatusFilter('ACTIVE')}
                    className={`px-2.5 py-1 rounded-md font-semibold ${statusFilter === 'ACTIVE' ? 'bg-aurora-cyan text-[#111111]' : 'text-slate-400'}`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setStatusFilter('PAUSED_SKIPPED')}
                    className={`px-2.5 py-1 rounded-md font-semibold ${statusFilter === 'PAUSED_SKIPPED' ? 'bg-aurora-cyan text-[#111111]' : 'text-slate-400'}`}
                  >
                    Paused
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-bold">Student / Tiffin #</th>
                    <th className="pb-3 font-bold">Hostel Delivery Spot</th>
                    <th className="pb-3 font-bold">Subscription Plan</th>
                    <th className="pb-3 font-bold">Today's State</th>
                    <th className="pb-3 font-bold">Dispatch Status</th>
                    <th className="pb-3 font-bold text-right">Actions (Live Demo)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredSubscribers.map(sub => (
                    <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                      {/* Name & Tiffin Box */}
                      <td className="py-3.5 pr-3">
                        <div className="font-bold text-white text-sm">{sub.customerName}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-aurora-cyan bg-aurora-cyan/10 px-1.5 py-0.2 rounded border border-aurora-cyan/20">
                            {sub.tiffinBoxNumber}
                          </span>
                          <span>{sub.phone}</span>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-3.5 pr-3 text-slate-300 max-w-xs">
                        <span className="font-medium text-white">{sub.deliveryLocation}</span>
                      </td>

                      {/* Plan */}
                      <td className="py-3.5 pr-3">
                        <span className="text-white font-medium block truncate max-w-[180px]">{sub.planTitle}</span>
                        <span className="text-[10px] text-slate-400">{sub.daysRemaining} Days Left</span>
                      </td>

                      {/* Today's Student State */}
                      <td className="py-3.5 pr-3">
                        {sub.todayStatus === 'ACTIVE' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 size={10} /> Active Today
                          </span>
                        )}
                        {sub.todayStatus === 'WEEKEND_PAUSED' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            Weekend Paused
                          </span>
                        )}
                        {sub.todayStatus === 'SLOT_SKIPPED' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                            Dinner Skipped
                          </span>
                        )}
                      </td>

                      {/* Dispatch Status */}
                      <td className="py-3.5 pr-3">
                        {sub.dispatchStatus === 'PENDING' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-slate-300">
                            Queued
                          </span>
                        )}
                        {sub.dispatchStatus === 'PREPARING' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Packing Hot
                          </span>
                        )}
                        {sub.dispatchStatus === 'DISPATCHED' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-aurora-cyan/20 text-aurora-cyan border border-aurora-cyan/30">
                            Out for Delivery
                          </span>
                        )}
                        {sub.dispatchStatus === 'DELIVERED' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Delivered ✅
                          </span>
                        )}
                      </td>

                      {/* Action buttons */}
                      <td className="py-3.5 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleAdvanceDispatch(sub.id)}
                          className="px-2.5 py-1 rounded-lg bg-aurora-cyan/15 hover:bg-aurora-cyan text-aurora-cyan hover:text-[#111111] text-[11px] font-bold transition-all border border-aurora-cyan/30 cursor-pointer"
                          title="Advance tiffin dispatch status"
                        >
                          Step Status →
                        </button>
                        <button
                          onClick={() => handleToggleStudentPause(sub.id)}
                          className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-[11px] font-medium transition-all border border-white/10 cursor-pointer"
                          title="Simulate student pausing from their portal"
                        >
                          <RefreshCw size={11} className="inline mr-1" />
                          Simulate Pause
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      )}

      {/* TAB 2: INSTANT ORDERS KANBAN */}
      {dashboardTab === 'orders' && (
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
      )}
    </div>
  );
}

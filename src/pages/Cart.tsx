import { useState } from 'react';
import { ArrowLeft, ArrowRight, Minus, Plus, Trash2, Tag, ShoppingBag, Store, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../context/CartContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Input from '../components/Input';
import SectionHeading from '../components/SectionHeading';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal, totalQuantity } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  
  const deliveryFee = items.length > 0 ? 3.99 : 0;
  const taxes = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + taxes - discount;

  // Group items by restaurant
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.restaurant]) acc[item.restaurant] = [];
    acc[item.restaurant].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'AURORA50') {
      setDiscount(subtotal * 0.5);
      setCouponError('');
    } else if (coupon.toUpperCase() === 'FREEDEL') {
      setDiscount(deliveryFee);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setDiscount(0);
    }
  };

  return (
    <div className="pt-24 pb-32 container mx-auto px-4 lg:px-8 relative min-h-screen">
      {/* Background Orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-aurora-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-aurora-purple/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 font-medium cursor-pointer"
      >
        <ArrowLeft size={18} /> Continue Shopping
      </button>

      <SectionHeading 
        title={
          <span className="flex items-center gap-3">
            <ShoppingBag className="text-aurora-cyan" /> Your Cart
          </span>
        } 
        subtitle={`${totalQuantity} items ready for checkout.`}
      />

      {items.length === 0 ? (
        <GlassCard className="p-12 flex flex-col items-center justify-center text-center max-w-2xl mx-auto border-white/5 bg-background/40">
          <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-muted mb-6 shadow-inner">
            <ShoppingBag size={48} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Your cart is empty</h3>
          <p className="text-slate-400 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Discover amazing dishes nearby.</p>
          <Button variant="primary" onClick={() => navigate('/')}>Start Browsing</Button>
        </GlassCard>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* LEFT: CART ITEMS */}
          <div className="flex-1 space-y-8">
            {Object.entries(groupedItems).map(([restaurantName, restaurantItems]) => (
              <GlassCard key={restaurantName} className="overflow-hidden bg-background/40 border-white/10">
                <div className="p-4 bg-white/5 border-b border-glass-border flex items-center gap-2">
                  <Store size={18} className="text-aurora-purple" />
                  <h3 className="font-bold text-white text-lg">{restaurantName}</h3>
                </div>
                
                <div className="p-6 space-y-6">
                  {restaurantItems.map(item => {
                    const customExtra = Object.values(item.customizations).reduce((sum, c) => sum + c.extraPrice, 0);
                    const itemTotal = (item.price + customExtra) * item.quantity;

                    return (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 shadow-lg">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop';
                            }}
                          />
                        </div>
                        
                        <div className="flex-1 flex flex-col min-w-0">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h4 className="font-bold text-white text-lg truncate">{item.name}</h4>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-muted hover:text-status-error transition-colors shrink-0 p-1"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          
                          <div className="mb-2 flex-1">
                            {Object.entries(item.customizations).map(([key, val]) => (
                              <p key={key} className="text-xs text-slate-400">
                                {key}: <span className="text-slate-300">{val.option}</span> {val.extraPrice > 0 ? `(+₹${val.extraPrice.toFixed(2)})` : ''}
                              </p>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="font-bold text-lg text-aurora-cyan">
                              ₹{itemTotal.toFixed(2)}
                            </div>
                            
                            <div className="flex items-center bg-white/5 rounded-lg border border-white/10 shadow-sm">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 transition-colors rounded-l-lg"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-10 text-center text-sm font-bold text-white">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 transition-colors rounded-r-lg"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            ))}
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="w-full lg:w-96 shrink-0">
            <GlassCard className="p-6 sticky top-28 bg-background/60 backdrop-blur-3xl shadow-2xl border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="mb-6 flex gap-2">
                <div className="flex-1">
                  <Input 
                    placeholder="Promo Code" 
                    value={coupon} 
                    onChange={e => setCoupon(e.target.value)}
                    leftIcon={<Tag size={16} />}
                    inputClassName="h-11"
                    error={couponError}
                  />
                </div>
                <Button variant="ghost" className="h-11 border border-glass-border" onClick={applyCoupon}>
                  Apply
                </Button>
              </div>

              <div className="space-y-4 text-sm mb-6 border-b border-glass-border pb-6">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Delivery Fee</span>
                  <span className="text-white font-medium">₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Taxes (8%)</span>
                  <span className="text-white font-medium">₹{taxes.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-status-success font-medium">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-3xl font-extrabold text-aurora-cyan">₹{total.toFixed(2)}</span>
              </div>
              
              <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-3 text-sm text-slate-300">
                <MapPin size={18} className="text-aurora-purple shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white mb-0.5">Delivery to Current Location</p>
                  <p className="opacity-80">124 Culinary Avenue, Floor 4</p>
                </div>
              </div>

              <Button 
                variant="primary" 
                size="lg" 
                fullWidth 
                rightIcon={<ArrowRight size={18} />}
                className="shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </GlassCard>
          </div>
          
        </div>
      )}
    </div>
  );
}

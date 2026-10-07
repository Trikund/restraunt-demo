import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Home, Briefcase, Navigation, Plus, 
  CreditCard, Smartphone, Wallet, Banknote, 
  CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck,
  Clock, Store
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

const STEPS = ['Address', 'Summary', 'Payment', 'Confirmation'];

const ADDRESSES = [
  { id: 'home', type: 'Home', icon: Home, address: '124 Culinary Avenue, Floor 4, Food District' },
  { id: 'work', type: 'Work', icon: Briefcase, address: '88 Tech Park, Building C, Innovation Sector' },
  { id: 'other', type: 'Other', icon: Navigation, address: '45 Sunset Boulevard, Apt 12B' },
];

const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI / QR', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
  { id: 'wallet', name: 'Digital Wallet', icon: Wallet, description: 'Amazon Pay, Mobikwik' },
  { id: 'cod', name: 'Cash on Delivery', icon: Banknote, description: 'Pay via cash or UPI on delivery' },
];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Fixed values for simulation
  const deliveryFee = items.length > 0 ? 3.99 : 0;
  const taxes = subtotal * 0.08;
  const total = subtotal + deliveryFee + taxes;

  // Protect route if cart is empty
  useEffect(() => {
    if (items.length === 0 && currentStep !== 4) {
      navigate('/cart');
    }
  }, [items, currentStep, navigate]);

  const { currentUser } = useAuth();
  const { createOrder } = useOrders();

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      const addr = ADDRESSES.find(a => a.id === selectedAddress) || ADDRESSES[0];
      
      // Create mock order
      const newOrder = createOrder({
        customerId: currentUser.id,
        customerName: currentUser.name,
        customerPhone: currentUser.phone,
        restaurantId: items.length > 0 ? (items[0] as any).restaurantId || 1 : 1, // Fallback to 1
        restaurantName: items.length > 0 ? (items[0] as any).restaurant || 'Truffle & Vine' : 'Truffle & Vine',
        restaurantAddress: '123 Gourmet Lane, Culinary District',
        restaurantLatitude: 28.6139,
        restaurantLongitude: 77.2090,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        subtotal,
        deliveryFee,
        tax: taxes,
        discount: 0,
        totalAmount: total,
        paymentMethod: selectedPayment,
        paymentStatus: 'COMPLETED',
        deliveryAddress: {
          label: addr.type,
          name: currentUser.name,
          phone: currentUser.phone,
          addressLine: addr.address,
          city: 'Dehradun',
          state: 'Uttarakhand',
          pincode: '248001'
        },
        deliveryLatitude: 28.6200,
        deliveryLongitude: 77.2200,
        estimatedDeliveryTime: '45 mins'
      });
      
      setOrderId(newOrder.orderId);
      clearCart();
      navigate(`/tracking/${newOrder.orderId}`);
    }, 2500);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Determine main restaurant for confirmation display (just pick the first one)
  const mainRestaurant = items.length > 0 ? items[0].restaurant : 'AuroraFood';

  return (
    <div className="pt-24 pb-32 container mx-auto px-4 lg:px-8 relative min-h-screen flex flex-col">
      {/* Background Orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-aurora-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-aurora-purple/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {currentStep < 4 && (
        <div className="mb-8">
          <Link to={currentStep === 1 ? "/cart" : "#"} onClick={currentStep > 1 ? (e) => { e.preventDefault(); prevStep(); } : undefined} className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium">
            <ArrowLeft size={18} /> {currentStep === 1 ? 'Back to Cart' : 'Previous Step'}
          </Link>
        </div>
      )}

      {currentStep < 4 && (
        <div className="max-w-4xl mx-auto w-full mb-10">
          <div className="flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/5 rounded-full -z-10" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-aurora-cyan to-aurora-blue rounded-full -z-10 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />
            
            {STEPS.slice(0, 3).map((step, idx) => {
              const stepNumber = idx + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;
              
              return (
                <div key={step} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                    isActive ? 'bg-aurora-cyan text-background shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 
                    isCompleted ? 'bg-aurora-cyan/20 text-aurora-cyan' : 'bg-background border border-glass-border text-slate-500'
                  }`}>
                    {isCompleted ? <CheckCircle2 size={20} /> : stepNumber}
                  </div>
                  <span className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-slate-500'}`}>{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto w-full flex-1">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: ADDRESS */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <SectionHeading title="Delivery Address" subtitle="Where should we deliver your food?" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ADDRESSES.map((addr) => (
                  <GlassCard 
                    key={addr.id}
                    hoverable
                    className={`p-6 cursor-pointer border transition-all duration-300 ${
                      selectedAddress === addr.id 
                        ? 'border-aurora-cyan bg-aurora-cyan/5 shadow-[0_0_20px_rgba(34,211,238,0.15)]' 
                        : 'border-white/5 bg-background/50 hover:bg-white/5'
                    }`}
                    onClick={() => setSelectedAddress(addr.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        selectedAddress === addr.id ? 'bg-aurora-cyan text-background' : 'bg-white/5 text-slate-400'
                      }`}>
                        <addr.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{addr.type}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">{addr.address}</p>
                      </div>
                    </div>
                    {selectedAddress === addr.id && (
                      <div className="absolute top-4 right-4 text-aurora-cyan">
                        <CheckCircle2 size={20} fill="currentColor" className="text-background" />
                      </div>
                    )}
                  </GlassCard>
                ))}
                
                <GlassCard 
                  hoverable
                  className="p-6 cursor-pointer border-white/5 border-dashed bg-transparent hover:bg-white/5 flex flex-col items-center justify-center text-center h-full min-h-[140px]"
                >
                  <Plus size={24} className="text-slate-400 mb-2" />
                  <p className="font-medium text-slate-300">Add New Address</p>
                </GlassCard>
              </div>

              <div className="flex justify-end pt-8">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />} onClick={nextStep}>
                  Deliver Here
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SUMMARY */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <SectionHeading title="Order Summary" subtitle="Review your items before payment" />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {items.map(item => {
                    const customExtra = Object.values(item.customizations).reduce((sum, c) => sum + c.extraPrice, 0);
                    const itemTotal = (item.price + customExtra) * item.quantity;

                    return (
                      <GlassCard key={item.id} className="p-4 flex gap-4 bg-background/50 border-white/5">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-bold text-white truncate">{item.name}</h4>
                            <span className="font-bold text-aurora-cyan shrink-0">₹{itemTotal.toFixed(2)}</span>
                          </div>
                          <p className="text-xs text-slate-400 mb-1">{item.restaurant}</p>
                          <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                          {Object.keys(item.customizations).length > 0 && (
                            <p className="text-xs text-slate-500 truncate mt-1">
                              Includes customizations
                            </p>
                          )}
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>

                <div className="lg:col-span-1">
                  <GlassCard className="p-6 sticky top-28 bg-background/60 border-white/10">
                    <h3 className="font-bold text-white mb-6">Bill Details</h3>
                    <div className="space-y-4 text-sm mb-6 border-b border-glass-border pb-6">
                      <div className="flex justify-between text-slate-300">
                        <span>Item Total</span>
                        <span className="text-white font-medium">₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Delivery Fee</span>
                        <span className="text-white font-medium">₹{deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Taxes & Charges</span>
                        <span className="text-white font-medium">₹{taxes.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-lg font-bold text-white">To Pay</span>
                      <span className="text-2xl font-extrabold text-aurora-cyan">₹{total.toFixed(2)}</span>
                    </div>
                    <Button variant="primary" size="lg" fullWidth onClick={nextStep} className="shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                      Continue to Payment
                    </Button>
                  </GlassCard>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PAYMENT */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <SectionHeading title="Payment Method" subtitle="All transactions are secure and encrypted." />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {PAYMENT_METHODS.map((method) => (
                    <GlassCard 
                      key={method.id}
                      hoverable
                      className={`p-5 cursor-pointer border transition-all duration-300 ${
                        selectedPayment === method.id 
                          ? 'border-aurora-purple bg-aurora-purple/5 shadow-[0_0_20px_rgba(168,85,247,0.15)]' 
                          : 'border-white/5 bg-background/50 hover:bg-white/5'
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          selectedPayment === method.id ? 'bg-aurora-purple text-white' : 'bg-white/5 text-slate-400'
                        }`}>
                          <method.icon size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white">{method.name}</h4>
                          <p className="text-sm text-slate-400">{method.description}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selectedPayment === method.id ? 'border-aurora-purple' : 'border-slate-600'
                        }`}>
                          {selectedPayment === method.id && <div className="w-3 h-3 bg-aurora-purple rounded-full" />}
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                  
                  <div className="flex items-center gap-2 text-xs text-slate-500 justify-center mt-6">
                    <ShieldCheck size={14} /> 100% Secure Payment Guarantee
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <GlassCard className="p-6 sticky top-28 bg-background/60 border-white/10 text-center">
                    <p className="text-slate-400 text-sm mb-2">Total Amount</p>
                    <h2 className="text-4xl font-extrabold text-white mb-8">₹{total.toFixed(2)}</h2>
                    
                    <Button 
                      variant="primary" 
                      size="lg" 
                      fullWidth 
                      onClick={handlePayment} 
                      disabled={isProcessing}
                      className="h-14 text-lg shadow-[0_0_20px_rgba(34,211,238,0.3)] bg-gradient-to-r from-aurora-cyan to-aurora-blue border-none hover:brightness-110"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        `Pay ₹${total.toFixed(2)}`
                      )}
                    </Button>
                  </GlassCard>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: CONFIRMATION */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10"
            >
              <GlassCard className="p-8 md:p-12 max-w-2xl w-full text-center bg-background/60 border-status-success/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-status-success/50 to-aurora-cyan/50" />
                
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-24 h-24 rounded-full bg-status-success/10 flex items-center justify-center mx-auto mb-6 text-status-success"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                
                <h1 className="text-3xl font-extrabold text-white mb-2">Order Confirmed!</h1>
                <p className="text-slate-300 mb-8 max-w-md mx-auto">
                  Your payment was successful and your order has been sent to the restaurant.
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-left bg-white/5 p-6 rounded-2xl mb-8">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Order ID</p>
                    <p className="font-bold text-white font-mono">{orderId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Amount Paid</p>
                    <p className="font-bold text-aurora-cyan">₹{total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Restaurant</p>
                    <p className="font-bold text-white flex items-center gap-1.5 truncate"><Store size={14} className="text-muted" /> {mainRestaurant}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Est. Delivery</p>
                    <p className="font-bold text-white flex items-center gap-1.5"><Clock size={14} className="text-muted" /> 35 mins</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="primary" size="lg" className="px-8 shadow-[0_0_20px_rgba(34,211,238,0.2)]" onClick={() => navigate(`/tracking/${orderId}`)}>
                    Track Order
                  </Button>
                  <Button variant="ghost" size="lg" className="px-8 bg-white/5 hover:bg-white/10" onClick={() => navigate('/')}>
                    Continue Exploring
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

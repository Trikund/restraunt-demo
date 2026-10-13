import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Home, Briefcase, Navigation, 
  CreditCard, Smartphone, Wallet, Banknote, 
  CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck,
  Clock, Store, Users, Printer
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import RazorpayModal from '../components/RazorpayModal';
import SplitBillCalculator from '../components/SplitBillCalculator';
import InvoiceModal from '../components/InvoiceModal';

const STEPS = ['Address', 'Summary', 'Payment', 'Confirmation'];

const CAMPUS_HUBS = [
  { 
    id: 'boys_hostel_b', 
    type: 'Boys Hostel Block B', 
    tag: 'Popular Hub', 
    icon: Home, 
    hub: 'Main Lobby & Security Guard Desk', 
    address: 'Boys Hostel Block B, West Wing Portico, University Campus' 
  },
  { 
    id: 'girls_hostel_gate', 
    type: 'Girls Hostel Gate 1', 
    tag: 'Security Hub', 
    icon: ShieldCheck, 
    hub: 'Security Porch & Waiting Area', 
    address: 'Girls Hostel Complex, Gate 1 Security Kiosk, University Campus' 
  },
  { 
    id: 'boys_hostel_a', 
    type: 'Boys Hostel Block A', 
    tag: 'Direct Gate', 
    icon: Home, 
    hub: 'Ground Floor Foyer & Waiting Area', 
    address: 'Boys Hostel Block A, Main Entrance, University Campus' 
  },
  { 
    id: 'library_portico', 
    type: 'Central Library Porch', 
    tag: 'Midnight Study Spot', 
    icon: Navigation, 
    hub: 'Entrance Steps & Bicycle Stand', 
    address: 'Central Campus Library, Main Portico, University Campus' 
  },
  { 
    id: 'campus_main_gate', 
    type: 'Main Campus Gate 1', 
    tag: 'Campus Entry', 
    icon: Briefcase, 
    hub: 'Security Gate 1 & Visitor Desk', 
    address: 'Main University Road, Gate 1 Drop-off' 
  },
  { 
    id: 'off_campus_pg', 
    type: 'Off-Campus Student PG', 
    tag: 'Doorstep', 
    icon: Navigation, 
    hub: 'Street 4 / Main Door', 
    address: 'Premnagar Student Colony, Lane 3' 
  },
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
  const [selectedAddress, setSelectedAddress] = useState('boys_hostel_b');
  const [roomDetails, setRoomDetails] = useState('Room 304, 3rd Floor');
  const [deliveryInstructions, setDeliveryInstructions] = useState<string[]>([
    'Call on arrival at hostel gate',
    'Leave with hostel security guard'
  ]);
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSplitBillOpen, setIsSplitBillOpen] = useState(false);
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [placedOrder, setPlacedOrder] = useState<any>(null);

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

  const createFinalOrder = (payId?: string) => {
    const hub = CAMPUS_HUBS.find(a => a.id === selectedAddress) || CAMPUS_HUBS[0];
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Create mock order
    const newOrder = createOrder({
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      restaurantId: items.length > 0 ? (items[0] as any).restaurantId || 1 : 1,
      restaurantName: items.length > 0 ? (items[0] as any).restaurant || 'FlavorNest Local' : 'FlavorNest Local',
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
      hostelDropOffHub: hub.type,
      hostelRoomDetails: roomDetails,
      hostelInstructions: deliveryInstructions,
      deliveryOtp: generatedOtp,
      deliveryAddress: {
        label: hub.type,
        name: currentUser.name,
        phone: currentUser.phone,
        addressLine: `${hub.type} (${roomDetails}), ${hub.address}`,
        city: 'Dehradun',
        state: 'Uttarakhand',
        pincode: '248001'
      },
      deliveryLatitude: 28.6200,
      deliveryLongitude: 77.2200,
      estimatedDeliveryTime: '25-35 mins'
    });
    
    setOrderId(newOrder.orderId);
    setPlacedOrder({
      ...newOrder,
      paymentId: payId || `pay_${Date.now()}`
    });
    clearCart();
    setCurrentStep(4);
  };

  const handlePayment = () => {
    if (selectedPayment === 'cod') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        createFinalOrder();
      }, 1500);
    } else {
      setIsRazorpayOpen(true);
    }
  };

  const handleRazorpaySuccess = (payId: string) => {
    setIsRazorpayOpen(false);
    setPaymentId(payId);
    createFinalOrder(payId);
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
          
          {/* STEP 1: CAMPUS DROP-OFF HUB */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <SectionHeading 
                  title="Campus Drop-off Hub" 
                  subtitle="Select your hostel gate or designated campus delivery point" 
                  className="mb-0"
                />
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-aurora-cyan/10 border border-aurora-cyan/30 text-aurora-cyan inline-flex items-center gap-1 self-start sm:self-auto">
                  <ShieldCheck size={12} /> Geofenced Campus Drop-off
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CAMPUS_HUBS.map((addr) => (
                  <GlassCard 
                    key={addr.id}
                    hoverable
                    className={`p-5 cursor-pointer border transition-all duration-300 relative ${
                      selectedAddress === addr.id 
                        ? 'border-aurora-cyan bg-aurora-cyan/5 shadow-[0_0_20px_rgba(34,211,238,0.15)]' 
                        : 'border-white/5 bg-background/50 hover:bg-white/5'
                    }`}
                    onClick={() => setSelectedAddress(addr.id)}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        selectedAddress === addr.id ? 'bg-aurora-cyan text-background font-bold' : 'bg-white/5 text-slate-400'
                      }`}>
                        <addr.icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0 pr-6">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-white text-sm truncate">{addr.type}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-slate-300">
                            {addr.tag}
                          </span>
                        </div>
                        <p className="text-xs text-aurora-cyan font-medium mb-0.5">{addr.hub}</p>
                        <p className="text-[11px] text-slate-400 leading-relaxed truncate">{addr.address}</p>
                      </div>
                    </div>
                    {selectedAddress === addr.id && (
                      <div className="absolute top-4 right-4 text-aurora-cyan">
                        <CheckCircle2 size={18} fill="currentColor" className="text-background" />
                      </div>
                    )}
                  </GlassCard>
                ))}
              </div>

              {/* Room & Floor Details */}
              <GlassCard className="p-5 bg-white/5 border-white/10 space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Home size={16} className="text-aurora-cyan" />
                  <h4 className="text-sm font-bold text-white">Room Number & Floor Specification</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Hostel Room / Wing Details
                    </label>
                    <input
                      type="text"
                      value={roomDetails}
                      onChange={(e) => setRoomDetails(e.target.value)}
                      placeholder="e.g., Room 304, 3rd Floor, West Wing"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-aurora-cyan focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Contact for Gate Handover
                    </label>
                    <input
                      type="text"
                      defaultValue={currentUser.phone}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-aurora-cyan focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Hostel Drop-off Instructions */}
                <div className="pt-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-2">
                    Hostel Rider Handover Protocols
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Call on arrival at hostel gate',
                      'Leave with hostel security guard',
                      'Silent delivery (Roommate sleeping / studying)',
                      'Meet at central porch steps'
                    ].map((instruction) => {
                      const isSelected = deliveryInstructions.includes(instruction);
                      return (
                        <button
                          key={instruction}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setDeliveryInstructions(deliveryInstructions.filter(i => i !== instruction));
                            } else {
                              setDeliveryInstructions([...deliveryInstructions, instruction]);
                            }
                          }}
                          className={`px-3 py-2 rounded-xl text-xs font-medium text-left flex items-center gap-2 border transition-all ${
                            isSelected
                              ? 'bg-aurora-cyan/15 border-aurora-cyan/40 text-aurora-cyan font-bold'
                              : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-aurora-cyan border-aurora-cyan text-black' : 'border-white/20'
                          }`}>
                            {isSelected && <CheckCircle2 size={12} />}
                          </div>
                          <span className="truncate">{instruction}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </GlassCard>

              <div className="flex justify-end pt-4">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />} onClick={nextStep}>
                  Confirm Drop-off Hub
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

                    {/* Roommate Bill Split Option */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setIsSplitBillOpen(!isSplitBillOpen)}
                        className="w-full text-xs font-bold text-aurora-purple hover:text-purple-300 py-2 px-3 rounded-xl bg-aurora-purple/10 border border-aurora-purple/20 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <Users size={14} /> Split Bill with Roommates?
                        </span>
                        <span>{isSplitBillOpen ? '▲ Close' : '▼ Calculate'}</span>
                      </button>
                      {isSplitBillOpen && (
                        <div className="mt-3">
                          <SplitBillCalculator totalAmount={total} />
                        </div>
                      )}
                    </div>
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
                
                <div className="grid grid-cols-2 gap-4 text-left bg-white/5 p-6 rounded-2xl mb-6">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Order ID</p>
                    <p className="font-bold text-white font-mono">{orderId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Amount Paid</p>
                    <p className="font-bold text-aurora-cyan">₹{total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Campus Drop-off</p>
                    <p className="font-bold text-white flex items-center gap-1.5 truncate"><Store size={14} className="text-muted" /> {placedOrder?.hostelDropOffHub || mainRestaurant}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Est. Delivery</p>
                    <p className="font-bold text-white flex items-center gap-1.5"><Clock size={14} className="text-muted" /> 25-35 mins</p>
                  </div>
                </div>

                {/* Gate Handover OTP Badge */}
                {placedOrder?.deliveryOtp && (
                  <div className="mb-8 p-4 rounded-xl bg-aurora-cyan/10 border border-aurora-cyan/30 text-center">
                    <p className="text-xs text-slate-300 mb-1 font-semibold">Hostel Gate Handover OTP</p>
                    <p className="text-3xl font-black tracking-widest text-aurora-cyan font-mono">{placedOrder.deliveryOtp}</p>
                    <p className="text-[11px] text-slate-400 mt-1">Share this 4-digit OTP with your rider at the hostel gate for secure collection</p>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="primary" size="lg" className="px-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]" onClick={() => navigate(`/tracking/${orderId}`)}>
                    Track Order
                  </Button>
                  <Button 
                    variant="glass" 
                    size="lg" 
                    className="px-6 border-white/20 hover:border-aurora-cyan"
                    leftIcon={<Printer size={16} />}
                    onClick={() => setIsInvoiceOpen(true)}
                  >
                    Official GST Invoice
                  </Button>
                  <Button variant="ghost" size="lg" className="px-6 bg-white/5 hover:bg-white/10" onClick={() => navigate('/')}>
                    Continue Exploring
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Razorpay Simulated Gateway */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        onSuccess={handleRazorpaySuccess}
        amount={total}
        orderId={orderId || 'ORD-TXN-PENDING'}
        merchantName={mainRestaurant}
      />

      {/* Official Tax Invoice Modal */}
      {placedOrder && (
        <InvoiceModal
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
          data={{
            invoiceNumber: `INV-${placedOrder.orderId}`,
            orderId: placedOrder.orderId,
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            customerName: currentUser.name,
            customerPhone: currentUser.phone,
            deliveryAddress: `${placedOrder.deliveryAddress.addressLine}, ${placedOrder.deliveryAddress.city}`,
            vendorName: placedOrder.restaurantName,
            items: placedOrder.items.map((i: any) => ({
              name: i.name,
              quantity: i.quantity,
              price: i.price
            })),
            subtotal: placedOrder.subtotal,
            deliveryFee: placedOrder.deliveryFee,
            tax: placedOrder.tax,
            totalAmount: placedOrder.totalAmount,
            paymentMethod: (placedOrder.paymentMethod || 'UPI').toUpperCase(),
            paymentId: placedOrder.paymentId || paymentId
          }}
        />
      )}
    </div>
  );
}

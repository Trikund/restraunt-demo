import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from './Button';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, removeFromCart, subtotal, totalQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background/90 backdrop-blur-2xl border-l border-white/10 z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-glass-border">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingBag size={20} className="text-aurora-cyan" />
                Your Cart
                <span className="text-sm font-normal text-muted bg-white/5 px-2 py-0.5 rounded-full">
                  {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                </span>
              </h2>
              <button 
                onClick={closeCart}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                  <ShoppingBag size={48} className="text-muted mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Your cart is empty</h3>
                  <p className="text-sm text-slate-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
                  <Button variant="primary" onClick={closeCart}>Start Browsing</Button>
                </div>
              ) : (
                items.map(item => {
                  const customExtra = Object.values(item.customizations).reduce((sum, c) => sum + c.extraPrice, 0);
                  const itemTotal = (item.price + customExtra) * item.quantity;

                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
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
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4 className="font-bold text-white leading-tight">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted hover:text-status-error transition-colors shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <p className="text-xs text-slate-400 mb-2">{item.restaurant}</p>
                        
                        {Object.entries(item.customizations).map(([key, val]) => (
                          <p key={key} className="text-xs text-slate-500 line-clamp-1">
                            {key}: {val.option} {val.extraPrice > 0 ? `(+₹${val.extraPrice.toFixed(2)})` : ''}
                          </p>
                        ))}

                        <div className="flex items-center justify-between mt-auto pt-3">
                          <div className="font-bold text-aurora-cyan">
                            ₹{itemTotal.toFixed(2)}
                          </div>
                          
                          <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-white hover:bg-white/10 transition-colors rounded-l-lg"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-white hover:bg-white/10 transition-colors rounded-r-lg"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-glass-border bg-background/50">
                <div className="flex justify-between items-center mb-4 text-sm">
                  <span className="text-slate-300">Subtotal</span>
                  <span className="font-bold text-white">₹{subtotal.toFixed(2)}</span>
                </div>
                
                <Button 
                  variant="primary" 
                  fullWidth 
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                  onClick={handleCheckoutClick}
                  className="shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                >
                  Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

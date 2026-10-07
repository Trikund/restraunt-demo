import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, ChefHat, ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Explore', path: '/explore', icon: Compass },
  { name: 'Recipes', path: '/recipes', icon: ChefHat },
  { name: 'Cart', path: '/cart', icon: ShoppingBag },
  { name: 'Profile', path: '/profile', icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  const { totalQuantity } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 p-4 pointer-events-none">
      <div className="glass bg-background/80 backdrop-blur-xl border border-glass-border rounded-full px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/50 pointer-events-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          const badgeCount = item.name === 'Cart' ? totalQuantity : undefined;
          
          return (
            <Link 
              key={item.name} 
              to={item.path}
              className="relative flex flex-col items-center justify-center w-12 h-12"
            >
              <div className={`relative transition-colors duration-300 ${isActive ? 'text-aurora-cyan' : 'text-muted'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                
                {badgeCount !== undefined && badgeCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-status-error text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-background">
                    {badgeCount}
                  </span>
                )}
              </div>
              
              {isActive && (
                <motion.div 
                  layoutId="bottom-nav-indicator"
                  className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-aurora-cyan glow-cyan"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

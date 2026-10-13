import { Link } from 'react-router-dom';
import { Globe, Camera, MessageCircle, Share2 } from 'lucide-react';
import IconButton from './IconButton';

export default function Footer() {
  return (
    <footer className="border-t border-glass-border bg-background/50 backdrop-blur-md pt-16 pb-24 md:pb-12 mt-20 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-aurora-blue/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="text-3xl font-extrabold aurora-text tracking-tight block mb-4">
              AuroraFood
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6 max-w-sm">
              Experience the pinnacle of culinary delivery. We connect you with world-class chefs and exclusive restaurants for a dining experience unlike any other.
            </p>
            <div className="flex gap-3">
              <IconButton icon={<Globe size={18} />} variant="ghost" size="sm" />
              <IconButton icon={<MessageCircle size={18} />} variant="ghost" size="sm" />
              <IconButton icon={<Camera size={18} />} variant="ghost" size="sm" />
              <IconButton icon={<Share2 size={18} />} variant="ghost" size="sm" />
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-foreground font-bold mb-4">Discover</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link to="/subscriptions" className="hover:text-aurora-cyan transition-colors font-medium">🍱 Tiffin & Meal Plans</Link></li>
              <li><Link to="/restaurants" className="hover:text-aurora-cyan transition-colors">Campus Messes & Dhabas</Link></li>
              <li><Link to="/explore" className="hover:text-aurora-cyan transition-colors">Explore All Food</Link></li>
              <li><Link to="/offers" className="hover:text-aurora-cyan transition-colors">Student Discounts</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-bold mb-4">Portals & Operations</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link to="/subscriptions/manage" className="hover:text-aurora-cyan transition-colors">Student Meal Punch-Card</Link></li>
              <li><Link to="/restaurant/dashboard" className="hover:text-aurora-cyan transition-colors font-medium">B2B Vendor Dispatch Portal</Link></li>
              <li><Link to="/about" className="hover:text-aurora-cyan transition-colors">System Architecture</Link></li>
              <li><Link to="/contact" className="hover:text-aurora-cyan transition-colors">Campus Coordinator</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-bold mb-4">Contact & Node</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>Hostel Node: Premnagar Campus Hub</li>
              <li>Support: support@aurorafood.in</li>
              <li>Emergency: +91 98765 43210</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-glass-border pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">&copy; {new Date().getFullYear()} AuroraFood. AI-Powered Local Food Subscription & Delivery Platform.</p>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span>Powered by AuroraGlass Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

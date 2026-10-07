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
              <li><Link to="/explore" className="hover:text-aurora-cyan transition-colors">Explore</Link></li>
              <li><Link to="/restaurants" className="hover:text-aurora-cyan transition-colors">Restaurants</Link></li>
              <li><Link to="/recipes" className="hover:text-aurora-cyan transition-colors">Recipes</Link></li>
              <li><Link to="/offers" className="hover:text-aurora-cyan transition-colors">Special Offers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-bold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link to="/terms" className="hover:text-aurora-cyan transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-aurora-cyan transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:text-aurora-cyan transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>Support: help@aurorafood.com</li>
              <li>Partners: partners@aurorafood.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-glass-border pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">&copy; {new Date().getFullYear()} AuroraFood. Premium Dining Experiences.</p>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span>Powered by AuroraGlass</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

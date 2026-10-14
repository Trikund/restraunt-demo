import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, Search, Sun, Moon, Menu, X, Home, 
  UtensilsCrossed, Store, Tag, CalendarDays, Info, Phone, 
  MapPin, ChevronDown 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocationContext } from '../context/LocationContext';
import SearchModal from './SearchModal';
import MockRoleSwitcher from './MockRoleSwitcher';

const primaryNavLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Tiffin Plans', path: '/subscriptions', icon: CalendarDays, badge: 'AI' },
  { name: 'Exam Night 🌙', path: '/restaurants?midnight=true', icon: Moon },
  { name: 'Restaurants', path: '/restaurants', icon: Store },
  { name: 'Menu', path: '/explore', icon: UtensilsCrossed },
];

const moreNavLinks = [
  { name: 'Offers & Discounts', path: '/offers', icon: Tag, desc: 'Student coupons & deals' },
  { name: 'Book a Table', path: '/reservation', icon: CalendarDays, desc: 'Dine-in reservation' },
  { name: 'About Platform', path: '/about', icon: Info, desc: 'Architecture & vision' },
  { name: 'Contact & Support', path: '/contact', icon: Phone, desc: 'Helpdesk & feedback' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { totalQuantity, openCart } = useCart();
  const { city, area, setIsModalOpen } = useLocationContext();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    setIsDark(isDarkMode);
    localStorage.setItem('aurora_theme', isDarkMode ? 'dark' : 'light');
  };

  const isMoreActive = moreNavLinks.some(link => location.pathname === link.path);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-lg shadow-black/5' 
          : 'bg-background/60 backdrop-blur-md border-b border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-20 flex items-center justify-between gap-2 sm:gap-3">
          
          {/* 🍽️ Logo + Location Pill */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-aurora-cyan/15 flex items-center justify-center group-hover:scale-105 transition-transform border border-aurora-cyan/30">
                <UtensilsCrossed className="text-aurora-cyan" size={22} />
              </div>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Aurora<span className="text-aurora-cyan">Food</span>
              </span>
            </Link>

            {/* Quick Location Trigger */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-aurora-cyan/40 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shrink-0 max-w-[140px] lg:max-w-[170px]"
              title="Change delivery location"
            >
              <MapPin size={13} className="text-aurora-cyan shrink-0" />
              <span className="truncate">{area}, {city}</span>
              <ChevronDown size={11} className="text-slate-400 shrink-0" />
            </button>
          </div>

          {/* 🖥️ Desktop Primary Nav (Streamlined to prevent cut-off) */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNavLinks.map((link) => {
              const isActive = link.path.includes('?') 
                ? `${location.pathname}${location.search}` === link.path
                : location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'text-aurora-cyan bg-aurora-cyan/10 font-bold border border-aurora-cyan/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-aurora-cyan text-[#111111] uppercase tracking-wider">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div className="relative" ref={moreDropdownRef}>
              <button
                type="button"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                  isMoreActive || isMoreOpen
                    ? 'text-aurora-cyan bg-aurora-cyan/10 font-bold border border-aurora-cyan/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <span>More</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 shadow-2xl p-2 z-50 space-y-1 backdrop-blur-2xl">
                  {moreNavLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMoreOpen(false)}
                        className={`flex items-start gap-2.5 p-2 rounded-xl text-xs transition-all ${
                          isActive
                            ? 'bg-aurora-cyan/15 text-aurora-cyan font-bold'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-white/10 shrink-0 text-aurora-cyan">
                          <Icon size={14} />
                        </div>
                        <div>
                          <p className="font-semibold">{link.name}</p>
                          <p className="text-[10px] text-slate-400 font-normal leading-tight">{link.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* ⚡ Right Actions: Compact Role Switcher + Utilities + Auth */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Compact Role Switcher */}
            <div className="hidden md:block">
              <MockRoleSwitcher compact />
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-5 bg-slate-200 dark:bg-white/10 mx-0.5" />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer"
              title="Toggle Theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Search */}
            <button
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
              title="Search Dishes & Restaurants"
            >
              <Search size={16} />
            </button>

            {/* Cart */}
            <button
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all relative cursor-pointer"
              onClick={openCart}
              title="View Cart"
            >
              <ShoppingBag size={16} />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-aurora-cyan text-[#111111] text-[9px] font-extrabold flex items-center justify-center shadow-[0_0_8px_rgba(255,184,0,0.6)]">
                  {totalQuantity > 9 ? '9+' : totalQuantity}
                </span>
              )}
            </button>

            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center gap-1.5 ml-1 pl-2 border-l border-slate-200 dark:border-white/10">
              <Link
                to="/login"
                className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-xs whitespace-nowrap"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3.5 py-1.5 rounded-xl bg-aurora-cyan text-[#111111] font-bold hover:brightness-105 transition-all text-xs shadow-md shadow-aurora-cyan/20 whitespace-nowrap"
              >
                Sign Up
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className="lg:hidden w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer ml-1"
              onClick={() => setIsMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* 📱 Mobile Menu Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 📱 Mobile Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 bg-white dark:bg-[#0d1117] border-l border-slate-200 dark:border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100 dark:border-white/10">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Aurora<span className="text-aurora-cyan">Food</span>
            </span>
            <button
              className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              onClick={() => setIsMobileOpen(false)}
            >
              <X size={16} />
            </button>
          </div>

          {/* Location selector in mobile drawer */}
          <div className="px-4 py-3 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/10">
            <button
              onClick={() => {
                setIsMobileOpen(false);
                setIsModalOpen(true);
              }}
              className="w-full flex items-center justify-between text-left p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin size={14} className="text-aurora-cyan shrink-0" />
                <span className="truncate">{area}, {city}</span>
              </div>
              <span className="text-[10px] text-aurora-cyan font-bold uppercase shrink-0 ml-1">Change</span>
            </button>
          </div>

          {/* All Nav Links */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Main Navigation</p>
            {primaryNavLinks.map((link) => {
              const isActive = link.path.includes('?') 
                ? `${location.pathname}${location.search}` === link.path
                : location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-aurora-cyan/15 text-aurora-cyan font-bold border border-aurora-cyan/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="ml-auto text-[9px] font-black px-2 py-0.5 rounded-full bg-aurora-cyan text-[#111111] uppercase tracking-wider shadow-sm">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-3 pb-1">
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">More Options</p>
              {moreNavLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? 'bg-aurora-cyan/15 text-aurora-cyan font-bold border border-aurora-cyan/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Role Switcher in mobile */}
          <div className="px-4 py-3 border-t border-slate-100 dark:border-white/10">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Switch Demo Role</p>
            <MockRoleSwitcher />
          </div>

          {/* Auth buttons in mobile */}
          <div className="px-4 pb-6 grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-white/10 pt-3">
            <Link 
              to="/login" 
              onClick={() => setIsMobileOpen(false)}
              className="text-center py-2.5 rounded-xl border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white font-bold text-xs hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              onClick={() => setIsMobileOpen(false)}
              className="text-center py-2.5 rounded-xl bg-aurora-cyan text-[#111111] font-bold text-xs hover:brightness-105 transition-all shadow-md shadow-aurora-cyan/20"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

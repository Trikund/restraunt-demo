import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Sun, Moon, Menu, X, Home, UtensilsCrossed, Store, Tag, CalendarDays, Info, Phone, MapPin, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocationContext } from '../context/LocationContext';
import SearchModal from './SearchModal';
import MockRoleSwitcher from './MockRoleSwitcher';

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Menu', path: '/explore', icon: UtensilsCrossed },
  { name: 'Restaurants', path: '/restaurants', icon: Store },
  { name: 'Offers', path: '/offers', icon: Tag },
  { name: 'Book Table', path: '/reservation', icon: CalendarDays },
  { name: 'About', path: '/about', icon: Info },
  { name: 'Contact', path: '/contact', icon: Phone },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const location = useLocation();
  const { totalQuantity, openCart } = useCart();
  const { city, area, setIsModalOpen } = useLocationContext();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    setIsDark(isDarkMode);
    localStorage.setItem('aurora_theme', isDarkMode ? 'dark' : 'light');
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 lg:px-6 h-20 flex items-center justify-between gap-3">
          
          {/* 🍽️ Logo + Location Pill */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-aurora-cyan/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <UtensilsCrossed className="text-aurora-cyan" size={24} />
              </div>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Aurora<span className="text-aurora-cyan">Food</span>
              </span>
            </Link>

            {/* Quick Location Trigger */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-aurora-cyan/40 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shrink-0 max-w-[180px]"
              title="Change delivery location"
            >
              <MapPin size={13} className="text-aurora-cyan shrink-0" />
              <span className="truncate">{area}, {city}</span>
              <ChevronDown size={11} className="text-slate-400 shrink-0" />
            </button>
          </div>

          {/* 🖥️ Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-aurora-cyan bg-aurora-cyan/10'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-aurora-cyan" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ⚡ Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Role Switcher */}
            <div className="hidden lg:block">
              <MockRoleSwitcher />
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-6 bg-slate-200 dark:bg-white/10 mx-1" />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              title="Toggle Theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Search */}
            <button
              className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              onClick={() => setIsSearchOpen(true)}
              title="Search"
            >
              <Search size={16} />
            </button>

            {/* Cart */}
            <button
              className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all relative"
              onClick={openCart}
              title="Cart"
            >
              <ShoppingBag size={16} />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-aurora-cyan text-[#111111] text-[9px] font-extrabold flex items-center justify-center shadow-[0_0_8px_rgba(34,211,238,0.6)]">
                  {totalQuantity > 9 ? '9+' : totalQuantity}
                </span>
              )}
            </button>

            {/* Auth buttons */}
            <div className="hidden lg:flex items-center gap-2 ml-1 pl-3 border-l border-slate-200 dark:border-white/10">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-sm whitespace-nowrap"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-aurora-cyan text-[#111111] font-bold hover:bg-aurora-cyan/90 transition-all text-sm shadow-lg shadow-aurora-cyan/20 whitespace-nowrap"
              >
                Sign Up
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className="xl:hidden w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all ml-1"
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
          className="fixed inset-0 z-40 bg-black/40 dark:bg-black/60 backdrop-blur-sm xl:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 📱 Mobile Drawer */}
      <div className={`fixed top-0 right-0 h-full w-72 z-50 bg-white dark:bg-[#0d1117] border-l border-slate-200 dark:border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out xl:hidden ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100 dark:border-white/8">
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
          <div className="px-4 py-3 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/8">
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

          {/* Nav Links */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-aurora-cyan/10 text-aurora-cyan border border-aurora-cyan/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Role Switcher in mobile */}
          <div className="px-4 py-4 border-t border-slate-100 dark:border-white/8">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-3">Switch Role (Demo)</p>
            <MockRoleSwitcher />
          </div>

          {/* Auth buttons in mobile */}
          <div className="px-4 pb-6 grid grid-cols-2 gap-3">
            <Link 
              to="/login" 
              onClick={() => setIsMobileOpen(false)}
              className="text-center py-2.5 rounded-xl border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              onClick={() => setIsMobileOpen(false)}
              className="text-center py-2.5 rounded-xl bg-aurora-cyan text-[#111111] font-bold text-sm hover:bg-aurora-cyan/90 transition-all"
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

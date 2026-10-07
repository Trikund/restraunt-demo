import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, ChefHat, Sun, Moon, Menu, X, Home, UtensilsCrossed, Store, Tag, CalendarDays, Info, Phone } from 'lucide-react';
import SearchModal from './SearchModal';
import MockRoleSwitcher from './MockRoleSwitcher';
import { useScroll } from '../hooks/useScroll';
import { useCart } from '../context/CartContext';

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
  const { scrolled } = useScroll(20);
  const { totalQuantity, openCart } = useCart();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  const glassStyle = scrolled
    ? 'bg-[#0d1117]/90 backdrop-blur-xl border-white/8 shadow-2xl shadow-black/30'
    : 'bg-transparent border-transparent';

  return (
    <>
      <header className={`fixed top-0 w-full z-50 border-b transition-all duration-500 ${glassStyle}`}>
        <div className="container mx-auto px-4 lg:px-8 h-18 flex items-center justify-between" style={{ height: '72px' }}>

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-aurora-cyan/10 border border-aurora-cyan/30 flex items-center justify-center group-hover:bg-aurora-cyan/20 transition-colors">
              <ChefHat className="text-aurora-cyan" size={20} />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              Aurora<span className="text-aurora-cyan">Food</span>
            </span>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────────────────── */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-aurora-cyan bg-aurora-cyan/8'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
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

          {/* ── Right Actions ─────────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Role Switcher — only on large screens */}
            <div className="hidden xl:block">
              <MockRoleSwitcher />
            </div>

            {/* Divider */}
            <div className="hidden xl:block w-px h-6 bg-white/10 mx-1" />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              title="Toggle Theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Search */}
            <button
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              onClick={() => setIsSearchOpen(true)}
              title="Search"
            >
              <Search size={16} />
            </button>

            {/* Cart */}
            <button
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all relative"
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

            {/* Auth buttons — desktop */}
            <div className="hidden lg:flex items-center gap-2 ml-1 pl-3 border-l border-white/10">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-white/15 text-slate-300 font-medium hover:bg-white/5 hover:text-white hover:border-white/30 transition-all text-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-aurora-cyan text-[#111111] font-bold hover:bg-aurora-blue hover:text-white transition-all text-sm shadow-lg shadow-aurora-cyan/20"
              >
                Sign Up
              </Link>
            </div>

            {/* Hamburger — mobile/tablet */}
            <button
              className="xl:hidden w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all ml-1"
              onClick={() => setIsMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ─────────────────────────────────────────── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ───────────────────────────────────────────────── */}
      <div className={`fixed top-0 right-0 h-full w-72 z-50 bg-[#0d1117] border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out xl:hidden ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
            <span className="text-white font-extrabold text-lg">
              Aurora<span className="text-aurora-cyan">Food</span>
            </span>
            <button
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white"
              onClick={() => setIsMobileOpen(false)}
            >
              <X size={16} />
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-aurora-cyan/10 text-aurora-cyan border border-aurora-cyan/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Role Switcher in mobile */}
          <div className="px-4 py-4 border-t border-white/8">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-3">Switch Role (Demo)</p>
            <MockRoleSwitcher />
          </div>

          {/* Auth buttons in mobile */}
          <div className="px-4 pb-6 grid grid-cols-2 gap-3">
            <Link to="/login" className="text-center py-2.5 rounded-xl border border-white/15 text-white font-bold text-sm hover:bg-white/5 transition-all">
              Login
            </Link>
            <Link to="/signup" className="text-center py-2.5 rounded-xl bg-aurora-cyan text-[#111111] font-bold text-sm hover:bg-aurora-blue hover:text-white transition-all">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

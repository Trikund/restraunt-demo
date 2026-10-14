import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/order';
import { User, Store, Bike, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MockRoleSwitcherProps {
  compact?: boolean;
}

export default function MockRoleSwitcher({ compact = false }: MockRoleSwitcherProps) {
  const { currentUser, switchRole } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    setIsOpen(false);
    if (role === UserRole.RESTAURANT) navigate('/restaurant/dashboard');
    else if (role === UserRole.DELIVERY_PARTNER) navigate('/delivery/dashboard');
    else navigate('/');
  };

  const roles = [
    { role: UserRole.CUSTOMER, label: 'Customer', icon: User, activeClass: 'bg-aurora-cyan text-[#111111]' },
    { role: UserRole.RESTAURANT, label: 'Restaurant', icon: Store, activeClass: 'bg-food-coral text-white' },
    { role: UserRole.DELIVERY_PARTNER, label: 'Delivery', icon: Bike, activeClass: 'bg-aurora-blue text-white' },
  ];

  const currentRoleObj = roles.find(r => r.role === currentUser.role) || roles[0];
  const CurrentIcon = currentRoleObj.icon;

  if (compact) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm border border-slate-300 dark:border-white/10 ${currentRoleObj.activeClass}`}
          title="Switch Demo Role"
        >
          <CurrentIcon size={14} />
          <span>{currentRoleObj.label}</span>
          <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 shadow-2xl p-1.5 z-50 space-y-1 backdrop-blur-xl">
            <p className="px-2.5 py-1 text-[10px] uppercase font-bold text-slate-400">Switch Demo Role</p>
            {roles.map(({ role, label, icon: Icon, activeClass }) => {
              const isSelected = currentUser.role === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleChange(role)}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all text-left ${
                    isSelected
                      ? `${activeClass} shadow-sm font-bold`
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon size={15} />
                  <span>{label}</span>
                  {isSelected && <span className="ml-auto text-[10px] font-black uppercase">Active</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex bg-slate-200/50 dark:bg-white/5 p-1 rounded-xl border border-slate-300 dark:border-white/10 items-center gap-1">
      {roles.map(({ role, label, icon: Icon, activeClass }) => (
        <button
          key={role}
          onClick={() => handleRoleChange(role)}
          title={`Switch to ${label}`}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            currentUser.role === role 
              ? activeClass 
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-white/5'
          }`}
        >
          <Icon size={14} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

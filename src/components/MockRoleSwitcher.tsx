import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/order';
import { User, Store, Bike } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MockRoleSwitcher() {
  const { currentUser, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    if (role === UserRole.RESTAURANT) navigate('/restaurant/dashboard');
    else if (role === UserRole.DELIVERY_PARTNER) navigate('/delivery/dashboard');
    else navigate('/');
  };

  const roles = [
    { role: UserRole.CUSTOMER, label: 'Customer', icon: User, activeClass: 'bg-aurora-cyan text-[#111111]' },
    { role: UserRole.RESTAURANT, label: 'Restaurant', icon: Store, activeClass: 'bg-food-coral text-white' },
    { role: UserRole.DELIVERY_PARTNER, label: 'Delivery', icon: Bike, activeClass: 'bg-aurora-blue text-white' },
  ];

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
          <span className="hidden 2xl:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

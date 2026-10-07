import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { UserRole } from '../types/order';

interface User {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  // Role specific IDs
  restaurantId?: number; // Only for RESTAURANT role (e.g. 1 for Truffle & Vine)
  partnerId?: string; // Only for DELIVERY_PARTNER role
}

// Mock Users
const MOCK_USERS: Record<UserRole, User> = {
  [UserRole.CUSTOMER]: {
    id: 'cust_123',
    name: 'Shivam Kumar',
    role: UserRole.CUSTOMER,
    phone: '9876543210'
  },
  [UserRole.RESTAURANT]: {
    id: 'mgr_001',
    name: 'Chef Luigi',
    role: UserRole.RESTAURANT,
    phone: '1112223333',
    restaurantId: 1 // Truffle & Vine
  },
  [UserRole.DELIVERY_PARTNER]: {
    id: 'dp_007',
    name: 'Rahul Delivery',
    role: UserRole.DELIVERY_PARTNER,
    phone: '9998887777',
    partnerId: 'partner_007'
  },
  [UserRole.ADMIN]: {
    id: 'admin_1',
    name: 'Admin System',
    role: UserRole.ADMIN,
    phone: '0000000000'
  }
};

interface AuthContextType {
  currentUser: User;
  switchRole: (role: UserRole) => void;
  setRestaurantContext: (restaurantId: number) => void; // To allow testing multiple restaurants
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('mock_current_user');
    return saved ? JSON.parse(saved) : MOCK_USERS[UserRole.CUSTOMER];
  });

  useEffect(() => {
    localStorage.setItem('mock_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const switchRole = (role: UserRole) => {
    setCurrentUser(MOCK_USERS[role]);
  };

  const setRestaurantContext = (restaurantId: number) => {
    if (currentUser.role === UserRole.RESTAURANT) {
      setCurrentUser({ ...currentUser, restaurantId });
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, switchRole, setRestaurantContext }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

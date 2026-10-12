import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { 
  SubscriptionPlan, 
  UserSubscription, 
  PlanDuration, 
  MealSlot 
} from '../types/subscription';
import { mockSubscriptionPlans, initialMockActiveSubscription } from '../data/mockSubscriptions';

interface SubscriptionContextType {
  plans: SubscriptionPlan[];
  activeSubscription: UserSubscription | null;
  subscribeToPlan: (
    plan: SubscriptionPlan,
    duration: PlanDuration,
    selectedSlots: MealSlot[],
    deliveryAddress: string
  ) => UserSubscription;
  pauseDates: (dates: string[]) => void;
  unpauseDate: (date: string) => void;
  skipMealSlot: (date: string, slot: MealSlot, reason?: string) => void;
  unskipMealSlot: (date: string, slot: MealSlot) => void;
  resumeSubscription: () => void;
  cancelSubscription: () => void;
  updateDeliveryAddress: (address: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const STORAGE_KEY = 'aurora_active_subscription';

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [plans] = useState<SubscriptionPlan[]>(mockSubscriptionPlans);
  
  const [activeSubscription, setActiveSubscription] = useState<UserSubscription | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse active subscription from localStorage', err);
      }
    }
    return initialMockActiveSubscription;
  });

  useEffect(() => {
    if (activeSubscription) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeSubscription));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [activeSubscription]);

  const subscribeToPlan = (
    plan: SubscriptionPlan,
    duration: PlanDuration,
    selectedSlots: MealSlot[],
    deliveryAddress: string
  ): UserSubscription => {
    const totalDays = duration === 'weekly' ? 7 : 30;
    const pricePaid = duration === 'weekly' ? plan.weeklyPrice : plan.monthlyPrice;
    
    const now = new Date();
    const startDate = now.toISOString().split('T')[0];
    
    const end = new Date(now.getTime() + totalDays * 24 * 60 * 60 * 1000);
    const endDate = end.toISOString().split('T')[0];

    const defaultTimes: Partial<Record<MealSlot, string>> = {
      breakfast: '08:00 AM - 08:45 AM',
      lunch: '12:45 PM - 01:30 PM',
      dinner: '08:00 PM - 08:45 PM'
    };

    const deliveryTimeSlots: Partial<Record<MealSlot, string>> = {};
    selectedSlots.forEach(slot => {
      deliveryTimeSlots[slot] = defaultTimes[slot];
    });

    const newSub: UserSubscription = {
      id: `usr_sub_${Date.now()}`,
      planId: plan.id,
      planTitle: plan.title,
      vendorId: plan.vendorId,
      vendorName: plan.vendorName,
      vendorType: plan.vendorType,
      duration,
      selectedSlots,
      deliveryTimeSlots,
      startDate,
      endDate,
      totalDays,
      consumedDays: 0,
      status: 'ACTIVE',
      pausedDates: [],
      skippedMeals: [],
      deliveryAddress: deliveryAddress || 'Campus Hostel / Flat Address',
      pricePaid
    };

    setActiveSubscription(newSub);
    return newSub;
  };

  const pauseDates = (datesToAdd: string[]) => {
    if (!activeSubscription) return;

    const existingSet = new Set(activeSubscription.pausedDates);
    let addedCount = 0;
    datesToAdd.forEach(d => {
      if (!existingSet.has(d)) {
        existingSet.add(d);
        addedCount++;
      }
    });

    // Automatically extend end date by added paused days
    const currentEnd = new Date(activeSubscription.endDate);
    const newEnd = new Date(currentEnd.getTime() + addedCount * 24 * 60 * 60 * 1000);

    setActiveSubscription({
      ...activeSubscription,
      pausedDates: Array.from(existingSet).sort(),
      endDate: newEnd.toISOString().split('T')[0]
    });
  };

  const unpauseDate = (dateToRemove: string) => {
    if (!activeSubscription) return;

    const updated = activeSubscription.pausedDates.filter(d => d !== dateToRemove);
    setActiveSubscription({
      ...activeSubscription,
      pausedDates: updated
    });
  };

  const skipMealSlot = (date: string, slot: MealSlot, reason?: string) => {
    if (!activeSubscription) return;

    const exists = activeSubscription.skippedMeals.some(s => s.date === date && s.slot === slot);
    if (exists) return;

    setActiveSubscription({
      ...activeSubscription,
      skippedMeals: [...activeSubscription.skippedMeals, { date, slot, reason: reason || 'Personal Preference' }]
    });
  };

  const unskipMealSlot = (date: string, slot: MealSlot) => {
    if (!activeSubscription) return;

    setActiveSubscription({
      ...activeSubscription,
      skippedMeals: activeSubscription.skippedMeals.filter(s => !(s.date === date && s.slot === slot))
    });
  };

  const resumeSubscription = () => {
    if (!activeSubscription) return;
    setActiveSubscription({
      ...activeSubscription,
      status: 'ACTIVE'
    });
  };

  const cancelSubscription = () => {
    if (!activeSubscription) return;
    setActiveSubscription({
      ...activeSubscription,
      status: 'CANCELLED'
    });
  };

  const updateDeliveryAddress = (newAddress: string) => {
    if (!activeSubscription) return;
    setActiveSubscription({
      ...activeSubscription,
      deliveryAddress: newAddress
    });
  };

  return (
    <SubscriptionContext.Provider
      value={{
        plans,
        activeSubscription,
        subscribeToPlan,
        pauseDates,
        unpauseDate,
        skipMealSlot,
        unskipMealSlot,
        resumeSubscription,
        cancelSubscription,
        updateDeliveryAddress
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptions() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptions must be used within a SubscriptionProvider');
  }
  return context;
}

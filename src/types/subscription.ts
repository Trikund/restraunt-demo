export type MealSlot = 'breakfast' | 'lunch' | 'dinner';
export type MealFrequency = 1 | 2 | 3;
export type PlanDuration = 'weekly' | 'monthly';
export type DietaryType = 'veg' | 'non-veg' | 'jain';
export type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'EXPIRED';

export interface SkippedMeal {
  date: string; // YYYY-MM-DD
  slot: MealSlot;
  reason?: string;
}

export interface SubscriptionPlan {
  id: string;
  vendorId: number;
  vendorName: string;
  vendorType: 'Tiffin Service' | 'Student Mess' | 'Home Chef' | 'Dhaba';
  vendorImage: string;
  vendorRating: number;
  title: string;
  description: string;
  mealFrequency: MealFrequency;
  includedSlots: MealSlot[];
  allowedSlotChoices?: MealSlot[]; // For 1 or 2 meals where user selects which slots they want
  dietaryType: DietaryType;
  weeklyPrice: number;
  monthlyPrice: number;
  features: string[];
  sampleMenu: Partial<Record<MealSlot, string>>;
}

export interface UserSubscription {
  id: string;
  planId: string;
  planTitle: string;
  vendorId: number;
  vendorName: string;
  vendorType: string;
  duration: PlanDuration;
  selectedSlots: MealSlot[];
  deliveryTimeSlots: Partial<Record<MealSlot, string>>;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  totalDays: number;
  consumedDays: number;
  status: SubscriptionStatus;
  pausedDates: string[]; // List of YYYY-MM-DD strings
  skippedMeals: SkippedMeal[];
  deliveryAddress: string;
  pricePaid: number;
}

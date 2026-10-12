import type { SubscriptionPlan, UserSubscription } from '../types/subscription';

export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'sub_annapurna_2',
    vendorId: 101,
    vendorName: 'Maa Annapurna Tiffin Center',
    vendorType: 'Tiffin Service',
    vendorImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1000&auto=format&fit=crop',
    vendorRating: 4.8,
    title: 'Ghar Jaisa Swad (2 Meals/Day)',
    description: 'Pure vegetarian homestyle balanced meals delivered hot in 4-tier insulated tiffins. Light on oil, easy to digest daily nutrition.',
    mealFrequency: 2,
    includedSlots: ['lunch', 'dinner'],
    allowedSlotChoices: ['lunch', 'dinner'],
    dietaryType: 'veg',
    weeklyPrice: 999,
    monthlyPrice: 3599,
    features: [
      '4 Phulkas + Seasonal Sabzi + Dal Tadka + Rice',
      'Free salad & pickle with every meal',
      'Daily rotating sabzi menu',
      'Weekend pause allowed'
    ],
    sampleMenu: {
      lunch: '4 Butter Roti, Dal Tadka, Aloo Gobhi, Jeera Rice, Salad',
      dinner: '4 Tawa Phulka, Mix Veg, Yellow Moong Dal, Pickle'
    }
  },
  {
    id: 'sub_annapurna_3',
    vendorId: 101,
    vendorName: 'Maa Annapurna Tiffin Center',
    vendorType: 'Tiffin Service',
    vendorImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1000&auto=format&fit=crop',
    vendorRating: 4.8,
    title: 'Full Day Care (3 Meals/Day)',
    description: 'Complete 3-meal solution for hostel & PG students. Breakfast, Lunch, and Dinner taken care of so you can focus completely on your studies.',
    mealFrequency: 3,
    includedSlots: ['breakfast', 'lunch', 'dinner'],
    dietaryType: 'veg',
    weeklyPrice: 1399,
    monthlyPrice: 4899,
    features: [
      'Nutritious breakfast (Poha/Paratha/Idli) + Tea',
      'Homestyle Lunch & Dinner in stainless tiffin',
      'Sunday special sweet dish / Kheer',
      'Zero delivery charges to student hostels'
    ],
    sampleMenu: {
      breakfast: '2 Stuffed Aloo Paratha with Curd & Pickle',
      lunch: '4 Phulka, Paneer Bhurji, Arhar Dal, Basmati Rice',
      dinner: '4 Phulka, Lauki Chana Dal, Seasonal Sabzi'
    }
  },
  {
    id: 'sub_pahadi_mess_1',
    vendorId: 102,
    vendorName: 'Pahadi Student Mess & Dhaba',
    vendorType: 'Student Mess',
    vendorImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1000&auto=format&fit=crop',
    vendorRating: 4.6,
    title: 'Hostel Saver (1 Meal/Day)',
    description: 'Budget-friendly single meal plan designed for students who skip college mess food or need guaranteed dinner/lunch delivery.',
    mealFrequency: 1,
    includedSlots: ['dinner'],
    allowedSlotChoices: ['breakfast', 'lunch', 'dinner'],
    dietaryType: 'veg',
    weeklyPrice: 549,
    monthlyPrice: 1999,
    features: [
      'Unlimited rice & dal portion sizes',
      'Affordable pocket-friendly student pricing',
      'Late-night delivery slots up to 10:00 PM',
      'Quick single-meal skip with refund credits'
    ],
    sampleMenu: {
      dinner: '5 Tawa Roti, Rajma Masala, Steamed Rice, Gulab Jamun (Wed/Sun)'
    }
  },
  {
    id: 'sub_sunita_homechef_2',
    vendorId: 103,
    vendorName: 'Homely Bites by Sunita',
    vendorType: 'Home Chef',
    vendorImage: 'https://images.unsplash.com/photo-1505253758473-96b3d5ebcd96?q=80&w=1000&auto=format&fit=crop',
    vendorRating: 4.9,
    title: 'Maa Ke Haath Ka Khana (2 Meals/Day)',
    description: 'Cooked fresh by a loving home chef in small batches. Made with low sodium, pure cow ghee, and zero artificial preservatives.',
    mealFrequency: 2,
    includedSlots: ['lunch', 'dinner'],
    allowedSlotChoices: ['lunch', 'dinner'],
    dietaryType: 'veg',
    weeklyPrice: 1199,
    monthlyPrice: 4299,
    features: [
      'Cooked in Desi Cow Ghee with farm-fresh veggies',
      'Custom spice level (Mild / Medium / Spicy)',
      'Jain & No-Onion-No-Garlic custom options available',
      'Individual reusable leakproof containers'
    ],
    sampleMenu: {
      lunch: '4 Ghee Phulka, Panchmel Dal, Bhindi Fry, Steamed Rice',
      dinner: '4 Ghee Phulka, Matar Paneer, Moong Dal Khichdi'
    }
  },
  {
    id: 'sub_fitness_fuel_3',
    vendorId: 104,
    vendorName: 'Campus Fuel Gym Mess',
    vendorType: 'Student Mess',
    vendorImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1000&auto=format&fit=crop',
    vendorRating: 4.7,
    title: 'High-Protein Muscle Builder (3 Meals/Day)',
    description: 'Specifically engineered for college gym goers & athletes. High in protein, exact macros counted, and clean carbs for lean muscle recovery.',
    mealFrequency: 3,
    includedSlots: ['breakfast', 'lunch', 'dinner'],
    dietaryType: 'non-veg',
    weeklyPrice: 1699,
    monthlyPrice: 5999,
    features: [
      '110g+ Daily Protein guaranteed (Eggs/Chicken/Paneer)',
      'High-fiber brown rice & multigrain rotis',
      'Pre-workout breakfast + macro summary sticker',
      'Zero refined sugar and clean cooking oils'
    ],
    sampleMenu: {
      breakfast: '4 Boiled Eggs / Paneer Sprout Bowl + Peanut Butter Toast',
      lunch: '200g Grilled Chicken / Tofu Soya Curry + Brown Rice + Greens',
      dinner: '5 Multigrain Rotis, Chicken Keema / Paneer Bhurji + Dal'
    }
  },
  {
    id: 'sub_punjab_dhaba_2',
    vendorId: 105,
    vendorName: 'Punjab Mail Dhaba',
    vendorType: 'Dhaba',
    vendorImage: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1000&auto=format&fit=crop',
    vendorRating: 4.5,
    title: 'Dhaba Tadka Special (2 Meals/Day)',
    description: 'Authentic rich Punjabi dhaba flavors. Extra large rotis, hearty makhani gravy, and complimentary lassi on weekends.',
    mealFrequency: 2,
    includedSlots: ['lunch', 'dinner'],
    allowedSlotChoices: ['lunch', 'dinner'],
    dietaryType: 'veg',
    weeklyPrice: 899,
    monthlyPrice: 3299,
    features: [
      'Heavy Tandoori / Butter Tawa Rotis',
      'Rich Dal Makhani & Kadai dishes',
      'Free chilled Sweet Lassi every Saturday',
      'Student discount with college ID'
    ],
    sampleMenu: {
      lunch: '4 Butter Rotis, Dal Makhani, Mixed Vegetable, Rice',
      dinner: '4 Butter Rotis, Chana Masala, Jeera Aloo, Raita'
    }
  }
];

// Initial mock active subscription for demo purposes
export const initialMockActiveSubscription: UserSubscription = {
  id: 'usr_sub_101',
  planId: 'sub_annapurna_2',
  planTitle: 'Ghar Jaisa Swad (2 Meals/Day)',
  vendorId: 101,
  vendorName: 'Maa Annapurna Tiffin Center',
  vendorType: 'Tiffin Service',
  duration: 'monthly',
  selectedSlots: ['lunch', 'dinner'],
  deliveryTimeSlots: {
    lunch: '12:45 PM - 01:30 PM',
    dinner: '08:00 PM - 08:45 PM'
  },
  startDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 6 days ago
  endDate: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 24 days remaining
  totalDays: 30,
  consumedDays: 6,
  status: 'ACTIVE',
  pausedDates: [],
  skippedMeals: [
    {
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      slot: 'dinner',
      reason: 'Hostel Birthday Party'
    }
  ],
  deliveryAddress: 'Hostel Block B, Room 204, Campus Hostel Road',
  pricePaid: 3599
};

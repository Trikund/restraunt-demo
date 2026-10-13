export interface VendorSubscriber {
  id: string;
  customerName: string;
  phone: string;
  deliveryLocation: string;
  planTitle: string;
  frequency: string;
  mealSlots: ('breakfast' | 'lunch' | 'dinner')[];
  daysRemaining: number;
  todayStatus: 'ACTIVE' | 'WEEKEND_PAUSED' | 'SLOT_SKIPPED';
  dispatchStatus: 'PENDING' | 'PREPARING' | 'DISPATCHED' | 'DELIVERED';
  tiffinBoxNumber: string;
  dietary: 'Veg' | 'Non-Veg';
}

export const initialVendorSubscribers: VendorSubscriber[] = [
  {
    id: 'SUB-STU-01',
    customerName: 'Aarav Kumar',
    phone: '+91 98765 43210',
    deliveryLocation: 'Hostel Block B, Room 204 (North Wing)',
    planTitle: 'Ghar Jaisa Swad (2 Meals/Day)',
    frequency: '2 Meals / Day',
    mealSlots: ['lunch', 'dinner'],
    daysRemaining: 18,
    todayStatus: 'ACTIVE',
    dispatchStatus: 'DISPATCHED',
    tiffinBoxNumber: 'TIF-104',
    dietary: 'Veg'
  },
  {
    id: 'SUB-STU-02',
    customerName: 'Priya Sharma',
    phone: '+91 98123 45678',
    deliveryLocation: 'Girls Hostel Gate 2, Room 312',
    planTitle: 'Maa Ke Haath Ka Khana (2 Meals/Day)',
    frequency: '2 Meals / Day',
    mealSlots: ['lunch', 'dinner'],
    daysRemaining: 24,
    todayStatus: 'ACTIVE',
    dispatchStatus: 'PREPARING',
    tiffinBoxNumber: 'TIF-089',
    dietary: 'Veg'
  },
  {
    id: 'SUB-STU-03',
    customerName: 'Rohan Verma',
    phone: '+91 97654 32109',
    deliveryLocation: 'Hostel Block A, Room 108',
    planTitle: 'Full Day Care (3 Meals/Day)',
    frequency: '3 Meals / Day',
    mealSlots: ['breakfast', 'lunch', 'dinner'],
    daysRemaining: 12,
    todayStatus: 'WEEKEND_PAUSED',
    dispatchStatus: 'PENDING',
    tiffinBoxNumber: 'TIF-052',
    dietary: 'Veg'
  },
  {
    id: 'SUB-STU-04',
    customerName: 'Karan Mehra',
    phone: '+91 96543 21098',
    deliveryLocation: 'Premnagar PG Hub, Flat 3B',
    planTitle: 'High-Protein Muscle Builder (3 Meals/Day)',
    frequency: '3 Meals / Day',
    mealSlots: ['breakfast', 'lunch', 'dinner'],
    daysRemaining: 21,
    todayStatus: 'ACTIVE',
    dispatchStatus: 'PREPARING',
    tiffinBoxNumber: 'TIF-210',
    dietary: 'Non-Veg'
  },
  {
    id: 'SUB-STU-05',
    customerName: 'Ananya Gupta',
    phone: '+91 95432 10987',
    deliveryLocation: 'Girls Hostel Gate 1, Room 115',
    planTitle: 'Hostel Saver (1 Meal/Day)',
    frequency: '1 Meal / Day',
    mealSlots: ['dinner'],
    daysRemaining: 9,
    todayStatus: 'SLOT_SKIPPED',
    dispatchStatus: 'PENDING',
    tiffinBoxNumber: 'TIF-034',
    dietary: 'Veg'
  },
  {
    id: 'SUB-STU-06',
    customerName: 'Vikram Joshi',
    phone: '+91 94321 09876',
    deliveryLocation: 'Main Campus Road, Flat 402',
    planTitle: 'Dhaba Tadka Special (2 Meals/Day)',
    frequency: '2 Meals / Day',
    mealSlots: ['lunch', 'dinner'],
    daysRemaining: 27,
    todayStatus: 'ACTIVE',
    dispatchStatus: 'DELIVERED',
    tiffinBoxNumber: 'TIF-176',
    dietary: 'Veg'
  }
];

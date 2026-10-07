export const UserRole = {
  CUSTOMER: 'CUSTOMER',
  RESTAURANT: 'RESTAURANT',
  DELIVERY_PARTNER: 'DELIVERY_PARTNER',
  ADMIN: 'ADMIN'
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const OrderStatus = {
  PLACED: 'PLACED',
  RESTAURANT_ACCEPTED: 'RESTAURANT_ACCEPTED',
  RESTAURANT_REJECTED: 'RESTAURANT_REJECTED',
  PREPARING: 'PREPARING',
  READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  DELIVERY_ASSIGNED: 'DELIVERY_ASSIGNED',
  PARTNER_GOING_TO_RESTAURANT: 'PARTNER_GOING_TO_RESTAURANT',
  PARTNER_ARRIVED: 'PARTNER_ARRIVED',
  ORDER_PICKED_UP: 'ORDER_PICKED_UP',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  CUSTOMER_CANCELLED: 'CUSTOMER_CANCELLED',
  DELIVERY_CANCELLED: 'DELIVERY_CANCELLED'
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  customizations?: any[];
}

export interface DeliveryAddress {
  label: string;
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  orderId: string;
  
  // Customer Info
  customerId: string;
  customerName: string;
  customerPhone: string;
  
  // Restaurant Info
  restaurantId: number | string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantLatitude: number;
  restaurantLongitude: number;
  restaurantCoordinates?: { lat: number; lng: number };
  
  // Order Details
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  totalAmount: number;
  specialInstructions?: string;
  
  // Payment
  paymentMethod: string;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  
  // Delivery
  deliveryAddress: DeliveryAddress;
  deliveryLatitude: number;
  deliveryLongitude: number;
  
  // Partner Info (populated when assigned)
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  deliveryPartnerRating?: number;
  deliveryPartnerCoordinates?: { lat: number; lng: number };
  
  // Meta
  orderStatus: OrderStatus;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  estimatedDeliveryTime: string; // ISO string
}

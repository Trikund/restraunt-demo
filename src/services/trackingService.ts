import { OrderStatus } from '../types/order';
import { ORDER_SIMULATION_CONFIG } from '../config/orderSimulationConfig';

// Mock driver details to assign
const MOCK_DRIVERS = [
  { id: 'DRV-001', name: 'Alex Johnson', rating: 4.8 },
  { id: 'DRV-002', name: 'Maria Garcia', rating: 4.9 },
  { id: 'DRV-003', name: 'James Smith', rating: 4.7 }
];

// Helper to determine the next status
const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
  const flow: OrderStatus[] = [
    OrderStatus.PLACED,
    OrderStatus.RESTAURANT_ACCEPTED,
    OrderStatus.PREPARING,
    OrderStatus.READY_FOR_PICKUP,
    OrderStatus.DELIVERY_ASSIGNED,
    OrderStatus.PARTNER_GOING_TO_RESTAURANT,
    OrderStatus.PARTNER_ARRIVED,
    OrderStatus.ORDER_PICKED_UP,
    OrderStatus.OUT_FOR_DELIVERY,
    OrderStatus.DELIVERED
  ];
  
  const currentIndex = flow.indexOf(currentStatus);
  if (currentIndex === -1 || currentIndex === flow.length - 1) {
    return null;
  }
  return flow[currentIndex + 1];
};

/**
 * Service for simulating backend tracking logic
 */
export const trackingService = {
  
  // Start the background simulation for a given order
  simulateOrderProgress(
    currentStatus: OrderStatus,
    onUpdate: (updates: any) => void
  ) {
    if (!ORDER_SIMULATION_CONFIG.AUTO_SIMULATE) return null;
    
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return null;

    const delay = ORDER_SIMULATION_CONFIG.STATUS_DELAYS[currentStatus as keyof typeof ORDER_SIMULATION_CONFIG.STATUS_DELAYS] || 2000;

    const timeoutId = setTimeout(() => {
      const updates: any = { orderStatus: nextStatus };
      
      // If we just assigned a driver, add their details
      if (nextStatus === OrderStatus.DELIVERY_ASSIGNED) {
        const driver = MOCK_DRIVERS[Math.floor(Math.random() * MOCK_DRIVERS.length)];
        updates.deliveryPartnerId = driver.id;
        updates.deliveryPartnerName = driver.name;
        updates.deliveryPartnerRating = driver.rating;
        // Mock partner starting coords near the restaurant
        updates.deliveryPartnerCoordinates = { lat: 28.6100, lng: 77.2000 };
      }

      onUpdate(updates);
    }, delay);

    return timeoutId;
  }
};

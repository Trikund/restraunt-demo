export const ORDER_SIMULATION_CONFIG = {
  // Time in milliseconds for each status transition during simulation
  STATUS_DELAYS: {
    PLACED: 2000,
    RESTAURANT_ACCEPTED: 2000,
    PREPARING: 4000,
    READY_FOR_PICKUP: 2000,
    DELIVERY_ASSIGNED: 2000,
    PARTNER_GOING_TO_RESTAURANT: 3000,
    PARTNER_ARRIVED: 2000,
    ORDER_PICKED_UP: 2000,
    OUT_FOR_DELIVERY: 8000, // Longest for map animation
    DELIVERED: 0,
  },
  
  // Speed of the partner marker on the map during OUT_FOR_DELIVERY (ms per step)
  MARKER_UPDATE_INTERVAL: 100,
  
  // Enable or disable automatic simulation
  AUTO_SIMULATE: true,
};

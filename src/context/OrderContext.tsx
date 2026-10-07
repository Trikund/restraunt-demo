import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { OrderStatus } from '../types/order';
import type { Order } from '../types/order';

interface OrderContextType {
  orders: Order[];
  createOrder: (order: Omit<Order, 'orderId' | 'orderStatus' | 'createdAt' | 'updatedAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  assignDeliveryPartner: (orderId: string, partnerId: string, partnerName: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getCustomerOrders: (customerId: string) => Order[];
  getRestaurantOrders: (restaurantId: number | string) => Order[];
  getAvailableDeliveryRequests: () => Order[];
  getPartnerActiveDelivery: (partnerId: string) => Order | undefined;
  getPartnerCompletedDeliveries: (partnerId: string) => Order[];
  updateOrderTracking: (orderId: string, updates: Partial<Order>) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mock_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mock_orders', JSON.stringify(orders));
  }, [orders]);

  const generateOrderId = () => {
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000).toString();
  };

  const createOrder = (orderData: Omit<Order, 'orderId' | 'orderStatus' | 'createdAt' | 'updatedAt'>) => {
    const newOrder: Order = {
      ...orderData,
      orderId: generateOrderId(),
      orderStatus: OrderStatus.PLACED,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.orderId === orderId ? { ...order, orderStatus: status, updatedAt: new Date().toISOString() } : order
    ));
  };

  const updateOrderTracking = (orderId: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order => 
      order.orderId === orderId ? { ...order, ...updates, updatedAt: new Date().toISOString() } : order
    ));
  };

  const assignDeliveryPartner = (orderId: string, partnerId: string, partnerName: string) => {
    setOrders(prev => prev.map(order => 
      order.orderId === orderId 
        ? { 
            ...order, 
            orderStatus: OrderStatus.DELIVERY_ASSIGNED, 
            deliveryPartnerId: partnerId,
            deliveryPartnerName: partnerName 
          } 
        : order
    ));
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.orderId === orderId);
  };

  const getCustomerOrders = (customerId: string) => {
    return orders.filter(o => o.customerId === customerId);
  };

  const getRestaurantOrders = (restaurantId: number | string) => {
    return orders.filter(o => o.restaurantId === restaurantId);
  };

  const getAvailableDeliveryRequests = () => {
    return orders.filter(o => o.orderStatus === OrderStatus.READY_FOR_PICKUP);
  };

  const getPartnerActiveDelivery = (partnerId: string) => {
    return orders.find(o => 
      o.deliveryPartnerId === partnerId && 
      ([OrderStatus.DELIVERY_ASSIGNED, OrderStatus.PARTNER_GOING_TO_RESTAURANT, OrderStatus.PARTNER_ARRIVED, OrderStatus.ORDER_PICKED_UP, OrderStatus.OUT_FOR_DELIVERY] as OrderStatus[]).includes(o.orderStatus)
    );
  };

  const getPartnerCompletedDeliveries = (partnerId: string) => {
    return orders.filter(o => 
      o.deliveryPartnerId === partnerId && 
      o.orderStatus === OrderStatus.DELIVERED
    );
  };

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      updateOrderStatus,
      assignDeliveryPartner,
      getOrderById,
      getCustomerOrders,
      getRestaurantOrders,
      getAvailableDeliveryRequests,
      getPartnerActiveDelivery,
      getPartnerCompletedDeliveries,
      updateOrderTracking
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}

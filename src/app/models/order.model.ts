export interface OrderItem {
  dishId: string;
  quantity: number;
  price: number;
  specialRequest?: string;
}

export interface Order {
  orderId: string;
  userId: string;
  restaurantId: string;
  orderItems: OrderItem[];
  totalPrice: number;
  orderTime: string;
  pickupTime: string;
  status: string;
  paymentMethod: string;
}

import { Dish } from './category.model';

export interface Order {
  address: string;
  orderId: string;
  userId: string;
  restaurantId: string;
  orderItems: Dish[];
  totalPrice: number;
  orderTime: string;
  pickupTime: string;
  status: string;
  paymentMethod: string;
  reservationId?: string;
}

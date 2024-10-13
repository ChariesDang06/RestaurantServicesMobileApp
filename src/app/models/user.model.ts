import { Order } from "./order.model";
import { Reservation } from "./reservation.model";

export interface PaymentMethods {
  creditCard?: {
    cardNumber: string;
    expiryDate: string;
    cardHolder: string;
  };
  eWallet?: {
    walletType: string;
    walletId: string;
  };
}

export interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  reservationHistory?: Reservation[];
  orderHistory?: Order[];
  score?: number;
  paymentMethods?: PaymentMethods;
  avatarUrl?: string; 
}

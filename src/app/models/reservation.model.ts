import { OrderItem } from "./order.model";

export interface Reservation {
  reservationId: string;
  userId: string;
  tableId: string;
  reservationTime: string;
  numberOfPeople: number;
  preOrderedItems: OrderItem[];
  status: string;
  depositAmount: number;
  confirmationEmailSent: boolean;
  confirmationSMS: boolean;
  note:string;
}

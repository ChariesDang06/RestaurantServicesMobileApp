import { Dish } from './category.model';

export interface Reservation {
  reservationId: string;
  userId: string;
  tableId: string;
  reservationTime: string;
  numberOfPeople: number;
  preOrderedItems: Dish[];
  status: string;
  depositAmount: number;
  confirmationEmailSent: boolean;
  confirmationSMS: boolean;
  note: string;
}

export interface Table {
  tableId: string;
  seatAvailability: number;
  description: string;
  floor: number;
  isAvailable: boolean;
  location: string;
  reservationTimeSlots: string[];
}

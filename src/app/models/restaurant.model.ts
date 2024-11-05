export interface AvailableTime {
  date: {
    seconds: number;  // Assuming it's a Firestore Timestamp
    nanoseconds: number; // Optional, depending on your use case
  };
  time: string[]; // Array of available time slots
}

export interface Table {
  tableId: string;
  availableSeats: number;
  description: string;
  availableTime: AvailableTime[];
}

export interface Floor {
  floorId: string;
  // floor: string;
  floorName: string;
  floorDiagram: string;
  tables: Table[];
}

export interface Restaurant {
  restaurantId: string
  mapHTML: string;
  phone: string;
  address: string;
  floors: Floor[];
}
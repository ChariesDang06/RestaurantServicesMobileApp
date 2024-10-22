export interface Table {
  name: string;
  availableSeats: number;
  description: string;
}

export interface Floor {
  floor: string;
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
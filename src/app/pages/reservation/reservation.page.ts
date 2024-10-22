import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurants/restaurant.service';
import { ReservationService } from 'src/app/services/reservations/reservation.service';
import { Restaurant, Floor, Table } from 'src/app/models/restaurant.model';
import { OrderItem } from 'src/app/models/order.model'; // Import OrderItem model
import { Reservation } from 'src/app/models/reservation.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  restaurants: Restaurant[] = [];
  floors: Floor[] = [];
  tables: Table[] = [];
  
  currentDateTime: string | null = null;
  selectedFloor: Floor | null = null;
  selectedTable: Table | null = null;
  selectedDate: string | null = null;
  isDateTimeOpen: boolean = false;
  preOrderedItems: OrderItem[] = []; // Initialize preOrderedItems
  customerName: string = ''; // To hold customer name
  customerPhone: string = ''; // To hold customer phone
  customerEmail: string = ''; // To hold customer email
  confirmationEmailSent: boolean = false; // For checkbox
  depositAmount: number = 100000; // Example deposit amount
  confirmationSMSSent: boolean = false; // For SMS confirmation

  constructor(private restaurantService: RestaurantService, private reservationService: ReservationService) {}

  ngOnInit() {
    this.loadAllRestaurants();
    this.setCurrentDateTime();
  }

  loadAllRestaurants() {
    this.restaurantService.getAllRestaurants().then((restaurants) => {
      console.log('Restaurants:', restaurants);
      this.restaurants = restaurants;

      if (this.restaurants.length > 0) {
        // Set floors from the first restaurant and select the first floor by default
        this.floors = this.restaurants[0].floors;
        if (this.floors.length > 0) {
          this.setSelectedFloor(this.floors[0]);  // Set the first floor by default
        }
      }
    });
  }

  setCurrentDateTime() {
    const now = new Date();
    this.currentDateTime = now.toISOString().substring(0, 16); // e.g., "2024-10-18T15:30"
  }

  toggleDateTime() {
    this.isDateTimeOpen = !this.isDateTimeOpen; // Toggle visibility
  }

  closeDateTime() {
    this.isDateTimeOpen = false; // Close the datetime picker
  }

  // Set the selected floor and update the tables accordingly
  setSelectedFloor(floor: Floor) {
    console.log('Selected Floor:', floor);  // Debug log to check the selected floor
    this.selectedFloor = floor;
    this.tables = this.selectedFloor.tables;  // Update tables based on selected floor
    this.selectedTable = this.tables[0];  // Reset selected table when switching floors
    this.setSelectedTable(this.selectedTable);
  }

  // When user changes floor selection
  onFloorChange(event: any) {
    const selectedFloorName = event.detail.value;  // Get the selected floor from dropdown
    console.log('Floor changed to:', selectedFloorName);  // Debug log to check floor change

    const floor = this.floors.find(f => f.floor === selectedFloorName);
    if (floor) {
      this.setSelectedFloor(floor);  // Set the new selected floor
    } else {
      console.log('Floor not found!');  // Debug log if the floor is not found
    }
  }

  // Set the selected table
  setSelectedTable(table: Table) {
    console.log('Selected Table:', table);  // This should log the selected table details
    this.selectedTable = table;
  }

  // Handle table change (e.g., when user selects a different table)
  onTableChange(event: any) {
    const selectedTableName = event.detail.value;  // Use event.detail.value for Ionic
    console.log('Table changed to:', selectedTableName);

    const table = this.tables.find(t => t.name === selectedTableName);
    if (table) {
      this.setSelectedTable(table);  // Set the new selected table
    } else {
      console.log('Table not found!');  // Debug if table is not found
    }
  }

  // Handle reservation submission
  async submitReservation() {
    const reservation: Omit<Reservation, 'reservationId'> = {
      userId: 'u001', // Example user ID
      tableId: this.selectedTable?.name || '', // Provide default
      reservationTime: this.selectedDate || '', // Provide default
      numberOfPeople: this.selectedTable?.availableSeats || 1, // Default to 1
      preOrderedItems: this.preOrderedItems, // Existing preOrderedItems logic
      status: 'confirmed', // Initial status
      depositAmount: this.depositAmount,
      confirmationEmailSent: this.confirmationEmailSent,
      confirmationSMS: this.confirmationSMSSent,
    };

    try {
      await this.reservationService.createReservation(reservation);
      console.log('Reservation created successfully!');
      // Optionally navigate or show a success message
    } catch (error) {
      console.error('Error creating reservation:', error);
      // Handle the error as needed (e.g., show a message)
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RestaurantService } from 'src/app/services/restaurants/restaurant.service';
import { ReservationService } from 'src/app/services/reservations/reservation.service';
import { Restaurant, Floor, Table } from 'src/app/models/restaurant.model';
import { Reservation } from 'src/app/models/reservation.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users/user.service';
import { Dish } from 'src/app/models/category.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  restaurants: Restaurant[] = [];
  floors: Floor[] = [];
  tables: Table[] = [];
  user: User | null = null;
  userId: string | null = null;

  currentDateTime: string | null = null;
  note: string = '';
  selectedFloor: Floor | null = null;
  selectedTable: Table | null = null;
  selectedDate: string | null = null;
  selectedTime: string | null = null;
  availableTimes: string[] = [];
  availableDates: string[] = [];
  isDateTimeOpen: boolean = false;
  preOrderedItems: Dish[] = [];
  customerName: string = '';
  customerPhone: string = '';
  customerEmail: string = '';
  confirmationEmailSent: boolean = false;
  depositAmount: number = 100000;
  confirmationSMSSent: boolean = false;

  constructor(
    private restaurantService: RestaurantService,
    private reservationService: ReservationService,
    private authenticationService: AuthService,
    private userService: UserService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAllRestaurants();
    this.setCurrentDateTime();
    this.loadUser();
  }

  async loadUser() {
    this.userId = this.authenticationService.getLoggedInUserId();

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (userData: User | undefined) => {
          if (userData) {
            this.user = userData;
            this.customerEmail = this.user.email;
            this.customerName = this.user.name;
            this.customerPhone = this.user.phone;
          } else {
            console.log('No user data found');
          }
        },
        (error) => {
          console.error('Error loading user:', error);
        }
      );
    } else {
      await this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Vui lòng đăng nhập',
      message: "Nhấn 'Đăng nhập' để chuyển hướng đến trang đăng nhập",
      buttons: [
        {
          text: 'Đăng nhập',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }

  loadAllRestaurants() {
    this.restaurantService.getAllRestaurants().then((restaurants) => {
      this.restaurants = restaurants;

      if (this.restaurants.length > 0) {
        this.floors = this.restaurants[0].floors;
        if (this.floors.length > 0) {
          this.setSelectedFloor(this.floors[0]);
        }
      }
    });
  }

  setCurrentDateTime() {
    const now = new Date();
    this.currentDateTime = now.toISOString().substring(0, 16);
  }

  setSelectedFloor(floor: Floor) {
    this.selectedFloor = floor;
    this.tables = this.selectedFloor.tables;
    this.selectedTable = this.tables[0]; // Reset selected table
    this.setSelectedTable(this.selectedTable);
    this.updateAvailableDays(); // Update available days when floor is selected
  }

  updateAvailableDays() {
    this.availableDates = []; // Clear previous available dates
    if (this.selectedTable?.availableTime) {
      const today = new Date();
      const todayDateString = today.toISOString().split('T')[0];

      this.selectedTable.availableTime.forEach((timeData) => {
        const dateTimestamp = new Date(timeData.date.seconds * 1000)
          .toISOString()
          .split('T')[0];
        if (
          !this.availableDates.includes(dateTimestamp) &&
          dateTimestamp >= todayDateString
        ) {
          this.availableDates.push(dateTimestamp);
        }
      });
    }
    console.log('Available Dates:', this.availableDates);
  }

  onFloorChange(event: any) {
    const selectedFloorName = event.detail.value;

    if (this.floors && this.floors.length > 0) {
      const selectedFloor = this.floors.find(
        (floor) => floor.floor === selectedFloorName
      );

      if (selectedFloor) {
        this.setSelectedFloor(selectedFloor);
        this.updateAvailableDays(); // Update available days when floor changes
      }
    }
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
    if (this.selectedDate) {
      console.log('Selected Date:', this.selectedDate);
      this.updateAvailableTimes();
    } else {
      console.error('Invalid selected date');
    }
  }

  updateAvailableTimes() {
    this.availableTimes = []; // Clear previous available times
    if (this.selectedDate && this.selectedTable?.availableTime) {
      this.selectedTable.availableTime.forEach((timeData) => {
        const dateTimestamp = new Date(timeData.date.seconds * 1000)
          .toISOString()
          .split('T')[0];
        if (this.selectedDate === dateTimestamp) {
          this.availableTimes = timeData.time;
        }
      });

      console.log('Available Times for selected date:', this.availableTimes);
    } else {
      console.error('Invalid selection for available times');
    }
  }

  onTableChange(event: any) {
    const selectedTableName = event.detail.value;

    if (this.tables && this.tables.length > 0) {
      const selectedTable = this.tables.find(
        (table) => table.tableId === selectedTableName
      );

      if (selectedTable) {
        this.setSelectedTable(selectedTable);
        this.updateAvailableDays(); // Update available days when table changes

        // Reset available times and selected time
        this.availableTimes = [];
        this.selectedTime = null;
      }
    }
  }

  setSelectedTable(table: Table) {
    this.selectedTable = table;
  }

  onTimeChange(event: any) {
    this.selectedTime = event.detail.value;
    if (this.selectedTime) {
      console.log('Time changed to:', this.selectedTime);
    } else {
      console.error('Invalid selected time');
    }
  }

  async submitReservation() {
    if (!this.selectedTable || !this.selectedDate || !this.selectedTime) {
      const alert = await this.alertController.create({
        header: 'Missing Information',
        message: 'Please select a table, date, and time before submitting.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const reservation: Omit<Reservation, 'reservationId'> = {
      userId: this.userId || 'guest',
      tableId: this.selectedTable.tableId,
      reservationTime: `${this.selectedDate}T${this.selectedTime}`,
      numberOfPeople: this.selectedTable.availableSeats || 1,
      preOrderedItems: this.preOrderedItems,
      status: 'confirmed',
      depositAmount: this.depositAmount,
      confirmationEmailSent: this.confirmationEmailSent,
      confirmationSMS: this.confirmationSMSSent,
      note: this.note,
    };

    try {
      await this.reservationService.createReservation(reservation);
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Reservation successfully created.',
        buttons: ['OK'],
      });
      await alert.present();
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  }

  async placeOrder() {
    const reservationInfo = {
      userId: this.userId || 'guest',
      reservationTime: `${this.selectedDate || ''}T${this.selectedTime || ''}`,
      numberOfPeople: this.selectedTable?.availableSeats || 0,
      tableId: this.selectedTable?.tableId,
      note: this.note || '',
    };

    localStorage.setItem('orderMode', 'reservation');
    localStorage.setItem('reservationInfo', JSON.stringify(reservationInfo));
    this.router.navigate(['/order-main']);
  }
}

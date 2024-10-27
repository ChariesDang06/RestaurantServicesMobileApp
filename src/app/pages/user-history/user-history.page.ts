import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Observable } from 'rxjs';
import { IonTabs, ModalController } from '@ionic/angular';
import { OrderDetailsModalComponent } from 'src/app/components/order-details-modal/order-details-modal.component';
import { NavController } from '@ionic/angular';
import { Order } from 'src/app/models/order.model';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservations/reservation.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.page.html',
  styleUrls: ['./user-history.page.scss'],
})
export class UserHistoryPage implements OnInit {
  orderHistory: Order[] | null = null;
  reservationHistory: Reservation[] | null = null;
  constructor(
    private orderService: OrderService,
    private modalController: ModalController,
    private navCtrl: NavController,
    private reservationService: ReservationService
  ) {}
  selectedTab: string = 'order';

  changeTab(tab: string) {
    this.selectedTab = tab; // Update the selected tab
  }
  goBack() {
    this.navCtrl.navigateForward('/user-info-main');
  }

  ngOnInit() {
    localStorage.setItem('userId', 'jhYgPWxRwOHvNd3bfacF');
    const userId = localStorage.getItem('userId');
    this.getUserOrder();
    this.loadReservations();
    if (userId) {
    } else {
      console.error('User ID not found in localStorage');
    }
  }
  async getUserOrder() {
    localStorage.setItem('userId', 'jhYgPWxRwOHvNd3bfacF');

    const userId = localStorage.getItem('userId');
    console.log('userid', userId);
    try {
      this.orderHistory = await this.orderService.getOrdersByUserId(userId!);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);

    // Get day, month, year, hours, and minutes
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad to 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad to 2 digits
    const year = date.getFullYear(); // Get year
    const hours = String(date.getHours()).padStart(2, '0'); // Get hours and pad to 2 digits
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad to 2 digits

    // Return formatted date
    return `${day}/${month}/${year}-${hours}:${minutes}`;
  }
  async loadReservations() {
    const userId = 'jhYgPWxRwOHvNd3bfacF'; // Replace with the actual userId you want to filter by
    try {
      this.reservationHistory =
        await this.reservationService.getReservationsByUserId(userId); // Call the async method with userId
      console.log('reservationHistory', this.reservationHistory);
    } catch (err) {
      // this.error = 'Error fetching reservations'; // Handle error
      console.error(err);
    }
  }
  async openOrderDetails(
    order: Order | null = null,
    reservation: Reservation | null = null
  ) {
    if (order) {
      const modal = await this.modalController.create({
        component: OrderDetailsModalComponent,
        componentProps: {
          order: order,
        },
      });
      return await modal.present();
    } else if (reservation) {
      const modal = await this.modalController.create({
        component: OrderDetailsModalComponent,
        componentProps: {
          reservation: reservation,
        },
      });
      return await modal.present();
    }
  }
}

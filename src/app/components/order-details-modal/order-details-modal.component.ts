import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/order.model';
import { Reservation } from 'src/app/models/reservation.model'; // Đảm bảo import đúng model

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss'],
})
export class OrderDetailsModalComponent {
  @Input() order: Order | null = null;

  // Thêm biến reservation
  @Input() reservation: Reservation | null = null;

  constructor(private modalController: ModalController) {
    // console.log('Total Bill:', this.totalBill);
  }

  closeModal() {
    this.modalController.dismiss();
  }
  formatDate(dateString: string): string {
    if (dateString === '') {
      return 'Chưa nhận hàng';
    }
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
}

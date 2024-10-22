import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Reservation } from 'src/app/models/reservation.model'; // Đảm bảo import đúng model

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss'],
})
export class OrderDetailsModalComponent {
  @Input() address: string = '';
  @Input() orderItems: any[] = [];
  @Input() orderTime: any;
  @Input() paymentMethod: string = '';
  @Input() pickupTime: any;
  @Input() totalBill: number = 0;
  
  // Thêm biến reservation
  @Input() reservation: Reservation | null = null;

  constructor(private modalController: ModalController) {console.log('Total Bill:', this.totalBill);}

  closeModal() {
    this.modalController.dismiss();
  }
}

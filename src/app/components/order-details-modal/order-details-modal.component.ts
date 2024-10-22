import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

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

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }
}

import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/orders/order.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { OrderDetailsModalComponent } from 'src/app/components/order-details-modal/order-details-modal.component';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.page.html',
  styleUrls: ['./user-history.page.scss'],
})
export class UserHistoryPage implements OnInit {
  orderHistory$!: Observable<any[]>;

  constructor(
    private orderService: OrderService,
    private modalController: ModalController,
    private navCtrl: NavController
  ) {}

  goBack() {
    this.navCtrl.navigateForward('/user-info-main');
  }
  ngOnInit() {
    const userId = 'u002'; // Thay bằng userId thực tế
    this.orderHistory$ = this.orderService.getOrderHistory(userId);
  }

  async openOrderDetails(order: any) {
    const modal = await this.modalController.create({
      component: OrderDetailsModalComponent,
      componentProps: {
        address: order.address,
        orderItems: order.orderItems,
        orderTime: order.orderTime,
        paymentMethod: order.paymentMethod,
        pickupTime: order.pickupTime,
        totalBill: order.totalBill,
      },
    });

    return await modal.present();
  }
}

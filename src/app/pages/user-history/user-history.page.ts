import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
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
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.orderHistory$ = this.orderService.getOrderHistory(userId);
    } else {
      console.error('User ID not found in localStorage');
    }
  }
  async openOrderDetails(order: any) {
    console.log('Order:', order); // Log thông tin đơn hàng
    const modal = await this.modalController.create({
      component: OrderDetailsModalComponent,
      componentProps: {
        address: order.address,
        orderItems: order.orderItems,
        orderTime: order.orderTime ? order.orderTime.toDate() : null,
        

        paymentMethod: order.paymentMethod,
        pickupTime: order.pickupTime ? order.pickupTime.toDate() : null,
        // 
        totalBill: order.totalBill, // Kiểm tra lại giá trị này
        reservation: order.reservation,
      },
    });
  console.log('total price',order.reservation);
    return await modal.present();
  }
}

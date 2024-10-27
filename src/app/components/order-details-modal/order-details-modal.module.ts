import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderDetailsModalComponent } from './order-details-modal.component';
import { OrderBillModule } from '../order-bill/order-bill.module';
import { HeaderModule } from '../header/header.module';
@NgModule({
  declarations: [OrderDetailsModalComponent],
  imports: [CommonModule, IonicModule, OrderBillModule, HeaderModule],
  exports: [OrderDetailsModalComponent],
})
export class OrderDetailsModalModule {}

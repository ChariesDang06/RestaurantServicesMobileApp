import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderBillDetailsPageRoutingModule } from './order-bill-details-routing.module';

import { OrderBillDetailsPage } from './order-bill-details.page';
import { OrderBillModule } from '../../components/order-bill/order-bill.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderBillDetailsPageRoutingModule,
    OrderBillModule,
  ],
  declarations: [OrderBillDetailsPage],
})
export class OrderBillDetailsPageModule {}

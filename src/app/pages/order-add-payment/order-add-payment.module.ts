import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderAddPaymentPageRoutingModule } from './order-add-payment-routing.module';

import { OrderAddPaymentPage } from './order-add-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderAddPaymentPageRoutingModule
  ],
  declarations: [OrderAddPaymentPage]
})
export class OrderAddPaymentPageModule {}

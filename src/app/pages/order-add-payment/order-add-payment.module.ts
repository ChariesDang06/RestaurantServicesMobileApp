import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderAddPaymentPageRoutingModule } from './order-add-payment-routing.module';

import { OrderAddPaymentPage } from './order-add-payment.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderAddPaymentPageRoutingModule,
    HeaderModule
  ],
  declarations: [OrderAddPaymentPage]
})
export class OrderAddPaymentPageModule {}

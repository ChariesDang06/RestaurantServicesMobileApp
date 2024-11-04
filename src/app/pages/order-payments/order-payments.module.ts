import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPaymentsPageRoutingModule } from './order-payments-routing.module';

import { OrderPaymentsPage } from './order-payments.page';
import { HeaderModule } from "../../components/header/header.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPaymentsPageRoutingModule,
    HeaderModule
],
  declarations: [OrderPaymentsPage]
})
export class OrderPaymentsPageModule {}

// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderCustomerInfoComponent } from './order-customer-info.component';
@NgModule({
  declarations: [OrderCustomerInfoComponent],
  imports: [CommonModule, IonicModule],
  exports: [OrderCustomerInfoComponent],
})
export class OrderCustomerInfoModule {}

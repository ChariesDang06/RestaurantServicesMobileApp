// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderBillComponent } from './order-bill.component';
@NgModule({
  declarations: [OrderBillComponent],
  imports: [CommonModule, IonicModule],
  exports: [OrderBillComponent],
})
export class OrderBillModule {}

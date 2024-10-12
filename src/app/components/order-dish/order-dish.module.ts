// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDishComponent } from './order-dish.component';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [OrderDishComponent],
  imports: [CommonModule, IonicModule],
  exports: [OrderDishComponent],
})
export class orderDishModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OrderDishDetailsPageRoutingModule } from './order-dish-details-routing.module';

import { NavBarModule } from '../../components/navbar/navbar.module';
import { OrderDishDetailsPage } from './order-dish-details.page';
import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    OrderDishDetailsPageRoutingModule,
    NavBarModule,
    HeaderModule,
  ],
  declarations: [OrderDishDetailsPage],
  exports: [OrderDishDetailsPage],
})
export class OrderDishDetailsPageModule {}

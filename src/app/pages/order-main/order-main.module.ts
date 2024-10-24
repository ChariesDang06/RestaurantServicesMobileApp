import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderMainPageRoutingModule } from './order-main-routing.module';

import { NavBarModule } from '../../components/navbar/navbar.module';
import { orderDishModule } from '../../components/order-dish/order-dish.module';
import { OrderMainPage } from './order-main.page';
import { OrderCustomerInfoModule } from 'src/app/components/order-customer-info/order-customer-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderMainPageRoutingModule,
    NavBarModule,
    orderDishModule,
    OrderCustomerInfoModule
  ],
  declarations: [OrderMainPage],
  exports: [OrderMainPage],
})
export class OrderMainPageModule {}

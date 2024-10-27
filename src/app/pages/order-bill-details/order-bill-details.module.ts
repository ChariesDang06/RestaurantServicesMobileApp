import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderBillDetailsPageRoutingModule } from './order-bill-details-routing.module';

import { OrderBillDetailsPage } from './order-bill-details.page';
import { OrderBillModule } from '../../components/order-bill/order-bill.module';
import { ChangeLocationModule } from 'src/app/components/change-location/change-location.module';
import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderBillDetailsPageRoutingModule,
    OrderBillModule,
    ChangeLocationModule,
    HeaderModule,
  ],
  declarations: [OrderBillDetailsPage],
})
export class OrderBillDetailsPageModule {}

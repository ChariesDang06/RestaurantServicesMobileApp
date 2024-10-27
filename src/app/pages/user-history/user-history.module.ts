import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserHistoryPageRoutingModule } from './user-history-routing.module';

import { UserHistoryPage } from './user-history.page';
import { OrderBillModule } from '../../components/order-bill/order-bill.module';
import { OrderDetailsModalModule } from 'src/app/components/order-details-modal/order-details-modal.module';
import { NavBarModule } from 'src/app/components/navbar/navbar.module';
import { HeaderModule } from 'src/app/components/header/header.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserHistoryPageRoutingModule,
    OrderBillModule,
    OrderDetailsModalModule,
    NavBarModule,
    HeaderModule,
  ],
  declarations: [UserHistoryPage],
})
export class UserHistoryPageModule {}

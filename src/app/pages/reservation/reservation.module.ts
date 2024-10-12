import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ReservationPageRoutingModule } from './reservation-routing.module';

import { ReservationPage } from './reservation.page';

import { NavBarModule } from 'src/app/components/navbar/navbar.module';
import { BannerPromoModule } from 'src/app/components/banner-promo/banner-promo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationPageRoutingModule,
    NavBarModule,
    BannerPromoModule,
  ],
  declarations: [ReservationPage],
})
export class ReservationPageModule {}

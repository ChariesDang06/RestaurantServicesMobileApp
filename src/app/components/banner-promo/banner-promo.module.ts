// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerPromoComponent } from './banner-promo.component';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [BannerPromoComponent],
  imports: [CommonModule, IonicModule],
  exports: [BannerPromoComponent], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BannerPromoModule {}

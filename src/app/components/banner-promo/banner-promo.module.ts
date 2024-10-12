// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerPromoComponent } from './banner-promo.component';


@NgModule({
  declarations: [BannerPromoComponent],
  imports: [CommonModule],
  exports: [BannerPromoComponent], 
})
export class BannerPromoModule {}

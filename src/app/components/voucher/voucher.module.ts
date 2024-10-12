// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VoucherComponent } from './voucher.component';
@NgModule({
  declarations: [VoucherComponent],
  imports: [CommonModule, IonicModule],
  exports: [VoucherComponent],
})
export class VoucherModule {}

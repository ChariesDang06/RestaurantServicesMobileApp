import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserVoucherPageRoutingModule } from './user-voucher-routing.module';

import { UserVoucherPage } from './user-voucher.page';
import { VoucherModule } from '../../components/voucher/voucher.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserVoucherPageRoutingModule,
    VoucherModule,
  ],
  declarations: [UserVoucherPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserVoucherPageModule {}

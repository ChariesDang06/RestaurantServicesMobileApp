import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserVoucherPageRoutingModule } from './user-voucher-routing.module';
import { UserVoucherPage } from './user-voucher.page';
import { VoucherComponent } from 'src/app/components/voucher/voucher.component';
import { NavBarModule } from 'src/app/components/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserVoucherPageRoutingModule,
    NavBarModule
    // Không cần thêm VoucherComponent vào imports
  ],
  declarations: [
    UserVoucherPage,
    VoucherComponent // Thêm VoucherComponent vào đây
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserVoucherPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserVoucherPage } from './user-voucher.page';

const routes: Routes = [
  {
    path: '',
    component: UserVoucherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserVoucherPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderAddPaymentPage } from './order-add-payment.page';

const routes: Routes = [
  {
    path: '',
    component: OrderAddPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderAddPaymentPageRoutingModule {}

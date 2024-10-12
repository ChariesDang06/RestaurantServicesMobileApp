import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderBillDetailsPage } from './order-bill-details.page';

const routes: Routes = [
  {
    path: '',
    component: OrderBillDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderBillDetailsPageRoutingModule {}

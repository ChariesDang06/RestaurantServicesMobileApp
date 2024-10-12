import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDishDetailsPage } from './order-dish-details.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDishDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDishDetailsPageRoutingModule {}

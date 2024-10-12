import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderMainPage } from './order-main.page';

const routes: Routes = [
  {
    path: '',
    component: OrderMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderMainPageRoutingModule {}

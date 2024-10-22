import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataTestPage } from './data-test.page';

const routes: Routes = [
  {
    path: '',
    component: DataTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataTestPageRoutingModule {}

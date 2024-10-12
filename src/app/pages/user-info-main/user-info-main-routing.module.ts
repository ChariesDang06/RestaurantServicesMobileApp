import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserInfoMainPage } from './user-info-main.page';

const routes: Routes = [
  {
    path: '',
    component: UserInfoMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserInfoMainPageRoutingModule {}

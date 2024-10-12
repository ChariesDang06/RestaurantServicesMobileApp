import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserInfoEditingPage } from './user-info-editing.page';

const routes: Routes = [
  {
    path: '',
    component: UserInfoEditingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserInfoEditingPageRoutingModule {}

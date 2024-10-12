import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserInfoMainPageRoutingModule } from './user-info-main-routing.module';

import { UserInfoMainPage } from './user-info-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserInfoMainPageRoutingModule
  ],
  declarations: [UserInfoMainPage]
})
export class UserInfoMainPageModule {}

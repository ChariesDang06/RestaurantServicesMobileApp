import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserInfoMainPageRoutingModule } from './user-info-main-routing.module';

import { UserInfoMainPage } from './user-info-main.page';
import { NavBarModule } from 'src/app/components/navbar/navbar.module';
import { HeaderModule } from '../../components/header/header.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserInfoMainPageRoutingModule,
    HeaderModule,
    NavBarModule
  ],
  declarations: [UserInfoMainPage],
})
export class UserInfoMainPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserInfoEditingPageRoutingModule } from './user-info-editing-routing.module';

import { UserInfoEditingPage } from './user-info-editing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserInfoEditingPageRoutingModule
  ],
  declarations: [UserInfoEditingPage]
})
export class UserInfoEditingPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { IonicModule } from '@ionic/angular';
import { UserInfoEditingPageRoutingModule } from './user-info-editing-routing.module';
import { UserInfoEditingPage } from './user-info-editing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // Thêm FormsModule vào imports
    IonicModule,
    UserInfoEditingPageRoutingModule
  ],
  declarations: [UserInfoEditingPage]
})
export class UserInfoEditingPageModule {}

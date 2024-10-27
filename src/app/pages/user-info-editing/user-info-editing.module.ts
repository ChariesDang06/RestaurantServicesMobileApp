import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { IonicModule } from '@ionic/angular';
import { UserInfoEditingPageRoutingModule } from './user-info-editing-routing.module';
import { UserInfoEditingPage } from './user-info-editing.page';
import { NavBarModule } from 'src/app/components/navbar/navbar.module';
import { ChangeLocationModule } from '../../components/change-location/change-location.module';
import { HeaderModule } from '../../components/header/header.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule, // Thêm FormsModule vào imports
    IonicModule,
    UserInfoEditingPageRoutingModule,
    NavBarModule,
    ChangeLocationModule,
    HeaderModule,
  ],
  declarations: [UserInfoEditingPage],
})
export class UserInfoEditingPageModule {}

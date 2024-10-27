import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { NavBarModule } from 'src/app/components/navbar/navbar.module';
import { UserService } from 'src/app/services/users/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    NavBarModule,
    ReactiveFormsModule,
    HeaderModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}

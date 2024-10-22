import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataTestPageRoutingModule } from './data-test-routing.module';

import { DataTestPage } from './data-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataTestPageRoutingModule
  ],
  declarations: [DataTestPage]
})
export class DataTestPageModule {}

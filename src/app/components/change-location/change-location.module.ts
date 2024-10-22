// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // Import this

import { ChangeLocationComponent } from './change-location.component';

@NgModule({
  declarations: [ChangeLocationComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [ChangeLocationComponent],
})
export class ChangeLocationModule {}

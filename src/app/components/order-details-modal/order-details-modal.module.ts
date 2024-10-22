import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderDetailsModalComponent } from './order-details-modal.component';
@NgModule({
  declarations: [OrderDetailsModalComponent],
  imports: [CommonModule, IonicModule],
  exports: [OrderDetailsModalComponent],
})
export class OrderDetailsModalModule  {}

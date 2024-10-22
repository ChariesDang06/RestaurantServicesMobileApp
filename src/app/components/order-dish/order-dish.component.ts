/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-order-dish',
  templateUrl: './order-dish.component.html',
  styleUrls: ['./order-dish.component.scss'],
})
export class OrderDishComponent implements OnInit {
  @Input() ID: number = 0;
  @Input() name: string = '';
  @Input() image: string = '';
  @Input() sortDescription: string = '';
  @Input() price: number = 0;
  countOrder: number = 3;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async openOrderDishDetails() {}
}

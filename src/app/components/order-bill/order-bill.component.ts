import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Dish } from 'src/app/models/category.model';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-bill',
  templateUrl: './order-bill.component.html',
  styleUrls: ['./order-bill.component.scss'],
})
export class OrderBillComponent implements OnInit {
  @Input() dish: Dish | null = null;
  constructor(
    private orderServices: OrderService,
    private navController: NavController
  ) {}
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}
  editDish() {
    this.navController.navigateForward('/order-dish-details', {
      state: {
        dish: this.dish,
        totalOrder: this.dish?.total,
        previousPage: 'order-bill',
      },
    });
  }
  calculateDishPrice() {
    let dishPrice = Number(this.dish?.price);
    if (this.dish?.options && this.dish.options.length > 0) {
      const optionsTotalPrice = this.dish.options.reduce(
        (optionsTotalPrice, option) => {
          console.log('options ', option.price);
          return optionsTotalPrice + Number(option.price);
        },
        0
      );
      dishPrice += optionsTotalPrice;
    }
    return dishPrice * Number(this.dish?.total);
  }
}

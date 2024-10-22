import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Dish } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/categories/categories.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-dish',
  templateUrl: './order-dish.component.html',
  styleUrls: ['./order-dish.component.scss'],
})
export class OrderDishComponent implements OnInit {
  @Input() dish: Dish | null = null;
  totalOrder: number = 0;
  constructor(
    private navController: NavController,
    private changeDetectorRef: ChangeDetectorRef,
    private categoryService: CategoryService
  ) {}
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    // Phương thức này sẽ được gọi một lần khi component khởi tạo
  }

  ionViewWillEnter() {
    console.log('enter ion view will enter');
    const state = history.state;
    console.log('state', state);
    if (state && state.totalOrder) {
      this.totalOrder = state.totalOrder;
      console.log('toatal order dissh item  ', this.totalOrder);
    }
  }
  // Method to update the dish state and trigger change detection
  updateDishTotal(newTotal: number) {
    if (this.dish) {
      this.dish.total = newTotal;
      this.changeDetectorRef.detectChanges(); // Manually trigger change detection
    }
  }
  openOrderDishDetailsPage() {
    const navigationExtras = {
      state: {
        previousPage: 'order-main',
        dish: this.dish,
        // totalOrder: this.totalOrder,
      },
    };
    this.navController.navigateForward('/order-dish-details', navigationExtras);
  }
}

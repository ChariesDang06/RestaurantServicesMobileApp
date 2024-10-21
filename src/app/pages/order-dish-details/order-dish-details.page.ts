import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { OrderDishComponent } from 'src/app/components/order-dish/order-dish.component';
import { Dish, Options } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/categories/categories.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-dish-details',
  templateUrl: './order-dish-details.page.html',
  styleUrls: ['./order-dish-details.page.scss'],
})
export class OrderDishDetailsPage implements OnInit {
  totalOrder: number = 1;
  dishDetails: Dish | null = null;
  dishDefault: Dish | null = null;
  selectedOptions: Options[] = [];
  note: string = '';

  constructor(
    private navController: NavController,
    private orderService: OrderService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    const state = history.state;
    if (state && state.previousPage === 'order-main') {
      this.dishDetails = state.dish;
      console.log('dish details', state.dish);
      console.log('this is order main page ');
      // this.getDishById('1');
    }

    if (state && state.previousPage === 'order-bill') {
      const dish = state.dish;
      this.getDishbyId(dish.categoryId, dish.dishId);
      for (let i = 0; i < dish.options.length; i++) {
        this.toggleOption(dish.options[i]);
      }
      this.note = dish.note;
      this.totalOrder = dish.total;
      this.dishDefault = dish;
    }
  }

  async getDishbyId(categoryId: string, dishId: string) {
    try {
      const dish = await this.categoryService.getDishById(categoryId, dishId);
      if (dish) {
        // this.dishDefault = dish;
        this.dishDetails = dish;
      } else {
        console.log('Dish not found.');
      }
    } catch (error) {
      console.error('Error fetching dish:', error);
    }
  }

  toggleOption(option: Options) {
    const isChecked = this.selectedOptions.some(
      (selected) => selected.name === option.name
    );

    if (isChecked) {
      // Remove option if it is already selected
      this.selectedOptions = this.selectedOptions.filter(
        (selected) => selected.name !== option.name
      );
    } else {
      // Add option if it is not selected
      this.selectedOptions.push(option);
    }
  }

  isOptionSelected(option: Options): boolean {
    return this.selectedOptions.some(
      (selected) => selected.name === option.name
    );
  }

  onSubmit() {
    if (this.dishDetails && this.totalOrder > 0) {
      const dish: Dish = JSON.parse(JSON.stringify(this.dishDetails));
      dish.options = this.selectedOptions;
      dish.total = this.totalOrder;
      dish.note = this.note;

      // Update total in the original dish object
      this.dishDetails.total =
        Number(this.dishDetails.total ?? 0) + Number(this.totalOrder);
      this.orderService.setDishes(dish);
    } else if (this.dishDefault && this.totalOrder == 0) {
      console.log(this.dishDefault);
      this.orderService.deleteDish(this.dishDefault);
    }
    this.navController.back();
  }

  gotoPreviousPage() {
    this.navController.back();
  }
  increase() {
    this.totalOrder += 1;
  }

  reduce() {
    if (this.totalOrder > 0) this.totalOrder -= 1;
  }
}

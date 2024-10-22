import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Category, Dish } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/categories/categories.service';
import { OrderService } from 'src/app/services/order/order.service';
@Component({
  selector: 'app-order-main',
  templateUrl: './order-main.page.html',
  styleUrls: ['./order-main.page.scss'],
})
export class OrderMainPage implements OnInit {
  categoryList: Category[] = [];
  dishInCart: number = 0;
  basketPrice = 0;
  selectedCategory: Category | null = null;
  allDishes: Dish[] = [];
  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private navController: NavController
  ) {}
  ngOnInit() {
    this.loadCategories();
    console.log(this.categoryList);
    console.log('category list', this.categoryList);
    this.orderService.dishes$.subscribe((dishes: Dish[]) => {
      this.dishInCart = this.calculateDishInCart(dishes);
      this.basketPrice = this.calculateBasketPrice(dishes);
    });
    // this.dishInCart = this.calculateDishInCart();
    // this.basketPrice = this.calculateBasketPrice();
  }
  // ionViewWillEnter() {
  //   this.loadCategories();
  //   console.log(this.categoryList);
  //   console.log('category list', this.categoryList);
  //   this.orderService.dishes$.subscribe((dishes: Dish[]) => {
  //     this.dishInCart = this.calculateDishInCart(dishes);
  //     this.basketPrice = this.calculateBasketPrice(dishes);
  //   });
  // }
  // getCategoriesAndDishes() {
  //   this.categoryService.getAllCategories().then((categories) => {
  //     this.categoryList = categories;
  //     // Process categories if needed
  //     console.log('Categories:', categories);

  //     // Optionally set a selected category
  //     if (categories.length > 0) {
  //       this.selectedCategory = categories[0]; // Set the first category as selected
  //     }
  //   });

  //   this.categoryService.getAllDishes().then((dishes) => {
  //     this.allDishes = dishes;
  //     console.log('All Dishes:', this.allDishes);
  //   });
  // }
  async loadCategories() {
    try {
      const categories = await this.categoryService.getCategoriesWithDishes();
      this.categoryList = categories;
      console.log('Categories with Dishes:', categories);
    } catch (error) {
      console.error('Error fetching categories and dishes:', error);
    }
  }
  getDishArray(): Dish[] {
    return this.selectedCategory?.dishes
      ? Object.values(this.selectedCategory.dishes)
      : [];
  }

  calculateDishInCart(dishes: Dish[]): number {
    return dishes.reduce((sum, dish) => sum + dish.total, 0); // Calculate total dishes
  }

  calculateBasketPrice(dishes: Dish[]): number {
    return dishes.reduce((total, dish) => {
      console.log('selected item', dish);
      let dishPrice = Number(dish.price);
      if (dish.options && dish.options.length > 0) {
        const optionsTotalPrice = dish.options.reduce(
          (optionsTotalPrice, option) => {
            console.log('options ', option.price);
            return optionsTotalPrice + Number(option.price);
          },
          0
        );
        dishPrice += optionsTotalPrice;
        console.log(dishPrice);
      }
      console.log('total price', total, dish.total, dishPrice);
      return total + dish.total * dishPrice;
    }, 0); // Calculate total dishes
  }

  ChangeSelectCategory(category: Category) {
    this.selectedCategory = category;
    console.log(this.selectedCategory);
    console.log(this.selectedCategory?.dishes);
  }
  gotoOrderBillDetails() {
    this.navController.navigateForward('/order-bill-details');
  }
}

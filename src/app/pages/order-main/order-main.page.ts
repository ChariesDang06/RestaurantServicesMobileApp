import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Category, Dish } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryService } from 'src/app/services/categories/categories.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/users/user.service';
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
  userId: string | null = null;
  user: User | null = null;

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private navController: NavController,
    private authenticationService: AuthService,
    private userService: UserService,
    private alertController: AlertController,
    private router: Router
  ) {}
  ngOnInit() {
    this.LoadCategoryList();
    this.orderService.dishes$.subscribe((dishes: Dish[]) => {
      this.dishInCart = this.calculateDishInCart(dishes);
      this.basketPrice = this.calculateBasketPrice(dishes);
    });
    // this.dishInCart = this.calculateDishInCart();
    // this.basketPrice = this.calculateBasketPrice();
  }
  async LoadCategoryList() {
    try {
      const categories = await this.categoryService.getCategories();
      this.categoryList = categories;
      console.log('Categories with Dishes:', categories);
      if (this.categoryList.length > 0) {
        this.selectedCategory = this.categoryList[0];
      }
    } catch (error) {
      console.error('Error fetching categories and dishes:', error);
    }
  }

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
  async loadUser() {
    this.userId = this.authenticationService.getLoggedInUserId();

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (userData: User | undefined) => {
          if (userData) {
            this.user = userData;
          } else {
            console.log('No user data found');
          }
        },
        (error) => {
          console.error('Error loading user:', error);
        }
      );
    } else {
      await this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Vui lòng đăng nhập',
      message: "Nhấn 'Đăng nhập' để chuyển hướng đến trang đăng nhập",
      buttons: [
        {
          text: 'Đăng nhập',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }
  gotoOrderBillDetails() {
    if (this.user) this.navController.navigateForward('/order-bill-details');
    else {
      this.loadUser();
      if (this.user) {
        this.navController.navigateForward('/order-bill-details');
      }
    }
  }
}

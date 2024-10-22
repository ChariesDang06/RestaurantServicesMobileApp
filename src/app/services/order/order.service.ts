import { Injectable } from '@angular/core';
import { Dish } from '../../models/category.model';
import { Order } from '../../models/order.model';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private firestore: AngularFirestore) {}
  private dishesSubject = new BehaviorSubject<Dish[]>([]); // BehaviorSubject to manage dish list
  dishes$ = this.dishesSubject.asObservable(); // Observable for subscribing to changes

  setDishes(dish: Dish) {
    const currentDishes = this.dishesSubject.getValue(); // Get current dishes
    currentDishes.push(dish); // Add new dish
    this.dishesSubject.next(currentDishes); // Emit updated dish list
  }
  changeDish(oldDish: Dish, newDish: Dish) {
    const currentDishes = this.dishesSubject.getValue(); // Get current dishes
    // Filter out the dish with the matching dishId
    console.log(currentDishes);
    const index = currentDishes.findIndex(
      (dish) =>
        dish.note == oldDish.note &&
        dish.dishId == oldDish.dishId &&
        dish.categoryId == oldDish.categoryId &&
        dish.total == oldDish.total
    );
    console.log('this is index', index);
    if (index !== -1) {
      // Remove the dish from the array
      currentDishes[index] = newDish; // Removes the dish at the found index
      this.dishesSubject.next(currentDishes); // Emit updated dish list
    } else {
      console.warn('Dish not found in the list.');
    }
  }

  deleteDish(delDish: Dish) {
    const currentDishes = this.dishesSubject.getValue(); // Get current dishes
    // Filter out the dish with the matching dishId
    console.log(delDish);
    console.log(currentDishes);
    const index = currentDishes.findIndex(
      (dish) =>
        dish.note == delDish.note &&
        dish.dishId == delDish.dishId &&
        dish.categoryId == delDish.categoryId &&
        dish.total == delDish.total
    );
    console.log('this is index', index);
    if (index !== -1) {
      // Remove the dish from the array
      currentDishes.splice(index, 1); // Removes the dish at the found index
      this.dishesSubject.next(currentDishes); // Emit updated dish list
    } else {
      console.warn('Dish not found in the list.');
    }
  }

  // Get current dishes as an array
  getDishes(): Dish[] {
    return this.dishesSubject.getValue(); // Return the current dish list
  }

  async getOrdersByUser(userID: string, limit: number): Promise<Order[]> {
    const orders$ = this.firestore
      .collection<Order>('orders', (ref) =>
        ref
          .where('userId', '==', userID)
          .orderBy('orderTime', 'desc')
          .limit(limit)
      )
      .valueChanges();

    // Convert Observable to Promise
    return firstValueFrom(orders$);
  }
  getOrderHistory(userId: string): Observable<any[]> {
    return this.firestore
      .collection('orders', (ref) => ref.where('userId', '==', userId))
      .valueChanges();
  }
  // async getNewestOrderByUserId(userID: string): Promise<Order> {
  //   const orders$ = this.firestore
  //     .collection<Order>('orders', (ref) =>
  //       ref.where('userId', '==', userID).orderBy('orderTime', 'desc').limit(1)
  //     )
  //     .valueChanges();

  //   // Convert Observable to Promise
  //   return firstValueFrom(orders$);
  // }
}

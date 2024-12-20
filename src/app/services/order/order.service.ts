import { Injectable } from '@angular/core';
import { Dish } from '../../models/category.model';
import { Order } from '../../models/order.model';
import { BehaviorSubject, firstValueFrom, Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Reservation } from 'src/app/models/reservation.model';
import { map, switchMap, first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
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
  clearDishes(){
   this.dishesSubject.next([]);
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
  async getOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const ordersCollection = this.firestore.collection<Order>(
        'orders',
        (ref) => ref.where('userId', '==', userId).orderBy('orderTime', 'desc')
      );
      const snapshot = await ordersCollection.get().toPromise();

      // Check if snapshot is defined and has documents
      if (snapshot && snapshot.docs.length > 0) {
        return snapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Order, 'orderId'>; // Exclude orderId from data
          console.log(data);
          return {
            orderId: doc.id, // Firestore document ID
            ...data, // Spread the rest of the data
          } as Order; // Explicitly cast to Order type
        });
      } else {
        return []; // Return an empty array if no orders are found
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error; // Optionally re-throw the error for further handling
    }
  }
  getOrderHistory(userId: string): Observable<any[]> {
    return this.firestore
      .collection<Order>('orders', (ref) => ref.where('userId', '==', userId))
      .valueChanges()
      .pipe(
        switchMap((orders) => {
          console.log('Orders:', orders);
          // Lấy tất cả các reservationId từ các order
          const reservationIds = orders
            .map((order) => order.reservationId)
            .filter((id) => id); // Lọc ra các reservationId hợp lệ
          if (reservationIds.length === 0) {
            return of(orders); // Trả về orders nếu không có reservationId
          }

          const reservationObservables = reservationIds.map(
            (reservationId) =>
              this.firestore
                .collection<Reservation>('reservations', (ref) =>
                  ref.where('reservationId', '==', reservationId)
                )
                .valueChanges()
                .pipe(first()) // Chỉ lấy phần tử đầu tiên
          );

          // Kết hợp các observable của reservations với orders
          return forkJoin(reservationObservables).pipe(
            map((reservations) => {
              return orders.map((order, index) => ({
                ...order,
                reservation: reservations[index]
                  ? reservations[index][0]
                  : null, // Thêm reservation vào order nếu có
              }));
            })
          );
        })
      );
  }

  async createOrder(order: Omit<Order, 'orderId'>): Promise<void> {
    const orderId = this.firestore.createId(); // Generate a new order ID
    const newOrder: Order = { orderId, ...order }; // Construct the order with a single orderId

    return this.firestore.collection('orders').doc(orderId).set(newOrder); // Save the new order in Firestore
  }
}

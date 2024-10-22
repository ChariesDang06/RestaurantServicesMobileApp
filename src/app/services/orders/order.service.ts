import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersCollection: AngularFirestoreCollection<Order>;

  constructor(private firestore: AngularFirestore) {
    this.ordersCollection = firestore.collection<Order>('orders');
  }

  // Get all orders
  getOrders(): Observable<Order[]> {
    return this.ordersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Omit<Order, 'orderId'>;
        const orderId = a.payload.doc.id;
        return { orderId, ...data };
      }))
    );
  }

  // Get order by ID
  getOrderById(orderId: string): Observable<Order | undefined> {
    return this.ordersCollection.doc<Order>(orderId).valueChanges();
  }

  // Create a new order
  createOrder(order: Omit<Order, 'orderId'>): Promise<void> {
    const orderId = this.firestore.createId(); // Generate a new ID
    const newOrder: Order = { orderId, ...order }; // Create the full order object
    return this.ordersCollection.doc(orderId).set(newOrder); // Use set to include the ID
  }

  // Update an existing order
  updateOrder(orderId: string, order: Partial<Order>): Promise<void> {
    return this.ordersCollection.doc(orderId).update(order);
  }

  // Delete an order
  deleteOrder(orderId: string): Promise<void> {
    return this.ordersCollection.doc(orderId).delete();
  }
}

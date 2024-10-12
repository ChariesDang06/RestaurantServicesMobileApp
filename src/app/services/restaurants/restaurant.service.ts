// src/app/services/restaurant.service.ts

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restaurant } from '../../models/restaurant.model'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor(private firestore: AngularFirestore) {}

  // Get all restaurants
  getRestaurants(): Observable<Restaurant[]> {
    return this.firestore.collection<Restaurant>('restaurants').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Restaurant;
        const restaurantId = a.payload.doc.id;
        return { ...data, restaurantId }; // Ensure restaurantId is added without conflict
      }))
    );
  }

  // Get restaurant by ID
  getRestaurantById(restaurantId: string): Observable<Restaurant | undefined> {
    return this.firestore.collection<Restaurant>('restaurants').doc(restaurantId).valueChanges().pipe(
      map(data => {
        if (data) {
          return { ...data, restaurantId }; // Ensure restaurantId is included correctly
        } else {
          return undefined; // Return undefined if no restaurant is found
        }
      })
    );
  }

  // Create a new restaurant
  createRestaurant(restaurant: Omit<Restaurant, 'restaurantId'>): Promise<void> {
    const restaurantId = this.firestore.createId(); // Generate a new ID
    const newRestaurant: Restaurant = { restaurantId, ...restaurant }; // Combine ID with restaurant data
    return this.firestore.collection('restaurants').doc(restaurantId).set(newRestaurant); // Set with generated ID
  }

  // Update an existing restaurant
  updateRestaurant(restaurantId: string, restaurant: Partial<Omit<Restaurant, 'restaurantId'>>): Promise<void> {
    return this.firestore.collection('restaurants').doc(restaurantId).update(restaurant);
  }

  // Delete a restaurant
  deleteRestaurant(restaurantId: string): Promise<void> {
    return this.firestore.collection('restaurants').doc(restaurantId).delete();
  }
}

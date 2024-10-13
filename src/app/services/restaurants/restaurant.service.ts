// src/app/services/restaurant.service.ts

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Restaurant } from '../../models/restaurant.model'; // Ensure this path is correct
import { firstValueFrom } from 'rxjs'; // Import for converting Observable to Promise

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor(private firestore: AngularFirestore) {}

  // Get all restaurants (without async/await, using Promise)
  getRestaurants(): Promise<Restaurant[]> {
    return firstValueFrom(this.firestore.collection<Restaurant>('restaurants').snapshotChanges())
      .then(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Restaurant;
          const restaurantId = a.payload.doc.id;
          return { ...data, restaurantId };
        });
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error);
        return []; // Return an empty array in case of error
      });
  }

  // Get restaurant by ID (without async/await, using Promise)
  getRestaurantById(restaurantId: string): Promise<Restaurant | undefined> {
    return firstValueFrom(this.firestore.collection<Restaurant>('restaurants').doc(restaurantId).valueChanges())
      .then(data => {
        if (data) {
          return { ...data, restaurantId };
        } else {
          return undefined;
        }
      })
      .catch(error => {
        console.error(`Error fetching restaurant with ID ${restaurantId}:`, error);
        return undefined; // Return undefined in case of error
      });
  }

  // Create a new restaurant (without async/await, using Promise)
  createRestaurant(restaurant: Omit<Restaurant, 'restaurantId'>): Promise<void> {
    const restaurantId = this.firestore.createId(); // Generate a new ID
    const newRestaurant: Restaurant = { restaurantId, ...restaurant };
    return this.firestore.collection('restaurants').doc(restaurantId).set(newRestaurant)
      .then(() => {
        console.log('Restaurant successfully created!');
      })
      .catch(error => {
        console.error('Error creating restaurant:', error);
      });
  }

  // Update an existing restaurant (without async/await, using Promise)
  updateRestaurant(restaurantId: string, restaurant: Partial<Omit<Restaurant, 'restaurantId'>>): Promise<void> {
    return this.firestore.collection('restaurants').doc(restaurantId).update(restaurant)
      .then(() => {
        console.log('Restaurant successfully updated!');
      })
      .catch(error => {
        console.error(`Error updating restaurant with ID ${restaurantId}:`, error);
      });
  }

  // Delete a restaurant (without async/await, using Promise)
  deleteRestaurant(restaurantId: string): Promise<void> {
    return this.firestore.collection('restaurants').doc(restaurantId).delete()
      .then(() => {
        console.log('Restaurant successfully deleted!');
      })
      .catch(error => {
        console.error(`Error deleting restaurant with ID ${restaurantId}:`, error);
      });
  }
}

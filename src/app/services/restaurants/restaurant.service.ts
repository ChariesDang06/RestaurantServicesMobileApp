import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { Restaurant, Floor, Table } from '../../models/restaurant.model'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor(private firestore: AngularFirestore) {}

  // Fetch all restaurants
getAllRestaurants(): Promise<Restaurant[]> {
  return firstValueFrom(this.firestore.collection('restaurants').snapshotChanges())
    .then(snapshot => {
      // Map Firebase data to Restaurant, Floor, and Table models
      return snapshot.map(doc => {
        const restaurantData = doc.payload.doc.data() as any;
        const restaurantId = doc.payload.doc.id; // Get the document ID

        const floors: Floor[] = restaurantData.tables.map((floorData: any) => {
          const tables: Table[] = floorData.tables.map((tableData: any) => ({
            name: tableData.name,
            availableSeats: Number(tableData.availableSeats),
            description: tableData.description,
            availableTime: tableData.availableTime || [] // Add availableTime and default to an empty array if missing
          }));

          return {
            floor: floorData.floor,
            floorDiagram: floorData.floorDiagram || '',  // Default to an empty string if missing
            tables: tables
          };
        });

        return {
          restaurantId,  // Assign the document ID as the restaurantId
          address: restaurantData.address,
          mapHTML: restaurantData.mapHTML,
          phone: restaurantData.phone,
          floors: floors
        } as Restaurant;
      });
    })
    .catch(error => {
      console.error('Error fetching restaurants:', error);
      return [];
    });
}
  
  // Fetch a restaurant by ID
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
        return undefined;
      });
  }
   // Fetch a table by restaurant ID and table name
  getTableById(restaurantId: string, tableId: string): Promise<Table | undefined> {
  return firstValueFrom(this.firestore.collection('restaurants').doc(restaurantId).collection('tables', ref => ref.where('tableId', '==', tableId)).get())
    .then(snapshot => {
      if (!snapshot.empty) {
        const tableData = snapshot.docs[0].data() as Table; // Get the first matching table
        return { ...tableData, name: tableId }; // Return table with its ID
      } else {
        return undefined; // No matching table found
      }
    })
    .catch(error => {
      console.error(`Error fetching table with ID ${tableId}:`, error);
      return undefined;
    });
}

  // Create a new restaurant
  createRestaurant(restaurant: Omit<Restaurant, 'restaurantId'>): Promise<void> {
    const restaurantId = this.firestore.createId();
    const newRestaurant: Restaurant = { restaurantId, ...restaurant };
    return this.firestore.collection('restaurants').doc(restaurantId).set(newRestaurant)
      .then(() => {
        console.log('Restaurant successfully created!');
      })
      .catch(error => {
        console.error('Error creating restaurant:', error);
      });
  }

  // Update an existing restaurant
  updateRestaurant(restaurantId: string, restaurant: Partial<Restaurant>): Promise<void> {
    return this.firestore.collection('restaurants').doc(restaurantId).update(restaurant)
      .then(() => {
        console.log('Restaurant successfully updated!');
      })
      .catch(error => {
        console.error(`Error updating restaurant with ID ${restaurantId}:`, error);
      });
  }

  // Delete a restaurant
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

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dish, Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private firestore: AngularFirestore) {}
  // private dishesSubject = new BehaviorSubject<Dish[]>([]); // BehaviorSubject to manage dish list
  // dishes$ = this.dishesSubject.asObservable(); // Observable for subscribing to changes

  // getAllCategories(): Promise<Category[]> {
  //   return firstValueFrom(
  //     this.firestore.collection<Category>('categories').snapshotChanges()
  //   )
  //     .then((actions) => {
  //       return actions.map((a) => {
  //         const data = a.payload.doc.data() as Category;
  //         const categoryId = a.payload.doc.id;
  //         // const dish=data.dishes
  //         return { ...data, categoryId };
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching categories:', error);
  //       return []; // Return an empty array in case of error
  //     });
  // }

  // getAllDishes(): Promise<Dish[]> {
  //   return this.getAllCategories()
  //     .then((categories) => {
  //       // Extract all dishes from the retrieved categories
  //       return categories.reduce((acc: Dish[], category: Category) => {
  //         // Check if dishes exist
  //         const categoryDishes = category.dishes
  //           ? Object.entries(category.dishes).map(([dishId, dish]) => ({
  //               ...dish,
  //               dishId, // Include the dishId for reference
  //             }))
  //           : [];

  //         return acc.concat(categoryDishes);
  //       }, []);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching dishes:', error);
  //       return []; // Return an empty array in case of error
  //     });
  // }
  async getCategoriesWithDishes(): Promise<Category[]> {
    try {
      // Fetch all categories
      const categoriesSnapshot = await this.firestore
        .collection('categories')
        .get()
        .toPromise();

      const categories: Category[] = [];

      for (const categoryDoc of categoriesSnapshot?.docs || []) {
        const categoryData = categoryDoc.data() as Category;
        const categoryId = categoryDoc.id;

        // Fetch dishes for each category
        const dishesSnapshot = await this.firestore
          .collection(`categories/${categoryId}/dishes`)
          .get()
          .toPromise();
        const dishes: Dish[] = Array.isArray(categoryData.dishes)
          ? categoryData.dishes
          : [];

        // Add the dishes to the category
        categories.push({
          ...categoryData,
          categoryId: categoryId,
          dishes: dishes,
        });
      }

      return categories;
    } catch (error) {
      console.error('Error fetching categories and dishes:', error);
      return [];
    }
  }
  getCategoryById(categoryId: string): Observable<Category | undefined> {
    return this.firestore
      .doc<Category>(`categories/${categoryId}`)
      .valueChanges();
  }
  async getDishById(
    categoryId: string,
    dishId: string
  ): Promise<Dish | undefined> {
    try {
      // Fetch the category document (e.g., 'annhe')
      const categoryDoc = await this.firestore
        .collection('categories')
        .doc(categoryId)
        .get()
        .toPromise();

      // Check if the document exists before proceeding
      if (categoryDoc && categoryDoc.exists) {
        const categoryData = categoryDoc.data() as Category;

        // Ensure dishes is an array before proceeding
        const dishes: Dish[] = Array.isArray(categoryData.dishes)
          ? categoryData.dishes
          : [];

        // Find the dish by dishId
        const foundDish = dishes.find((dish) => dish.dishId === dishId);

        return foundDish ? foundDish : undefined;
      } else {
        console.error(`Category with id ${categoryId} does not exist.`);
        return undefined;
      }
    } catch (error) {
      console.error('Error fetching dish by dishId:', error);
      return undefined;
    }
  }
  // getDishById(categoryId: string, dishId: string): Promise<Dish | undefined> {
  //   return firstValueFrom(
  //     this.firestore
  //       .collection<Category>('categories')
  //       .doc(categoryId)
  //       .snapshotChanges()
  //   )
  //     .then((action) => {
  //       const data = action.payload.data() as Category;
  //       return data?.dishes ? data.dishes[dishId] : undefined; // Return the specific dish if it exists
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching dish:', error);
  //       return undefined; // Return undefined in case of error
  //     });
  // }

  // Method to get a specific dish by its ID from within a category
  // getDishById(
  //   categoryId: string,
  //   dishId: string
  // ): Observable<Dish | undefined> {
  //   return this.getCategoryById(categoryId).pipe(
  //     map((category: Category | undefined) => {
  //       if (category && category.dishes) {
  //         return category.dishes[dishId];
  //       }
  //       return undefined;
  //     })
  //   );
  // }
  // getDishById(dishId: string): Observable<Dish | undefined> {
  //   const dishDoc = this.firestore.doc<Dish>(`dishes/${dishId}`);
  //   return dishDoc.valueChanges();
  // }
  //   return dishDoc.valueChanges();
  // }
  // async getDishById(dishId: string): Promise<Dish | undefined> {
  //   const dishDoc: AngularFirestoreDocument<Dish> = this.firestore.doc<Dish>(
  //     `dishes/${dishId}`
  //   );

  //   return firstValueFrom(dishDoc.valueChanges());
  // }
  // async getDishById(dishId: string): Promise<any> {
  //   const dishQuerySnapshot = await firstValueFrom(
  //     this.firestore
  //       .collection('categories')
  //       .doc('anchinh')
  //       .collection('anchinh', (ref) => ref.where('dishId', '==', dishId))
  //       .get()
  //   );

  //   if (!dishQuerySnapshot.empty) {
  //     const dish = dishQuerySnapshot.docs[0].data();
  //     return dish;
  //   } else {
  //     return null;
  //   }
  // }

  // Get all categories

  // Get a single category by ID
  // getCategoryById(categoryId: string): Observable<Category | undefined> {
  //   const categoryDoc: AngularFirestoreDocument<Category> =
  //     this.afs.doc<Category>(`categories/${categoryId}`);
  //   return categoryDoc.valueChanges();
  // }

  // // Add a new category
  // addCategory(category: Category): Promise<void> {
  //   const id = this.afs.createId();
  //   return this.categoriesCollection.doc(id).set(category);
  // }

  // // Update a category
  // updateCategory(categoryId: string, category: Category): Promise<void> {
  //   return this.categoriesCollection.doc(categoryId).update(category);
  // }

  // // Delete a category
  // deleteCategory(categoryId: string): Promise<void> {
  //   return this.categoriesCollection.doc(categoryId).delete();
  // }

  // // Get all dishes
  // getDishes(): Observable<Dish[]> {
  //   return this.dishesCollection.snapshotChanges().pipe(
  //     map((actions) =>
  //       actions.map((a) => {
  //         const data = a.payload.doc.data() as Omit<Dish, 'dishId'>; // Omit 'categoryId' to avoid conflict
  //         const dishId = a.payload.doc.id;
  //         return { dishId, ...data }; // Add categoryId separately
  //       })
  //     )
  //   );
  // }
  // // Get a single dish by ID
  // getDishById(dishId: string): Observable<Dish | undefined> {
  //   const dishDoc: AngularFirestoreDocument<Dish> = this.afs.doc<Dish>(
  //     `dishes/${dishId}`
  //   );
  //   return dishDoc.valueChanges();
  // }

  // // Add a new dish
  // addDish(dish: Dish): Promise<void> {
  //   const id = this.afs.createId();
  //   return this.dishesCollection.doc(id).set(dish);
  // }

  // // Update a dish
  // updateDish(dishId: string, dish: Dish): Promise<void> {
  //   return this.dishesCollection.doc(dishId).update(dish);
  // }

  // // Delete a dish
  // deleteDish(dishId: string): Promise<void> {
  //   return this.dishesCollection.doc(dishId).delete();
  // }
}

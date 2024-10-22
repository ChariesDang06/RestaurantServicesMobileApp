import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dish, Category } from '../../models/category.model'; 

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesCollection: AngularFirestoreCollection<Category>;
  private dishesCollection: AngularFirestoreCollection<Dish>;

  constructor(private afs: AngularFirestore) {
    this.categoriesCollection = afs.collection<Category>('categories');
    this.dishesCollection = afs.collection<Dish>('dishes');
  }

 // Get all categories
getCategories(): Observable<Category[]> {
  return this.categoriesCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Omit<Category, 'categoryId'>; // Omit 'categoryId' to avoid conflict
      const categoryId = a.payload.doc.id;
      return { categoryId, ...data }; // Add categoryId separately
    }))
  );
}


  // Get a single category by ID
  getCategoryById(categoryId: string): Observable<Category | undefined> {
    const categoryDoc: AngularFirestoreDocument<Category> = this.afs.doc<Category>(`categories/${categoryId}`);
    return categoryDoc.valueChanges();
  }

  // Add a new category
  addCategory(category: Category): Promise<void> {
    const id = this.afs.createId();
    return this.categoriesCollection.doc(id).set(category);
  }

  // Update a category
  updateCategory(categoryId: string, category: Category): Promise<void> {
    return this.categoriesCollection.doc(categoryId).update(category);
  }

  // Delete a category
  deleteCategory(categoryId: string): Promise<void> {
    return this.categoriesCollection.doc(categoryId).delete();
  }

  // Get all dishes
  getDishes(): Observable<Dish[]> {
  return this.dishesCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Omit<Dish, 'dishId'>; // Omit 'categoryId' to avoid conflict
      const dishId = a.payload.doc.id;
      return { dishId, ...data }; // Add categoryId separately
    }))
  );
}
  // Get a single dish by ID
  getDishById(dishId: string): Observable<Dish | undefined> {
    const dishDoc: AngularFirestoreDocument<Dish> = this.afs.doc<Dish>(`dishes/${dishId}`);
    return dishDoc.valueChanges();
  }

  // Add a new dish
  addDish(dish: Dish): Promise<void> {
    const id = this.afs.createId();
    return this.dishesCollection.doc(id).set(dish);
  }

  // Update a dish
  updateDish(dishId: string, dish: Dish): Promise<void> {
    return this.dishesCollection.doc(dishId).update(dish);
  }

  // Delete a dish
  deleteDish(dishId: string): Promise<void> {
    return this.dishesCollection.doc(dishId).delete();
  }
}

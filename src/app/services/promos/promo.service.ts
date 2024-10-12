import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Promotion } from '../../models/promo.model';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  private promotionsCollection: AngularFirestoreCollection<Promotion>;

  constructor(private firestore: AngularFirestore) {
    this.promotionsCollection = firestore.collection<Promotion>('promotions');
  }

  // Get all promotions
  getPromotions(): Observable<Promotion[]> {
    return this.promotionsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Omit<Promotion, 'promoId'>;
        const promoId = a.payload.doc.id;
        return { promoId, ...data };
      }))
    );
  }

  // Get promotion by ID
  getPromotionById(promoId: string): Observable<Promotion | undefined> {
    return this.promotionsCollection.doc<Promotion>(promoId).valueChanges();
  }

  // Create a new promotion
  createPromotion(promotion: Omit<Promotion, 'promoId'>): Promise<void> {
    const promoId = this.firestore.createId(); // Generate a new ID
    const newPromotion: Promotion = { promoId, ...promotion }; // Create the full promotion object
    return this.promotionsCollection.doc(promoId).set(newPromotion); // Use set to include the ID
  }

  // Update an existing promotion
  updatePromotion(promoId: string, promotion: Partial<Promotion>): Promise<void> {
    return this.promotionsCollection.doc(promoId).update(promotion);
  }

  // Delete a promotion
  deletePromotion(promoId: string): Promise<void> {
    return this.promotionsCollection.doc(promoId).delete();
  }
}

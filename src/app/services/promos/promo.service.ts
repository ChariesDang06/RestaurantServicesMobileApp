import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { Promotion } from '../../models/promo.model';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  constructor(private firestore: AngularFirestore) {}

  getPromotions(): Promise<Promotion[]> {
    return firstValueFrom(
      this.firestore.collection<{ [key: string]: Promotion }>('promotions').valueChanges()
    ).then((promotions: { [key: string]: Promotion }[]) => {
      const flattenedPromos = promotions.map(promoObj => Object.values(promoObj)).flat();
      return flattenedPromos;
    }).catch(error => {
      console.error('Error fetching promotions:', error);
      return [];
    });
  }

  // Get promotion by ID (using Promise)
  getPromotionById(promoId: string): Promise<Promotion | undefined> {
    return firstValueFrom(this.firestore.collection<Promotion>('promotions').doc(promoId).valueChanges())
      .then(data => {
        if (data) {
          return { ...data, promoId };
        } else {
          return undefined;
        }
      })
      .catch(error => {
        console.error(`Error fetching promotion with ID ${promoId}:`, error);
        return undefined; // Return undefined in case of error
      });
  }

  // Create a new promotion (using Promise)
  createPromotion(promotion: Omit<Promotion, 'promoId'>): Promise<void> {
    const promoId = this.firestore.createId(); // Generate a new ID
    const newPromotion: Promotion = { promoId, ...promotion };
    return this.firestore.collection('promotions').doc(promoId).set(newPromotion)
      .then(() => {
        console.log('Promotion successfully created!');
      })
      .catch(error => {
        console.error('Error creating promotion:', error);
      });
  }

  // Update an existing promotion (using Promise)
  updatePromotion(promoId: string, promotion: Partial<Promotion>): Promise<void> {
    return this.firestore.collection('promotions').doc(promoId).update(promotion)
      .then(() => {
        console.log('Promotion successfully updated!');
      })
      .catch(error => {
        console.error(`Error updating promotion with ID ${promoId}:`, error);
      });
  }

  // Delete a promotion (using Promise)
  deletePromotion(promoId: string): Promise<void> {
    return this.firestore.collection('promotions').doc(promoId).delete()
      .then(() => {
        console.log('Promotion successfully deleted!');
      })
      .catch(error => {
        console.error(`Error deleting promotion with ID ${promoId}:`, error);
      });
  }
}
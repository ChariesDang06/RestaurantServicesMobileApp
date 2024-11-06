import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { Voucher } from 'src/app/models/voucher.model';

@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  constructor(private firestore: AngularFirestore) {}

  getCouponById(couponId: string): Promise<Voucher | undefined> {
    return firstValueFrom(
      this.firestore
        .collection<Voucher>('vouchers')
        .doc(couponId)
        .valueChanges()
    )
      .then((data) => {
        if (data) {
          // Spread data and add couponId explicitly
          return { ...data, couponId };
        } else {
          return undefined;
        }
      })
      .catch((error) => {
        console.error(`Error fetching voucher with ID ${couponId}:`, error);
        return undefined; // Return undefined in case of error
      });
  }

  getAllVouchers(): Promise<Voucher[]> {
    return firstValueFrom(
      this.firestore.collection<Voucher>('vouchers').valueChanges()
    ).catch((error) => {
      console.error("Error fetching all vouchers:", error);
      return []; // Return an empty array in case of error
    });
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  getUserById(userId: string): Observable<User | undefined> {
    return this.firestore
      .collection<User>('users')
      .doc<User>(userId)
      .valueChanges();
  }
}

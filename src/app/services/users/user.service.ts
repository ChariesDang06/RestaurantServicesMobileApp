import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.firestore.collection<User>('users', ref => ref.where('email', '==', email)).valueChanges().pipe(
      map(users => users[0]) // Lấy người dùng đầu tiên trong danh sách
    );
  }

  // Cập nhật phương thức lấy người dùng theo userId
  getUserById(userId: string): Observable<User | undefined> {
    return this.firestore.collection<User>('users').doc(userId).valueChanges();
  }

  // Phương thức tạo người dùng mới
  createUser(user: User): Promise<void> {
    return this.firestore.collection('users').doc(user.userId).set(user)
      .then(() => {
        console.log('User created successfully');
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  }

  // Phương thức cập nhật thông tin người dùng
  updateUser(user: User): Promise<void> {
    return this.firestore.collection('users').doc(user.userId).update(user)
      .then(() => {
        console.log('User updated successfully');
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  }
}

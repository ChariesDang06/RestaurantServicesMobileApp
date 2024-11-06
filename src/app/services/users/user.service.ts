import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Thêm import này
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { } // Thêm AngularFireStorage vào constructor

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.firestore.collection<User>('users', ref => ref.where('email', '==', email)).valueChanges().pipe(
      map(users => users[0]) // Lấy người dùng đầu tiên trong danh sách
    );
  }

  getUserById(userId: string): Observable<User | undefined> {
    return this.firestore.collection<User>('users').doc(userId).valueChanges();
  }

  createUser(user: User): Promise<void> {
    return this.firestore.collection('users').doc(user.userId).set(user)
      .then(() => {
        console.log('User created successfully');
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  }

  updateUser(user: User): Promise<void> {
    return this.firestore.collection('users').doc(user.userId).update(user)
      .then(() => {
        console.log('User updated successfully');
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  }

  // Phương thức tải ảnh lên Firebase Storage
  async updateUserAvatar(userId: string, avatarFile: File): Promise<void> {
    const filePath = `avatars/${userId}/${avatarFile.name}`;
    const fileRef = this.storage.ref(filePath);

    // Tải lên file
    await this.storage.upload(filePath, avatarFile);
    const downloadURL = await fileRef.getDownloadURL().toPromise();

    // Cập nhật URL avatar vào Firestore
    await this.firestore.collection('users').doc(userId).update({ avatarUrl: downloadURL })
      .then(() => {
        console.log('Avatar updated successfully');
      })
      .catch(error => {
        console.error('Error updating avatar:', error);
      });
  }

  // Get user by email or phone number
  // getUserByUserNameOrPhone(userNameOrPhone: string): Observable<User | undefined> {
  //   // First, try to find by username
  //   return this.firestore.collection<User>('users', ref =>
  //     ref.where('name', '==', userNameOrPhone)
  //   ).valueChanges().pipe(
  //     map(users => users[0]), // Return the first user found by username
  //     // If no user found by username, try searching by phone number
  //     switchMap(user => {
  //       if (user) {
  //         return of(user); // If user found by name, return that user
  //       }
  //       // If no user found by username, search by phone number
  //       return this.firestore.collection<User>('users', ref =>
  //         ref.where('phone', '==', userNameOrPhone)
  //       ).valueChanges().pipe(
  //         map(users => users[0]) // Return the first user found by phone number
  //       );
  //     })
  //   );
  // }
  async getUserByUserName(userName: string): Promise<User | undefined> {
    const usernameByNameSnapshot = await this.firestore.collection<User>('users', ref => ref.where('name', '==', userName)).get().toPromise();
    const userbyName = usernameByNameSnapshot?.docs.map(doc => doc.data())[0];
    if (userbyName) {
      console.log(userbyName);
      return userbyName;
    }
    const usernameByPhoneSnapshot = await this.firestore.collection<User>('users', ref => ref.where('phone', '==', userName)).get().toPromise();
    const userbyPhone = usernameByPhoneSnapshot?.docs.map(doc => doc.data())[0];
    console.log('usser name' + userName)
    console.log(userbyPhone);
    return userbyPhone;
  }

}

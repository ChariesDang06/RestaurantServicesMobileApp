import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Thêm import này
import { Observable, firstValueFrom } from 'rxjs';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {} // Thêm AngularFireStorage vào constructor

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.firestore
      .collection<User>('users', (ref) => ref.where('email', '==', email))
      .valueChanges()
      .pipe(
        map((users) => users[0]) // Lấy người dùng đầu tiên trong danh sách
      );
  }

  getUserById(userId: string): Observable<User | undefined> {
    return this.firestore.collection<User>('users').doc(userId).valueChanges();
  }

  createUser(user: User): Promise<void> {
    return this.firestore
      .collection('users')
      .doc(user.userId)
      .set(user)
      .then(() => {
        console.log('User created successfully');
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  }

  updateUser(user: User): Promise<void> {
    return this.firestore
      .collection('users')
      .doc(user.userId)
      .update(user)
      .then(() => {
        console.log('User updated successfully');
      })
      .catch((error) => {
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
    await this.firestore
      .collection('users')
      .doc(userId)
      .update({ avatarUrl: downloadURL })
      .then(() => {
        console.log('Avatar updated successfully');
      })
      .catch((error) => {
        console.error('Error updating avatar:', error);
      });
  }
}

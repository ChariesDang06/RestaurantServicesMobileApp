import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.firestore.collection<User>('users', ref => ref.where('email', '==', email)).valueChanges().pipe(
      map(users => users[0])
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

  async updateUserAvatar(userId: string, avatarFile: File): Promise<void> {
    const filePath = `avatars/${userId}/${avatarFile.name}`;
    const fileRef = this.storage.ref(filePath);

    await this.storage.upload(filePath, avatarFile);
    const downloadURL = await fileRef.getDownloadURL().toPromise();

    await this.firestore.collection('users').doc(userId).update({ avatarUrl: downloadURL })
      .then(() => {
        console.log('Avatar updated successfully');
      })
      .catch(error => {
        console.error('Error updating avatar:', error);
      });
  }
}

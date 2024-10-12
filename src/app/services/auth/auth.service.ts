import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore // Firestore for storing user data
  ) {}

  // Sign in with Google
  signInWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  // Sign out
  signOut() {
    return this.afAuth.signOut();
  }

  // Add user to Firestore
  addUserToFirestore(userId: string, name: string, email: string) {
    const userData = {
      userId,
      name,
      email,
    };
    return this.firestore.collection('users').doc(userId).set(userData);
  }
}

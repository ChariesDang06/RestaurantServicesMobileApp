import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // BehaviorSubject to hold login status (default to false)
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  
  // Expose login status as an observable
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore // Firestore for storing user data
  ) {}

  // Sign in with Google
  signInWithGoogle() {
    this.isLoggedInSubject.next(true);
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  // Sign in with Facebook
  signInWithFacebook() {
    this.isLoggedInSubject.next(true);
    return this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  // Sign out
  signOut() {
    this.isLoggedInSubject.next(false);
    return this.afAuth.signOut();
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  // Add user to Firestore
  addUserToFirestore(userId: string, name: string, email: string, phone?: string) {
    const userData = {
      userId,
      name,
      email,
      phone: phone || ''  // Optional phone field
    };
    return this.firestore.collection('users').doc(userId).set(userData);
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // Sign in with Google
  signInWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
      this.isLoggedInSubject.next(true);
      const userId = result.user?.uid;
      if (userId) {
        // Store userId in localStorage
        localStorage.setItem('userId', userId);
      }
      return result;
    });
  }

  // Sign in with Facebook
  signInWithFacebook() {
    return this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((result) => {
      this.isLoggedInSubject.next(true);
      const userId = result.user?.uid;
      if (userId) {
        // Store userId in localStorage
        localStorage.setItem('userId', userId);
      }
      return result;
    });
  }

  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      this.isLoggedInSubject.next(false);
      // Clear userId from localStorage
      localStorage.removeItem('userId');
    });
  }

  // Check if user is logged in by checking localStorage and BehaviorSubject
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value || !!localStorage.getItem('userId');
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

  // Get logged in userId from localStorage
  getLoggedInUserId(): string | null {
    return localStorage.getItem('userId');
  }
}

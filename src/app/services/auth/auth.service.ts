import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';


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

   // Submit user registration and save it to Firestore
  async onSubmit(userData: User) {
    try {
      // Store user data in Firestore under 'users' collection
      await this.firestore.collection('users').add(userData);
      console.log('User registration successful', userData);

      return true; // Success indicator
    } catch (error) {
      console.error('Error saving user data to Firestore: ', error);
      return false; // Failure indicator
    }
  }


  // Get logged in userId from localStorage
  getLoggedInUserId(): string | null {
    return localStorage.getItem('userId');
  }
}

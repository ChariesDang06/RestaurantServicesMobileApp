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
      localStorage.clear();

    });
  }
  
  // Check if user is logged in by checking localStorage and BehaviorSubject
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value || !!localStorage.getItem('userId');
  }

  // Submit the user data to Firestore
  async onSubmit(user: Partial<User>): Promise<boolean> {
    try {
      // Add the user to the Firestore collection and automatically generate a userId
      const userRef = await this.firestore.collection('users').add(user);
      const userId = userRef.id;  // Get the auto-generated userId

      // Update the user with the generated userId
      await userRef.update({ userId });

      return true; // Success
    } catch (error) {
      console.error('Error registering user: ', error);
      return false; // Failure
    }
  }

    // Store userId in local storage after successful login
   storeUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }



  // Get logged in userId from localStorage
  getLoggedInUserId(): string | null {
    return localStorage.getItem('userId');
  }
  
}

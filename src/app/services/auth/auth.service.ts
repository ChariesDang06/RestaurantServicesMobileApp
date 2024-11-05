import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
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
    private firestore: AngularFirestore,
    private router: Router
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
//  signOut() {
//   return this.afAuth.signOut().then(() => {
//     // Remove specific user data from localStorage
//     localStorage.removeItem('userId');

//     // Clear all remaining local storage data
//     localStorage.clear();

//     // Emit the login status to update any observers
//     this.isLoggedInSubject.next(false);

//     console.log('User has been signed out, and local storage data cleared.');
//   }).catch((error) => {
//     console.error('Error signing out: ', error);
    
//   });
// }
signOut() {
  return this.afAuth.signOut().then(() => {
    // Remove userId specifically from localStorage
    localStorage.removeItem('userId');

    // Force clear any remaining local storage data and reset the cache
    localStorage.clear();
    sessionStorage.clear(); // Optional, in case any session storage is used

    // Reset the isLoggedInSubject to update all subscribers
    this.isLoggedInSubject.next(false);

    // Force navigate to the login page (or landing page)
    this.router.navigate(['/login']).then(() => {
      console.log('User has been signed out, and local storage data cleared.');
    });
  }).catch((error) => {
    console.error('Error signing out: ', error);
    
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

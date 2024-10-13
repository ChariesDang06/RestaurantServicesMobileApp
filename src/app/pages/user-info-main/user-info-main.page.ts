import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../../models/user.model'; // Adjust the path as necessary

@Component({
  selector: 'app-user-info-main',
  templateUrl: './user-info-main.page.html',
  styleUrls: ['./user-info-main.page.scss'],
})
export class UserInfoMainPage implements OnInit {
  // Initialize user with blank data
  user: User = {
    userId: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    reservationHistory: [],
    orderHistory: [],
    score: 0,
    paymentMethods: {}
  };

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    if (userId) {
      this.getUserData(userId);
    } else {
      console.warn('No userId found in localStorage');
    }
  }

  getUserData(userId: string) {
    this.firestore
      .collection<User>('users') // Specify the collection
      .doc(userId)
      .valueChanges()
      .subscribe((userData: User | undefined) => {
        if (userData) {
          this.user = userData; // Assign the retrieved user data to the user property
        }
      }, error => {
        console.error('Error fetching user data:', error);
      });
  }

  getUserRank(score?: number): string {
    if (score === undefined) return 'Khách hàng'; // Default rank
    if (score > 1000) return 'Platinum'; // Example rank conditions
    if (score > 500) return 'Gold';
    return 'Silver';
  }
}

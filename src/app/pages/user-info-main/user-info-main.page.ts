import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users/user.service'; // Adjust the path as necessary
import { User } from '../../models/user.model'; // Adjust the path as necessary

@Component({
  selector: 'app-user-info-main',
  templateUrl: './user-info-main.page.html',
  styleUrls: ['./user-info-main.page.scss'],
})
export class UserInfoMainPage implements OnInit {
  user: User = {
    userId: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    reservationHistory: [],
    orderHistory: [],
    score: 0,
    paymentMethods: {},
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (userData: User | undefined) => {
          if (userData) {
            this.user = userData; // Assign the retrieved user data to the user property
          }
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.warn('No userId found in localStorage');
    }
  }

  getUserRank(score?: number): string {
    if (score === undefined) return 'Khách hàng'; // Default rank
    if (score > 1000) return 'Platinum'; // Example rank conditions
    if (score > 500) return 'Gold';
    return 'Silver';
  }
}

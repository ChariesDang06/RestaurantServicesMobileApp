import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/models/restaurant.model';
import { User } from 'src/app/models/user.model';
import { RestaurantService } from 'src/app/services/restaurants/restaurant.service';

import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-order-customer-info',
  templateUrl: './order-customer-info.component.html',
  styleUrls: ['./order-customer-info.component.scss'],
})
export class OrderCustomerInfoComponent  implements OnInit {


  mode: 'reservation' | 'delivery' = 'delivery'; // Default to 'delivery'
  user: User | null = null;
  reservation: any = null; // Define based on your reservation structure
  table: Table | null = null; // Declare the table property
  
  constructor(private userService: UserService, private restaurantService: RestaurantService) {}
ngOnDestroy() {
  localStorage.removeItem('orderMode');
  localStorage.removeItem('reservationInfo');
  //localStorage.removeItem('userId'); // Optional, if you want to clear it
}
  ngOnInit() {
    // Retrieve the mode from local storage
    this.mode = localStorage.getItem('orderMode') === 'reservation' ? 'reservation' : 'delivery';

    // Load the user information if in delivery mode
    if (this.mode === 'delivery') {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.userService.getUserById(userId).subscribe(userData => {
        if (userData) {
          this.user = userData;}
        });
      }
    
    } 
    else if (this.mode === 'reservation') {
  // Load the reservation information from local storage
  const reservationInfo = localStorage.getItem('reservationInfo');
  if (reservationInfo) {
    this.reservation = JSON.parse(reservationInfo);

    // Fetch the table information if needed
    const tableId = this.reservation.tableId; // Assume tableId in the reservation corresponds to the table name
    const restaurantId = "location001"; // Get the restaurant ID from the reservation info

    if (tableId && restaurantId) {
      this.restaurantService.getTableById(restaurantId, tableId).then(tableData => {
        if (tableData) {
          this.table = tableData; // Store the fetched table data
        }
      });
    }
  }
}

  }
}

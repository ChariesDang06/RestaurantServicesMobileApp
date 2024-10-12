import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurants/restaurant.service';

@Component({
  selector: 'app-data-test',
  templateUrl: './data-test.page.html',
  styleUrls: ['./data-test.page.scss'],
})
export class DataTestPage implements OnInit {
  restaurants: Restaurant[] = [];
  restaurantId: string = ''; // Store the restaurant ID for testing
  newRestaurant: Omit<Restaurant, 'restaurantId'> = {
    address: '',
    phone: '',
    mapHTML:''
  };
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getAllRestaurants();
  }
  getAllRestaurants() {
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurants = data;
      console.log('All Restaurants:', this.restaurants);
    });
  }

  getRestaurantById() {
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe(data => {
      console.log('Restaurant by ID:', data);
    });
  }

  createRestaurant() {
    this.restaurantService.createRestaurant(this.newRestaurant).then(() => {
      console.log('Restaurant created');
      this.getAllRestaurants(); // Refresh the list after creating
    });
  }

  updateRestaurant() {
    if (this.restaurantId) {
      const updatedData = { address: 'Updated Address', phone: '123456789' }; // Modify as needed
      this.restaurantService.updateRestaurant(this.restaurantId, updatedData).then(() => {
        console.log('Restaurant updated');
        this.getAllRestaurants(); // Refresh the list after updating
      });
    }
  }

  deleteRestaurant() {
    if (this.restaurantId) {
      this.restaurantService.deleteRestaurant(this.restaurantId).then(() => {
        console.log('Restaurant deleted');
        this.getAllRestaurants(); // Refresh the list after deletion
      });
    }
  }
}

/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-order-dish-details',
  templateUrl: './order-dish-details.page.html',
  styleUrls: ['./order-dish-details.page.scss'],
})
export class OrderDishDetailsPage implements OnInit {
  isMobile: boolean;
  note: string = '';
  increase: number = 0;
  optionList = [
    { name: 'Thêm thịt', price: 10000, isChecked: false },
    { name: 'Thêm Rau', price: 0, isChecked: false },
    { name: 'Thêm thêm cá', price: 10000, isChecked: false },
    { name: 'Thêm thêm bò', price: 10000, isChecked: false },
    { name: 'Thêm cua', price: 0, isChecked: false },
    { name: 'Thêm mước chấm', price: 0, isChecked: false },
    { name: 'Không hành', price: 0, isChecked: false },
  ];
  constructor(private platform: Platform, private form: FormBuilder) {
    this.isMobile = this.platform.is('mobile'); // Check if the platform is mobile
  }
  selectedOptions: any[] = [];

  // Method to handle checkbox change
  toggleOption(option: any) {
    option.isChecked = !option.isChecked;

    // Add or remove from selected options based on isChecked status
    if (option.isChecked) {
      this.selectedOptions.push(option);
    } else {
      this.selectedOptions = this.selectedOptions.filter(
        (selected) => selected.ID !== option.ID
      );
    }
  }

  onSubmit() {
    console.log(this.selectedOptions);
  }
  ngOnInit() {}
}

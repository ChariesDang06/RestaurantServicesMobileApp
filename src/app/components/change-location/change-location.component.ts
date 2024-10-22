import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { City, District, Ward } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/locationService/location.service';
@Component({
  selector: 'app-change-location',
  templateUrl: './change-location.component.html',
  styleUrls: ['./change-location.component.scss'],
})
export class ChangeLocationComponent implements OnInit {
  cities: City[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  selectedCity: { id: string; name: string } = { id: '', name: '' };
  selectedDistrict: { id: string; name: string } = { id: '', name: '' };
  districtName: { id: string; name: string } = { id: '', name: '' };
  selectedWard: { id: string; name: string } = { id: '', name: '' };
  // selectedCity: string = '';
  // selectedDistrict: string = '';
  // selectedWard: string = '';
  address: string = '';
  cityAlertOptions = {
    header: 'Chọn tỉnh thành',
    translucent: true,
  };
  districtAlertOptions = {
    header: 'Chọn quận huyện',
    translucent: true,
  };
  wardAlertOptions = {
    header: 'Chọn phường/ thị xã',
    translucent: true,
  };
  constructor(
    private locationService: LocationService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    this.cities = await this.locationService.getLocations();
  }

  onCityChange() {
    const selectedCityObj = this.cities.find(
      (city) => city.Id === this.selectedCity.id
    );

    if (selectedCityObj) {
      this.districts = selectedCityObj.Districts || [];
      this.selectedCity = {
        id: selectedCityObj.Id,
        name: selectedCityObj.Name,
      }; // Set both id and name
    } else {
      this.districts = [];
      this.selectedCity = { id: '', name: '' }; // Reset if no city is found
    }

    this.wards = [];
    this.selectedDistrict = { id: '', name: '' }; // Assuming selectedDistrict also has id and name
  }

  onDistrictChange() {
    const selectedDistrictObj = this.districts.find(
      (district) => district.Id === this.selectedDistrict.id
    );

    if (selectedDistrictObj) {
      this.wards = selectedDistrictObj.Wards || [];
      this.selectedDistrict = {
        id: selectedDistrictObj.Id,
        name: selectedDistrictObj.Name,
      }; // Set both id and name
    } else {
      this.wards = [];
      this.selectedDistrict = { id: '', name: '' }; // Reset if no district is found
    }
  }

  onWardChange() {
    const selectedWardObj = this.wards.find(
      (ward) => ward.Id === this.selectedWard.id
    );

    if (selectedWardObj) {
      this.selectedWard.name = selectedWardObj.Name; // Assuming ward object has a "Name" property
    } else {
      this.selectedWard.name = '';
    }
  }

  closePopup() {
    this.modalController.dismiss();
  }
  SubmitPopup() {
    this.modalController.dismiss({
      selectedCity: this.selectedCity,
      selectedDistrict: this.selectedDistrict,
      selectedWard: this.selectedWard,
      address: this.address,
      // Ensure this is already computed
    });
  }
}

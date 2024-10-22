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

  selectedCity: string = '';
  selectedDistrict: string = '';
  selectedWard: string = '';
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
    this.districts = this.selectedCity
      ? this.cities.find((city) => city.Id === this.selectedCity)?.Districts ||
        []
      : [];
    this.wards = [];
    this.selectedDistrict = '';
  }

  onDistrictChange() {
    this.wards = this.selectedDistrict
      ? this.districts.find((district) => district.Id === this.selectedDistrict)
          ?.Wards || []
      : [];
  }
  closePopup() {
    this.modalController.dismiss();
  }
  SubmitPopup() {
    this.modalController.dismiss({
      data: [
        this.selectedCity,
        this.selectedDistrict,
        this.selectedWard,
        this.address,
      ],
    });
  }
}

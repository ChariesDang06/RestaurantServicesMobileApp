import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private url =
    'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json';

  constructor() {}

  async getLocations() {
    const response = await axios.get(this.url);
    return response.data;
  }
}

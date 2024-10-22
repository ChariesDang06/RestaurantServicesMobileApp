import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  constructor() { }
  ngOnInit() {
  }
  maps = [
    { name: 'Sảnh chính', src: 'assets/images/image1.png' },
    { name: 'Tầng 1', src: 'assets/images/image2.png' },
    { name: 'Tầng 2', src: 'assets/images/image3.png' }
  ];

  tables = [
    { name: 'ban 1', id: '1' },
    { name: 'ban 2', id: '2' },
    { name: 'ban 3', id: '3' }
  ];

  selectedMap = this.maps[0];
  mapName=this.selectedMap.name;
   

  onMapChange(event: any) {
    this.selectedMap = event.detail.value.src;
  }
}
  
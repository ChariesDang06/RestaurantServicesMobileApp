import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-order-payments',
  templateUrl: './order-payments.page.html',
  styleUrls: ['./order-payments.page.scss'],
})
export class OrderPaymentsPage implements OnInit {
  isMobile: boolean;
  constructor(private platform: Platform) {
    this.isMobile = this.platform.is('mobile'); // Check if the platform is mobile
  }

  ngOnInit() {}
}

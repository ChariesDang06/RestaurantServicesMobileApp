import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
register()

@Component({
  standalone: true,
  selector: 'app-banner-promo',
  templateUrl: './banner-promo.component.html',
  styleUrls: ['./banner-promo.component.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BannerPromoComponent  implements OnInit {
  promos = [
    { promoHeader: 'Nhận ngay', promoAmount:'10% Off', promoContent:'cho cái bơ gơ bự đùng', src: 'assets/images/image1.png', alt: 'Image 1' },
    { promoHeader: 'Nhận ngay', promoAmount:'20% Off', promoContent:'cho cái bơ gơ bự đùng', src: 'assets/images/image2.png', alt: 'Image 2' },
    { promoHeader: 'Nhận ngay', promoAmount:'30% Off', promoContent:'cho cái bơ gơ bự đùng', src: 'assets/images/image3.png', alt: 'Image 3' },
  ];
  constructor() { }

  ngOnInit() {}

}

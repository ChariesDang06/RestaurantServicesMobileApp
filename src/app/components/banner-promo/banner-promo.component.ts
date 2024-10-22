import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models/promo.model';
import { register } from 'swiper/element/bundle';
import { PromoService } from 'src/app/services/promos/promo.service';
register()

@Component({
  //standalone: true,
  selector: 'app-banner-promo',
  templateUrl: './banner-promo.component.html',
  styleUrls: ['./banner-promo.component.scss'],

  
})
export class BannerPromoComponent  implements OnInit {
  promos: Promotion[]=[];
  constructor(private promotionService : PromoService) { }
  ngOnInit() {
    this.GetAllPromotions();
  }
  
  GetAllPromotions(){
    this.promotionService.getPromotions().then(data=>{
      this.promos=data;
    })
  }
}

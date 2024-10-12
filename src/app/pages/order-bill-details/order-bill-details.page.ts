import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-order-bill-details',
  templateUrl: './order-bill-details.page.html',
  styleUrls: ['./order-bill-details.page.scss'],
})
export class OrderBillDetailsPage implements OnInit {
  isMobile: boolean;
  shipCost: number = 9000;
  creditCardNumber: string = '1234567890';
  constructor(private platform: Platform) {
    this.isMobile = this.platform.is('mobile'); // Check if the platform is mobile
  }
  listOrderBill = [
    { image: '', name: 'Cơm tấm ba rọi béo', total: 2, price: 99000 },
    { image: '', name: 'Cơm tấm ba tui', total: 1, price: 99000 },
    { image: '', name: 'Cơm tấm ba streamer', total: 3, price: 99000 },
    { image: '', name: 'Cơm tấm ba chỉ vàng', total: 5, price: 99000 },
  ];
  getTotalPrice(): number {
    return this.listOrderBill.reduce(
      (total, item) => total + item.total * item.price,
      0
    );
  }
  maskNumber(numberString: string): string {
    const length = numberString.length;

    if (length <= 3) {
      return numberString;
    }

    const maskedPart = '*'.repeat(length - 3);
    const visiblePart = numberString.slice(-3);

    return maskedPart + visiblePart;
  }
  ngOnInit() {}
}

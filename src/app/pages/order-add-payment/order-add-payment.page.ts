import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-add-payment',
  templateUrl: './order-add-payment.page.html',
  styleUrls: ['./order-add-payment.page.scss'],
})
export class OrderAddPaymentPage implements OnInit {
  constructor() {}
  monthYear: string = '';
  ngOnInit() {}
  formatMMYY(event: any) {
    let input = event.target.value.replace(/\D/g, ''); // Loại bỏ tất cả các ký tự không phải số
    if (input.length > 4) {
      input = input.substring(0, 4); // Giới hạn tối đa 4 số (MMYY)
    }

    if (input.length >= 3) {
      // Chèn dấu "/" vào giữa 2 ký tự tháng và 2 ký tự năm
      input = input.substring(0, 2) + '/' + input.substring(2);
    }

    // Cập nhật giá trị cho input
    this.monthYear = input;
    event.target.value = this.monthYear; // Hiển thị trên giao diện
  }
}

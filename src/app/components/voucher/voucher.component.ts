import { Component, Input } from '@angular/core';
import { Voucher } from 'src/app/models/voucher.model';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss'],
})
export class VoucherComponent {
  @Input() voucher!: Voucher; // Nhận dữ liệu voucher từ trang cha
  constructor() {}

  ngOnInit() {}

  getVoucherDescription(): string {
    // Tạo mô tả chi tiết cho voucher từ dữ liệu
    return `${this.voucher.description} - Giảm ${this.voucher.value}% với hóa đơn từ ${this.voucher.minPrice} đến ${this.voucher.maxPrice}. Điều kiện: ${this.voucher.condition}`;
  }
}

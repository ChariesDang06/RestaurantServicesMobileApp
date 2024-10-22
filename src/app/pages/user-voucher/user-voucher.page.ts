import { Component, OnInit } from '@angular/core';
import { VoucherService } from 'src/app/services/voucher/voucher.service';
import { UserService } from 'src/app/services/users/user.service'; // Import UserService
import { User } from 'src/app/models/user.model'; // Import User model
import { Voucher } from 'src/app/models/voucher.model';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-user-voucher',
  templateUrl: './user-voucher.page.html',
  styleUrls: ['./user-voucher.page.scss'],
})
export class UserVoucherPage implements OnInit {
  vouchers: Voucher[] = [];
  user: User | null = null; // Khai báo thuộc tính user

  constructor(
    private voucherService: VoucherService,
    private userService: UserService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loadVouchers();
    this.getUserInfo(); // Gọi hàm để lấy thông tin người dùng khi khởi tạo
  }
  goBack() {
    this.navCtrl.navigateForward('/user-info-main');
  }
  async loadVouchers() {
    this.vouchers = await this.voucherService.getAllVouchers();
  }

  getUserInfo() {
    const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
    if (userId) {
      this.userService.getUserById(userId).subscribe((data: User | undefined) => {
        if (data) {
          this.user = data; // Gán giá trị cho user nếu tìm thấy
          console.log('User Info:', this.user);
        } else {
          console.error('User not found for userId:', userId);
        }
      }, error => {
        console.error('Error fetching user data:', error);
      });
    } else {
      console.error('User ID not found in localStorage');
    }
  }
  getRank(score: number | undefined): string {
    if (score === undefined) return 'Khách hàng'; // Default rank
    if (score > 1000) return 'Platinum'; // Example rank conditions
    if (score > 500) return 'Gold';
    return 'Khách hàng'; // Default rank if score is less than 500
  }

  getRankClass(score: number | undefined): string {
    if (score === undefined) return 'rank-default'; // Default class
    if (score > 1000) return 'rank-platinum'; // Platinum rank class
    if (score > 500) return 'rank-gold'; // Gold rank class
    return 'rank-default'; // Default class
  }
}

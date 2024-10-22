import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { User } from '../../models/user.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-info-main',
  templateUrl: './user-info-main.page.html',
  styleUrls: ['./user-info-main.page.scss'],
})
export class UserInfoMainPage implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService, private navCtrl: NavController) {}

  ngOnInit() {
    this.getUserInfo();
  }

  goToVoucher() {
    this.navCtrl.navigateForward('/user-voucher');
  }

  goToOrderHistory() {
    this.navCtrl.navigateForward('/user-history');
  }

  goToEditInfo() {
    this.navCtrl.navigateForward('/user-info-editing');
  }

  logout() {
    // Thực hiện logic đăng xuất nếu cần
    console.log('Đăng xuất');
    // Ví dụ: Xóa userId khỏi localStorage và điều hướng về trang đăng nhập
    localStorage.removeItem('userId');
    this.navCtrl.navigateRoot('/login'); // Đảm bảo bạn đã định nghĩa route này
  }

  goBack() {
    this.navCtrl.navigateForward('/home');
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

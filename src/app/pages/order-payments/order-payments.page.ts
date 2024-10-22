import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users/user.service';
@Component({
  selector: 'app-order-payments',
  templateUrl: './order-payments.page.html',
  styleUrls: ['./order-payments.page.scss'],
})
export class OrderPaymentsPage implements OnInit {
  constructor(
    private navController: NavController,
    private userService: UserService,
    private alertController: AlertController
  ) {}
  user: User | null = null;
  creditText: string = '';
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    const state = history.state;
    if (state && state.paymentMethod) {
      this.creditText = state.paymentMethod;
    }
    console.log('payment method', this.creditText);
    this.getUserInfo();
    console.log(this.user?.paymentMethods);
  }
  momoSubmit() {
    this.showAlet(
      'Liên kết Momo',
      '',
      'Vì lý do bảo mật nên chức năng này tụi em chưa hoàn thiện'
    );
  }
  async showAlet(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['Xác nhận'],
    });

    await alert.present();
  }
  gotoPreviousPage() {
    this.navController.navigateBack('/order-bill-details');
  }
  gotoOrderAddPaymentPage() {
    this.navController.navigateForward('/order-add-payment');
  }
  getUserInfo() {
    const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (data: User | undefined) => {
          if (data) {
            this.user = data; // Gán giá trị cho user nếu tìm thấy
            console.log('User Info:', this.user.paymentMethods);
          } else {
            console.error('User not found for userId:', userId);
          }
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('User ID not found in localStorage');
    }
  }
  maskNumber(numberString: string | undefined): string {
    if (!numberString) {
      return 'Lỗi thông tin tài khoản'; // Handle undefined case
    }
    const length = numberString.length;

    if (length <= 3) {
      return numberString;
    }

    const maskedPart = '*'.repeat(length - 3);
    const visiblePart = numberString.slice(-3);

    return maskedPart + visiblePart;
  }
  changePaymentMethod(paymentMethod: any) {
    this.navController.navigateBack('/order-bill-details', {
      state: { creditText: paymentMethod },
    });
  }
}

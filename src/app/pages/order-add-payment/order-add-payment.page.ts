import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-order-add-payment',
  templateUrl: './order-add-payment.page.html',
  styleUrls: ['./order-add-payment.page.scss'],
})
export class OrderAddPaymentPage implements OnInit {
  linkMomo() {
    this.showAlet(
      'Liên kết Momo',
      '',
      'Vì lý do bảo mật nên chức năng này tụi em chưa hoàn thiện'
    );
  }
  user: User | null = null;
  constructor(
    private navController: NavController,
    private userService: UserService,
    private alertController: AlertController
  ) {}
  creditNumber: string = '';
  Vcc: string = '';
  monthYear: string = '';
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.getUserInfo();
  }
  gotoPreviousPage() {
    this.navController.back();
  }
  getUserInfo() {
    // localStorage.setItem('userId', 'u001');

    const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (data: User | undefined) => {
          if (data) {
            this.user = data; // Gán giá trị cho user nếu tìm thấy
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
  async showAlet(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['Xác nhận'],
    });

    await alert.present();
  }
  formatCreditNumber(event: any) {
    let input = event.target.value.replace(/\D/g, ''); // Loại bỏ tất cả các ký tự không phải số
    if (input.length > 16) {
      input = input.substring(0, 16); // Giới hạn tối đa 4 số (MMYY)
    }

    // Cập nhật giá trị cho input
    this.creditNumber = input;
    event.target.value = this.creditNumber; // Hiển thị trên giao diện
  }
  // formatMMYY(event: any) {
  //   let input = event.target.value.replace(/\D/g, ''); // Remove all non-numeric characters
  //   if (input.length > 4) {
  //     input = input.substring(0, 4); // Limit to a maximum of 4 digits (MMYY)
  //   }

  //   if (input.length >= 3) {
  //     // Insert "/" between the month and year
  //     input = input.substring(0, 2) + '/' + input.substring(2);
  //   }

  //   // Update the value for the input
  //   this.monthYear = input;
  //   event.target.value = this.monthYear; // Display on the interface

  //   // Validation

  // }

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
  formatCvv(event: any) {
    let input = event.target.value.replace(/\D/g, ''); // Loại bỏ tất cả các ký tự không phải số
    if (input.length > 3) {
      input = input.substring(0, 2); //
    }

    this.Vcc = input;
    event.target.value = this.Vcc; // Hiển thị trên giao diện
  }
  validateMonthYear(monthYear: string): boolean {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Regex to match MM/YY format
    const match = monthYear.match(regex);

    if (match) {
      const month = parseInt(match[1], 10); // Extract the month as a number
      // You could also add checks here for more validation if needed
      return month >= 1 && month <= 12; // Ensure month is between 01 and 12
    }

    return false; // If regex doesn't match, return false
  }
  async onSubmit() {
    const isValid = this.validateMonthYear(this.monthYear);

    if (!isValid) {
      this.showAlet(
        'Lỗi liên kết',
        'Tháng năm không tồn tại',
        'Nhập sai định dạng ngày tháng năm, vui lòng nhập lại'
      );
      // Optionally, display an error message to the user
      return; // Exit the method early if the format is invalid
    } else if (this.Vcc.length !== 3 || this.creditNumber.length !== 16) {
      this.showAlet(
        'Lỗi liên kết',
        'Lỗi thông tin thẻ',
        'Thông tin thẻ sai, vui lòng kiểm tra lại mã số thẻ hoặc mã số CVV'
      );
      // Optionally, display an error message to the user
      return; // Exit the method early if the format is invalid
    } else {
      if (this.user) {
        //   this.user?.paymentMethods?.creditCard?.cardNumber = this.creditNumber;
        //   this.user?.paymentMethods?.creditCard?.cardHolder = this.Vcc;
        //   this.user?.paymentMethods?.creditCard?.expiryDate = this.monthYear;
        if (!this.user?.paymentMethods) {
          this.user.paymentMethods = {}; // Initialize paymentMethods if it doesn't exist
        }
        if (!this.user.paymentMethods.creditCard) {
          this.user.paymentMethods.creditCard = {
            cardHolder: this.Vcc,
            cardNumber: this.creditNumber,
            expiryDate: this.monthYear,
          }; // Initialize creditCard if it doesn't exist
        }
        try {
          await this.userService.updateUser(this.user);
          this.showAlet('Liên kết thành công', '', '');
          this.navController.back();
        } catch {
          await this.userService.updateUser(this.user);
          this.showAlet(
            'Lỗi liên kết',
            'Thông tin thẻ không hợp lệ',
            'Vui lòng kiểm tra lại thông tin'
          );
        }
      }
    }

    // this.user?.paymentMethods?.creditCard?.cardNumber=this.c
  }
}

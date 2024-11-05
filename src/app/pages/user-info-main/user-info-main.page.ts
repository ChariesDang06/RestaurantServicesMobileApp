import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { User } from '../../models/user.model';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-info-main',
  templateUrl: './user-info-main.page.html',
  styleUrls: ['./user-info-main.page.scss'],
})
export class UserInfoMainPage implements OnInit {

  user: User | null = null;
  userId:string|null=null;
  constructor(private router:Router,private authenticationService:AuthService,private userService: UserService, private navCtrl: NavController, private authService: AuthService,private alertController:AlertController,

  ) {}

  ngOnInit() {
    this.loadUser();
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
    localStorage.removeItem('userId');
    localStorage.clear();
    this.authService.signOut()
       // Điều hướng về trang đăng nhập
   
  }

  goToOrderPayments() {
    this.navCtrl.navigateForward('/order-add-payment', {
      state: {
        previousRoute: 'user-info-main',
      },
    });
    }

  goBack() {
    this.navCtrl.navigateForward('/home');
  }

  // getUserInfo() {
  //   const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
  //   if (userId) {
  //     this.userService.getUserById(userId).subscribe((data: User | undefined) => {
  //       if (data) {
  //         this.user = data; // Gán giá trị cho user nếu tìm thấy
  //         console.log('User Info:', this.user);
  //       } else {
  //         console.error('User not found for userId:', userId);
  //       }
  //     }, error => {
  //       console.error('Error fetching user data:', error);
  //     });
  //   } else {
  //     console.error('User ID not found in localStorage');
  //   }
  // }

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
  
  async loadUser() {
    this.userId = this.authenticationService.getLoggedInUserId();

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (userData: User | undefined) => {
          if (userData) {
            this.user = userData;
          } else {
            console.log('No user data found');
          }
        },
        (error) => {
          console.error('Error loading user:', error);
        }
      );
    } else {
      await this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Vui lòng đăng nhập',
      message: "Nhấn 'Đăng nhập' để chuyển hướng đến trang đăng nhập",
      buttons: [
        {
          text: 'Đăng nhập',
          handler: () => {
            this.navCtrl.navigateForward('/login', {
              // state: {
              //   previousRoute: 'home',
              // },
            });
          },
        },
      ],
    });

    await alert.present();
  }
}

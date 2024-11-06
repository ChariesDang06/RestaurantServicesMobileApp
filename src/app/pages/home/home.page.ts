import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Review } from '../../models/review.model';  // Model review
import { User } from '../../models/user.model';     // Model user
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertController } from '@ionic/angular';  // Import AlertController

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userId: string | null = null;
  user: User | null = null;
  reviews: Review[] = [];
  newReview: Review = { userId: '', rating: 0, comment: '' };
  stars = [1, 2, 3, 4, 5]; // Mảng 5 sao
  showLoginNotification: boolean = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private alertController: AlertController  // Inject AlertController
  ) { }

  ngOnInit() {
    //this.getUserInfo();
    this.checkUserLoggedIn();
    this.loadReviews();
    this.userId = this.authService.getLoggedInUserId();
    console.log('user id log to home' + this.userId)
  }
  ionViewWillEnter() {

    this.userId = this.authService.getLoggedInUserId();
  }
  checkUserLoggedIn() {
    // Check if userId exists in localStorage
    const userId = localStorage.getItem('userId');
    console.log('Checking userId in localStorage:', userId); // Debugging: Check if userId is found

    if (userId) {
      this.showLoginNotification = false; // Hide the login notification if userId exists
      this.getUserInfo();  // Fetch user information only if logged in
    } else {
      this.showLoginNotification = true;   // Show login notification if userId is not found
    }
  }

  goToLogin() {
    this.showLoginNotification = false; // Đóng thông báo
    // Chuyển hướng đến trang đăng nhập
    this.navCtrl.navigateForward('/login');
  }

  // Phương thức để đóng thông báo
  closeNotification() {
    this.showLoginNotification = false;
  }
  goToReservation() {
    this.navCtrl.navigateForward('/reservation');
  }

  goToOrder() {
    this.navCtrl.navigateForward('/order-main');
  }

  // Lấy thông tin người dùng
  getUserInfo() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUserById(userId).subscribe(userData => {
        if (userData) {
          this.user = userData;
          this.newReview.userId = userData.userId; // Cập nhật userId vào review mới
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

  // Kiểm tra xem người dùng có thể review không (dựa vào orderHistory)


  // Gửi review
  async submitReview() {

    if (this.newReview.rating < 1 || this.newReview.rating > 5) {
      const alert = await this.alertController.create({
        header: 'Lỗi',
        message: 'Vui lòng nhập số sao hợp lệ (1-5).',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (!this.newReview.comment.trim()) {
      const alert = await this.alertController.create({
        header: 'Lỗi',
        message: 'Vui lòng nhập bình luận.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const review: Review = {
      userId: this.userId!,
      rating: this.newReview.rating,
      comment: this.newReview.comment,
    };

    // Đẩy review lên Firestore
    this.firestore.collection('reviews').add(review).then(async () => {
      const alert = await this.alertController.create({
        header: 'Thành công',
        message: 'Cảm ơn bạn đã đánh giá!',
        buttons: ['OK']
      });
      await alert.present();

      // Xóa bình luận sau khi gửi thành công
      this.newReview = { userId: '', rating: 0, comment: '' }; // Đặt lại giá trị bình luận
      this.loadReviews();  // Tải lại review sau khi gửi
    }).catch(error => {
      console.error('Error submitting review:', error);
    });
  }

  // Tải review từ Firestore
  loadReviews() {
    this.firestore.collection<Review>('reviews').valueChanges().subscribe(reviewsData => {
      this.reviews = reviewsData;
    });
  }

  // Cập nhật rating khi nhấn vào ngôi sao
  setRating(rating: number) {
    this.newReview.rating = rating; // Cập nhật rating khi nhấn vào sao
  }

  async placeOrderFromHome() {
    const userId = this.authService.getLoggedInUserId();

    // Store in local storage
    localStorage.setItem('orderMode', 'delivery');

    // Navigate to OrderCustomerInfo component
    this.router.navigate(['/order-customer-info']);
  }
}

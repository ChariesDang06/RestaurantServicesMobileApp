import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Review } from '../../models/review.model';  // Model review
import { User } from '../../models/user.model';     // Model user
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: User | null = null;
  reviews: Review[] = [];
  newReview: Review = { userId: '', rating: 0, comment: '' };
  stars = [1, 2, 3, 4, 5]; // Mảng 5 sao


  constructor(private authService: AuthService,private router: Router,private userService: UserService, private firestore: AngularFirestore,private navCtrl: NavController) {}

  ngOnInit() {
    this.getUserInfo();
    this.loadReviews();
  }
goToReservation(){
  this.navCtrl.navigateForward('/reservation');
}
goToOrder(){
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
  canReview(): boolean {
    return !!(this.user && this.user.orderHistory && this.user.orderHistory.length > 0);
  }

  // Gửi review
  submitReview() {
    if (this.newReview.rating < 1 || this.newReview.rating > 5) {
      alert('Vui lòng nhập số sao hợp lệ (1-5).');
      return;
    }
    
    if (!this.newReview.comment.trim()) {
      alert('Vui lòng nhập bình luận.');
      return;
    }

    const review: Review = {
      userId: this.user!.userId,
      rating: this.newReview.rating,
      comment: this.newReview.comment,
    };

    // Đẩy review lên Firestore
    this.firestore.collection('reviews').add(review).then(() => {
      alert('Cảm ơn bạn đã đánh giá!');
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

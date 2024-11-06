import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { User } from '../../models/user.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-user-info-editing',
  templateUrl: './user-info-editing.page.html',
  styleUrls: ['./user-info-editing.page.scss'],
})
export class UserInfoEditingPage implements OnInit {
  user: User | null = null;
  tempUser: User = {
    userId: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    reservationHistory: [],
    orderHistory: [],
    score: 0,
    avatarUrl: '',
    password: ''
  };

  constructor(private userService: UserService, private navCtrl: NavController) {}

  ngOnInit() {
    this.getUserInfo();
  }
  goBack() {
    this.navCtrl.navigateForward('/user-info-main'); // Quay lại trang trước đó
  }
  getUserInfo() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUserById(userId).subscribe(userData => {
        if (userData) {
          this.user = userData;
          this.tempUser = { ...userData };
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

  async changeAvatar() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });

    if (image && image.webPath) {
      // Chuyển đổi blob URI thành File để tải lên
      const response = await fetch(image.webPath);
      const blob = await response.blob();
      const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });

      // Lấy userId từ localStorage
      const userId = localStorage.getItem('userId');
      if (userId) {
        // Gọi phương thức updateUserAvatar để tải ảnh lên Firebase và cập nhật Firestore
        await this.userService.updateUserAvatar(userId, file);
        
        // Cập nhật tempUser.avatarUrl với URL mới
        this.tempUser.avatarUrl = await this.userService.getUserById(userId).toPromise().then(userData => userData?.avatarUrl);
        
        console.log('Avatar updated:', this.tempUser.avatarUrl);
      }
    }
  }

  async saveChanges() {
    if (this.tempUser) {
      await this.userService.updateUser(this.tempUser);
      console.log('User info updated:', this.tempUser);
      this.user = { ...this.tempUser };
      this.navCtrl.navigateBack('user-info-main')
    }
  }
}

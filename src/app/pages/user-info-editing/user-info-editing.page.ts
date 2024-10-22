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
  };

  constructor(private userService: UserService, private navCtrl: NavController) {}

  ngOnInit() {
    this.getUserInfo();
    this.loadUserInfoFromLocalStorage();
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

  loadUserInfoFromLocalStorage() {
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    const phone = localStorage.getItem('userPhone');
    const address = localStorage.getItem('userAddress');
    const avatarUrl = localStorage.getItem('userAvatar');

    if (userId) {
      this.tempUser.userId = userId;
    }
    if (name) {
      this.tempUser.name = name;
    }
    if (email) {
      this.tempUser.email = email;
    }
    if (phone) {
      this.tempUser.phone = phone;
    }
    if (address) {
      this.tempUser.address = address;
    }
    if (avatarUrl) {
      this.tempUser.avatarUrl = avatarUrl;
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
      const response = await fetch(image.webPath);
      const blob = await response.blob();
      const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });

      const userId = localStorage.getItem('userId');
      if (userId) {
        await this.userService.updateUserAvatar(userId, file);
        this.tempUser.avatarUrl = await this.userService.getUserById(userId).toPromise().then(userData => userData?.avatarUrl);
        console.log('Avatar updated:', this.tempUser.avatarUrl);
      }
    }
  }

  async saveChanges() {
    if (this.tempUser) {
      await this.userService.updateUser(this.tempUser);
      console.log('User info updated:', this.tempUser);

      // Cập nhật thông tin vào localStorage
      localStorage.setItem('userName', this.tempUser.name || '');
      localStorage.setItem('userEmail', this.tempUser.email || '');
      localStorage.setItem('userPhone', this.tempUser.phone || '');
      localStorage.setItem('userAddress', this.tempUser.address || '');
      localStorage.setItem('userAvatar', this.tempUser.avatarUrl || '');

      this.user = { ...this.tempUser };
    }
  }

  goBack() {
    this.navCtrl.navigateForward('/user-info-main'); // Quay lại trang trước đó
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { User } from '../../models/user.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-info-editing',
  templateUrl: './user-info-editing.page.html',
  styleUrls: ['./user-info-editing.page.scss'],
})
export class UserInfoEditingPage implements OnInit {
  user: User | null = null;
  tempUser: User = { // Khởi tạo với một đối tượng User rỗng
    userId: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    reservationHistory: [],
    orderHistory: [],
    score: 0,
    avatarUrl: '', // Thêm thuộc tính avatarUrl nếu cần
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
    if (userId) {
      this.userService.getUserById(userId).subscribe(userData => { // Thay đổi phương thức lấy thông tin người dùng
        if (userData) { // Kiểm tra xem userData có tồn tại không
          this.user = userData;
          this.tempUser = { ...userData }; // Gán giá trị cho biến trung gian
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
      source: CameraSource.Photos, // Chọn từ thư viện ảnh
    });

    if (image && image.webPath) {
      this.tempUser.avatarUrl = image.webPath; // Cập nhật avatarUrl với đường dẫn mới
      // Lưu ảnh mới vào Firestore hoặc Storage nếu cần
    }
  }

  async saveChanges() {
    if (this.tempUser) { // Kiểm tra tempUser có tồn tại
      await this.userService.updateUser(this.tempUser); // Lưu thông tin người dùng đã chỉnh sửa
      console.log('User info updated:', this.tempUser);
      this.user = { ...this.tempUser }; // Cập nhật lại user
    }
  }
}

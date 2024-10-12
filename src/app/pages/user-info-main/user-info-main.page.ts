import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info-main',
  templateUrl: './user-info-main.page.html',
  styleUrls: ['./user-info-main.page.scss'],
})
export class UserInfoMainPage implements OnInit {

  userName: string = 'Ánh Min'; // Biến tên người dùng
  userRank: string = 'Khách hàng';     // Biến rank người dùng

  constructor() { }

  ngOnInit() {
    // Bạn có thể thêm các logic khi khởi tạo component tại đây
  }

  // Nếu bạn muốn cập nhật giá trị, có thể viết thêm các hàm tương ứng.
  updateUserInfo() {
    this.userName = 'Jane Smith';
    this.userRank = 'Platinum';
  }
}

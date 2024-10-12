import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-order-main',
  templateUrl: './order-main.page.html',
  styleUrls: ['./order-main.page.scss'],
})
export class OrderMainPage implements OnInit {
  isMobile: boolean;
  categoryList: string[] = [
    'Khai vị',
    'Món đặc trưng',
    'Món Xào',
    'Món canh',
    'Món trộn',
    'Món nướng',
    'Nước uống',
    'Món ăn kèm',
    'Món tráng miệng',
  ];
  selectedIndex: number = 0; // Set default selected index to 0

  selectCategory(index: number) {
    this.selectedIndex = index; // Update the selected index on click
  }
  // menuList:OrderDishComponent[]=new ;

  menuList = [
    {
      ID: 1,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 2,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 3,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 4,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 1,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 2,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 3,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 4,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 1,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 2,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 3,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 4,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 1,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 2,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 3,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 4,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 1,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 2,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 3,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 4,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 1,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 2,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 3,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
    {
      ID: 4,
      name: 'Gỏi cuống tôn thịt',
      image:
        'https://firebasestorage.googleapis.com/v0/b/restaurantservices-cf7db.appspot.com/o/categoryImg%2Fcat001_KhaiVi%2FEllipse%2064.png?alt=media&token=8e7deaea-c725-45ff-a4bb-5e4962b13a5c',
      sortDescription:
        'Thịt bò WaiGu, Tôm hùm Alaska, rau xanh công nghệ thủy sinh Đà Lạt. Chỉ có tại Nhà hàng Việt',
      price: 199000,
    },
  ];

  constructor(private platform: Platform) {
    this.isMobile = this.platform.is('mobile'); // Check if the platform is mobile
  }

  ngOnInit() {}
}

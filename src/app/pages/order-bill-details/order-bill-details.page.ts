import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Dish } from 'src/app/models/category.model';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order/order.service';
import { ChangeLocationComponent } from 'src/app/components/change-location/change-location.component';
import { User } from '../../models/user.model';
import { VoucherService } from 'src/app/services/voucher/voucher.service';
import { Voucher } from 'src/app/models/voucher.model';
import { UserService } from 'src/app/services/users/user.service';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservations/reservation.service';
@Component({
  selector: 'app-order-bill-details',
  templateUrl: './order-bill-details.page.html',
  styleUrls: ['./order-bill-details.page.scss'],
})
export class OrderBillDetailsPage implements OnInit {
  mode: 'reservation' | 'delivery' = 'reservation';
  shipCost: number = 0;
  basketPrice: number = 0;
  voucherCode: string = '';
  voucher: Voucher | null = null;
  orders: Order[] | null = null;
  creditText: string = '';
  user: User | null = null;
  userAddress: string = '';
  voucherDiscount: number = 0;

  depositAmount: number | undefined;
  confirmationEmailSent: boolean = false;
  confirmationSMSSent: boolean = false;
  note: string = '';
  constructor(
    private navController: NavController,
    private orderService: OrderService,
    private modalController: ModalController,
    private voucherService: VoucherService,
    private alertController: AlertController,
    private userService: UserService,
    private reservationService: ReservationService
  ) {
    this.mode =
      localStorage.getItem('orderMode') === 'reservation'
        ? 'reservation'
        : 'delivery';
  }
  listOrderDish: Dish[] = [];
  // ViewWillEnter() {}
  ionViewWillEnter() {
    console.log('enter ion view will enter');
    const state = history.state;
    console.log('state', state);
    if (state && state.creditText) {
      this.creditText = state.creditText;
      console.log('get payment', this.creditText);
    }
    this.listOrderDish = this.orderService.getDishes();
    this.basketPrice = this.calculateBasketPrice(this.listOrderDish);
  }
  getUserInfo() {
    // localStorage.setItem('userId', 'u001');

    const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (data: User | undefined) => {
          if (data) {
            this.user = data; // Gán giá trị cho user nếu tìm thấy
            if (!localStorage.getItem('tempAddress')) {
              localStorage.setItem('tempAddress', this.user.address || '');
              this.userAddress = localStorage.getItem('tempAddress') || '';
            } else {
              this.userAddress = localStorage.getItem('tempAddress') || '';
            }
          } else {
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
  ngOnInit() {
    console.log('call order bill detail');
    this.listOrderDish = this.orderService.getDishes();
    this.basketPrice = this.calculateBasketPrice(this.listOrderDish);
    this.getUserInfo();
    this.getNewestOrder();
  }
  calculateBasketPrice(dishes: Dish[]): number {
    return dishes.reduce((total, dish) => {
      console.log('selected item', dish);
      let dishPrice = Number(dish.price);
      if (dish.options && dish.options.length > 0) {
        const optionsTotalPrice = dish.options.reduce(
          (optionsTotalPrice, option) => {
            console.log('options ', option.price);
            return optionsTotalPrice + Number(option.price);
          },
          0
        );
        dishPrice += optionsTotalPrice;
        console.log(dishPrice);
      }
      console.log('total price', total, dish.total, dishPrice);
      return total + dish.total * dishPrice;
    }, 0); // Calculate total dishes
  }
  maskNumber(numberString: string): string {
    const length = numberString.length;

    if (length <= 3) {
      return numberString;
    }

    const maskedPart = '*'.repeat(length - 3);
    const visiblePart = numberString.slice(-3);

    return maskedPart + visiblePart;
  }
  gotoPreviousPage() {
    this.navController.navigateBack('/order-main');
  }
  // getCurrentLocation(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const locOptions = {
  //       maximumAge: 3000,
  //       timeout: 5000,
  //       enableHighAccuracy: true,
  //     };
  //     Geolocation.getCurrentPosition(locOptions)
  //       .then((position: any) => {
  //         resolve(position);
  //       })
  //       .catch((e) => {
  //         reject(e.message);
  //       });
  //   });
  // }

  async openLocationPopUp() {
    const modal = await this.modalController.create({
      component: ChangeLocationComponent,
    });
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const fullAddress =
          result.data.address +
          ',' +
          result.data.selectedWard.name +
          ', ' +
          result.data.selectedDistrict.name +
          ', ' +
          result.data.selectedCity.name;
        this.userAddress = fullAddress;
        if (this.user) {
          localStorage.setItem('tempAddress', fullAddress || '');
        }
        // this.user?.address = fullAddress;
      }
    });
    await modal.present();
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
  async checkVoucher() {
    try {
      const voucher: Voucher | undefined =
        await this.voucherService.getCouponById(this.voucherCode);
      if (voucher) {
        if (this.basketPrice >= voucher.condition) {
          this.voucher = voucher;
          if (this.voucher.Type === 'percent') {
            this.voucherDiscount = Math.min(
              (this.basketPrice / 100) * this.voucher.value,
              this.voucher.maxPrice
            );
            // this.basketPrice -= this.voucherDiscount;
            this.showAlet(
              'Thành công',
              `Giảm ${this.voucherDiscount}`,
              voucher.description
            );
          } else if (this.voucher.Type === 'fixed') {
            this.voucherDiscount = this.voucher.maxPrice;
            console.log('voucher', this.voucher);
            console.log('voucher discount', this.voucherDiscount);
            // this.basketPrice -= this.voucherDiscount;
            this.showAlet(
              'Thành công',
              `Giảm ${this.voucherDiscount}`,
              voucher.description
            );
          }
        } else {
          this.showAlet(
            'Thất bại',
            '',
            'không đủ điều kiện áp dụng voucher này'
          );
        }

        // Proceed with your logic using the voucher
      } else {
        this.showAlet('Thất bại', '', 'không tìm thấy voucher');
      }
    } catch (error) {
      console.error('Error fetching voucher:', error);
    }
  }
  gotoOrderPayments() {
    this.navController.navigateForward('/order-payments', {
      state: {
        paymentMethod: this.creditText,
      },
    });
  }
  async getNewestOrder() {
    const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
    if (userId) {
      try {
        // Await for the promise to resolve
        const orders: Order[] = await this.orderService.getOrdersByUser(
          userId,
          1
        );
        console.log('all order', orders); // Log the fetched data for debugging

        if (orders.length > 0) {
          console.log('order payment', orders[0].paymentMethod); // Log the fetched data for debugging

          if (orders[0].paymentMethod === 'Momo') {
            this.creditText = 'Momo';
          } else if (orders[0].paymentMethod === 'creditCard')
            this.creditText = this.maskNumber(
              this.user?.paymentMethods?.creditCard?.cardNumber || ''
            );
          else this.creditText = 'COD';
        } else {
          this.creditText = 'COD';
        }
      } catch (error) {
        console.error('Error fetching orders:', error); // Handle errors
      }
    }
  }
  // submit() {
  //   console.log(this.orderService.getDishes());
  //   localStorage.removeItem('tempAddress');
  //   // getOrdersByUser
  //   // throw new Error('Method not implemented.');
  // }
  async submit() {
    const currentTime = new Date().toISOString();
    const dishes = this.orderService.getDishes();
    const address = localStorage.getItem('');
    // Map Dish[] to OrderItem[], adding default quantity and other properties as needed
    const orderItems: Dish[] = dishes.map((dish) => ({
      ...dish,
      quantity: 1, // Set a default quantity, or update based on user input
    }));

    if (this.mode === 'reservation') {
      const reservationInfo = JSON.parse(
        localStorage.getItem('reservationInfo') || '{}'
      );
      const preOrderedItems: Dish[] = this.orderService.getDishes() || [];

      const reservation: Omit<Reservation, 'reservationId'> = {
        userId: this.user?.userId || reservationInfo.userId || 'guest',
        tableId: reservationInfo.tableId,
        reservationTime: currentTime,
        numberOfPeople: reservationInfo.numberOfPeople || 1,
        preOrderedItems: orderItems, // Use the mapped OrderItem[] for preordered items
        depositAmount: this.depositAmount || 0,
        status: 'confirmed',
        confirmationEmailSent: this.confirmationEmailSent || false,
        confirmationSMS: this.confirmationSMSSent || false,
        note: reservationInfo.note || '',
      };

      try {
        await this.reservationService.createReservation(reservation);
        this.orderService.clearDishes();
        const alert = await this.alertController.create({
          header: 'Đặt bàn thành công',
          message: 'Vui lòng kiểm tra đơn hàng trong lịch sử',
          buttons: ['OK'],
        });
        await alert.present();
        this.navController.navigateForward('/user-history');
      } catch (error) {
        console.error('Error creating reservation:', error);
      }
    } else if (this.mode === 'delivery') {
      const totalAmount = this.basketPrice || 0; // If basketPrice exists, use it; otherwise default to 0

      // Define the order object without `totalAmount` if it's not part of the Order type
      const order: Omit<Order, 'orderId'> = {
        userId: this.user?.userId || 'guest', // Default to 'guest' if userId is undefined
        address: this.userAddress,
        orderTime: currentTime,
        paymentMethod: 'Credit Card', // Set appropriate payment method
        status: 'Pending', // Default status or user-defined
        restaurantId: 'restaurant123', // Replace with actual restaurant ID
        orderItems,
        totalPrice: totalAmount,
        pickupTime: '',
      };

      try {
        await this.orderService.createOrder(order); // Use OrderService to create order
        this.orderService.clearDishes();

        const alert = await this.alertController.create({
          header: 'Đặt món thành công',
          message: 'Vui lòng kiểm tra đơn hàng trong lịch sử',
          buttons: ['OK'],
        });

        await alert.present();
        this.navController.navigateForward('/user-history');
      } catch (error) {
        console.error('Error creating order:', error);
      }
    }
  }
}

import { Component, OnInit,  } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { AlertController, ModalController } from '@ionic/angular';
import { OrderDetailsModalComponent } from 'src/app/components/order-details-modal/order-details-modal.component';
import { NavController } from '@ionic/angular';
import { Order } from 'src/app/models/order.model';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservations/reservation.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/models/user.model';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.page.html',
  styleUrls: ['./user-history.page.scss'],
})
export class UserHistoryPage implements OnInit {
  orderHistory: Order[] | null = null;
  reservationHistory: Reservation[] | null = null;
  userId:string|null=null;
  user:User|null=null;
  constructor(
    private orderService: OrderService,
    private modalController: ModalController,
    private navCtrl: NavController,
    private reservationService: ReservationService,
  private alertController :AlertController,
  private authenticationService:AuthService,
  private userService:UserService,
  private navController: NavController

  ) {}
  selectedTab: string = 'order';

  changeTab(tab: string) {
    this.selectedTab = tab; // Update the selected tab
  }
  goBack() {
    this.navCtrl.navigateForward('/user-info-main');
  }

  ngOnInit() {
    this.loadUser();
    this.loadOrdersByUserId();
    this.loadReservations();
    
  }
  ionViewWillEnter(){
    this.userId = this.authenticationService.getLoggedInUserId();
    
    this.loadOrdersByUserId();
    this.loadReservations();
  }
  async loadUser() {
    this.userId = this.authenticationService.getLoggedInUserId();

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (userData: User | undefined) => {
          if (userData) {
            this.user = userData;
            this.loadOrdersByUserId();
            this.loadReservations();
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
            this.navController.navigateForward('/login', {
              state: {
                previousRoute: 'user-history',
              },
            });
          },
        },
      ],

    });

    await alert.present();
  }
  async loadOrdersByUserId() {
console.log('user id'+this.userId)
    try {
      if(this.userId)
        {
      this.orderHistory = await this.orderService.getOrdersByUserId(this.userId);
   } } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);

    // Get day, month, year, hours, and minutes
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad to 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad to 2 digits
    const year = date.getFullYear(); // Get year
    const hours = String(date.getHours()).padStart(2, '0'); // Get hours and pad to 2 digits
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad to 2 digits

    // Return formatted date
    return `${day}/${month}/${year}-${hours}:${minutes}`;
  }
  async loadReservations() {
    console.log('user id'+this.userId)

    try {
    if(this.userId)
{
      this.reservationHistory =
        await this.reservationService.getReservationsByUserId(this.userId); // Call the async method with userId
      console.log('reservationHistory', this.reservationHistory);}
    } catch (err) {
      // this.error = 'Error fetching reservations'; // Handle error
      console.error(err);
    }
  }
  async openOrderDetails(
    order: Order | null = null,
    reservation: Reservation | null = null
  ) {
    if (order) {
      const modal = await this.modalController.create({
        component: OrderDetailsModalComponent,
        componentProps: {
          order: order,
        },
      });
      return await modal.present();
    } else if (reservation) {
      const modal = await this.modalController.create({
        component: OrderDetailsModalComponent,
        componentProps: {
          reservation: reservation,
        },
      });
      return await modal.present();
    }
  }
}

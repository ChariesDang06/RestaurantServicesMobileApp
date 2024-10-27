import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./pages/signin/signin.module').then((m) => m.SigninPageModule),
  },
  {
    path: 'order-bill-details',
    loadChildren: () =>
      import('./pages/order-bill-details/order-bill-details.module').then(
        (m) => m.OrderBillDetailsPageModule
      ),
  },
  {
    path: 'order-dish-details',
    loadChildren: () =>
      import('./pages/order-dish-details/order-dish-details.module').then(
        (m) => m.OrderDishDetailsPageModule
      ),
  },
  {
    path: 'order-main',
    loadChildren: () =>
      import('./pages/order-main/order-main.module').then(
        (m) => m.OrderMainPageModule
      ),
  },
  {
    path: 'order-payments',
    loadChildren: () =>
      import('./pages/order-payments/order-payments.module').then(
        (m) => m.OrderPaymentsPageModule
      ),
  },
  {
    path: 'reservation',
    loadChildren: () =>
      import('./pages/reservation/reservation.module').then(
        (m) => m.ReservationPageModule
      ),
  },
  {
    path: 'user-history',
    loadChildren: () =>
      import('./pages/user-history/user-history.module').then(
        (m) => m.UserHistoryPageModule
      ),
  },
  {
    path: 'user-info-editing',
    loadChildren: () =>
      import('./pages/user-info-editing/user-info-editing.module').then(
        (m) => m.UserInfoEditingPageModule
      ),
  },
  {
    path: 'user-info-main',
    loadChildren: () =>
      import('./pages/user-info-main/user-info-main.module').then(
        (m) => m.UserInfoMainPageModule
      ),
  },
  {
    path: 'user-voucher',
    loadChildren: () =>
      import('./pages/user-voucher/user-voucher.module').then(
        (m) => m.UserVoucherPageModule
      ),
  },

  {
    path: 'order-add-payment',
    loadChildren: () =>
      import('./pages/order-add-payment/order-add-payment.module').then(
        (m) => m.OrderAddPaymentPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

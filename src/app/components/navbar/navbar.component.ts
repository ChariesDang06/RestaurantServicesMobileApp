import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  
})
export class NavbarComponent  implements OnInit {

  isLoggedIn: boolean = false;
  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }
  login() {
    this.authService.signInWithGoogle();
  }

  logout() {
    this.authService.signOut();
  }
  
}

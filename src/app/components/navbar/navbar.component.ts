import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  @Input() selectedIndex: number = 0;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
  gotoNextPage(route: string) {
    this.router.navigate([`/${route}`]);
  }
  login() {
    this.authService.signInWithGoogle();
  }

  logout() {
    this.authService.signOut();
  }
}

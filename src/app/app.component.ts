import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  // Listen for window close or refresh event
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    // Clear the localStorage
    localStorage.clear();
    // Optionally, you can also trigger sign out if needed
    this.authService.signOut();
  }
}

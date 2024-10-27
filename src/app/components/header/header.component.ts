import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() route: string = '';
  @Input() label: string | null = null;
  constructor(private router: Router) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}
  gotoPreviousPage() {
    console.log(this.route);
    if (this.route) {
      this.router.navigate([`/${this.route}`]);
    }
  }
}
// ['/login'];

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss'],
})
export class NavbarMobileComponent implements OnInit {
  showMenu = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  navigate(path: string) {
    this.showMenu = false;
    this.router.navigate([`dashboard/${path}`]);
  }

  logout() {
    this.authService.logout();
  }
}

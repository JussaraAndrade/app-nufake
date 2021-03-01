import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss'],
})
export class NavbarMobileComponent implements OnInit {
  showMenu = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  navigate(path: string) {
    this.showMenu = false;
    this.router.navigate([`dashboard/${path}`]);
  }
}

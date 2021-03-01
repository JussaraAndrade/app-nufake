import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit(){
    this.user = this.authService.getUser();
   }

   logout(){
    this.authService.logout();
  }
}

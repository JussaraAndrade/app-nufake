import { Component, OnInit } from '@angular/core';

import { Dashboard } from './dashboard.interfaces';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboard: Dashboard[];
  erroNoCarregamento: boolean;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(){
    this.carregarDashboard()
  };

  carregarDashboard() {
    console.log('carregando.....')
    this.dashboardService.getDashboard()
    .subscribe(
      response => this.onSuccess(response),
      error => this.onError(error)
    );
  }
  onSuccess(response: Dashboard[]) {
    this.dashboard = response;
  }

  onError(error: any) {
    this.erroNoCarregamento = true;
    console.error(error);
  }

}



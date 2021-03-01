import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs/operators';
import { Plans } from 'src/app/shared/interfaces/plans.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PlansService } from 'src/app/shared/services/plans/plans.service';

import { Dashboard, Lancamento } from '../content/content.interface';
import { ContentService } from '../content/content.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  closeResult: string;

  plans!: Plans[];
  loading!: boolean;
  notLoading!: boolean;
  user: User;
  dashboardData: Dashboard;
  balance = 1000;
  availableLimit = 2600;
  lastTransactions: Lancamento[];
  dashboard: Dashboard;

  constructor(
    private plansService: PlansService,
    private authService: AuthService,

    private contentService: ContentService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getPlans();
    this.getDash();
    this.contentService
      .getDashboard()
      .subscribe((response) => (this.dashboardData = response));
  }

  getPlans() {
    this.loading = true;
    this.notLoading = false;
    this.plansService
      .getAccountPlans(this.user.login)
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        (response) => this.onSuccessPlans(response),
        (error) => this.onErrorPlans(error)
      );
  }

  getDash() {
    this.loading = true;
    this.contentService.getDashboard().subscribe(
      (response) => this.onSuccess(response),
      (error) => this.onError(error)
    );
  }

  onSuccess(response: Dashboard) {
    this.dashboard = response;
    this.balance =
      this.dashboard.contaBanco.saldo + this.dashboard.contaCredito.saldo;
    console.log(this.dashboard);

    const transactionsLength = this.dashboard.contaCredito.lancamentos.length;

    if (transactionsLength > 3) {
      this.lastTransactions = this.dashboard.contaCredito.lancamentos.slice(
        transactionsLength - 3,
        transactionsLength
      );
    } else {
      this.lastTransactions = this.dashboard.contaCredito.lancamentos;
    }
    console.log(this.lastTransactions);

    this.loading = false;
  }

  onSuccessPlans(response: Plans[]) {
    this.plans = response;
  }

  onErrorPlans(error: any) {
    this.notLoading = true;
    console.error(error);
    this.loading = false;
  }
  onError(error: any) {
    this.notLoading = true;
    console.error(error);
    this.loading = false;
  }
}

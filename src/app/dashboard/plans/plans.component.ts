import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs/operators';
import { Plans } from 'src/app/shared/interfaces/plans.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PlansService } from 'src/app/shared/services/plans/plans.service';

import { Dashboard } from '../content/content.interface';
import { ContentService } from '../content/content.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  plans!: Plans[];
  loading!: boolean;
  notLoading!: boolean;
  user: User;
  accountData: Dashboard;


  constructor(
    private plansService: PlansService,
    private authService: AuthService,
    private dashboard: ContentService,
  ) { }

  ngOnInit() {
    this.loadingPlans();

    this.user = this.authService.getUser();

    this.dashboard
      .getDashboard()
      .subscribe((response) =>
        (this.accountData = response)
      );
  }



  loadingPlans(){
    this.loading = true;

    this.plansService.getaccountPlans()
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      )
      .subscribe(
        response => this.onSuccessPlans(response),
        error => this.onErrorPlans(error),
      );
  }

  onSuccessPlans(response: Plans[]) {
    this.plans = response;
  }

  onErrorPlans(error: any) {
    this.notLoading = true;
    console.error(error);
  }

}

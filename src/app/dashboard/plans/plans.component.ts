import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  styleUrls: ['./plans.component.scss'],

})
export class PlansComponent implements OnInit {

  closeResult: string;

  plans!: Plans[];
  loading!: boolean;
  notLoading!: boolean;
  user: User;
  dashboardData: Dashboard;



  constructor(
    private plansService: PlansService,
    private authService: AuthService,
    private dashboard: ContentService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getPlans();
    this.dashboard
      .getDashboard()
      .subscribe((response) => (this.dashboardData = response));
  }

  getPlans() {
    this.loading = true;
    this.notLoading = false;
    this.plansService.getAccountPlans(this.user.login)
    .pipe(
      take(1),
      finalize(() => this.loading = false)
    )
    .subscribe(
      (response) => this.onSuccessPlans(response),
      (error) => this.onErrorPlans(error)
    );
  }

  onSuccessPlans(response: Plans[]) {
    this.plans = response;
  }

  onErrorPlans(error: any) {
    this.notLoading = true;
    console.error(error);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

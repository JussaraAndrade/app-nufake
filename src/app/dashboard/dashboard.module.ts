import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DepositComponent } from './deposit/deposit.component';
import { PaymentsComponent } from './payments/payments.component';
import { PlansComponent } from './plans/plans.component';
import { TransferComponent } from './transfer/transfer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    DepositComponent,
    PaymentsComponent,
    PlansComponent,
    TransferComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}

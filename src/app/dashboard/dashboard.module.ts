import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DepositComponent } from './deposit/deposit.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaymentsComponent } from './payments/payments.component';
import { PlansComponent } from './plans/plans.component';
import { TransferComponent } from './transfer/transfer.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    DepositComponent,
    PaymentsComponent,
    PlansComponent,
    TransferComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}

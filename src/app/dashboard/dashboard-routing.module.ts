import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard.component';
import { DepositComponent } from './deposit/deposit.component';
import { PaymentsComponent } from './payments/payments.component';
import { PlansComponent } from './plans/plans.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: ContentComponent,
      },
      {
        path: 'deposit',
        component: DepositComponent,
      },
      {
        path: 'payments',
        component: PaymentsComponent,
      },
      {
        path: 'plans',
        component: PlansComponent,
      },
      {
        path: 'transfer',
        component: TransferComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

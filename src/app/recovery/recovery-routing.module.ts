import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoveryComponent } from './recovery.component';

const routes: Routes = [
  { path: ':temporaryPassword', component: RecoveryComponent },
  { path: '', component: RecoveryComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoveryRoutingModule {}

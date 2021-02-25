import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageErroComponent } from './error/error.component';
import { RecoveryComponent } from './recovery/recovery.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'error',
    component: PageErroComponent,
    pathMatch: 'full',
  },
  {
    path: 'recovery',
    component: RecoveryComponent,
  },
  {
    path: '**',
    component: PageErroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageErroComponent } from './error/error.component';
import { IsAuthenticatedGuard } from './shared/guards/logged/is-authenticated.guard';
import { NotLoggedGuard } from './shared/guards/not-logged/not-logged.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
      canActivate: [NotLoggedGuard],
  },
  {
    path: 'recovery',
    loadChildren: () =>
      import('./recovery/recovery.module').then((m) => m.RecoveryModule),
      canActivate: [NotLoggedGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'error',
    component: PageErroComponent,
    pathMatch: 'full',
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

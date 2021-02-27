import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContentComponent } from './content/content.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [ContentComponent, NavbarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ],
  exports: [NavbarComponent]
})
export class DashboardModule { }

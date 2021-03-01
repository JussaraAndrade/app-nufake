import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedAreaRoutingModule } from './logged-area-routing.module';
import { LoggedAreaComponent } from './logged-area.component';


@NgModule({
  declarations: [LoggedAreaComponent],
  imports: [
    CommonModule,
    LoggedAreaRoutingModule
  ]
})
export class LoggedAreaModule { }

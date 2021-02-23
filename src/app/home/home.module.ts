import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SectionAComponent } from './section-a/section-a.component';
import { SectionBComponent } from './section-b/section-b.component';


@NgModule({
  declarations: [HomeComponent, SectionAComponent, SectionBComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SectionAComponent } from './section-a/section-a.component';
import { SectionBComponent } from './section-b/section-b.component';
import { SectionCComponent } from './section-c/section-c.component';
import { SectionDComponent } from './section-d/section-d.component';
import { SectionEComponent } from './section-e/section-e.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    SectionAComponent,
    SectionBComponent,
    SectionCComponent,
    SectionDComponent,
    SectionEComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule, ReactiveFormsModule],
})
export class HomeModule {}

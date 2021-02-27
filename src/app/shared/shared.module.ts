import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ArrowComponent } from './components/arrow/arrow.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [ArrowComponent, SpinnerComponent,],
  imports: [CommonModule],
  exports: [ArrowComponent, SpinnerComponent, ],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowComponent } from './components/arrow/arrow.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [ArrowComponent, SpinnerComponent],
  imports: [CommonModule],
  exports: [ArrowComponent, SpinnerComponent],
})
export class SharedModule {}

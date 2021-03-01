import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoveryRoutingModule } from './recovery-routing.module';
import { RecoveryComponent } from './recovery.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RecoveryComponent],
  imports: [CommonModule, RecoveryRoutingModule, ReactiveFormsModule],
})
export class RecoveryModule {}

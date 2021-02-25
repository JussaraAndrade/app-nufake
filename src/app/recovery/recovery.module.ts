import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoveryRoutingModule } from './recovery-routing.module';
import { RecoveryComponent } from './recovery.component';

@NgModule({
  declarations: [RecoveryComponent],
  imports: [CommonModule, RecoveryRoutingModule],
})
export class RecoveryModule {}

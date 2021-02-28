import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Plan } from 'src/app/shared/interfaces/plan.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';
import { Dashboard } from '../content/content.interface';
import { ContentService } from '../content/content.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  transferForm: FormGroup;
  dashboardData: Dashboard;
  user: User;
  plans: Plan[];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dashboard: ContentService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.transferForm = this.formBuilder.group({
      contaDestino: ['', Validators.required],
      data: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
      conta: ['', Validators.required],
      planoConta: ['', Validators.required],
    });

    this.user = this.authService.getUser();

    this.dashboard
      .getDashboard()
      .subscribe((response) => (this.dashboardData = response));

    this.transactionService
      .getPlanosConta(this.user.login)
      .subscribe((response) => (this.plans = response));
    console.log(this.plans);
  }

  showError(control: string): boolean {
    if (!this.transferForm.get(control)) {
      return false;
    }

    return (
      this.transferForm.get(control).invalid &&
      this.transferForm.get(control).touched
    );
  }

  validateAllFormFields() {
    Object.keys(this.transferForm.controls).forEach((field) => {
      const control = this.transferForm.get(field);
      control.markAsTouched();
    });
  }

  onSubmit() {
    if (this.transferForm.invalid) {
      this.validateAllFormFields();
      return;
    }
    this.transfer();
  }

  transfer() {
    const transaction = {
      ...this.transferForm.value,
      login: this.user.login,
      planoConta: Number(this.transferForm.value.planoConta),
      conta: Number(this.transferForm.value.conta),
    };

    this.transactionService
      .transfer(transaction)
      .subscribe((response) => console.log(response));
  }
}

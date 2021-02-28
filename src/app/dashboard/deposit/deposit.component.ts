import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Plans } from 'src/app/shared/interfaces/plans.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';

import { Dashboard } from '../content/content.interface';
import { ContentService } from '../content/content.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  id!: string;
  depositForm!: FormGroup;
  dashboardData: Dashboard;
  user: User;
  plans: Plans[];
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private transactionService: TransactionService,
    private dashboard: ContentService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.depositForm = this.formBuilder.group({
      data: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
      conta: ['', Validators.required],
    });

    this.user = this.authService.getUser();

    this.dashboard
      .getDashboard()
      .subscribe((response) => (this.dashboardData = response));

    this.transactionService
      .getPlanosConta(this.user.login)
      .subscribe((response) => (this.plans = response));
  }

  showError(control: string): boolean {
    if (!this.depositForm.get(control)) {
      return false;
    }

    return (
      this.depositForm.get(control).invalid &&
      this.depositForm.get(control).touched
    );
  }

  validateAllFormFields() {
    Object.keys(this.depositForm.controls).forEach((field) => {
      const control = this.depositForm.get(field);
      control.markAsTouched();
    });
  }

  onSubmit() {
    if (this.depositForm.invalid) {
      this.validateAllFormFields();
      return;
    }
    this.deposit();
  }

  deposit() {
    this.loading = true;
    const deposit = {
      ...this.depositForm.value,
      login: this.user.login,
      contaDestino: this.user.login,
      planoConta: Number(
        this.plans.filter((f) => f.tipoMovimento === 'R')[0].id
      ),
      conta: Number(this.depositForm.value.conta),
    };

    this.transactionService.transfer(deposit).subscribe(
      (_response) => this.onSuccessSaveDeposit(),
      (_error) => this.onError()
    );
  }

  onSuccessSaveDeposit() {
    this.loading = false;
    this.toastr.success('Sucesso!', 'Deposito realizado com sucesso.');
    this.router.navigate(['dashboard']);
  }

  onError() {
    this.loading = false;
    this.toastr.error('Erro!', 'Alguma coisa deu errado.');
  }
}

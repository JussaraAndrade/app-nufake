import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dashboard: ContentService,
    private transactionService: TransactionService,
    private toastr: ToastrService,
    private router: Router
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
    this.loading = true;
    const transaction = {
      ...this.transferForm.value,
      login: this.user.login,
      planoConta: Number(this.transferForm.value.planoConta),
      conta: Number(this.transferForm.value.conta),
    };

    this.transactionService.transfer(transaction).subscribe(
      (response) => this.onSuccess(),
      (error) => this.onError(error)
    );
  }

  onSuccess() {
    this.loading = false;
    this.toastr.success('Transferência realizada com sucesso', 'Tudo certo!');
    this.router.navigate(['dashboard']);
  }

  onError(error) {
    this.loading = false;
    this.toastr.error(error.error.error, 'Erro no cadastro!');
    console.log(error);
  }
}

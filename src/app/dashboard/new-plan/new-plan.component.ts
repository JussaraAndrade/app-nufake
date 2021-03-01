import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PlansService } from 'src/app/shared/services/plans/plans.service';

@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.scss'],
})
export class NewPlanComponent implements OnInit {
  planForm: FormGroup;
  user: User;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private planService: PlansService
  ) {}

  ngOnInit(): void {
    this.planForm = this.formBuilder.group({
      descricao: ['', Validators.required],
      tipoMovimento: ['R', Validators.required],
    });

    this.user = this.authService.getUser();
  }

  showError(control: string): boolean {
    if (!this.planForm.get(control)) {
      return false;
    }

    return (
      this.planForm.get(control).invalid && this.planForm.get(control).touched
    );
  }

  validateAllFormFields() {
    Object.keys(this.planForm.controls).forEach((field) => {
      const control = this.planForm.get(field);
      control.markAsTouched();
    });
  }

  onSubmit() {
    if (this.planForm.invalid) {
      this.validateAllFormFields();
      return;
    }
    this.deposit();
  }

  deposit() {
    this.loading = true;
    const plan = {
      ...this.planForm.value,
      padrao: true,
      id: 1,
      login: this.user.login,
    };

    this.planService.createPlan(plan).subscribe(
      (response) => this.onSuccess(),
      (error) => this.onError()
    );
  }

  onSuccess() {
    this.loading = false;
    this.toastr.success('Sucesso!', 'Deposito realizado com sucesso.');
    this.router.navigate(['dashboard/plans']);
  }

  onError() {
    this.loading = false;
    this.toastr.error('Erro!', 'Alguma coisa deu errado.');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/shared/services/register.service';
import { CPFValidator } from 'src/app/shared/validators/cpf.validator';
import { MustMatch } from 'src/app/shared/validators/must-match.validator';

@Component({
  selector: 'home-section-a',
  templateUrl: './section-a.component.html',
  styleUrls: ['./section-a.component.scss'],
})
export class SectionAComponent implements OnInit {
  arrowColor = '#fff';
  arrowColorDisabled = '#9b9b9b';
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        cpf: ['', [Validators.required, Validators.minLength(11)]],
        login: ['', Validators.required],
        nome: ['', Validators.required],
        senha: ['', [Validators.required, Validators.minLength(8)]],
        confirmarSenha: ['', Validators.required],
      },
      {
        validators: [CPFValidator('cpf'), MustMatch('senha', 'confirmarSenha')],
      }
    );
  }

  showError(control: string): boolean {
    if (!this.registerForm.get(control)) {
      return false;
    }

    return (
      this.registerForm.get(control).invalid &&
      this.registerForm.get(control).touched
    );
  }

  validateAllFormFields() {
    Object.keys(this.registerForm.controls).forEach((field) => {
      const control = this.registerForm.get(field);
      control.markAsTouched();
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.validateAllFormFields();
      return;
    }
    this.createUser();
  }

  createUser() {
    this.registerService.createAccount(this.registerForm.value).subscribe(
      (response) => this.onSuccess(),
      (error) => this.onError(error)
    );
  }

  onSuccess() {
    this.toastr.success('Faça o seu login', 'Usuário Criado!');
    this.router.navigate(['login']);
  }

  onError(error) {
    this.toastr.error(error.error.error, 'Erro no cadastro!');
    console.log(error);
  }
}

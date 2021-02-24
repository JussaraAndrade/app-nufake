import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/shared/services/register.service';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        cpf: ['', [Validators.required, Validators.minLength(11)]],
        login: ['', Validators.required],
        nome: ['', Validators.required],
        senha: ['', Validators.required],
        confirmarSenha: ['', Validators.required],
      },
      { validator: MustMatch('senha', 'confirmarSenha') }
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
      (error) => console.log('deu ruim: ', error)
    );
  }

  onSuccess() {
    this.router.navigate(['login']);
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../shared/services/login.service';
import { MustMatch } from '../shared/validators/must-match.validator';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
})
export class RecoveryComponent implements OnInit {
  LOGO_IMAGE_URL = './assets/gama-academy-logo-horizontal-verde-branco1 1.png';
  VECTOR_ICON_URL = './assets/Vector.png';

  forgotPasswordForm: FormGroup;
  changePasswordForm: FormGroup;
  temporaryPassword: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const paramPassword = this.route.snapshot.paramMap.get('temporaryPassword');
    if (paramPassword) {
      this.temporaryPassword = paramPassword;
      this.changePasswordForm = this.formBuilder.group(
        {
          usuario: ['', Validators.required],
          senha: ['', Validators.required],
          confirmarSenha: ['', Validators.required],
        },
        { validator: MustMatch('senha', 'confirmarSenha') }
      );
    } else {
      this.forgotPasswordForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        login: ['', Validators.required],
      });
    }
  }

  showError(control: string, form: FormGroup): boolean {
    if (!form.get(control)) {
      return false;
    }

    return form.get(control).invalid && form.get(control).touched;
  }

  validateAllFormFields(form: FormGroup) {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onForgotPasswordSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.validateAllFormFields(this.forgotPasswordForm);
      return;
    }
    this.requestNewTemporaryPassword();
  }

  requestNewTemporaryPassword() {
    this.loginService
      .requestNewPassword(this.forgotPasswordForm.value)
      .subscribe(
        (response) => this.onNewTemporaryPasswordSuccess(response),
        (error) => this.onNewTemporaryPasswordError(error)
      );
  }

  onNewTemporaryPasswordSuccess(response) {
    this.router.navigate([`/recovery/${response}`]);
  }

  onNewTemporaryPasswordError(error) {
    this.toastr.error(error.error.error, 'Erro!');
  }

  onChangePasswordSubmit() {
    if (this.changePasswordForm.invalid) {
      this.validateAllFormFields(this.changePasswordForm);
      return;
    }
    this.changePassword();
  }

  changePassword() {
    console.log(this.temporaryPassword);

    this.loginService
      .changePassword(this.temporaryPassword, this.changePasswordForm.value)
      .subscribe(
        (response) => this.onChangePasswordSuccess(response),
        (error) => this.onChangePasswordError(error)
      );
  }

  onChangePasswordSuccess(response) {
    this.toastr.success('Senha alterada :D', 'Sucesso!');
    this.router.navigate(['/login']);
  }

  onChangePasswordError(error) {
    this.toastr.error(error?.error.error, 'Erro!');
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
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
    console.log('pegar uma senha temporaria na api');
  }

  onChangePasswordSubmit() {
    if (this.changePasswordForm.invalid) {
      this.validateAllFormFields(this.changePasswordForm);
      return;
    }
    this.changePassword();
  }

  changePassword() {
    console.log('trocar a senha com a api');
  }
}

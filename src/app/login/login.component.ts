import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

import { LoginService } from '../shared/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //TO-DO: Deixar o caminho de imagens no css background-image
  LOGO_IMAGE_URL = './assets/gama-academy-logo-horizontal-verde-branco1 1.png';
  VECTOR_ICON_URL = './assets/Vector.png';

  @ViewChild('userInput') userInput: ElementRef | undefined;
  @ViewChild('passwordInput') passwordInput: ElementRef | undefined;

  loginForm: FormGroup = this.formBuilder.group({
    usuario: ['', Validators.required],
    senha: ['', Validators.required],
  });

  loading!: boolean;
  errorLogin!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(){}

  initialForm(){
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
    })
  }

  showError(control: string): boolean{
    if (!this.loginForm.get(control)) {
      return false;
    }

    return this.loginForm.get(control).invalid &&
    this.loginForm.get(control).touched;
  }

  validateAllFormFields() {
    Object.keys(this.loginForm.controls).forEach((field) => {
      const control = this.loginForm.get(field);
      control.markAsTouched();
    });
  }

  onSubmit(){
    if(this.loginForm.invalid){
      this.validateAllFormFields();
      return;
    }
    this.loginUser();
  }

  loginUser(){
    this.loading = true;
    this.loginService.login(this.loginForm.value)
      .pipe(
        finalize(()=> this.loading = false)
      )
      .subscribe(
        response => this.onSuccessLogin(),
        error => this.onErrorLogin(),
      );
  }

  onSuccessLogin() {
    this.toastr.success('Login efetuado com sucesso!');
    this.router.navigate(['dashboard']);
  }

  onErrorLogin(){
    this.toastr.error('Erro efetuar login!');
    this.errorLogin = true;
  }
}

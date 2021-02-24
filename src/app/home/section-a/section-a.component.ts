import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) {}

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
    console.log(this.registerForm);
  }
}

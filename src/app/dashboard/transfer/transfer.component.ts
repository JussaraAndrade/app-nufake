import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  transferForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.transferForm = this.formBuilder.group({
      contaDestino: ['', Validators.required],
      data: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
    });
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
    console.log(this.transferForm);

    if (this.transferForm.invalid) {
      this.validateAllFormFields();
      return;
    }
    this.transfer();
  }

  transfer() {
    console.log(this.transferForm.value);
  }
}

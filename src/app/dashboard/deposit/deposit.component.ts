import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

import { Dashboard } from '../content/content.interface';
import { ContentService } from '../content/content.service';
import { DepositService } from './deposit.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

  id!: string;
  depositForm!: FormGroup;
  accountData: Dashboard;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private depositService: DepositService,
    private dashboard: ContentService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.depositForm = this.formBuilder.group({
      data: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
    });


    this.user = this.authService.getUser();

    this.dashboard
      .getDashboard()
      .subscribe((response) =>
        (this.accountData = response));

  }



  onSuccessSaveDeposit() {
    this.toastr.success('Sucesso!', 'Deposito realizado com sucesso.');

  }

  onError() {
    this.toastr.error('Erro!', 'Alguma coisa deu errado.');
  }


}

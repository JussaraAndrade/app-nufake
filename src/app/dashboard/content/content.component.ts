import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from 'src/app/shared/util/formatDate';

import { Dashboard, Lancamento } from './content.interface';
import { ContentService } from './content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  dashboard: Dashboard;
  erroNoCarregamento: boolean;
  balance = 0;
  transactions = 0;
  currentBill = 0;
  availableLimit = 2600;
  loading: boolean;
  lastTransactions: Lancamento[];
  inicio: string;
  fim: string;
  datesForm: FormGroup;

  constructor(
    private contentService: ContentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 31);
    this.inicio = formatDate(startDate);
    this.fim = formatDate(new Date());

    this.carregarDashboard();

    this.datesForm = this.formBuilder.group({
      inicio: [this.inicio],
      fim: [this.fim],
    });
  }

  onChange() {
    this.loading = true;

    this.inicio = this.datesForm.value.inicio;
    this.fim = this.datesForm.value.fim;

    this.contentService.getDashboardWithDate(this.inicio, this.fim).subscribe(
      (response) => this.onSuccess(response),
      (error) => this.onError(error)
    );
  }

  carregarDashboard() {
    this.loading = true;
    this.contentService.getDashboard().subscribe(
      (response) => this.onSuccess(response),
      (error) => this.onError(error)
    );
  }
  onSuccess(response: Dashboard) {
    this.dashboard = response;
    this.balance =
      this.dashboard.contaBanco.saldo + this.dashboard.contaCredito.saldo;

    this.dashboard.contaBanco.lancamentos.forEach((lancamento) => {
      this.transactions += lancamento.valor;
    });

    this.dashboard.contaCredito.lancamentos.forEach((lancamento) => {
      this.currentBill += lancamento.valor;
    });

    const transactionsLength = this.dashboard.contaCredito.lancamentos.length;

    if (transactionsLength > 3) {
      this.lastTransactions = this.dashboard.contaCredito.lancamentos.slice(
        transactionsLength - 3,
        transactionsLength
      );
    } else {
      this.lastTransactions = this.dashboard.contaCredito.lancamentos;
    }

    this.loading = false;
  }

  onError(error: any) {
    this.erroNoCarregamento = true;
    console.error(error);
    this.loading = false;
  }
}

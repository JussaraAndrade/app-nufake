import { Component, OnInit } from '@angular/core';

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
  balance = 1000;
  transactions = 0;
  currentBill = 0;
  availableLimit = 2600;
  loading: boolean;
  lastTransactions: Lancamento[];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.carregarDashboard();
  }

  carregarDashboard() {
    this.loading = true;
    console.log('carregando.....');
    this.contentService.getDashboard().subscribe(
      (response) => this.onSuccess(response),
      (error) => this.onError(error)
    );
  }
  onSuccess(response: Dashboard) {
    this.dashboard = response;
    this.balance =
      this.dashboard.contaBanco.saldo + this.dashboard.contaCredito.saldo;
    console.log(this.dashboard);

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
    console.log(this.lastTransactions);

    this.loading = false;
  }

  onError(error: any) {
    this.erroNoCarregamento = true;
    console.error(error);
    this.loading = false;
  }
}

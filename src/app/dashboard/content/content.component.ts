import { Component, OnInit } from '@angular/core';

import { Dashboard } from './content.interface';
import { ContentService } from './content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  dashboard: Dashboard[];
  erroNoCarregamento: boolean;

  constructor(
    private contentService: ContentService,
  ) { }

  ngOnInit(){
    this.carregarDashboard()
  };

  carregarDashboard() {
    console.log('carregando.....')
    this.contentService.getDashboard()
    .subscribe(
      response => this.onSuccess(response),
      error => this.onError(error)
    );
  }
  onSuccess(response: Dashboard[]) {
    this.dashboard = response;
  }

  onError(error: any) {
    this.erroNoCarregamento = true;
    console.error(error);
  }

}

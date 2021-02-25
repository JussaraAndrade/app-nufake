import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-page-erro',
  templateUrl: './page-erro.component.html',
  styleUrls: ['./page-erro.component.scss']
})
export class PageErroComponent implements OnInit {
  VECTOR_ICON_URL = './assets/svg/arrowBack.svg';

  ngOnInit(): void {
  }
  constructor(
    private routeActivated: ActivatedRoute,
    private router: Router,
  ) { }

  onSubmit(){
    this.router.navigate(['/']); 
  }

}

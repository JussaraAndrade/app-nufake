import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
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

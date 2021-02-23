import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LOGO_IMAGE_URL = './assets/gama-academy-logo-horizontal-verde-branco1 1.png';
  VECTOR_ICON_URL = './assets/Vector.png';

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
})
export class RecoveryComponent implements OnInit {
  LOGO_IMAGE_URL = './assets/gama-academy-logo-horizontal-verde-branco1 1.png';
  VECTOR_ICON_URL = './assets/Vector.png';

  temporaryPassword: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const paramPassword = this.route.snapshot.paramMap.get('temporaryPassword');
    if (paramPassword) {
      this.temporaryPassword = paramPassword;
    }
  }
}

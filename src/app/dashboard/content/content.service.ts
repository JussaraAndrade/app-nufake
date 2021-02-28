import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { formatDate } from 'src/app/shared/util/formatDate';
import { environment } from 'src/environments/environment';

import { Dashboard } from './content.interface';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getDashboard(): Observable<Dashboard> {
    const user = this.authService.getUser().login;
    const fim = formatDate(new Date());
    const inicio = new Date();
    inicio.setDate(inicio.getDate() - 31);

    return this.http.get<Dashboard>(
      this.API_URL +
        `/dashboard?fim=${fim}&inicio=${formatDate(inicio)}&login=${user}`
    );
  }
}

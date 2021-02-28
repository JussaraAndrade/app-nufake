import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Plans } from '../../interfaces/plans.interface';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAccountPlans(login:string): Observable<Plans[]> {
    return this.http.get<Plans[]>(
      `${this.API_URL}/lancamentos/planos-conta?login=${login}`)
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Deposit } from '../../interfaces/deposit.interface';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  deposit(depositData: Deposit): Observable<Deposit>{
    return this.http.post<Deposit>(
      `${this.API_URL}/lancamentos`,
      depositData
    );

  }
}

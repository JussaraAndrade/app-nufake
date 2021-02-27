import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Dashboard } from './dashboard.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  API_URL = environment.API_URL;


    // query ={
    //       fim: '2021-02-26',
    //       inicio: '2021-02-26',
    //       login: 'kleyton'
    //   };


      httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrbGV5dG9uIiwiaWRVc3VhcmlvIjo1NTEsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2MTQzODIzNTcsImV4cCI6MTYxNDM4NTk1N30.W7NCPLYHyQZuLWQR4STjtCrofj-e1ylnDJtz61pK8YPpaZRghswDfDlvPxm2cMVxD1gF4qDPczeYuQlUxVvn6w'
      }),
  };

  constructor(
    private http: HttpClient,
  ) { }

  getDashboard() {
    // const opts = { params: new HttpParams({fromString: "fim=2021-02-26&inicio=2021-02-26&login=kleyton"}) };
    return this.http.get<[Dashboard]>(this.API_URL + '/dashboard' + '?fim=2021-02-26&inicio=2021-02-26&login=kleyton', this.httpOptions);
  }

}

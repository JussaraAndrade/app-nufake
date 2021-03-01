import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  createAccount(user: User) {
    return this.http.post<User>(`${this.API_URL}/usuarios`, user);
  }
}

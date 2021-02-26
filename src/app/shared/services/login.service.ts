import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChangePassword, NewPassword } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  changePassword(temporaryPassword: string, changePassword: ChangePassword) {
    return this.http.post<NewPassword>(
      `${this.API_URL}/altera-senha?senhaTemporaria=${temporaryPassword}`,
      changePassword
    );
  }

  requestNewPassword(newPassword: NewPassword) {
    return this.http.post<NewPassword>(
      `${this.API_URL}/nova-senha`,
      newPassword
    );
  }
}

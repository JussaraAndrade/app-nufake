import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario: User | undefined;
  private token: string | undefined;

  constructor(
    private router: Router,
  ){}

  setUser(user: User){
    this.usuario = user;
    localStorage.setItem('usuario', JSON.stringify(user));
  }

  setToken(token: string){
    this.token = token;
    localStorage.setItem('token', token);
  }

  getUser(){
    if(this.usuario){
      return this.usuario;
    }

    const savedUsers = localStorage.getItem('usuario');
    if(savedUsers){
      this.usuario = JSON.parse(savedUsers);
      return this.usuario;
    }

    return undefined;
  }

  getToken(){
    if(this.token){
      return this.token;
    }

    const savedToken = localStorage.getItem('token');
    if(savedToken){
      this.token = savedToken;
      return this.token;
    }

    return undefined;
  }

  logout() {
    delete this.usuario;
    delete this.token;
    localStorage.clear();
    this.router.navigate(['login']);
  }

  logged(){
    if(this.getUser() && this.getToken()){
      return true;
    }
    return false;
  }

}

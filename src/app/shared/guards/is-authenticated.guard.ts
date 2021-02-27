import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      return true;
    }

    this.router.navigate(['login']);
  }
}

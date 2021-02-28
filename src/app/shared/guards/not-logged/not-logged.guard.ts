import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotLoggedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const logged = this.authService.isAuthenticated();

    if (!logged) {
      return true;
    }

    this.router.navigate(['dashboard']);
    return false;
  }
}

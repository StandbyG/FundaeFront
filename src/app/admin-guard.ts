import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './core/services/auth.services';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getRole() === 'admin') {
      return true;  // Permite el acceso si es administrador
    } else {
      this.router.navigate(['/']);  // Redirige si no es administrador
      return false;  // Bloquea el acceso si no es admin
    }
  }
}

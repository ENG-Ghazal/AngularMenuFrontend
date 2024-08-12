import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
     const expectedRole = next.data['role'] as string; // Get expected role from route data

if (this.authService.isAuthenticated() &&
    this.authService.hasRole(expectedRole) &&
     localStorage.getItem('token')) {
      return true;
    }

    else {
      this.router.navigate(['/login']); // Redirect to login if not authorized
      return false;
    }
  }
}

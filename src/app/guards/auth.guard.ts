import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = route.routeConfig.path;
    const isLogined = this.authService.isUserLogined.getValue();
    if (url === 'login' && !isLogined) {
      return true;
    }
    if (url !== 'login' && url !== 'home' && isLogined) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}

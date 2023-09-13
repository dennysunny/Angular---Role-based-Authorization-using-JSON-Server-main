import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}

  isLoggedIn: boolean = true;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.authService.isLoggedIn.subscribe({
      next: (res) => {
        console.log('resss', res);
        this.isLoggedIn = res;
      },
    });

    const token = localStorage.getItem('auth-token');

    if (this.isLoggedIn && token) {
      console.log('isLoggedin ?', this.isLoggedIn);
      this.route.navigate(['/home']);
      return false;
    } else return true;
  }
}

import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Authentication/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class isAuthenticatedGuard implements CanActivate {
  constructor(
    private authservice: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const isLoggedIn = localStorage.getItem('token') ? true : false;
    if (!isLoggedIn) {
      this.router.navigate(["Login"])
    }
    return isLoggedIn
  }
}

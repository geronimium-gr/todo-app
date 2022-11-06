import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {

  private helper = new JwtHelperService();

  constructor(private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    try {
      if (sessionStorage.getItem("token") === null || this.helper.isTokenExpired(`${sessionStorage.getItem("token")}`)) {
        this.router.navigate(['login']);
        return false;
      }
    } catch (error) {
      this.router.navigate(['login']);
      return false;
    }


    return true;
  }

}

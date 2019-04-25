import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {LoginComponent} from "../login/login.component";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private loginService: LoginComponent
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.isLoggedIn) {
      console.log("logged in")
      return true;
    }
    console.log("not logged")
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
  
}

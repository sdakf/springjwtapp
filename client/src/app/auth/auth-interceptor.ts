import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {LoginComponent} from "../login/login.component";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private loginService: LoginComponent) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    if (req.urlWithParams.indexOf('localhost') > -1) {
      let token = this.tokenStorageService.getToken();
      if (token != null) {
        authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
      }
    }
    return next.handle(authReq);
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];

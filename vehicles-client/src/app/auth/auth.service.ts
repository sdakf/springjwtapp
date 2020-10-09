import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {TokenStorageService} from './token-storage.service';
import {Constants} from '../constants';
import {HttpClient} from '@angular/common/http';
import {JwtResponse} from './jwt-response';
import {AuthLoginInfo} from "./login-info";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = Constants.API_BASE_URL + '/auth/signIn';

  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private tokenService: TokenStorageService, private httpClient: HttpClient) {
  }

  checkAuthenticated(): boolean {
    const authenticated = this.tokenService.isLoggedIn();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  login(credentials: AuthLoginInfo): Observable<boolean> {
    return this.httpClient.post<JwtResponse>(this.loginUrl, credentials)
      .pipe(map(jwtResponse => {
        if (jwtResponse.token === null) {
          console.log('cant login');
        }
        console.log('logged');
        this.isAuthenticated.next(true);
        this.tokenService.saveToken(jwtResponse.token);
        return this.isAuthenticated.value;
      }));
    // ,
    // error => {
    //   console.log(error);
    //   this.tokenService.signOut();
    //   this.isAuthenticated.next(false);
    // });
  }

  logout(redirect: string): void {
    try {
      this.tokenService.signOut();
      this.isAuthenticated.next(false);
      this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }
}

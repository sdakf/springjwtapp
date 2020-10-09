import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {TokenStorageService} from './token-storage.service';
import {Constants} from '../constants';
import {HttpClient} from '@angular/common/http';
import {JwtResponse} from './jwt-response';
import {AuthLoginInfo} from "./login-info";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = Constants.API_BASE_URL + '/auth/signIn';

  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private tokenService: TokenStorageService, private httpClient: HttpClient) {
  }

  async checkAuthenticated(): Promise<boolean> {
    const authenticated = await this.tokenService.isLoggedIn();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  async login(credentials: AuthLoginInfo): Promise<void> {
    this.httpClient.post<JwtResponse>(this.loginUrl, credentials).subscribe(e => {
        if (e.token === null) {
          console.log('cant login');
        }
        console.log(e);
        this.isAuthenticated.next(true);

        this.tokenService.saveToken(e.token);
      },
      error => {
        console.log(error);
        this.tokenService.signOut();
        this.isAuthenticated.next(false);
      });
  }

  async logout(redirect: string) {
    try {
      await this.authClient.signOut();
      this.isAuthenticated.next(false);
      this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }
}

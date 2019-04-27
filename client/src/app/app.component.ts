import {Component} from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';
import {LoginComponent} from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'client';


  constructor(public tokenStorage: TokenStorageService, private loginService: LoginComponent) {

  }
}

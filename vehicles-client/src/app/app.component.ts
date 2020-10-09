import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vehicles-client';
  open = true;
  authenticated: boolean;

  constructor(public auth: AuthService) {
    this.auth.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => this.authenticated = isAuthenticated
    );
  }

  ngOnInit(): void {
    this.authenticated = this.auth.checkAuthenticated();

    // this.auth.isAuthenticated.subscribe(
    //   e => {
    //     console.log(e);
    //     this.authenticated = e.valueOf();
    //   });
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {AuthLoginInfo} from '../auth/login-info';

// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/cars';

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.authService.checkAuthenticated()) {
      console.log(this.returnUrl);
      await this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      const username = this.form.get('username').value;
      const password = this.form.get('password').value;
      this.authService.login(new AuthLoginInfo(username, password))
      .subscribe(e => {
      if (this.authService.isAuthenticated.value) {
        console.log(this.returnUrl);
        this.router.navigate([this.returnUrl]);

      } else {
        console.log('not logged');
      }
      // console.log(e)
      });
    } else {
      this.formSubmitAttempt = true;
    }
  }
}

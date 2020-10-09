import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {WelcomeComponent} from './welcome/welcome.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CarsListComponent} from './cars/cars_list/cars-list.component';
import {HttpClientModule} from '@angular/common/http';
import {httpInterceptorProviders} from './auth/auth-interceptor';
import {AuthGuard} from './auth/auth-guard.service';
import {CarsEditComponent} from './cars/cars-edit/cars-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    LoginComponent,
    CarsListComponent,
    CarsEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginComponent, httpInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {VehiclesListComponent} from './vehicles-list/vehicles-list.component';

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VehicleEditComponent} from './vehicle-edit/vehicle-edit.component';
import {FormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {httpInterceptorProviders} from "./auth/auth-interceptor";
import {Sidenav} from './sidenav/sidenav';
import {AuthGuard} from './auth/auth-guard.service';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    VehiclesListComponent,
    VehicleEditComponent,
    HomeComponent,
    LoginComponent,
    Sidenav,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule
  ],
  providers: [LoginComponent, httpInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}

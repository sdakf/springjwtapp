import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {CarsListComponent} from './cars/cars_list/cars-list.component';
import {AuthGuard} from './auth/auth-guard.service';
import {CarsEditComponent} from "./cars/cars-edit/cars-edit.component";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'cars',
    component: CarsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'car-edit/:id',
    component: CarsEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'car-add',
    component: CarsEditComponent,
    canActivate: [AuthGuard]
  },
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VehiclesListComponent} from "./vehicles-list/vehicles-list.component";
import {VehicleEditComponent} from "./vehicle-edit/vehicle-edit.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path:'vehicle-list',
    component: VehiclesListComponent
  },
  {
    path: 'vehicle-add',
    component: VehicleEditComponent
  },
  {
    path: 'vehicle-edit/:id',
    component: VehicleEditComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

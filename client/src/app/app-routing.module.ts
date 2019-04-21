import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VehiclesListComponent} from "./vehicles-list/vehicles-list.component";
import {VehicleEditComponent} from "./vehicle-edit/vehicle-edit.component";

const routes: Routes = [
  {path: '', redirectTo: '/vehicle-list', pathMatch: 'full'},
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
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

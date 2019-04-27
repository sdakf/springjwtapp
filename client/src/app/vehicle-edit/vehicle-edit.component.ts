import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleService} from "../common/vehicles/vehicle.service";
import {GiphyService} from "../common/GiphyService";
import {NgForm} from '@angular/forms';
import {Car} from "../model/car";

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.less']
})
export class VehicleEditComponent implements OnInit {

  car: Car = {id: null, model: null, giphyUrl: null};
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router,
              private vehicleService: VehicleService, private giphyService: GiphyService) {
  }

  ngOnInit() {

    this.subscription = this.route.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.vehicleService.getVehicle(id).subscribe((vehicle: Car) => {
          if (vehicle) {
            this.car = vehicle;
            console.log(vehicle)
            // this.giphyService.populate(vehicle.model).subscribe(url => this.car.giphyUrl = url);
          } else {
            console.log(`Car with id '${id}' not found`)
            this.goToList();

          }
        });
      }
    });

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  private goToList() {
    this.router.navigate(['/vehicle-list']);
  }

  save(form: Car) {
    this.vehicleService.save(form).subscribe(result => {
      this.goToList();
    }, error => console.error(error));
  }

  remove(href) {
    this.vehicleService.remove(href).subscribe(result => {
      this.goToList();
    }, error => console.error(error));
  }
}

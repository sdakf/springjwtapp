import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleService} from "../common/vehicles/vehicle.service";
import {GiphyService} from "../common/GiphyService";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.less']
})
export class VehicleEditComponent implements OnInit {

  car: any = {};
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router,
              private vehicleService: VehicleService, private giphyService: GiphyService) {
  }

  ngOnInit() {

    this.subscription = this.route.params.subscribe(params => {
      let id = params['id'];
      if (id !== null) {
        this.vehicleService.getVehicle(id).subscribe((vehicle: any) => {
          if (vehicle) {
            this.car = vehicle;
            this.car.href = vehicle._links.self.href;
            this.giphyService.populate(vehicle.model).subscribe(url => this.car.giphyUrl = url);
          } else {
            console.log(`Car with id '${id}' not found`)
            this.goToList();

          }
        })
      }
    })

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  private goToList() {
    this.router.navigate(['/vehicle-list']);
  }

  save(form: NgForm) {
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

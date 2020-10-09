import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from "../../../../../client/src/app/model/car";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {CarsService} from "../cars.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-cars-edit',
  templateUrl: './cars-edit.component.html',
  styleUrls: ['./cars-edit.component.scss']
})
export class CarsEditComponent implements OnInit, OnDestroy {

  car: Car = {id: null, model: null, giphyUrl: null};
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router,
              private carsService: CarsService) {
  }

  ngOnInit(): void {

    this.subscription = this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.carsService.getVehicle(id).subscribe((vehicle: Car) => {
          if (vehicle) {
            this.car = vehicle;
            console.log(vehicle);
            // this.giphyService.populate(vehicle.model).subscribe(url => this.car.giphyUrl = url);
          } else {
            console.log(`Car with id '${id}' not found`);
            this.goToList();

          }
        });
      }
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private goToList(): void {
    this.router.navigate(['/cars']);
  }

  save(form: NgForm): void {
    this.carsService.save(form, this.car.id).subscribe(result => {
      this.goToList();
    }, error => console.error(error));
  }

  remove(): void {
    this.carsService.remove(this.car.id).subscribe(result => {
      this.goToList();
    }, error => console.error(error));
  }
}


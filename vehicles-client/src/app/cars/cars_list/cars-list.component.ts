import {Component, OnInit} from '@angular/core';
import {CarsService} from "../cars.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cars',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {

  vehicles: Array<any>;

  constructor(private carsService: CarsService,private router: Router) {
  }

  ngOnInit() {
    this.carsService.getVehicles().subscribe(vehicles => {
        this.vehicles = vehicles;
        for (const vehicle of vehicles) {
          // this.giphyService.populate(vehicle.model).subscribe(url => vehicle.giphyUrl = url);
        }
      }
    );
  }

  remove(id: number): void {
    this.carsService.remove(id).subscribe(result => {
      this.router.navigate(['/cars']);
    }, error => console.error(error));
  }
}

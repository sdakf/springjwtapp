import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {

  vehicles: Array<any>;

  constructor(
    private vehiclesService: VehicleService) {
  }

  ngOnInit() {
    this.vehiclesService.getVehicles().subscribe(vehicles => {
        this.vehicles = vehicles;
        for (const vehicle of vehicles) {
          // this.giphyService.populate(vehicle.model).subscribe(url => vehicle.giphyUrl = url);
        }
      }
    )
  }
}

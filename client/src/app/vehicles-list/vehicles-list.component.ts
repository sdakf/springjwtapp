import {Component, OnInit} from '@angular/core';
import {VehicleService} from "../common/vehicles/vehicle.service";
import {GiphyService} from "../common/GiphyService";

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.less']
})
export class VehiclesListComponent implements OnInit {

  vehicles: Array<any>

  constructor(private vehiclesService: VehicleService, private giphyService: GiphyService) {
  }

  ngOnInit() {
    this.vehiclesService.getVehicles().subscribe(vehicles => {
        this.vehicles = vehicles;
        for (const vehicle of vehicles) {
          this.giphyService.populate(vehicle.model).subscribe(url => vehicle.giphyUrl = url);
        }
      }
    )
  }
}

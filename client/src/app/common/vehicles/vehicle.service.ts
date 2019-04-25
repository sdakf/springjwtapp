import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Constants} from "../../constants";
import {Car} from "../../model/car";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) {
  }

  // private VEHICLE_URL = '//localhost:8080' + '/restApi/vehicles/';

  private VEHICLES_API = Constants.API_BASE_URL + '/v1/vehicles/';

  getVehicles(): Observable<any> {
    return this.http.get(this.VEHICLES_API)
  }

  getVehicle(id: String) {
    return this.http.get(this.VEHICLES_API + id);
  }


  save(car: Car): Observable<any> {
    let result: Observable<Object>;
    if (car['href']) {
      result = this.http.put(this.VEHICLES_API + car.id, car);
    } else {
      result = this.http.post(this.VEHICLES_API, car);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}

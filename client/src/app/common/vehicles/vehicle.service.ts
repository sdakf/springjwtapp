import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) {
  }

  private BASE_URL = '//localhost:8080';
  private VEHICLE_URL = '//localhost:8080' + '/restApi/vehicles/';


  getVehicles(): Observable<any> {
    return this.http.get(this.BASE_URL + '/v1/vehicles/')
  }

  getVehicle(id: String) {
    return this.http.get(this.VEHICLE_URL + id);
  }


  save(car: any): Observable<any> {
    let result: Observable<Object>;
    if (car['href']) {
      result = this.http.put(car.href, car);
    } else {
      result = this.http.post(this.VEHICLE_URL, car);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}

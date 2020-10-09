import {Injectable} from "@angular/core";
import {Constants} from "../../../../client/src/app/constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) {
  }

  // private VEHICLE_URL = '//localhost:8080' + '/restApi/vehicles/';

  private VEHICLES_API = Constants.API_BASE_URL + '/v1/vehicles/';

  getVehicles(): Observable<any> {
    return this.http.get(this.VEHICLES_API);
  }

  getVehicle(id: string) {
    return this.http.get(this.VEHICLES_API + id);
  }


  save(form: NgForm, id: number): Observable<any> {
    let result: Observable<object>;
    if (id) {
      result = this.http.put(this.VEHICLES_API + id, form);
    } else {
      result = this.http.post(this.VEHICLES_API, form);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(this.VEHICLES_API + id);
  }
}

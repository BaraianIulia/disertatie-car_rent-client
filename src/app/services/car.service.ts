import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Car} from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  uri = 'http://localhost:8082/cars';

  constructor(private http: HttpClient, private router: Router) {
  }

  getAllCars() {
    return this.http.get<Car[]>(`${this.uri}/list`, {});
  }

  addCar(car: Car) {
    return this.http.post(`${this.uri}/add`, car);
  }
}

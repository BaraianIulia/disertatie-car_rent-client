import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Car} from '../models/car.model';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  uri = 'http://localhost:8082/cars';

  constructor(private http: HttpClient, public datepipe: DatePipe) {
  }

  getAllCars(startDate: any, endDate: any) {
    console.log('getAllCars', startDate + '   ' + endDate);
    const params = new HttpParams()
      .set('startDate', this.datepipe.transform(startDate, 'yyyy-MM-dd'))
      .set('endDate', this.datepipe.transform(endDate, 'yyyy-MM-dd'));
    console.log('getAllCars', params);
    return this.http.get<Car[]>(`${this.uri}/list`, {params});
  }

  addCar(car: Car) {
    return this.http.post(`${this.uri}/add`, car);
  }

  getCar(vin: string) {
    console.log('getCar' + vin);
    return this.http.get<Car>(`${this.uri}/details/` + vin, {});
  }

  editCar(car: Car) {
    return this.http.post<Car>(`${this.uri}/edit`, car);
  }
}

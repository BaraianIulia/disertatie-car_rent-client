import { Injectable } from '@angular/core';
import {OrderDetail} from '../models/orderDetail.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  uri = 'http://localhost:8082/receipts';

  constructor(private http: HttpClient, private router: Router) {
  }


  rentCar(orderDetail: OrderDetail) {
    console.log('orderdetail: ', orderDetail);
    return this.http.post(`${this.uri}/add`, orderDetail);
  }
}

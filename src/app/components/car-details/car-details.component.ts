import { Component, OnInit } from '@angular/core';
import {Car} from '../../models/car.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {CarService} from '../../services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  private car: Car;
  private vin: any;
  private currentUser: any;

  constructor( private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
               private carService: CarService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('current user' + this.currentUser);
    this.activatedRoute.params.subscribe(params => {
      console.log('vin ' + params.vin);
      this.vin = params.vin;
      this.carService.getCar(this.vin)
        .subscribe(
          (res) => {
            this.car = res;
            console.log('this car' + this.car);
          }
        );
    });
  }

  rentCar(id: number) {
    
  }

  editCar(vin: any) {
    console.log(vin);
    this.router.navigate(['car/edit/', vin]);
  }
}

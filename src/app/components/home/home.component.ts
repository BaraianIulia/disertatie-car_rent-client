import { Component, OnInit } from '@angular/core';
import {CarService} from '../../services/car.service';
import {Car} from '../../models/car.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private carList: Car[];

  constructor( private router: Router, private carService: CarService) { }

  ngOnInit() {
    this.carService.getAllCars(null, null)
      .subscribe(
        (res) => {
          this.carList = res;
          console.log(this.carList);
        });
  }

  redirectToCarDetails(vin: string) {
    console.log('vin din lista' + vin);
    this.router.navigate(['car/details/', vin]);
  }
}

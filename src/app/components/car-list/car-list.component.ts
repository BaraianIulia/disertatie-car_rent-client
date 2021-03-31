import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {CarService} from '../../services/car.service';
import {Car} from '../../models/car.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  carList: Car[];
  config: any;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private carService: CarService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 6
    };
    this.route.queryParamMap.pipe(map(params => params.get('page')))
      .subscribe(page => this.config.currentPage = page);
  }

  ngOnInit() {
    this.carService.getAllCars()
      .subscribe(
        (res) => {
          this.carList = res;
          console.log(this.carList);
        }
      );
  }

  redirectToCarDetails(vin: string) {
    console.log('vin din lista' + vin);
    this.router.navigate(['car/details/', vin]);
  }

  pageChange(newPage: number) {
    this.router.navigate(['cars/' + newPage], {queryParams: {page: newPage}});
  }
}

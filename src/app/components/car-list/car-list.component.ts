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
  private startDate: any;
  private endDate: any;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private carService: CarService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 6
    };
    this.route.queryParamMap.pipe(map(params => params.get('page')))
      .subscribe(page => this.config.currentPage = page);
  }

  ngOnInit() {
    this.findCarsByDate();
  }

  redirectToCarDetails(vin: string) {
    console.log('vin din lista' + vin);
    this.router.navigate(['car/details/', vin]);
  }

  pageChange(newPage: number) {
    this.router.navigate(['cars/' + newPage], {queryParams: {page: newPage}});
  }

  onChangeStartEvent($event) {
    console.log('date start event', $event.value);
    this.startDate = $event.value;
  }

  onChangeEndEvent($event) {
    console.log('date end event', $event.value);
    this.endDate = $event.value;
  }

  findCarsByDate() {
    this.carService.getAllCars(this.startDate, this.endDate)
      .subscribe(
        (res) => {
          this.carList = res;
          console.log(this.carList);
        }
      );
  }
}

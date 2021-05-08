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
  carListFiltered: Car[];
  config: any;
  private startDate: any;
  private endDate: any;
  formGroup;
  filterToggle = false;
  brandList: string[] = [];
  modelList: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private carService: CarService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 6
    };
    this.route.queryParamMap.pipe(map(params => params.get('page')))
      .subscribe(page => this.config.currentPage = page);

    this.formGroup = this.formBuilder.group({
      brand: '',
      model: '',
      seats: '',
      fabricationYear: '',
      priceIntervalMin: '',
      priceIntervalMax: '',
      conditionalAir: null,
    });
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
          this.carListFiltered = res;
          console.log(this.carList);
          this.brandList = Array.from(new Set(this.carList.map(x => x.brand)));
          this.brandList.unshift('');
        });
  }

  toggleFilter() {
    console.log(this.filterToggle);
    this.filterToggle = !this.filterToggle;
  }

  onSubmit(formData) {
    this.carListFiltered = this.carList;
    console.log('filter after ', this.formGroup.brand );
    if (this.formGroup.brand !== undefined && this.formGroup.brand !== '') {
      this.carListFiltered = this.carListFiltered.filter(x => x.brand === this.formGroup.brand);
      console.log('filter after ', this.formGroup.model);
      if (this.formGroup.model !== undefined && this.formGroup.model !== '') {
        this.carListFiltered = this.carListFiltered.filter(x => x.model === this.formGroup.model);
      }
    }
    console.log('filter after ', formData.seats);
    if (formData.seats !== undefined && formData.seats > 0 && formData.seats !== '' && formData.seats !== null) {
      this.carListFiltered = this.carListFiltered.filter(x => x.seats === formData.seats);
    }
    console.log('filter after ', formData.fabricationYear);
    if (formData.fabricationYear !== undefined && formData.fabricationYear !== '' && formData.fabricationYear !== null) {
      this.carListFiltered = this.carListFiltered.filter(x => x.fabricationYear === formData.fabricationYear);
    }
    console.log('filter after ', formData.priceIntervalMax );
    if (formData.priceIntervalMax !== undefined && formData.priceIntervalMax !== '' && formData.priceIntervalMax !== null) {
      this.carListFiltered = this.carListFiltered.filter(x => x.pricePerDay < formData.priceIntervalMax );
    }
    console.log('filter after ', formData.priceIntervalMin);
    if (formData.priceIntervalMin !== undefined  && formData.priceIntervalMin !== '' && formData.priceIntervalMin !== null) {
      this.carListFiltered = this.carListFiltered.filter(x => x.pricePerDay > formData.priceIntervalMin );
    }
    console.log('filter after ', formData.conditionalAir );
    if (formData.conditionalAir !== undefined && formData.conditionalAir !== null) {
      this.carListFiltered = this.carListFiltered.filter(x => x.conditionalAir > formData.conditionalAir );
    }
  }

  changeBrand(brand) {
    console.log(brand);
    console.log('Brand change ' + this.formGroup.brand + ' -> ' + brand);
    this.formGroup.brand = brand;
    this.modelList = Array.from(new Set(this.carList.filter(x => x.brand === brand).map(x => x.model)));
    this.modelList.unshift('');
  }

  changeModel(model) {
    console.log(model);
    console.log('Model change ' + this.formGroup.model + ' -> ' + model);
    this.formGroup.model = model;
  }

  resetFilter() {
    this.formGroup = this.formBuilder.group({
      brand: '',
      model: '',
      seats: '',
      fabricationYear: '',
      priceIntervalMin: '',
      priceIntervalMax: '',
      conditionalAir: null,
    });
    this.carListFiltered = this.carList;
  }
}

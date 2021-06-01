import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CarService} from '../../services/car.service';
import {Location} from '@angular/common';
import {Car} from '../../models/car.model';
import {CarQuizz} from '../../models/carQuizz.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-car-quizz',
  templateUrl: './car-quizz.component.html',
  styleUrls: ['./car-quizz.component.css']
})
export class CarQuizzComponent implements OnInit {

  title = 'Quizz';
  carQuizz: string[] = ['What brand would you like?',
    'What model would you like?',
    'Choose the fabrication year of the vehicle.',
    'About how much you want to pay per day?',
    'About how many horsepower should have the car?',
    'How many seats should the car have?',
    'What color would you prefer?'
  ];
  private formGroup: FormGroup;
  private carList: Car[];
  private brandList: string[];
  private colorList = ['Dark Color', 'Light Color'];
  private carQuizzModel: CarQuizz;
  private config: any;
  private startDate: any;
  private endDate: any;
  private currentUser: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private carService: CarService,
              private location: Location, private route: ActivatedRoute) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 6
    };
    this.route.queryParamMap.pipe(map(params => params.get('page')))
      .subscribe(page => this.config.currentPage = page);

    this.formGroup = this.formBuilder.group({
      brand: new FormArray([]),
      seats: 5,
      fabricationYear: 2010,
      pricePerDay: 10,
      horsePower: 100,
      color: new FormArray([]),
    });
    console.log('brandlist', this.brandList);
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser === null || this.currentUser === undefined) {
      this.router.navigate(['/login']);
    }
    console.log(this.carQuizz);
    this.carService.getAllCars(null, null)
      .subscribe(
        (res) => {
          this.carList = res;
          this.brandList = Array.from(new Set(this.carList.map(x => x.brand)));
          console.log('brandlist', this.brandList);
        });
    console.log('brandlist', this.brandList);
  }

  backClicked() {
    this.location.back();
  }

  onCheckChangeBrand(event) {
    const formArray: FormArray = this.formGroup.get('brand') as FormArray;

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  onCheckChangeColor(event) {
    const formArray: FormArray = this.formGroup.get('color') as FormArray;

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  onSubmit(formData) {
    this.carQuizzModel = new CarQuizz(formData.brand, formData.fabricationYear,
      formData.pricePerDay, formData.horsePower, formData.seats, formData.color,
      this.startDate, this.endDate);
    console.log(this.carQuizzModel);
    this.carService.getQuizzCar(this.currentUser.id, this.carQuizzModel)
      .subscribe(
        (res) => {
          console.log(res);
          this.carList = res;
        });
  }

  pageChange(newPage: number) {
    this.router.navigate(['car/quizz/' + newPage], {queryParams: {page: newPage}});
  }

  redirectToCarDetails(vin: string) {
    console.log('vin din lista' + vin);
    this.router.navigate(['car/details/', vin]);
  }

  onChangeStartEvent($event) {
    console.log('date start event', $event.value);
    this.startDate = $event.value;
  }

  onChangeEndEvent($event) {
    console.log('date end event', $event.value);
    this.endDate = $event.value;
  }
}

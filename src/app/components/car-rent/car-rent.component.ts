import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../services/car.service';
import {Car} from '../../models/car.model';
import {Card} from '../../models/card.model';
import {CardService} from '../../services/card.service';
import {OrderDetail} from '../../models/orderDetail.model';
import {OrderService} from '../../services/order.service';
import {Location, ViewportScroller} from '@angular/common';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css']
})
export class CarRentComponent implements OnInit {
  private currentUser: any;
  private vin: any;
  private car: Car;
  public imgURL: string;
  public formGroup: FormGroup;
  public title = 'Rent a car';
  public startDate: Date;
  public endDate: Date;
  public totalPrice;
  public cardList: Card[];
  countryList = ['Germany', 'Romania', 'Czech Republic', 'Belgium'];
  cityGermanyList = ['Berlin', 'Hamburg', 'Munich'];
  cityRomaniaList = ['Bucharest', 'Cluj-Napoca', 'Oradea'];
  cityCzechList = ['Brno', 'Ostrava', 'Prague'];
  cityBelgiumList = ['Bruxelles', 'Peer', 'Virton'];
  pickupAndDropoffLocation = '';
  private orderDetail: OrderDetail;
  private errorMessage = '';
  private successMessage = '';
  disabledBtn = true;
  private cityList: string[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              private carService: CarService, private cardService: CardService, private orderService: OrderService,
              private location: Location, private alertService: AlertService, private scroll: ViewportScroller) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser === null || this.currentUser === undefined) {
      this.router.navigate(['/login']);
    }
    this.cityList = this.cityGermanyList;
    console.log('current user' + this.currentUser.id);
    this.activatedRoute.params.subscribe(params => {
      console.log('vin ' + params.vin);
      this.vin = params.vin;
      this.carService.getCar(this.vin)
        .subscribe(
          (res) => {
            this.car = res;
            console.log('this car' + this.car);
            this.formGroup = this.formBuilder.group({
              vehicleIdentificationNumber: new FormControl({
                value: this.car.vehicleIdentificationNumber,
                disabled: true
              }, Validators.required),
              brand: new FormControl({value: this.car.brand, disabled: true}, Validators.required),
              model: new FormControl({value: this.car.model, disabled: true}, Validators.required),
              insurance: new FormControl({value: this.car.insurance, disabled: true}, Validators.required),
              totalPrice: new FormControl({value: this.totalPrice, disabled: true}, Validators.required),
              payMethod: new FormControl('CASH', Validators.required),
              usedCard: new FormControl('', Validators.required),
              cvvCode: new FormControl('', Validators.required),
              cardNumber: new FormControl('', Validators.required),
              cardholderName: new FormControl('', Validators.required),
              expirationDate: new FormControl('', Validators.required),
              cvvCodeNew: new FormControl('', Validators.required),
              country: new FormControl({value: 'Germany', disabled: true}, Validators.required),
              city: new FormControl({value: 'Berlin', disabled: true}, Validators.required),
              pickup: new FormControl('', Validators.required),
              dropoff: new FormControl('', Validators.required),
            });
            this.imgURL = this.car.photo;
          }
        );
    });
  }

  onChangeStartEvent($event) {
    console.log('date start event', $event.value);
    this.startDate = $event.value;
    this.calculateTotalPrice();
    this.checkCarForAvailability();
  }


  onChangeEndEvent($event) {
    console.log('date end event', $event.value);
    this.endDate = $event.value;
    this.calculateTotalPrice();
    this.checkCarForAvailability();
  }


  private calculateTotalPrice() {
    if (this.endDate !== undefined && this.startDate !== undefined) {
      this.totalPrice = this.car.pricePerDay *
        (Math.floor((Date.UTC(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate()) -
          Date.UTC(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate())) / (1000 * 60 * 60 * 24)) + 1);
      this.totalPrice = this.totalPrice + this.car.insurance;
      console.log(Math.floor((Date.UTC(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate()) -
        Date.UTC(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate())) / (1000 * 60 * 60 * 24)) + ' * '
        + this.car.pricePerDay + ' = ' + this.totalPrice);
      if (this.totalPrice < 0) {
        this.totalPrice = 0;
      }
    }
  }

  onSubmit(formData) {
    console.log('rent the car');
    console.log('formdata ', formData);
    console.log(this.car);
    if (this.formGroup.value.country === undefined) {
      this.formGroup.value.country = 'Germany';
    }
    if (this.formGroup.value.city === undefined) {
      this.formGroup.value.city = 'Berlin';
    }
    this.pickupAndDropoffLocation = this.formGroup.value.country + ', ' + this.formGroup.value.city + ', pick-up: '
      + formData.pickup + ', drop-off: ' + formData.dropoff;
    console.log(this.pickupAndDropoffLocation);
    if (formData.payMethod === 'card') {
      this.orderDetail = new OrderDetail(this.currentUser.id, this.car.id,
        null,
        this.totalPrice, this.car.insurance, this.startDate, this.endDate,
        this.pickupAndDropoffLocation, formData.payMethod, formData.cvvCodeNew, formData.cardholderName
        , formData.expirationDate, formData.cardNumber);
    } else if (formData.payMethod === 'my_Card') {
      if (formData.usedCard === '') {
        formData.usedCard = this.cardList[0].cardNumber;
      }
      this.orderDetail = new OrderDetail(this.currentUser.id, this.car.id,
        this.cardList.filter(card => card.cardNumber === formData.usedCard)[0].id,
        this.totalPrice, this.car.insurance, this.startDate, this.endDate,
        this.pickupAndDropoffLocation, formData.payMethod, formData.cvvCode, null, null, null);
    } else {
      this.orderDetail = new OrderDetail(this.currentUser.id, this.car.id,
        null,
        this.totalPrice, this.car.insurance, this.startDate, this.endDate,
        this.pickupAndDropoffLocation, formData.payMethod, null, null, null, null);
    }
    console.log(this.orderDetail);
    this.orderService.rentCar(this.orderDetail).subscribe((res) => {
      this.router.navigate(['/rent/success']);
    }, (error => {
      this.alertService.error(error.error.message);
      this.scrollToTop();
    }));
  }

  getCards() {
    if (this.cardList === undefined) {
      this.cardService.getUserCards(this.currentUser.id).subscribe((res) => {
        this.cardList = res;
        this.formGroup.value.usedCard = res[0].cardNumber;
      });
    } else {
      this.formGroup.value.usedCard = this.cardList[0].cardNumber;
    }
    console.log('card pay', this.formGroup.value.usedCard);
  }

  changeCard(value: any) {
    console.log('changeValue of card', value);
    this.formGroup.value.usedCard = value;
  }

  private checkCarForAvailability() {
    this.errorMessage = '';
    this.successMessage = '';
    if (this.endDate !== undefined && this.startDate !== undefined) {
      this.carService.checkCarForAvailability(this.car.id, this.startDate, this.endDate).subscribe((res) => {
        console.log('availability:', res);
        this.disabledBtn = res;
        if (res === true) {
          this.successMessage = 'The vehicle is available for this period.';
        } else {
          this.errorMessage = 'The vehicle is not available for this period.';
        }
      }, (error => {
        console.log(error);
      }));
    }
  }

  backClicked() {
    this.location.back();
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

  changeCountry(country: string) {
    this.formGroup.value.country = country;
    switch (country) {
      case 'Germany':
        this.cityList = this.cityGermanyList;
        break;
      case 'Romania':
        this.cityList = this.cityRomaniaList;
        break;
      case 'Belgium':
        this.cityList = this.cityBelgiumList;
        break;
      case 'Czech Republic':
        this.cityList = this.cityCzechList;
        break;
    }
  }

  changeCity(city: string) {
    this.formGroup.value.city = city;
  }
}

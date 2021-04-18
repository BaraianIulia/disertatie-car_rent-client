import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../services/car.service';
import {Car} from '../../models/car.model';
import {Card} from '../../models/card.model';
import {CardService} from '../../services/card.service';
import {OrderDetail} from '../../models/orderDetail.model';
import {OrderService} from '../../services/order.service';

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
  pickupAndDropoffLocation = 'AEROPORT CLUJ, CLUJ-NAPOCA, ROMANIA';
  private orderDetail: OrderDetail;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              private carService: CarService, private cardService: CardService, private orderService: OrderService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
  }


  onChangeEndEvent($event) {
    console.log('date end event', $event.value);
    this.endDate = $event.value;
    this.calculateTotalPrice();
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
      console.log('created with succes');
    }, (error => {
      console.log(error);
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
}

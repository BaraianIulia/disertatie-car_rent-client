import {Component, OnInit} from '@angular/core';
import {Car} from '../../models/car.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {CarService} from '../../services/car.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {

  brandList: any = ['BMW', 'Audi', 'Ford'];
  gearboxList: any = ['MANUAL', 'AUTOMATIC'];
  colorList: any = ['Blue', 'Red'];
  fuelTypeList: any = ['DIESEL', 'GASOLINE'];
  formGroup;
  car: Car;
  successMessage = '';
  errorMessage = '';
  title = 'Edit Car';
  fileToUpload;
  private formData: FormData;
  private reader: FileReader;
  private imgURL: string | ArrayBuffer;
  private currentUser: User;
  private vin: any;


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              private carService: CarService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    if (this.currentUser === null || this.currentUser === undefined) {
      this.router.navigate(['/home']);
    }
    if (this.currentUser.userRole !== 'ADMIN_ROLE') {
      this.router.navigate(['/home']);
    }
    this.activatedRoute.params.subscribe(params => {
      console.log(params.vin);
      this.vin = params.vin;
      this.carService.getCar(this.vin)
        .subscribe(
          (res) => {
            this.car = res;
            console.log(this.car);
            this.formGroup = this.formBuilder.group({
              vehicleIdentificationNumber: this.car.vehicleIdentificationNumber,
              brand: this.car.brand,
              model: this.car.model,
              doors: this.car.doors,
              seats: this.car.seats,
              fabricationYear: this.car.fabricationYear,
              gearbox: this.car.gearbox,
              pricePerDay: this.car.pricePerDay,
              insurance: this.car.insurance,
              horsePower: this.car.horsePower,
              color: this.car.color,
              conditionalAir: this.car.conditionalAir,
              fuelType: this.car.fuelType,
              luggageCarrierVolume: this.car.luggageCarrierVolume
            });
            this.imgURL = this.car.photo;
          }
        );
    });
  }

  changeColor(color) {
    console.log('Color change ' + this.formGroup.color + ' -> ' + color);
    this.formGroup.color = color;
  }

  onSubmit(formData) {
    this.successMessage = '';
    this.errorMessage = '';
    this.car = new Car(0, formData.vehicleIdentificationNumber, formData.brand, formData.model, formData.doors, formData.seats,
      formData.fabricationYear, formData.gearbox, formData.pricePerDay, formData.insurance, formData.horsePower, formData.hexColor,
      formData.color, formData.conditionalAir, formData.fuelType, formData.luggageCarrierVolume, this.fileToUpload);
    console.log('car to add', this.car);
    this.carService.editCar(this.car).subscribe(data => {
        console.log('DONE', data);
        this.car = data;
        this.successMessage = 'Vehicle saved with success.';
      },
      error => {
        console.log(error);
        this.errorMessage = 'Vehicle could not be saved';
      });
  }

  handleFileInput(e) {
    this.formData = new FormData();
    this.formData.append('fileToUpload', e.target.files[0]);
    this.reader = new FileReader();
    this.reader.readAsDataURL(e.target.files[0]);
    this.reader.onload = () => {
      this.imgURL = this.reader.result;
      this.fileToUpload = this.reader.result;
      console.log('poza incarcata');
      console.log(this.fileToUpload);
    };
  }

}

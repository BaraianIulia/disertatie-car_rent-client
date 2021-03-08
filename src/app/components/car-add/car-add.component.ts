import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Car} from '../../models/car.model';
import {CarService} from '../../services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  brandList: any = ['BMW', 'Audi', 'Ford'];
  gearboxList: any = ['MANUAL', 'AUTOMATIC'];
  colorList: any = ['Blue', 'Red'];
  fuelTypeList: any = ['DIESEL', 'GASOLINE'];
  formGroup;
  car: Car;
  successMessage = '';
  errorMessage = '';
  title = 'Add Car';
  fileToUpload;
  private formData: FormData;
  private reader: FileReader;
  private imgURL: string | ArrayBuffer;


  constructor(private router: Router, private formBuilder: FormBuilder, private carService: CarService) {
    this.formGroup = this.formBuilder.group({
      vehicleIdentificationNumber: '',
      brand: 'BMW',
      model: '',
      doors: '4',
      seats: '5',
      fabricationYear: '2010',
      gearbox: 'MANUAL',
      pricePerDay: '10',
      insurance: '10',
      horsePower: '100',
      color: 'Blue',
      conditionalAir: true,
      fuelType: 'DIESEL',
      luggageCarrierVolume: '2',
      fileToUpload: '',
    });
  }

  ngOnInit() {
  }

  changeBrand(brand) {
    console.log(brand);
    console.log('Brand change ' + this.formGroup.brand + ' -> ' + brand);
    this.formGroup.brand = brand;
  }

  changeGearbox(gearbox) {
    console.log('GearBox change ' + this.formGroup.gearbox + ' -> ' + gearbox);
    this.formGroup.gearbox = gearbox;
  }

  changeColor(color) {
    console.log('Color change ' + this.formGroup.color + ' -> ' + color);
    this.formGroup.color = color;
  }

  changeFuelType(fuelType) {
    console.log(fuelType);
    console.log('Fuel type change ' + this.formGroup.fuelType + ' -> ' + fuelType);
    this.formGroup.fuelType = fuelType;
  }

  onSubmit(formData) {
    this.successMessage = '';
    this.errorMessage = '';
    this.car = new Car(0, formData.vehicleIdentificationNumber, this.formGroup.brand, formData.model, formData.doors, formData.seats,
      formData.fabricationYear, this.formGroup.gearbox, formData.pricePerDay, formData.insurance, formData.horsePower, formData.hexColor,
      this.formGroup.color, formData.conditionalAir, this.formGroup.fuelType, formData.luggageCarrierVolume, this.fileToUpload );
    console.log('car to add', this.car);
    this.carService.addCar(this.car).subscribe(data => {
        console.log('DONE', data);
        this.clear();
        this.successMessage = 'Vehicle saved with success.';
      },
      error => {
        console.log(error);
        this.errorMessage = 'Vehicle could not be saved';
      });
  }

  clear() {
    this.formGroup = this.formBuilder.group({
      vehicleIdentificationNumber: '',
      brand: 'BMW',
      model: '',
      doors: '4',
      seats: '5',
      fabricationYear: '2010',
      gearbox: 'MANUAL',
      pricePerDay: '10',
      insurance: '10',
      horsePower: '100',
      color: 'Blue',
      conditionalAir: true,
      fuelType: 'DIESEL',
      luggageCarrierVolume: '2'
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

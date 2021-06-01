import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Car} from '../../models/car.model';
import {CarService} from '../../services/car.service';
import {User} from '../../models/user.model';
import {Location, ViewportScroller} from '@angular/common';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  brandList: any = ['BMW', 'Audi', 'Ford', 'Dacia', 'Mercedes-Benz', 'Honda', 'Hyundai', 'Fiat'];
  gearboxList: any = ['MANUAL', 'AUTOMATIC'];
  colorList: any = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black',
    'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown',
    'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson',
    'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGreen',
    'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon',
    'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkTurquoise', 'DarkViolet',
    'DeepPink', 'DeepSkyBlue', 'DimGray', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen',
    'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Green', 'GreenYellow',
    'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush',
    'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow',
    'LightGray', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue',
    'LightSlateGray', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon',
    'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen',
    'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream',
    'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange',
    'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru',
    'Pink', 'Plum', 'PowderBlue', 'Purple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown',
    'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'Snow',
    'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet',
    'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];
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
  private currentUser: User;


  constructor(private router: Router, private formBuilder: FormBuilder, private carService: CarService,
              private location: Location, private scroll: ViewportScroller, private alertService: AlertService) {
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
    console.log(this.currentUser);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser === null || this.currentUser === undefined) {
      this.router.navigate(['/home']);
    }
    if (this.currentUser.userRole !== 'ADMIN_ROLE') {
      this.router.navigate(['/home']);
    }
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
    this.car = new Car(0, formData.vehicleIdentificationNumber, formData.brand, formData.model, formData.doors, formData.seats,
      formData.fabricationYear, formData.gearbox, formData.pricePerDay, formData.insurance, formData.horsePower, formData.hexColor,
      formData.color, formData.conditionalAir, formData.fuelType, formData.luggageCarrierVolume, this.fileToUpload);
    console.log('car to add', this.car);
    this.carService.addCar(this.car).subscribe(data => {
        console.log('DONE', data);
        this.clear();
        this.alertService.success('Vehicle saved with success.');
        this.scrollToTop();
      },
      error => {
        console.log(error);
        this.alertService.error(error.error.message);
        this.scrollToTop();
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


  backClicked() {
    this.location.back();
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }
}

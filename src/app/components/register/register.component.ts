import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = 'Register';
  formGroup;
  registerData: User;
  birthdate: Date;
  private formData: FormData;
  private reader: FileReader;
  private imgURL: string | ArrayBuffer;
  private fileToUpload;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      surname: '',
      name: '',
      email: '',
      password: '',
      repeatpassword: '',
      phone: '',
      address: '',
      terms: false,
      fileToUpload: '',
    });
  }

  ngOnInit() {
  }

  onSubmit(formData) {
    this.registerData = new User(0, formData.name, formData.surname, this.birthdate,
      formData.email, formData.password, formData.phone, formData.address, 'USER_ROLE', this.fileToUpload, true);
    console.log('user to register', this.registerData);
    console.log('birthdate', this.birthdate);
    this.userService.register(this.registerData).subscribe(data => {
      console.log('DONE', data);
      this.router.navigate(['/login']);
    });
  }

  onChangeEvent($event) {
    console.log('date event', $event.value);
    this.birthdate = $event.value;
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

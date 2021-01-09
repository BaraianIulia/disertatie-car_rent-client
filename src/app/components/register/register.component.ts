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

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      surname: '',
      name: '',
      email: '',
      password: '',
      repeatpassword: '',
      phone: '',
      address: '',
      terms: false
    });
  }

  ngOnInit() {
  }

  onSubmit(formData) {
    this.registerData = new User(0, formData.name, formData.surname, new Date('1997-10-10'),
      formData.email, formData.password, formData.phone, formData.address, 'USER_ROLE', null, true);
    console.log('user to register', this.registerData);
    this.userService.register(this.registerData).subscribe(data => {
      console.log('DONE', data);
      this.router.navigate(['/login']);
    });
  }
}

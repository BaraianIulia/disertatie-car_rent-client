import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login';
  formGroup;
  errorMessage = '';

  constructor(private userservice: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      email: '',
      password: '',
      terms: false
    });
  }

  ngOnInit() {
  }

  onSubmit(formData) {
    this.errorMessage = '';
    const email = formData.email;
    const password = formData.password;
    this.userservice.login(email, password).subscribe(
      (res) => {
        console.log('user', res);
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.router.navigateByUrl('/home');
      },
    (err) => {
        console.log('error', err);
        this.errorMessage =  err.error.message;
    }
    );
  }

  redirectToRegisterPage() {
    this.router.navigate(['/register']);
  }

}

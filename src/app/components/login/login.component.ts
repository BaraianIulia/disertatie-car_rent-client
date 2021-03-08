import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {CurrentUser} from '../../models/currentUser.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login';
  formGroup;
  errorMessage = '';
  currentUser: CurrentUser;

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
        this.currentUser = new CurrentUser(res.id, res.name, res.surname, res.email, res.userRole);
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.router.navigateByUrl('/home');
      },
      (err) => {
        console.log('error', err);
        this.errorMessage = err.error.message;
      }
    );
  }

  redirectToRegisterPage() {
    this.router.navigate(['/register']);
  }

}

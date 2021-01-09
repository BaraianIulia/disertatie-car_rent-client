import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  private currentUser: User;
  title = 'Edit profile';
  formGroup;
  private editedUser: User;
  private user: User;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getUserById(this.currentUser.id)
      .subscribe(
        (res) => {
          this.user = res;
          this.formGroup = this.formBuilder.group({
            surname: this.user.surname,
            name: this.user.name,
            email: this.user.email,
            phone: this.user.phone,
            address: this.user.address,
            terms: false
          });
        }
      );
  }

  onSubmit(formData) {
    this.editedUser = new User(this.currentUser.id, formData.name, formData.surname, this.currentUser.birthdate,
      formData.email, this.currentUser.password, formData.phone, formData.address, this.currentUser.userRole,
      this.currentUser.photo, this.currentUser.status);
    this.userService.editUserProfileData(this.editedUser).subscribe(data => {
      localStorage.setItem('currentUser', JSON.stringify(data));
      this.router.navigate(['/profile']);
    });
  }
}


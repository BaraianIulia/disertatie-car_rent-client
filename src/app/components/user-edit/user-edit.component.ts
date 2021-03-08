import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {CurrentUser} from '../../models/currentUser.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  private currentUser: CurrentUser;
  title = 'Edit profile';
  formGroup;
  private editedUser: User;
  private user: User;
  filtersLoaded: Promise<boolean>;

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
          this.filtersLoaded = Promise.resolve(true);
        }
      );
  }

  onSubmit(formData) {
    this.editedUser = new User(this.user.id, formData.name, formData.surname, this.user.birthdate,
      formData.email, this.user.password, formData.phone, formData.address, this.user.userRole,
      this.user.photo, this.user.status);
    this.userService.editUserProfileData(this.editedUser).subscribe(res => {
      this.currentUser = new CurrentUser(res.id, res.name, res.surname, res.email, res.userRole);
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.router.navigate(['/profile']);
    });
  }
}


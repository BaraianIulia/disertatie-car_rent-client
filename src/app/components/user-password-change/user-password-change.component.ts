import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {CurrentUser} from '../../models/currentUser.model';

import {Location, ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.css']
})
export class UserPasswordChangeComponent implements OnInit {

  private currentUser: CurrentUser;
  title = 'Change password';
  formGroup;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder,
              private location: Location) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.formGroup = this.formBuilder.group({
      actualPassword: '',
      newPassword: '',
      repeatPassword: '',
      terms: false
    });
  }

  onSubmit(formData) {

    if (formData.newPassword === formData.repeatPassword) {
      this.userService.changePassword(this.currentUser.id, formData.actualPassword, formData.newPassword).subscribe(data => {
        this.router.navigate(['/profile']);
      });
    }
  }


  backClicked() {
    this.location.back();
  }
}


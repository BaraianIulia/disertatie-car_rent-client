import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private currentUser: User;
  title = 'Your profile';
  private user: any;
  filtersLoaded: Promise<boolean>;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getUserById(this.currentUser.id)
      .subscribe(
        (res) => {
          this.user = res;
          console.log(this.user);
          this.filtersLoaded = Promise.resolve(true);
        }
      );
  }


  redirectToEditPage() {
    this.router.navigate(['/profile/edit']);
  }

  redirectToChangePasswordPage() {
    this.router.navigate(['/profile/edit/password']);
  }

  redirectToChangePicturePage() {
    this.router.navigate(['/profile/edit/picture']);
  }
}

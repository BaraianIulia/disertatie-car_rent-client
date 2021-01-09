import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  config: any;
  userList: User[];
  currentUser: User;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getAllUsers()
      .subscribe(
        (res) => {
          console.log('Done', res);
          this.userList = res;
          this.config = {
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.userList.length
          };
        }
      );
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  changeUserRole(id: any, userRole: string) {
    this.userService.changeUserRole(id, userRole, this.currentUser.id)
      .subscribe(
        (res) => {
          const itemIndex = this.userList.findIndex(item => item.id === id);
          this.userList[itemIndex] = res;
          this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/users']);
          });
        }
      );
  }

  changeStatus(id: number, status: boolean) {
    this.userService.changeUserStatus(id, status, this.currentUser.id)
      .subscribe(
        (res) => {
          const itemIndex = this.userList.findIndex(item => item.id === id);
          this.userList[itemIndex] = res;
          this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/users']);
          });
        }
      );
  }

  disableButton(status: boolean) {
    if (status === false) {
      return 'btn-disable';
    }
    return '';
  }
}


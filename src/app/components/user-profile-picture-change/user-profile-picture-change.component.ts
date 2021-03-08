import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile-picture-change',
  templateUrl: './user-profile-picture-change.component.html',
  styleUrls: ['./user-profile-picture-change.component.css']
})
export class UserProfilePictureChangeComponent implements OnInit {

  private formData: FormData;
  private reader: FileReader;
  private imgURL: string | ArrayBuffer;
  private fileToUpload;
  currentUser;
  user;
  filtersLoaded: Promise<boolean>;
  title = 'Change your profile picture'

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


  onSubmit() {
    this.userService.changeProfilePicture(this.fileToUpload, this.currentUser.id).subscribe(data => {
      console.log('DONE', data);
      this.router.navigate(['/profile']);
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
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {UserPasswordChangeComponent} from './components/user-password-change/user-password-change.component';
import {CarAddComponent} from './components/car-add/car-add.component';
import {UserProfilePictureChangeComponent} from './components/user-profile-picture-change/user-profile-picture-change.component';
import {CarListComponent} from './components/car-list/car-list.component';
import {CarDetailsComponent} from './components/car-details/car-details.component';
import {CarEditComponent} from './components/car-edit/car-edit.component';
import {CarRentComponent} from './components/car-rent/car-rent.component';
import {UserCardComponent} from './components/user-card/user-card.component';
import {CommentListComponent} from './components/comment-list/comment-list.component';
import {RentConfirmedComponent} from './components/rent-confirmed/rent-confirmed.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cars/:id',
    component: CarListComponent
  },
  {
    path: 'car/add',
    component: CarAddComponent
  },
  {
    path: 'car/edit/:vin',
    component: CarEditComponent
  },
  {
    path: 'car/details/:vin',
    component: CarDetailsComponent
  },
  {
    path: 'car/rent/:vin',
    component: CarRentComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'profile/edit',
    component: UserEditComponent
  },
  {
    path: 'profile/edit/password',
    component: UserPasswordChangeComponent
  },
  {
    path: 'profile/edit/card',
    component: UserCardComponent
  },
  {
    path: 'comments',
    component: CommentListComponent
  },
  {
    path: 'profile/edit/picture',
    component: UserProfilePictureChangeComponent
  },
  {
    path: 'rent/success',
    component: RentConfirmedComponent
  },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {UserPasswordChangeComponent} from './components/user-password-change/user-password-change.component';
import {CarAddComponent} from './components/car-add/car-add.component';
import {UserProfilePictureChangeComponent} from './components/user-profile-picture-change/user-profile-picture-change.component';


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
    path: 'car/add',
    component: CarAddComponent
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
    path: 'profile/edit/picture',
    component: UserProfilePictureChangeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

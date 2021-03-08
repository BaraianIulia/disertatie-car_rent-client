import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import {HomeComponent} from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NavigationComponent} from './components/navigation/navigation.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {UserPasswordChangeComponent} from './components/user-password-change/user-password-change.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import {CarAddComponent} from './components/car-add/car-add.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {CarService} from './services/car.service';
import { UserProfilePictureChangeComponent } from './components/user-profile-picture-change/user-profile-picture-change.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserEditComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavigationComponent,
    UserProfileComponent,
    UserPasswordChangeComponent,
    CarAddComponent,
    UserProfilePictureChangeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot()
  ],
  providers: [UserService, CarService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

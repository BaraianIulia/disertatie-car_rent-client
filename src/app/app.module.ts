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
import {UserProfilePictureChangeComponent} from './components/user-profile-picture-change/user-profile-picture-change.component';
import {CarListComponent} from './components/car-list/car-list.component';
import {CarDetailsComponent} from './components/car-details/car-details.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import {DatePipe} from '@angular/common';
import { CarRentComponent } from './components/car-rent/car-rent.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import {CommentService} from './services/comment.service';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { RatingModule } from 'ng-starrating';
import { AlertComponent } from './components/alert/alert.component';
import {AlertService} from './services/alert.service';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { FooterComponent } from './components/footer/footer.component';
import { RentConfirmedComponent } from './components/rent-confirmed/rent-confirmed.component';


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
    CarListComponent,
    CarDetailsComponent,
    CarEditComponent,
    JwPaginationComponent,
    CarRentComponent,
    UserCardComponent,
    CommentListComponent,
    AlertComponent,
    FooterComponent,
    RentConfirmedComponent

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
    RatingModule,
    IvyCarouselModule,
    TooltipModule.forRoot()
  ],
  providers: [UserService, CarService, DatePipe, CommentService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

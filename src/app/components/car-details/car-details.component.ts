import {Component, OnInit} from '@angular/core';
import {Car} from '../../models/car.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {CarService} from '../../services/car.service';
import {Comment} from '../../models/comment.model';
import {CommentService} from '../../services/comment.service';
import {StarRatingComponent} from 'ng-starrating';
import {AlertService} from '../../services/alert.service';
import {Location, ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  private car: Car;
  private vin: any;
  private currentUser: any;
  carComment = '';
  commentList: Comment[];
  private comment: Comment;
  private rating = 5;
  title = 'Car details';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              private carService: CarService, private commentService: CommentService, private alertService: AlertService,
              private scroll: ViewportScroller, private location: Location) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('current user' + this.currentUser);
    this.activatedRoute.params.subscribe(params => {
      console.log('vin ' + params.vin);
      this.vin = params.vin;
      this.carService.getCar(this.vin)
        .subscribe(
          (res) => {
            this.car = res;
            console.log('this car' + this.car);
            this.commentService.getCommentsByCarId(res.id)
              .subscribe(
                (res1) => {
                  console.log('Done', res1);
                  this.commentList = res1;
                }
              );
          }
        );
    });

  }

  redirectToCarRent(vin: string) {
    console.log('rent' + vin);
    this.router.navigate(['car/rent/', vin]);
  }

  editCar(vin: any) {
    console.log(vin);
    this.router.navigate(['car/edit/', vin]);
  }

  addComment() {
    console.log('comment', this.carComment);
    this.comment = new Comment(0, this.car.id, this.carComment, this.currentUser.name, this.currentUser.email, null, this.rating, null);
    this.commentService.addComment(this.comment)
      .subscribe(
        (res1) => {
          console.log('Done', res1);
          this.carComment = '';
          this.alertService.success('Comment and rating added with success. Wait for admin approval.');
          this.scrollToTop();
        },
        error => {
          console.log(error);
          this.alertService.error(error.error.message);
          this.scrollToTop();
        });
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    this.rating = $event.newValue;
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

  backClicked() {
    this.location.back();
  }

}

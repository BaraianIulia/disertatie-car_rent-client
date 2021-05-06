import {Component, OnInit} from '@angular/core';
import {CommentService} from '../../services/comment.service';
import {Comment} from '../../models/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  private currentUser: any;
  private commentList: Comment[];
  config: any;
  filtersLoaded: Promise<boolean>;

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('current user' + this.currentUser);
    this.commentService.getPendingComments()
      .subscribe(
        (res) => {
          this.commentList = res;
          this.config = {
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.commentList.length
          };
          this.filtersLoaded = Promise.resolve(true);
        }
      );
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  approveComment(comment: Comment) {
    this.commentService.approveComment(comment.id).subscribe(
      (res) => {
        const index = this.commentList.indexOf(comment);
        this.commentList.splice(index, 1);
      }
    );
  }

  deleteComment(comment) {
    this.commentService.deleteComment(comment.id).subscribe(
      (res) => {
        const index = this.commentList.indexOf(comment);
        this.commentList.splice(index, 1);
      }
    );
  }
}

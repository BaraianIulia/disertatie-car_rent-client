import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {Comment} from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  uri = 'http://localhost:8082/comments';

  constructor(private http: HttpClient, public datepipe: DatePipe) {
  }

  getCommentsByCarId(carId: any) {
    return this.http.get<Comment[]>(`${this.uri}/list/` + carId);
  }

  addComment(comment: Comment) {
    return this.http.post(`${this.uri}/add`, comment);
  }

  getPendingComments() {
    return this.http.get<Comment[]>(`${this.uri}/pending`);
  }

  approveComment(id: number) {
    return this.http.put(`${this.uri}/approve/` + id, {});
  }

  deleteComment(id: any) {
    return this.http.delete(`${this.uri}/delete/` + id, {});
  }
}

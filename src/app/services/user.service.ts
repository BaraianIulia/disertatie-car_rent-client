import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {User} from '../models/user.model';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  uri = 'http://localhost:8082/users';

  constructor(private http: HttpClient, private router: Router) {
  }

  register(registerData: User) {
    console.log(registerData);
    return this.http.post(`${this.uri}/register`, registerData);
  }

  getAllUsers() {
    return this.http.get<User[]>(`${this.uri}/list`, {});
  }


  redirectToLoginPage() {
    this.router.navigate(['/login']);
  }

  redirectToRegisterPage() {
    this.router.navigate(['/register']);
  }

  login(email: any, password: any) {
    console.log('conectare ');
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.post<any>(`${this.uri}/login`, {}, {params});
  }

  changeUserRole(userId: number, userRole: string, currentUserId: number) {
    const params = new HttpParams()
      .set('userId', String(userId))
      .set('userRole', userRole)
      .set('currentUserId', String(currentUserId));
    return this.http.post<any>(`${this.uri}/role`, {}, {params});
  }

  logout() {
    localStorage.setItem('currentUser', JSON.stringify(null));
    this.redirectToHomePage();
  }

  private redirectToHomePage() {
    this.router.navigate(['/home']);
  }

  changeUserStatus(userId: number, status: boolean, currentUserId: number) {
    const params = new HttpParams()
      .set('userId', String(userId))
      .set('status', String(status))
      .set('currentUserId', String(currentUserId));
    return this.http.post<any>(`${this.uri}/status`, {}, {params});
  }

  editUserProfileData(editedUser: User) {
    return this.http.post(`${this.uri}/edit/profile`, editedUser);
  }

  changePassword(userId: number, actualPassword: string, newPassword: string) {
    const params = new HttpParams()
      .set('userId', String(userId))
      .set('actualPassword', actualPassword)
      .set('newPassword', newPassword);
    return this.http.post(`${this.uri}/edit/password`, {}, {params});
  }

  getUserById(userId: number) {
    const params = new HttpParams()
      .set('userId', String(userId));
    return this.http.post<User>(`${this.uri}/user`, {}, {params});
  }
}

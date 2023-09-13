import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getAllUsers(): Observable<any> {
    return this.http.get('user').pipe(
      tap((res) => console.log(JSON.stringify(res))),
      catchError(this.handleError)
    );
  }

  getById(code: any) {
    return this.http.get(`user/${code}`).pipe(
      tap((res) => console.log('Get:', JSON.stringify(res))),
      catchError(this.handleError)
    );
  }

  authenticateUser(user: any): Observable<any> {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('login', { user }, { headers: options }).pipe(
      tap((res) => {
        localStorage.setItem('auth-token', res.token);
      }),
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  validateToken(user: any): Observable<any> {
    return this.http
      .get('protected')
      .pipe(shareReplay(1), catchError(this.handleError));
  }

  clearToken(): void {
    sessionStorage.removeItem('auth-token');
  }

  registerUser(user: any) {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('user', user, { headers: options }).pipe(
      tap((res) => console.log('Post:', JSON.stringify(res))),
      catchError(this.handleError)
    );
  }

  updateUser(user: any, code: any) {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`user/${code}`, user, { headers: options }).pipe(
      tap((res) => console.log('Update:', JSON.stringify(res))),
      catchError(this.handleError)
    );
  }

  deleteUser(code: any) {
    return this.http.delete(`user/${code}`).pipe(
      tap((res) => console.log('Delete:', JSON.stringify(res))),
      catchError(this.handleError)
    );
  }

  private _saveUserDetails = new BehaviorSubject<any>('');
  userInfo = this._saveUserDetails.asObservable();

  private _isUserLoggedIn = new BehaviorSubject<any>('');
  isLoggedIn = this._isUserLoggedIn.asObservable();

  setLoginStatus(isLoggedIn: boolean) {
    this._isUserLoggedIn.next(isLoggedIn);
    console.log('login sattus', isLoggedIn);
  }

  setUserInfo(user: any) {
    this._saveUserDetails.next(user);
    //console.log("UserInfo", this.userInfo);
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    let errMsg = '';

    if (err instanceof Error) {
      errMsg = err.error.message;
      console.log('ErrMSG HTTP Handle error');
    } else {
      errMsg = err.statusText;
      console.log(`Backend returned code ${err.status}`);
      console.log('Error Message', errMsg);
     // this.toastr.error('Error', errMsg)
    }

    return throwError(() => err);
  }
}

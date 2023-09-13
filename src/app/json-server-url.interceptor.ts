import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './service/auth.service';
import { ToastrService } from 'ngx-toastr'

@Injectable()
export class JsonServerUrlInterceptor implements HttpInterceptor {

  constructor(
    private authService : AuthService,
    private toastr :ToastrService,
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let apiURL = " http://localhost:4000/";
    const token = localStorage.getItem('auth-token')

    const jsonURL = request.clone({
      url : apiURL + request.url
    })


    if(token){
      console.log("token saved in storage");
      
      const authReq = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
        url : apiURL + request.url
      })

      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.clearToken();
          }
          return throwError(error);
        })
      );
    }

    
    return next.handle(jsonURL);
   
  }
}

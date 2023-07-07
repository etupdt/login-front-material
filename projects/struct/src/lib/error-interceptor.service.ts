import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class ErrorInterceptorService {

  constructor(
    private routes: Router,
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('interceptor error')

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
// mis en commenatire temporairement pour faliciter le debogage
//        localStorage.removeItem('tokenAuth');
        console.log(error);
//        this.routes.navigate(['auth']);
//        this.authentService.displayModale('signin')
        return throwError(error);
      })
    );
  }
}

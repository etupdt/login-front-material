import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    @Inject('optionsAuthent') private options: {useBackend: boolean},
    private routes: Router,
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('interceptor http')

    if (request.method === 'POST' && (request.url === `${this.options?.useBackend}/api/login` || request.url === `${this.options?.useBackend}/api/subscribe`)) {
      console.log('   interceptor http : tranfert sans ano')
      return next.handle(request)
    } else {
      console.log('   interceptor http : tranfert avec token')
      const token = localStorage.getItem('tokenAuth');
      if (token) {
        console.log('       interceptor http : token trouvé')
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token
          }
        });
        return next.handle(request)
      } else {
        console.log('       interceptor http : token non trouvé', token)
//        this.routes.navigate(['auth'])
//        this.authentService.displayModale('signin')
        throw(new Error('Erreur token non trouvé'));
      }
    }
  }

}

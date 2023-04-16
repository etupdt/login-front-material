import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { AuthModalComponent } from './auth-modal/auth-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {

  errorMessage!: string

  subscription!: Subscription

  email!: any
  listenEmail = new Observable( observer => { this.email = observer })
  role: any = 'ROLE_USER'
  listenRole = new Observable( observer => { this.role = observer })

  constructor (
    @Inject('optionsAuthent') private options: {useBackend: boolean},
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    console.log('constructor')
  }

  ngOnInit = () => {
//    localStorage.removeItem('tokenAuth')
    console.log('ngOnInit')
    this.signout()
  }

  ngOnDestroy = (): void => {
    if (this.subscription)
      this.subscription.remove
  }

  createNewUser(email: string, password: string) {

    let headers = new HttpHeaders()
    headers = headers.append('Content-Type', 'application/json')

    this.http.post(
      `${this.options.useBackend}/api/subscribe`,
      {username: email, password: password},
      {headers}
    ).subscribe({
      next: (res: any) => {
        localStorage.setItem('tokenAuth', res.token)
        this.email.next(email)
    },
      error: (error) => {
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('header connection complete')
      }
    })

  }

  connection(email: string, password: string): void {

    let headers = new HttpHeaders()
    headers = headers.append('Content-Type', 'application/json')

    this.http.post(
      this.options.useBackend + `/api/login`,
      {username: email, password: password},
      {headers}
    ).subscribe({
      next: (res: any) => {
        localStorage.setItem('tokenAuth', res.token)
        this.email.next(email)
        this.role.next(res.data.roles[0])
    },
      error: (error) => {
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('header connection complete')
      }
    })

  }

  signout = () => {
    localStorage.removeItem('tokenAuth')
    this.role.next('ROLE_USER')
  }

  openModal = (modale: string) => {
    this.dialog.open(AuthModalComponent, {
      data: { typeModal: modale },
    })
    .afterClosed().subscribe(result => {

    });
  }
  
}

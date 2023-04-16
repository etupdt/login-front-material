import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'stt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: string[] = []

  email: string = ''
  role = ''

  activeModal!: any

  routeSelected: string | undefined = ''

  constructor (
    private dialog: MatDialog,
    @Inject('optionsAuthent') private options: {useBackend: string},
    @Optional()
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.authService.listenEmail.subscribe((email) => {this.email = email as string})   
    this.authService.listenRole.subscribe((role) => {this.role = role as string})

    this.router.config.forEach((route) => this.items.push(route.path as string))
  
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.routeSelected = (event as NavigationEnd).url.substring(1).toLowerCase()
    })
  
  }

  signOut = () => {
    this.email = ''
    this.authService.signout()
    this.router.navigate(['home'])
  }

  openModal = (modale: string) => {
    this.authService.openModal(modale)
    this.activeModal = modale
  }

  toggle = () => {
    document.querySelectorAll('.user-email').forEach((item) => item.classList.toggle('cache'))
  }

  callRoute = (target?: string) => {
    this.router.navigate([target]).then(res => this.routeSelected = target).catch(error => console.log(error))
  }

  navigateToUser(email: string) {
    this.email = email
    this.router.navigate(['user'], {queryParams: {email: email, page: '0'}})
  }

  navigateToUsers() {
    this.router.navigate(['users'], {queryParams: {email: '', page: '0'}})
  }

}

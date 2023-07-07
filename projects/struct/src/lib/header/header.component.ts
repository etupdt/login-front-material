import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatTab } from '@angular/material/tabs';

@Component({
  selector: 'stt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: string[] = []

  email: string = ''
  role = ''

  burgerMenu = 'cache'

  activeModal!: any

  selectedTabIndex!: number

  constructor (
    private dialog: MatDialog,
    @Inject('optionsAuthent') private options: {useBackend: string},
    @Optional()
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    this.authService.listenEmail.subscribe((email) => {this.email = email as string})
    this.authService.listenRole.subscribe((role) => {this.role = role as string})

    this.router.config.forEach((route) => this.items.push(route.path as string))

    console.log(this.items, this.authService.routeSelected)
    this.selectedTabIndex = this.items.indexOf(this.authService.routeSelected!)

  }

  selectedTabChange = () => {
    this.authService.routeSelected = this.items[this.selectedTabIndex]
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
    this.burgerMenu = 'cache'
    console.log(target)
    this.router.navigate([target?.toLowerCase()]).then(res => this.authService.routeSelected = target!.toLowerCase()).catch(error => console.log(error))
  }

  navigateToUser(email: string) {
    this.email = email
    this.router.navigate(['user'], {queryParams: {email: email, page: '-1'}})
  }

  navigateToUsers() {
    this.router.navigate(['users'], {queryParams: {email: '', page: '0'}})
  }

  callTabRoute = (index: number) => {
    this.authService.routeSelected = this.items[index]
    this.router.navigate([this.items[index]])
  }

}

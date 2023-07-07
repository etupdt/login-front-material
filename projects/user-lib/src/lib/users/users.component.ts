import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLibService } from '../user-lib.service';
import { User } from '../user.interface';

@Component({
  selector: 'lib-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.scss',
    '../user-lib.component.scss',
  ]
})
export class UsersComponent implements OnInit {

  users: User[] = []

  countUsers: number = 0

  pageEvent!: PageEvent;

  email = ''

  errorMessage: string = ''

  displayPage = ''

  usersByPage = 7
  pages: number[] = []
  pageActive = 0

  constructor(
    private userLibService: UserLibService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe((params: any) => {
      console.log(params)
      this.getUsers(+params.get("page"), params.get("email"))
    })

  }

  deleteUser = (event: Event, id: number) => {

    event.stopPropagation()

    this.userLibService.deleteUserById(id).subscribe({
      next: (res: any) => {
        if (this.users.length === 1)
          this.pageActive--
        this.displayPage = 'cache'
        console.log('header delete complete', res)
        this.getUsers(this.pageActive, '')
      },
      error: (error) => {
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('header deleteUser complete')
      }
    })
  }

  putUser = (user: User, roles: string[]) => {

    user.roles = roles

    this.userLibService.putUserById(user).subscribe({
      next: (res: any) => {
        this.errorMessage = res
    },
      error: (error) => {
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('header putUser complete')
      }
    })

  }

  changePage = (event: PageEvent) => {
    if (event.pageIndex !== event.previousPageIndex) {
      this.getUsers(event.pageIndex, '')
    }
    if (this.usersByPage !== event.pageSize) {
      this.pageActive = event.pageIndex
      this.usersByPage = event.pageSize
      this.getUsers(this.pageActive, '')
    }
    return event
  }

  getUsers = (page: number, email: string) => {
    console.log(page, this.usersByPage)
    this.userLibService.getUsersPage(page + 1, this.usersByPage).subscribe({
      next: (res: any) => {
        this.email = email
        this.displayPage = 'cache'
        this.users = res.usersPage
        this.pages = []
        this.countUsers = res.countUsers
        this.displayPage = ''
      },
      error: (error) => {
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('header getUser complete')
      }
    })

  }

  navigateToUser(email: string, id: number, pageActive: number) {
    this.router.navigate(['user'], {queryParams: {email: email, id: id, page: pageActive}})
  }

}

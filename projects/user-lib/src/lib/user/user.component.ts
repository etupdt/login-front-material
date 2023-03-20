
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLibService } from '../user-lib.service';
import { User } from '../user.interface';

@Component({
  selector: 'lib-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User = {
    id: 0,
    email: '',
    firstname: '',
    lastname: '',
    roles: []
  }

  email: string = ''

  page='0'

  errorMessage: string = ''

  userGroupForm!: FormGroup

  userForm = () => {
    this.userGroupForm = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      lastname: [this.user.lastname, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{2,}/)]],
      firstname: [this.user.firstname, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{2,}/)]],
      address: ["", [Validators.required, Validators.pattern(/.?/)]],
      address2: ["", [Validators.required, Validators.pattern(/.*/)]],
      codepostal: ["", [Validators.required, Validators.pattern(/.*/)]],
      city: ["", [Validators.required, Validators.pattern(/.*/)]]
    })
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userLibService: UserLibService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userForm()

    this.route.queryParamMap.subscribe((params: any) => {
      this.email = params.get("email")
      console.log('init user ' + this.email)
      this.page = params.get("page")
      this.getUser()
    })
  }

  getUser = () => {

    this.userLibService.getUserByEmail(this.email).subscribe({
      next: (res: any) => {
        this.user = res
        this.userForm()
    },
      error: (error) => {
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('header getUser complete')
      }
    })

  }

  putUser = () => {

    this.user.email = this.userGroupForm.get("email")!.value
    this.user.firstname = this.userGroupForm.get("firstname")!.value
    this.user.lastname = this.userGroupForm.get("lastname")!.value
    
    this.userLibService.putUserById(this.user).subscribe({
      next: (res: any) => {
        this.errorMessage = res
        this.navigateToUsers(this.user.email)
    },
      error: (error) => {
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('header getUser complete')
      }
    })

  }

  test = (test: string) => {

  }

  navigateTo(target: string, params: string) {
    console.log('header ', target, params)
    if(params !== '') {
      this.router.navigate([target, params])
    } else {
      this.router.navigate([target])
    }
  }

  navigateToUsers(email: string) {
    if (+this.page > 0)
      this.router.navigate(['users'], {queryParams: {email: email, page: this.page}})
    else
      this.router.navigate(['home'])
  }

}

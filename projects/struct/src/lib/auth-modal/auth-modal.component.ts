
import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'stt-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit{

  activeModal: string = 'signin'
  
  @ViewChild('modale')
  modale!: TemplateRef<any>;

  signInForm!: FormGroup
  signUpForm!: FormGroup
  forgotPasswordForm!: FormGroup
  
  errorMessage!: string

  constructor(
//    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.signinForm()
    this.signupForm()
    this.forgotpasswordForm()

//    this.authentService.listenModal.subscribe((x) => {this.open(this.modale, x as string); console.log('next : ', x)})
  
  }

  changeModal = (modal: string) => {
    this.activeModal = modal
  }

  closeModal = (modale : string) => {
    console.log('toto')
    this.dialog.closeAll();
    if (modale === 'signin')
      this.signin()

  }
  
  signinForm = () => {
    this.signInForm = this.formBuilder.group({
      email: ["denis-tavernier@wanadoo.fr", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
    })
  }

  signupForm = () => {
    this.signUpForm = this.formBuilder.group({
      email: ["denis-tavernier@wanadoo.fr", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      confirmpassword: ["", [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
    })
  }

  forgotpasswordForm = () => {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ["test4@test.fr", [Validators.required, Validators.email]]
    })
  }

  signin = () => {
    
    const email = this.signInForm.get("email")!.value
    const password = this.signInForm.get("password")!.value

    this.authService.connection(email, password)

  }

  signup = () => {
    
    const email = this.signUpForm.get("email")!.value
    const password = this.signUpForm.get("password")!.value

    this.authService.createNewUser(email, password)

  }

}

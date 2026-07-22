import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { ILogin, ISingIn } from '../../models/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],

})
export class AuthComponent implements OnInit {
  isAllreadyHasAccount: boolean = false
  loginForm !: FormGroup
  signupForm !: FormGroup

  constructor(private authservice: AuthService,
    private snackbar: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm() 
    this.createSignUpForm()
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  createSignUpForm() {
    this.signupForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      userRole: new FormControl(null, Validators.required)
    })
  }

  get l() {
    return this.loginForm.controls

  }
  get s() {
    return this.signupForm.controls

  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
    } else {
      let userdetails: ILogin = {
        ...this.loginForm.value
      }

      this.authservice.login(userdetails).subscribe({
        next: res => {
          console.log(res);
          
          this.snackbar.opensnackbar(res.message)
          this.authservice.saveToken(res.token)
          this.authservice.saveUserRole(res.userRole)
          this.authservice.isLoginSub$.next(true)
          this.router.navigate(['/home'])
        },
        error: err => {
          this.snackbar.opensnackbar(err.error.message)
          console.log(err);
          
        }
      })
    }

  }

  onsignup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched()
    } else {
      let userdetails: ISingIn = {
        ...this.signupForm.value
      }
      this.authservice.SignIn(userdetails).subscribe({
        next: res => {
          this.snackbar.opensnackbar(res.message)
          console.log(res);
          
          this.isAllreadyHasAccount = true
        },
        error: err => {
          console.log(err);
          
          this.snackbar.opensnackbar(err.error.message)
          this.isAllreadyHasAccount = true
        }
      })
    }

  }

}

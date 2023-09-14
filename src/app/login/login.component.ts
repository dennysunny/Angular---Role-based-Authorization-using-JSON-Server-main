import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm! : FormGroup
  userDetails! :any;

  validationStatus: any = null;
  validationType: any = null;

  @Output() emitUser = new EventEmitter<any>();


  constructor(
    private router : Router,
    private authService :AuthService,
    private toastr :ToastrService,
    private formBuilder :FormBuilder
  ) {}

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: ['', { updateOn: 'change', validators : [Validators.required, Validators.minLength(4)]} ],
      password: ['', {updateOn : 'change', validators : [Validators.required, Validators.minLength(8), this.validatePassword]}]
    })
  }

  validatePassword(password : FormControl) {
    let hasUpper = /[A-Z]/.test(password.value);
    let hasLower = /[a-z]/.test(password.value);
    let hasNumber = /[\d]/.test(password.value)

    let validPassword = hasUpper && hasLower && hasNumber;

    return validPassword ? null : {
      InvalidPassword : {
        "error" : "Invalid Password"
      }
    }
  }



  authenticateUser(){
    if(this.loginForm.valid){
     this.authService.authenticateUser(this.loginForm.value).subscribe({
        next : (res) => {
          this.validationType = 'success',
          this.validationStatus = res.message;
          this.router.navigate(['/home']);
          this.authService.setLoginStatus(true);
          this.authService.setUserInfo(res)
        },
        error : (err) => { 
        this.validationType = 'error',
        this.validationStatus = err.error.message;
         this.toastr.error(err.error.message, err.statusText)}
        
        
     })
     
    }
  }

}

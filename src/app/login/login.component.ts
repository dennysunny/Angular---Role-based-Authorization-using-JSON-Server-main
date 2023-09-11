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

  userLogin(){

    if(this.loginForm.valid){
      this.authService.getById(this.loginForm.value.id).subscribe({
        next : (res) => {
        
         if(res.password === this.loginForm.value.password){
            if(res.isActive){
              sessionStorage.setItem('userid', res.id);
              sessionStorage.setItem('role', res.role)
              this.router.navigate(['/home'])
              
              this.authService.setUserInfo(res)

            } else {
              this.toastr.error("Please Contact Admin", "User Account is not Approved")
            }
         } else this.toastr.warning("Invalid Username/ Password")
        },
        error: (error) => this.toastr.warning("Invalid Username/ Password", error)
      })
    } 
  }

  authenticateUser(){
    if(this.loginForm.valid){
     this.authService.authenticateUser(this.loginForm.value).subscribe({
        next : (res) => {
          this.toastr.success(res.message);
          this.router.navigate(['/home']);
          this.authService.setUserInfo(res)
        },
        error : (err) => this.toastr.error(err.statusText, err.status)
        
     })
     
    }
  }

}

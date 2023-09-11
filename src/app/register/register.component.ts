import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerationForm! : FormGroup

  constructor( 
    private formBuilder : FormBuilder,
    private toastr: ToastrService,
    private authService : AuthService,
    private router : Router,
     ) {}

  ngOnInit() {
    this.registerationForm = this.formBuilder.group({
      id: ['', {validators : [Validators.required, Validators.minLength(4)]}],
      name: ['', { validators: [Validators.required] }],
      password: ['', { validators: [Validators.required, Validators.minLength(8), this.validatePassword]  }],
      email: ['', { validators: [Validators.required, this.validateEmail] }],
      gender: ['male'],
      role: [''],
      isActive: [false, { validators: [Validators.required] }],
    })
  }

  validatePassword(pwd: FormControl){
    let hasNumber = /\d/.test(pwd.value);
    let hasUpper = /[A-Z]/.test(pwd.value);
    let hasLower = /[a-z]/.test(pwd.value);
    
    let valid = hasLower && hasNumber && hasUpper

    return valid ? null : {
      InvalidPassword: {
        error: "Password Must have atleast One Number, Uppercase Letter and Lowercase Letter  "
      }
    }
  }

  validateEmail(email : FormControl){
    let regex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 
    console.log(regex.test(email.value))
    
    return regex.test(email.value) ? null : {
      InvalidEmail : {
        "error": "Invalid Email"
      }
    }
  }

  completeRegistration(){
    
    console.log("email", this.registerationForm.get('id')?.errors)
    
    

    if(this.registerationForm.valid){
        this.authService.registerUser(this.registerationForm.value).subscribe({
            next : (res) => {
              this.toastr.success("Please contact Admin to Approve","Registered Successfully");
              this.router.navigate(['login'])
            }
        })
    }else{
      this.toastr.warning('Please Provide Valid Data!!')
    }
  }

}

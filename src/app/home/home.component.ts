import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements DoCheck, OnInit{

  constructor(
    private authService :AuthService,
    private route : Router,
    private toastr :ToastrService
  ) {}

  ngOnInit(){

  }

  


  // userDetails(event :any){
  //   console.log("Event", event); 
    
  // }

  currentUser! :any;
  userToken = localStorage.getItem('auth-token');

  ngDoCheck(){
    if(this.route.url == '/home' || this.route.url == ''){
     this.authService.userInfo.subscribe({
       next: (res) => {
        this.currentUser = res 
      }
     })
    }
  }

  validateUser(user :any){
    this.authService.validateToken(user).subscribe({
      next : (res) => this.toastr.success('Response from Backend', res.message),
      error : (err) => this.toastr.error(err.statusText, err.status)
    })
    
  }

}

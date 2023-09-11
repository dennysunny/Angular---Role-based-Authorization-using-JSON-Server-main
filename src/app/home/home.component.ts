import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements DoCheck{

  constructor(
    private authService :AuthService,
    private route : Router
  ) {}

  


  userDetails(event :any){
    console.log("Event", event); 
    
  }

  currentUser! :any;
  userToken = localStorage.getItem('auth-token');

  ngDoCheck(){

    console.log(this.route.url);
    
    if(this.route.url == '/home'){
      console.log("Inside home");
      
     this.authService.userInfo.subscribe({
       next: (res) => {
        this.currentUser = res 
      }
     })
    }
  }

  validateUser(user :any){
    this.authService.validateToken(user).subscribe({
      next : (res) => console.log("Response from BE", res)
      
    })
    
  }

  
  

}

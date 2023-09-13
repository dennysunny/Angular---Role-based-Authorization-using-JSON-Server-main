import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'auth';
  isNavVisible = false;
  isAdmin = false;
  currentUser: any;

  constructor(
    private router : Router,
    private authService :AuthService
  ){}

    ngDoCheck(){

      this.authService.userInfo.subscribe({
        next: (res) => {
         this.currentUser = res 
       }
      })
      
      if(this.currentUser && this.currentUser.user.role == 'admin'){
        this.isAdmin = true;
      }else this.isAdmin = false

      if (this.router.url == '/login' || this.router.url == '/register' )  {
        this.isNavVisible = false;
      } else this.isNavVisible = true
    }

 

  logout(){
    localStorage.removeItem('auth-token');
    sessionStorage.clear();
  }
  
}

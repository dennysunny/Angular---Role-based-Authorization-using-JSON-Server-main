import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'auth';
  isNavVisible = false;
  isAdmin = false;

  constructor(
    private router : Router,
    //private activeURL : ActivatedRoute
  ){}

    ngDoCheck(){
      
      if(sessionStorage.getItem('role') == 'admin'){
        this.isAdmin = true;
      }else this.isAdmin = false

      if (this.router.url == '/login' || this.router.url == '/register' )  {
        this.isNavVisible = false;
      } else this.isNavVisible = true
    }

  logout(){
    localStorage.removeItem('token');
    sessionStorage.clear();
  }
  
}

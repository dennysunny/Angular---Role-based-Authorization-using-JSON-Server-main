import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements DoCheck, OnInit {
  constructor(
    private authService: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  currentUser!: any;
  validationStatus :any = null;
  validationType! :any;
  userToken = localStorage.getItem('auth-token');

  ngOnInit() {
    this.validateUser();
  }


  ngDoCheck() {
    if (this.route.url == '/home' || this.route.url == '') {
      this.authService.userInfo.subscribe({
        next: (res) => {
          this.currentUser = res;
        },
      });
    }
  }

  validateUser() {
    
    this.authService.validateToken().subscribe({
      next: (res) => {
        this.validationType = 'success';
        this.validationStatus = res.message;
      },
      error: (err) => {
        // this.toastr.error(err.statusText, err.status),
        // this.toastr.info('Token Exprired / Invalid');
        this.validationType = 'error';
        this.validationStatus = err.statusText;
        this.authService.logoutUser();
      },
    });
  }

}

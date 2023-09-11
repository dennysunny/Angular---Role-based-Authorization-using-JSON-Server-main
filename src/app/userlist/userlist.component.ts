import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{

  userList! :any;

  constructor(
    private route :Router,
    private auth :AuthService
  ) {}

  ngOnInit() {
      
    this.auth.getAllUsers().subscribe({
      next : (res) => this.userList = res
      
    })
  }

}

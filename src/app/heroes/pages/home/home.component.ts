import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/aut.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container{margin: 10px;}
    `
  ]
})
export class HomeComponent implements OnInit {


  constructor(private router:Router,
              private authservice: AuthService) { }

  get auth(): Auth{
    return this.authservice.auth;
  }

  ngOnInit(): void {
  }

  logOut(){
    this.router.navigate(['./auth/login']);
  }
}

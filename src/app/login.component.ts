import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error:boolean = false;
  credentials = {username: '', password: ''};

  constructor(private appService: AppService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.appService.authenticate(this.credentials, () => {
        if(this.appService.authenticated) {
          this.error = false;
          this.router.navigateByUrl('/');
        } else {
          this.error = true;
          this.credentials = {username: '', password: ''};
        }
    });
    return false;
  }

}

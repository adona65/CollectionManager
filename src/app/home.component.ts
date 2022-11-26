import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  backEndpoint = "http://localhost:8080";

  greeting:any = {id: '', content: ''};;

  constructor(private appService: AppService, private http: HttpClient) {
    this.http.get(this.backEndpoint + '/resource')
            .pipe(
              // tap() is use to cause side effects when we got the response. The tap() call back doesn't access the values themselves.
              tap({
                next: () => {
                  console.log("Successfully call /resource service.")
                },
                error: (err) => {
                  console.log("Failed to call /resource service. Http response : " + err.status)
                }, 
              }),
              // catchError() is used to handle error. Here we do nothing but returning empty value, and let subscribe() handle it.
              catchError(err => {
                return of([]);
              })
            )
            .subscribe(data => this.greeting = data);
  }

  ngOnInit(): void {
  }

  authenticated() { return this.appService.authenticated; }

}

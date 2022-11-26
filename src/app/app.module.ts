import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';

/**
 * The following injectable class intercept all HttpRequest send by Angular before they reach their destination. This allow us to perform some required actions on
 * requests like adding useful headers. For example credentials in "Basic authorization" for being allowed to call services from Spring boot back end part and got
 * a proper response instead of a HTTP 401. So we don't have to add them each time we call a service. This interceptor do it conveniently for us.
 * 
 * This injectable need to be declared in the providers of this module in order to work.
 */
@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  constructor(private appService: AppService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    

    const xhr = req.clone(this.appService.credentials ? {
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
      .set("Access-Control-Allow-Origin", "*")
      .set('authorization', 'Basic ' + Buffer.from(this.appService.credentials.username + ':' + this.appService.credentials.password).toString('base64'))
      .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization")
    } : {
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
      .set("Access-Control-Allow-Origin", "*")
      .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization")
    });

    return next.handle(xhr);
  }
}

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent
    , HomeComponent
    , LoginComponent
  ],
  imports: [
    BrowserModule
    , FormsModule
    , HttpClientModule
    , RouterModule.forRoot(routes)
  ],
  providers: [
    AppService // Add AppService for dependency injection.
    , { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

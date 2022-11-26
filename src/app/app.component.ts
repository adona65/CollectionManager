import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  backEndpoint = "http://localhost:8080";

  constructor(private appService: AppService, private http: HttpClient, private router: Router) {
    /* Called when the controller is loaded to see if the user is actually already authenticated (e.g. if he had refreshed the browser in the middle 
     * of a session). We need the authenticate() function to make a remote call because the actual authentication is done by the server, and we don’t 
     * want to trust the browser to keep track of it.
     */
    this.appService.authenticate(undefined, undefined);
  }

  /**
   * Handling logout post request is not explicitly declared into app's java code. It's because it is added for us already by Spring Security (i.e. we don’t 
   * need to do anything for this simple use case). For more control over the behavior of logout we could use the HttpSecurity callbacks in our SecurityConfiguration.java, 
   * for instance to execute some business logic after logout.
   */
  logout() {
    this.http.post(this.backEndpoint + '/logout', {})
              .pipe(
                // Sends the user back to the login screen unconditionally.
                finalize(() => {
                  this.appService.authenticated = false;
                  this.appService.credentials = {username: '', password: ''};
                  this.router.navigateByUrl('/login');
                })
              )
              .subscribe();
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  backEndpoint = "http://localhost:8080";

  credentials = {username: '', password: ''};

  // Flag telling if the user is currently authenticated.
  authenticated = false;

  constructor(private http: HttpClient) {}

  /**
   * Can be used to authenticate with the back end server, or just to query it for the user details.
   * 
   * @param credentials Credentials for authentication.
   * @param callback Optional argument that we can use to execute some code if the authentication is successful.
   */
  
  authenticate(credentials: any, callback: any) {
    // We just store credentials, but don't have to use them here to add headers for HTTP Basics auth. The interceptor do it for us.
    this.credentials = credentials;
    
    /**
     * Commentary keeped for tutorial purposes : for adding headers manually to our request, we would do the following
     * 
        // Headers for HTTP Basics auth (check if credentials is not null and not undefined).
        const headers = new HttpHeaders(credentials ? {
          // Encode credentials from String to Base64.
          authorization : 'Basic ' + Buffer.from(credentials.username + ':' + credentials.password).toString('base64')
        } : {});

        
        // Call the service with the headers.
        this.http.get(this.backEndpoint + '/user', {headers: headers}).subscribe(.....);
     *
     */
    
    this.http.get(this.backEndpoint + '/user')
            .pipe(
              // tap() is use to cause side effects when we got the response. The tap() call back doesn't access the values themselves.
              tap({
                next: () => {
                  console.log("Successfully call /user service.")
                },
                error: (err) => {
                  console.log("Failed to call /user service. Http response : " + err.status)
                }, 
              }),
              // catchError() is used to handle error. Here we do nothing but returning empty value, and let subscribe() handle it.
              catchError(err => {
                return of([]);
              })
            )
            .subscribe(response => {
              if (response['name' as keyof typeof response]) {
                this.authenticated = true;
              } else {
                this.authenticated = false;
              }
                return callback && callback();
            });
  }
}


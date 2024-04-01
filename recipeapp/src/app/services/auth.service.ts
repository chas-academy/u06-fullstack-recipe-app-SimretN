// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   [x: string]: any;

//   message = "";

//   configUrl = "";

//   httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer '
//     })
//   }

//   constructor(private http: HttpClient) { }

//   loginUser(user: any): Observable <any> {
//     return this.http.post<any>(this.configUrl + "login", user, this.httpOptions)
//     .pipe(catchError(this.handleError));
//   }

//   registerUser(user: any): Observable<any> {
//     return this.http.post<any>(this.configUrl + 'register', user)
//       .pipe(catchError(this.handleError));
//   }

//   private handleError(error: HttpErrorResponse) {
//     if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error('An error occurred:', error.error);
    //} else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      //console.error(
        //`Backend returned code ${error.status}, body was: `, error.error);
    //}
    // Return an observable with a user-facing error message.
    //return throwError(() => new Error('Something bad happened; please try again later.'));
 // }
//}

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Logindetails } from '../interfaces/logindetails';
import { User } from '../interfaces/user';
import { LoggedInUser } from '../interfaces/loggedinuser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUser(value: Partial<{ name: string | null; email: string | null; password: string | null; password_confirmation: string | null; }>) {
    throw new Error('Method not implemented.');
  }
  private loggedIn = new BehaviorSubject<LoggedInUser>({
    user: undefined,
    loginState: false,
  });
  loggedIn$ = this.loggedIn.asObservable();

  private baseUrl = '';//link from deployment

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  updateLoginState(loginState: LoggedInUser) {
    this.loggedIn.next(loginState);
  }
  getLoginStatus() {
    return this.loggedIn.value.loginState;
  }
  loginUser(loginDetails: Logindetails) {
    this.http
      .post<any>(this.baseUrl + 'login', loginDetails, this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe((result) => {
        console.log(result);
        this.updateLoginState({
          user: result.user,
          loginState: true,
        });
        this.httpOptions.headers = this.httpOptions.headers.set(
          'Authorization',
          'Bearer ' + result.token
        );
      });
  }
  logoutUser() {} //göra själv
  getCurrentUser() {
    let user: User;
    user = {
      id: 0,
      name: '',
      email: '',
      created_at: '',
    };
    this.http
      .get<User[]>(
        this.baseUrl + 'getUser/' + this.loggedIn.value.user?.id,
        this.httpOptions
      )
      .subscribe((res) => (user = res[0]));
    return user;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('An error occurred', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later')
    );
  }
}

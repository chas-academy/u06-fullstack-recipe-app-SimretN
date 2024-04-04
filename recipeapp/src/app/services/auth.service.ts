import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Logindetails } from '../interfaces/logindetails';
import { User } from '../interfaces/user';
import { LoggedInUser } from '../interfaces/loggedinuser';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private loggedIn = new BehaviorSubject<LoggedInUser>({
    user: undefined,
    loginState: false,
  });
  loggedIn$ = this.loggedIn.asObservable();

  private baseUrl = 'https://u06-fullstack-recipe-app-simretn.onrender.com/api/';
  
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

  loginUser(loginDetails: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', loginDetails, this.httpOptions)
      .pipe(catchError(this.handleError),
      tap(result => {
        console.log(result);
        this.updateLoginState({
          user: result.user,
          loginState: true,
        });     
        this.httpOptions.headers = this.httpOptions.headers.set(
          'Authorization',
          'Bearer ' + result.token
        );
      })
    );
  }

  logoutUser() {
    console.log('hello from logoutUser');
    this.http.post(this.baseUrl + 'logout',{},this.httpOptions).pipe(catchError(this.handleError)).subscribe(res => {
      this.httpOptions.headers = this.httpOptions.headers.delete("Authorization");
      // Clear authentication state
       this.updateLoginState({
         user: undefined,
         loginState: false,
       });
    });
    
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'register', userData, this.httpOptions)
      .pipe(catchError(this.handleError));

  }

  getCurrentUser() {
    let user: User;
    user = {
      id: 0,
      name: '',
      email: '',
      created_at: '',
    };
    this.http.get<User[]>(this.baseUrl + 'getUser/' + this.loggedIn.value.user?.id, this.httpOptions)
      .subscribe((res) => (user = res[0]));
    return user;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('An error occurred', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later'));
  }
}


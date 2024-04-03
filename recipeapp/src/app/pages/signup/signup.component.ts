import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { User } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
//import { User } from '../../services/user.service';
import { throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
//import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,RouterLink,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class signupComponent {

  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    });
  }

  signup() {
    if (this.registerForm.valid) {
      const userData = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        password_confirmation: this.registerForm.value.password_confirmation
      };

      this.authService.registerUser(userData).subscribe(
        (response: any) => {
          console.log('Signup successful:', response);
          // Optionally, do something after successful signup
          this.router.navigate(['/login']); // Redirect to login page after successful signup
        },
        (error: any) => {
          console.error('Signup failed:', error);
          // Optionally, handle signup failure
        }
      );
    } else {
      // Form validation failed
      // You can display error messages or handle validation errors as per your requirement
    }
  }

  
  }

  /*user: User;

  message = "";

  alert:boolean = false;


//  constructor(private auth: AuthService){
//   this.user = {
//     id:-1,
//     name:"",
//     email:""
//   }
//  }


  

    register = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
    password_confirmation: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
    
    })

     constructor(private authService: AuthService, private router: Router) { 
      this.user = {
             id:-1,
            name:"",
            email:"",
            created_at:"",
           }
     }

      /* getUser(){
       this.authService.getUser2().subscribe((res: User[]) => {
         console.log(res[0]);
         this.user = res[0];
       })
     } */

     


   /* ngOnInit(): void {

    }

 

   signup() {
    if (this.register.value) {
      this.authService.registerUser(this.register.value)/*.subscribe((res) => {
        this.message = "Success!";
        this.router.navigate(['/login']);
        this.message = "Success!";
   
     
     })

     
 }*/
/* else {
  this.message = "Credentials don't match. Try again!";
  alert(this.message);
  }
} 

private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error('Something bad happened; please try again later.'));
}


} */
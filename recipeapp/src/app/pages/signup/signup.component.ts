import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';


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
      console.log(this.registerForm.value);
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

 
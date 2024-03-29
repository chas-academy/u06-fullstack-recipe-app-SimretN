import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Logindetails } from '../../interfaces/logindetails';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

loginDetails: Logindetails;// vi behöver göra själva

  constructor(private auth: AuthService) {
    this.loginDetails = {
      email: 'seb@seb.seb',
      password: 'sebsebseb',
    };
  }

  login(){ //we are going to do by our selvs
    this.auth.loginUser(this.loginDetails);
  }
}
  // user: any;
  // message = '';
  // @Input() elementId!: string;

  // constructor(
  //   private userService: AuthService,
  //   private formBuilder: FormBuilder,
  //   private router: Router
  // ) {}

  // loginForm = this.formBuilder.group({
  //   email: ['', [Validators.required]],
  //   password: ['', [Validators.required]]
  // });

  // login() {
  //   if (this.loginForm.valid) {
  //     const credentials = {
  //       email: this.loginForm.value.email,
  //       password: this.loginForm.value.password
  //     };
  
  //     this.userService.loginUser(credentials)
  //       .subscribe(
  //         (res) => {
  //           localStorage.setItem("token", res.token);

  //           let login = document.getElementById('login-link');
  //           let logout = document.getElementById('logout-link');
  
  //           if (login) {
  //             login.style.display = 'none';
  //           }
  
  //           if (logout) {
  //             logout.style.display = 'block';
  //           }
  
  //           this.router.navigate(['/']);
  //         },
  //         (error) => {
  //           this.message = "Credentials don't match. Try again!";
  //           alert(this.message);
  //         }
  //       );
  //   } else {
  //     this.message = "Credentials don't match. Try again!";
  //   }
  // }





import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

   register = new FormGroup({})
 

  signup() {
   
  }
}

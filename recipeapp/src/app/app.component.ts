// import { AsyncPipe, CommonModule } from '@angular/common';
// import { Observable } from 'rxjs';
// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
//import { RecipeService } from './services/recipe.service';

import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { LoggedInUser } from './interfaces/loggedinuser';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'recipeapp';

  loggedIn$: Observable<LoggedInUser>;

  constructor(private auth:AuthService){
    this.loggedIn$ = this.auth.loggedIn$;
  }
}

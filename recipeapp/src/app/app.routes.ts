import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { authGuard } from './guards/auth.guard';


//import { FormsModule } from '@angular/forms';
  

export const routes: Routes = [
  { path: '', component: RecipesComponent },
  { path:'recipe/:id', component:RecipeComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent },
];

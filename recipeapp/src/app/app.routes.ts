import { Routes } from '@angular/router';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path:'', component:RecipeComponent},
    { path:'recipe:id', component:RecipeComponent},
    { path:'profile', component:ProfileComponent}
];

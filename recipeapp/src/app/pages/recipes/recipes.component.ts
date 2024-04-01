// import { Component } from '@angular/core';
// import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
// import { RecipeService } from '../../services/recipe.service';
// import { FormsModule } from '@angular/forms';

import { Component } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RecipeidformatterPipe } from "../../pipes/recipeidformatter.pipe";
@Component({
  selector: 'app-recipes',
  standalone: true,
  templateUrl: './recipes.component.html',
  imports: [FormsModule,RouterLink,RecipeidformatterPipe],
  styleUrl: './recipes.component.css'
  
})
export class RecipesComponent {
  mealType = "";
  cuisineType = "";
  allRecipes: any;
  
  recipes?: Recipe[];
  
  searchterm = "";

  breakfast = "Breakfast";
  lunch = "Lunch";
  dinner = "Dinner";
  desserts = "Desserts";
  snack = "Snack";
  teatime = "Teatime";
  brunch = "Brunch";

  american = "American";
  british = "British";
  french = "French";
  italian = "Italian";
  nordic = "Nordic";
  indian = "Indian";
  caribbean = "Caribbean";

  constructor(private recipeService: RecipeService) {}

  searchRecipe() {
    this.recipeService.getRecipes(this.searchterm, this.cuisineType, this.mealType).subscribe((result) => {
      console.log(result);
      let recipes: Recipe[];
      recipes = result.hits.map((item: { recipe: {uri: any; label: any; image: any; ingredientLines: any; totalTime: any; }; _links: { self: { href: any; }; }; }) => {
        return {
          uri: item.recipe.uri,
          label: item.recipe.label,
          image: item.recipe.image,
          ingredientLines: item.recipe.ingredientLines,
          totalTime: item.recipe.totalTime,
          selfref: item._links.self.href,
        };
      });
      console.table(recipes);
      this.recipes = recipes;
    });
  }
    getRecipeIdFromUri(uri: string | undefined): string {
    if (uri) {
      return uri.split('_').pop() || '';
    }
    return '';
  }

  getRecipes() {
        this.recipeService.getRecipes(this.searchterm, this.cuisineType, this.mealType).subscribe((result: any) => {
          let recipes = result.hits.map((data: any) => {
            let recipe = data.recipe;
            recipe.selfref = data._links.self.href;
            return recipe;
          })
          this.allRecipes = recipes;
        })
      }
}


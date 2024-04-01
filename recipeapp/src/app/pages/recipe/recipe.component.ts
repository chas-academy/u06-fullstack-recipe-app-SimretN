import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit {
  id?: string | null | undefined;
  allRecipes: any;

  recipe: any;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService){
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchRecipeData();
  }
  
  fetchRecipeData() {
    if (!this.id) {
      return;
    }

    this.recipeService.getRecipe(this.id).subscribe((result: any) => {
      this.allRecipes = result;

      let recipeDetails = Object.values(this.allRecipes).map((res: any) => res)
      this.recipe = recipeDetails;
    });
  }
}

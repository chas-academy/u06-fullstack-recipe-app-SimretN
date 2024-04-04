import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule],
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
      this.recipe = result.recipe;      
    });
  }
}

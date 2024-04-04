
import {HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
   private baseUrl = 'https://api.edamam.com/api/recipes/v2';
   private app_key = '4e8675e3a1c9fb7724167d66be7f29b0'
   private app_id = '3239e540';
   type = "public"

   private httpOptions = {
    headers: new HttpHeaders({
      'accept': 'application/json',
      'Accept-Language': 'en' 

    })
   }

   constructor(private http:HttpClient) { }
   
  getRecipes(searchterm = "meat", quisineType="American", mealType="Lunch"): Observable<any> {
    let url = this.baseUrl + "?type=" + this.type + "&q=" + searchterm + "&app_id=" + this.app_id + "&app_key=" + this.app_key + "&cuisineType=" + quisineType + "&mealType=" + mealType;
    return this.http.get<any>(url, this.httpOptions);
  }

  getRecipe(id: string){
    const recipeUrl = this.baseUrl + "/" + id + "?type=" + this.type + "&app_id=" + this.app_id + "&app_key=" + this.app_key;
    return this.http.get<any>(recipeUrl, this.httpOptions)
  }
}
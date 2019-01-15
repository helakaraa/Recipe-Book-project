import { Recipe } from './recipe.model';
import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from '../../../node_modules/rxjs';
@Injectable()
export class RecipeService {
 //  recipeSelected= new EventEmitter <Recipe>();
   recipeChanged= new Subject<Recipe[]>();
   private recipes: Recipe[] =[
        new Recipe('Spicy Apple Cake',
                   '"An easy and delicious cake with a creamy frosting. Great for apple-spice lovers!"',
                    'https://images.media-allrecipes.com/userphotos/250x250/949695.jpg',[
            new Ingredient('eggs',2), new Ingredient('teaspoon vanilla extrac',1),new Ingredient('teaspoon baking powder',1)
        ]),
        new Recipe("World's Best Lasagna",'"It takes a little work, but it is worth it."',
        'https://images.media-allrecipes.com/userphotos/720x405/3359675.jpg',[
            new Ingredient('cloves garlic, crushed',2), new Ingredient('(6 ounce) cans tomato paste',2),new Ingredient('tablespoons white sugar',2)
        ])
      ];
  constructor(private shoppingListService : ShoppingListService){

  }   
  getRecipe(){
      return this.recipes.slice();
  }
  getRecipee(index : number){
    return this.recipes[index];
    this.recipeChanged.next(this.recipes.slice());
 }
  addIngredientsToShoppingList(ingredient: Ingredient[]){
    this.shoppingListService.addIngredients(ingredient);
  }

  addRecipe(recipe:Recipe){
   this.recipes.push(recipe);
   this.recipeChanged.next(this.recipes.slice());

  }
  updateRecipe(index: number, newRecipe:Recipe){
   this.recipes[index]= newRecipe;
   this.recipeChanged.next(this.recipes.slice());
  }
  
  deleteRecipe(index: number){
   this.recipes.splice(index,1);
   this.recipeChanged.next(this.recipes.slice());
  }

}
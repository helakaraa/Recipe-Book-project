import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from '../../../../node_modules/rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy{
  
  subscription:Subscription;
  recipes: Recipe[];
  
  constructor(private recipeService : RecipeService , private router : Router, 
    private route:ActivatedRoute)
   { }

  ngOnInit() {
    this.subscription= this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {

        this.recipes=recipes;
      }

    );
    this.recipes= this.recipeService.getRecipe();
  }
  onNewRecipe(){
     this.router.navigate(['new'],{relativeTo: this.route});
  }
  ngOnDestroy(){
   this.subscription.unsubscribe();
  }
 
}

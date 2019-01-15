import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Subject } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})


export class ShoppingListComponent implements OnInit , OnDestroy{
  
  ingredients: Ingredient[];
  startedEditing = new Subject<number>();
  private subscription : Subscription;

  constructor(private shoppingListService :ShoppingListService ) { }

  ngOnInit() {
    this.ingredients=this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientChanged
    .subscribe(
      (ingredients: Ingredient[])=>{
        this.ingredients=ingredients;
      }
    );
  }

onEditItem(index : number){
   this.shoppingListService.startedEditing.next(index);
  }
 
  ngOnDestroy(){
 //  this.subscription.unsubscribe();
 }

}

import {
  Component,
  OnInit,
  ViewChild,


} from '@angular/core';

import {NgForm} from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit {
   @ViewChild('f') slform: NgForm;
   subscription: Subscription;
   editMode= false;
   editItemIndex: number;
   editedItem: Ingredient;


  constructor(private shoppingListService :ShoppingListService) { }

  ngOnInit() {

   this.subscription=this.shoppingListService.startedEditing.subscribe(
     (index: number) =>{
       this.editItemIndex = index;
       this.editMode = true;
       this.editedItem = this.shoppingListService.getIngredient(index);
       this.slform.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount

       });
     }

   );
  }

  onAddItem( form : NgForm) {
    const value= form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editItemIndex,newIngredient)
    }
    else {
    this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();
  }
  OnClear(){
    this.slform.reset();
    this.editMode=false;
  }
  onDelete(){
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.OnClear();
  }
  ngOnDestroy(){
   // this.subscription.unsubscribe();
  }

}

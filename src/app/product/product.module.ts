import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {ProductService} from "./product.service";
import {ProductEditGuard} from "./guard/product-edit.guard";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path:"",component:ProductListComponent},
      {path:"id",component:ProductDetailsComponent},
      {
        path:"id:edit",
        canDeactivate:[],
        component:ProductEditComponent
      }
    ])
  ],
  providers:[
    ProductService,
    // ProductEditGuard
  ]
})
export class ProductModule { }

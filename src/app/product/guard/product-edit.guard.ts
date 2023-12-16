import { CanDeactivateFn, Router} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {ProductEditComponent} from "../product-edit/product-edit.component";


@Injectable({
  providedIn: 'root'
})
class ProductEditService {

  constructor() {}

  canDeactivate(component:ProductEditComponent): boolean {
    if(component.isDirty){
      const productName = component.product.productName || 'New Product';
      return confirm(`Navigate away and lose all changes to ${productName}?`);
    }
    return  true
    //your logic goes here
  }
}

export const ProductEditGuard: CanDeactivateFn<any> = (component:ProductEditComponent): boolean => {
  return inject(ProductEditService).canDeactivate(component);
}

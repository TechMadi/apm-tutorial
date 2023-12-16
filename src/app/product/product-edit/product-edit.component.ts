import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {IProduct} from "../product";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {

  @ViewChild(NgForm) editForm!:NgForm;
  pageTitle:string='Product Edit';
  errorMessage:string=""
  private originalProduct!:IProduct;
  product!:IProduct;


  get isDirty():boolean{
    return  !!this.editForm.dirty
  }

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit():void{
    this.route.params.subscribe(
      (params)=>{
        const id=+params['id'];
        this.getProduct(id);
      }
    )
}

getProduct(id:number):void{
    this.productService.getProduct(id)
      .subscribe((product:IProduct)=>this.onProductRetrieved(product),error=>this.errorMessage=<any>error)
}

onProductRetrieved(product:IProduct):void{
    this.editForm.reset();

    this.originalProduct=product;
    this.product=Object.assign({},product);

    if(product.id===0){
      this.pageTitle='Add Product';
    }else {
      this.pageTitle=`Edit Product: ${this.product.productName}`
    }
}

cancel():void{
//     Navigate back to  teh product list
  this.router.navigate(['/products'])
}
  deleteProduct(): void {
    if (this.product.id) {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    } else {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    }
  }

  saveProduct(): void {
   if(this.editForm.valid){

     this.productService.saveProduct(this.product).subscribe(()=>{
     //   Assign the changes from the copy
       // @ts-ignore
       Object.keys(this.product).forEach((key:string)=>this.originalProduct[key]=this.product[key]);

     })
     this.onSaveComplete() ;
   }else{
     this.errorMessage='Please correct the validation errors'
   }
  }

  onSaveComplete(): void {
    // Reset back to pristine
    this.editForm.reset(this.editForm.value);
    // Navigate back to the product list
    this.router.navigate(['/products']);
  }
}

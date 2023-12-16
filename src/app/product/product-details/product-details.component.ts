import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct} from "../product";

@Component({
  selector: 'app-product-details',
  standalone: false,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
pageTitle:string='Product Detail'
product!:IProduct;
errorMessage:string=""
  constructor(private productService:ProductService,private router:Router,private route:ActivatedRoute) {
  }


  ngOnInit():void{
     const param:string=this.route.snapshot.paramMap.get('id')!;
     if(param){
       const id:number=+param
     }
  }


  getProduct(id:number):void{
    this.productService.getProduct(id).subscribe({
      next:(product:IProduct)=>this.product=product,
      error:(err)=>this.errorMessage=<any>err
    })
  }

  onBack():void{
  this.router.navigate(['/products'])
  }

}

import {Component, OnInit} from '@angular/core';
import {IProduct} from "../product";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
pageTitle:string='Product List'
  showImage:boolean=true;

imageWidth:number=50;
imageMargin:number=2;
errorMessage:string=""

  private  _listFilter:string="";

get listFilter():string{
   return this._listFilter
}

set listFilter(value){
  this._listFilter=value;
  this.performFilter(this.listFilter)
}

filteredProducts:IProduct[]=[]
products:IProduct[]=[]

  constructor(private  productService:ProductService) {
  }

  ngOnInit():void{
  this.productService.getProducts().subscribe(
    (products:IProduct[])=>{
      this.products=products;
      this.performFilter(this.listFilter)

    },
    (error:any)=>{
      this.errorMessage=<any>error
    }
  )
  }

  toggleImage():void{
  this.showImage=!this.showImage
  }
  performFilter(filterBy?:string):void{

  if(filterBy){
    this.filteredProducts=this.products.filter((product)=>product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase())!==-1);
  }else{
    this.filteredProducts=this.products
  }
  }
}


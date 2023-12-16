import {createComponent, Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import * as http from "http";

import {IProduct} from "./product";
import {catchError, ErrorObserver, Observable, of, tap, throwError} from "rxjs";

@Injectable()
export  class ProductService{
  private productsUrl:string='api/products';



  constructor(private http:HttpClient) {
  }

  private handleError(err:HttpErrorResponse):ErrorObserver<any>| string{
     // let errorMessage:string;
     //
     // if(err.error instanceof  Error){
     //   errorMessage=`An Error Occured :${err.error.message}`
     // }else{
     //   errorMessage= `Backend Returned code ${err.status},body was: ${err.error}`
     // }
     //
     // console.log(err);
     //
     return err.error

  }


  private initializeProduct(): IProduct {
    // Return an initialized object
    return {
      'id': 0,
      productName: '',
      productCode: '',
      category: '',
      tags: [],
      releaseDate: '',
      price: 0,
      description: '',
      starRating: 0,
      imageUrl: ''
    };
  }

  getProducts():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.productsUrl).pipe(
      tap(data=>console.log(JSON.stringify(data))),
      // catchError(this.handleError)
    )
  }


  getProduct(id:number):Observable<IProduct>{
    if(id===0){
      return of(this.initializeProduct())
    }

    const url:string=`${this.productsUrl}/${id}`;

    return this.http.get<IProduct>(url).pipe(
      tap((data:IProduct)=>console.log('Data: '+JSON.stringify(data))),
      // catchError(this.handleError)
    )
  }


  deleteProduct(id:number):Observable<IProduct>{
    const headers:HttpHeaders=new HttpHeaders({'Content-type':'application/json'})

    const url:string=`${this.productsUrl}/${id}`

    return  this.http.delete<IProduct>(url,{headers:headers}).pipe(
      tap((data:IProduct)=>console.log('deleteProduct :'+ id))
    )
  }

  saveProduct(product:IProduct):Observable<IProduct>{
    const headers=new HttpHeaders({'Content-Type':'application/json'});
    if(product.id===0){
      return this.createProduct(product,headers)
    }

    return  this.updateProduct(product,headers)
  }

  private createProduct(product:IProduct,headers:HttpHeaders):Observable<IProduct>{
    product.id=null;
    return this.http.post<IProduct>(this.productsUrl,product,{headers:headers}).pipe()
    tap((data:IProduct)=>console.log('createProduct:'+JSON.stringify(data)))
  }

  private updateProduct(product:IProduct,headers:HttpHeaders):Observable<IProduct>{
    const url:string=`${this.productsUrl}/${product.id}`;
    return  this.http.put<IProduct>(url,product,{headers:headers}).pipe(
      tap((data:IProduct)=>console.log('updateProduct:'+product.id)),
      // catchError(this.handleError())
    )
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductResponse } from '../responses/product-response';
import { ProductDto } from '../models/product';
import { CreateProductRequest } from '../request/product-request';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  pathBase = 'https://localhost:7020/api/Products';
  constructor(private http: HttpClient) { }

  public getProducts(pageNumber: number, pageSize: number){

    return this.http.get<ProductResponse>(`${this.pathBase}?pageNumber=${pageNumber}&pageSize=${pageSize}`);

  }

  public getProductById(id: string){
    return this.http.get<ProductDto>(`${this.pathBase}/${id}`);
  }

  public createProduct(product: CreateProductRequest){
    return this.http.post<ProductDto>(this.pathBase, product);
  }

    public updateProduct(product: CreateProductRequest, id:string){
    return this.http.put<ProductDto>(`${this.pathBase}/${id}`, product);
  }

  public deleteProduct(id: string){
    return this.http.delete<void>(`${this.pathBase}/${id}`);
  }

}

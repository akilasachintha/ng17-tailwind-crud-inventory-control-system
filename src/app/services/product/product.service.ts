import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse, ICategory} from "../../pages/shared/models/Category";
import {IProduct} from "../../pages/shared/models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiurl = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<ApiResponse<IProduct[]>> {
    return this.http.get<ApiResponse<IProduct[]>>(`${this.apiurl}/products`);
  }

  createProduct(product: IProduct): Observable<any> {
    return this.http.post(`${this.apiurl}/product`, product);
  }

  updateProduct(id: string, product: IProduct): Observable<any> {
    return this.http.put(`${this.apiurl}/product/${id}`, product);
  }

  deleteProduct(id: string): Observable<ApiResponse<any>>{
    return this.http.delete<ApiResponse<any>>(`${this.apiurl}/product/${id}`);
  }
}

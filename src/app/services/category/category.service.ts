import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiResponse, ICategory} from '../../pages/shared/models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiurl = 'http://localhost:4000';
  constructor(private http: HttpClient) {}

  getAllCategory(): Observable<ApiResponse<ICategory[]>> {
    return this.http.get<ApiResponse<ICategory[]>>(`${this.apiurl}/categories`);
  }

  createCategory(category: ICategory): Observable<any> {
    return this.http.post(`${this.apiurl}/category`, category);
  }

  updateCategory(id: string, category: ICategory): Observable<any> {
    return this.http.put(`${this.apiurl}/category/${id}`, category);
  }

  deleteCategory(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiurl}/category/${id}`);
  }
}

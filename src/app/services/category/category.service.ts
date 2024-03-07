import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiResponse, ICategory} from '../../pages/shared/models/Category';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  apiUrl = 'https://greatsparklyphone61.conveyor.cloud/api';

  constructor(private http: HttpClient) {

  }

  getAllCategory(): Observable<ApiResponse<ICategory[]>> {
    return this.http.get<ApiResponse<ICategory[]>>(`${this.apiUrl}/Category/get-all-category`);
  }

  createCategory(category: ICategory): Observable<any> {
    console.log(category);
    return this.http.post(`${this.apiUrl}/Category/add-category`, category);
  }

  updateCategory(id: string, category: ICategory): Observable<any> {
    return this.http.put(`${this.apiUrl}/Category/update-category/${id}`, category);
  }

  deleteCategory(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/Category/delete-category-by-id/${id}`);
  }
}

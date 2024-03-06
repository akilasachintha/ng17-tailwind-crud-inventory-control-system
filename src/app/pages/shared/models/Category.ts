export interface ApiResponse<T> {
  message?: string;
  data: T;
}

export interface ICategory {
  id?: string;
  categoryName: string;
  categoryDescription: string;
}



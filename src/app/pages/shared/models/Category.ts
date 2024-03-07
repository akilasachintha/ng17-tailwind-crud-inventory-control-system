export interface ApiResponse<T> {
  message?: string;
  status?: string;
  data: T;
}

export interface ICategory {
  categoryId?: string;
  categoryName: string;
  categoryDescription: string;
}



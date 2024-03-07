import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../shared/ui/model/model.component';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category/category.service';
import {ICategory} from '../shared/models/Category';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ModelComponent, CategoryFormComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})

export class CategoryComponent implements OnInit {
  isModelOpen = false;
  categories: ICategory[] = [];
  category!: ICategory;

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        if (response.data) {
          console.log(response.data);
          this.categories = response.data;
        }
      },
    });
  }

  loadCategory(category: ICategory) {
    this.category = category;
    this.openModel();
  }

  deleteCategory(id: string) {
    console.log(id);
    this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.getAllCategory();
      },
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllCategory();
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {ICategory} from '../shared/models/Category';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})

export class CategoryFormComponent implements OnChanges {
  @Input() data: ICategory | null = null;
  @Output() onCloseModel = new EventEmitter();

  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.categoryForm = this.fb.group({
      categoryId: [''],
      categoryName: new FormControl('', [Validators.required]),
      categoryDescription: new FormControl('', [Validators.required]),
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.categoryForm.patchValue({
        categoryId: this.data.categoryId,
        categoryName: this.data.categoryName,
        categoryDescription: this.data.categoryDescription,
      });
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      if (this.data) {
        this.categoryService
          .updateCategory(this.data.categoryId as string, this.categoryForm.value)
          .subscribe({
            next: (response: any) => {
              this.resetCategoryForm();
              this.toastr.success(response.message);
            },
          });
      } else {
        this.categoryService.createCategory(this.categoryForm.value).subscribe({
          next: (response: any) => {
            this.resetCategoryForm();
            console.log(response);
            this.toastr.success(response.message);
            this.onClose();
          },
        });
      }
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

  resetCategoryForm() {
    this.categoryForm.reset();
    this.onClose();
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from "../shared/models/Product";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "../../services/product/product.service";
import {ToastrService} from "ngx-toastr";
import {NgForOf, NgIf} from "@angular/common";
import {ICategory} from "../shared/models/Category";
import {CategoryService} from "../../services/category/category.service";

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  @Input() data: IProduct | null = null;
  @Output() onCloseModel = new EventEmitter();
  categories: ICategory[] = [];

  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.productForm = this.fb.group({
      categoryId: [''],
      productName: [''],
      productDescription: [''],
      productPrice: [''],
      productQuantity: ['']
    });
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  ngOnChanges(): void {
    if (this.data) {
      this.productForm.patchValue({
        category: this.data.categoryName,
        categoryId: this.data.categoryId,
        productName: this.data.productName,
        productDescription: this.data.productDescription,
        productPrice: this.data.productPrice,
        productQuantity: this.data.productQuantity
      });
    }
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        if (response.data) {
          this.categories = response.data;
        }
      },
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (this.data) {
        this.productService
          .updateProduct(this.data.productId as string, this.productForm.value)
          .subscribe({
            next: (response) => {
              this.resetProductForm();
              this.toastr.success(response.message);
              this.onCloseModel.emit(false);
            }
        });
      } else {
        this.productService
          .createProduct(this.productForm.value)
          .subscribe({
            next: (response) => {
              this.resetProductForm();
              this.toastr.success(response.message);
              this.onCloseModel.emit(false);
            }
        });
      }
    }else {
      this.productForm.markAllAsTouched();
    }
  }

  resetProductForm() {
    this.productForm.reset();
  }
}

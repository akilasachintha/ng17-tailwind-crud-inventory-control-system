import {Component} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {IProduct} from "../shared/models/Product";
import {ProductService} from "../../services/product/product.service";
import {CategoryFormComponent} from "../category-form/category-form.component";
import {ModelComponent} from "../shared/ui/model/model.component";
import {ProductFormComponent} from "../product-form/product-form.component";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CategoryFormComponent,
    ModelComponent,
    ProductFormComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  isModelOpen = false;
  products: IProduct[] = [];
  product!: IProduct;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProduct().subscribe({
      next: (response) => {
        if (response.data) {
          this.products = response.data;
        }
      },
    });
  }

  loadProduct(category: IProduct) {
    this.product = category;
    this.openModel();
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.getAllProducts();
      },
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllProducts();
  }
}

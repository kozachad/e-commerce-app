import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductRequest } from '../../interfaces/product-request';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent implements OnInit {
  products: any[] = [];
  editForm: FormGroup;
  productId?: number;
  selectedProduct: ProductRequest | null = null;
  selectedFile: File | null = null;
  imageBase64: string | null = null;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUserProducts();
  }

  getImageUrl(url : string): string {
    var realUrl = `https://localhost:7189${url}`;
    console.log("url?",realUrl);
    return realUrl;
  }

  getUserProducts(): void {
    this.productService.getUserProducts().subscribe(
      (data) => {
        console.log("ss0", data);
        this.products = data;
      },
      (error) => {
        console.error("error fetching!", error);
      }
    );
  }

  editProduct(product: ProductRequest): void {
    this.selectedProduct = product;
    this.editForm.patchValue(product);
  }

  cancelEdit(): void {
    this.selectedProduct = null;
    this.editForm.reset();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  addNewProduct(): void {
    this.selectedProduct = null;
    this.editForm.reset();
    this.router.navigate(['/addProduct']);
  }

  onFileChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageBase64 = e.target.result;
        this.editForm.patchValue({ image: this.imageBase64 });
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.imageBase64 = null;
      this.editForm.patchValue({ image: '' });
    }
  }

  clearFileInput(fileInput: HTMLInputElement): void {
    fileInput.value = '';
    this.selectedFile = null;
    this.imageBase64 = null;
    this.editForm.patchValue({ image: '' });
  }

  

  onSubmit(): void {
    if (this.editForm.valid && this.selectedProduct) {
      const updatedProduct = { ...this.selectedProduct, ...this.editForm.value };
      console.log('Updating product: ', updatedProduct); // Debugging line
  
      if (this.selectedFile) {
        console.log('Selected file: ', this.selectedFile); // Debugging line
        this.productService.uploadImage(this.selectedFile).subscribe(
          (imageUrl) => {
            console.log('Image uploaded successfully: ', imageUrl.url); // Debugging line
            updatedProduct.image = imageUrl.url;
            this.updateProduct(updatedProduct);
          },
          (error) => {
            console.error('Error uploading image', error);
          }
        );
      } else {
        this.updateProduct(updatedProduct);
      }
    } else {
      console.error('Form is invalid or no product selected'); // Debugging line
    }
  }

  updateProduct(product: ProductRequest): void {
    this.productService.updateProduct(product.id!, product).subscribe(
      () => {
        this.getUserProducts(); // Refresh the product list
        this.cancelEdit(); // Close the edit form
      },
      (error) => {
        console.error('Error updating product', error);
      }
    );
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          this.getUserProducts();
          this.router.navigate(['/manageProduct']).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error deleting product', error);
        }
      );
    }
  }
}

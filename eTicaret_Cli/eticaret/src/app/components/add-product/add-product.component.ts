import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductRequest } from '../../interfaces/product-request';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  newProduct: ProductRequest = {
    name: '',
    description: '',
    price: 0
  };

  constructor(private productService: ProductService,
   private router : Router
  ) {}

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(
      (product) => {
        console.log('Product added:', product);
        // Ürün eklendikten sonra formu sıfırla
        this.newProduct = {
          name: '',
          description: '',
          price: 0,
          image: ''
        };
        this.router.navigateByUrl("/");

      },
      (error) => {
        console.error('Error adding product', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductRequest } from '../../interfaces/product-request';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent implements OnInit {
  products: any[] = [];
  selectedProduct: ProductRequest | null = null;

  constructor(private productService : ProductService){}

  ngOnInit(): void {
    this.getUserProducts();
  }

  getUserProducts(): void {
    debugger;
    this.productService.getUserProducts().subscribe((data)=> {
      console.log("ss0",data);
      this.products = data;
    },
    (error)=> {
      console.error("error fetching!",error);
    });
  }



    cancelEdit(): void {
      this.selectedProduct = null; // Düzenleme formunu kapat
    }


  deleteProduct(id : number): void {
    
  }

}

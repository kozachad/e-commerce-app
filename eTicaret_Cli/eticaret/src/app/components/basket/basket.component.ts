import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { UserModel } from '../../interfaces/user-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {
  user = new UserModel();
  products: any[] = [];
  cartItems: any[] = [];
  userId: number | null = null;

  constructor(
    private http: HttpClient,
    private cartService : CartService,
    private cdr: ChangeDetectorRef
  ){
    const userIdString = localStorage.getItem("realId");
    if (userIdString) {
      this.userId = parseInt(userIdString, 10);
  }
}

  ngOnInit(): void {
    this.getMyItems();
  }

  getMyItems(): void {
    if (this.userId !== null) {
      debugger;
      this.cartService.getMyItems(this.userId).subscribe(
        (data) => {
          console.log("data geldi reis",data.$values || []);
          this.cartItems = data.$values || [];
          this.cdr.detectChanges();
          console.log("cartItems",this.cartItems);
        },
        (error) => {
          console.error('There was an error!', error);
        }
      );
    }
  }

  addToCart(productId: number): void {
    if (this.userId !== null) {
      const request = { userId: this.userId, productId };
      this.cartService.addToCart(request).subscribe(
        (response) => {
          console.log(response);
          this.getMyItems(); // Sepeti güncellemek için tekrar ürünleri al
        },
        (error) => {
          console.error('There was an error!', error);
        }
      );
    } else {
      console.error('User not logged in.');
    }
  }

}

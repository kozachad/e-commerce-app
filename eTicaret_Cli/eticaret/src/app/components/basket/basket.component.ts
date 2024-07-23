import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { UserModel } from '../../interfaces/user-model';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './basket.component.html',
  styleUrl : './basket.component.css'
})
export class BasketComponent {
  user = new UserModel();
  products: any[] = [];
  cartItems: any[] = [];
  userId: number | null = null;

  constructor(
    private http: HttpClient,
    private cartService : CartService,
    private cdr: ChangeDetectorRef,
    private router : Router
  ){
    const userIdString = localStorage.getItem("realId");
    if (userIdString) {
      this.userId = parseInt(userIdString, 10);
  }
}

  ngOnInit(): void {
    this.getMyItems();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  deleteProductInCard(productId: number): void {
    debugger;
    if (this.userId !== null) {
      const request = { userId: this.userId, productId };
      this.cartService.deleteProductInCard(request).subscribe(
        (response) => {
          console.log("successfully deleted");
          this.router.navigate(['basket']);
        },
        (error) => {
          console.error('There was an error!', error);
        }
      );
    } else {
      console.error('User not logged in.');
    }
  }

  getImageUrl(url : string): string {
    var realUrl = `https://localhost:7189${url}`;
    console.log("url?",realUrl);
    return realUrl;
  }


  getMyItems(): void {
    if (this.userId !== null) {
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

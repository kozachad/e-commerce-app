import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartRequest } from '../interfaces/cart-request';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

  getMyItems(userId: number): Observable<any>{
    return this.http.get<any>("https://localhost:7189/api/Carts?userId=" + userId);
  }

  addToCart(request : CartRequest): Observable<any> {
    return this.http.post<any>("https://localhost:7189/api/Carts",request);
  }

  getUserRealId(): number | null {
    const RealId = localStorage.getItem("realId");
    return RealId ? parseInt(RealId,10) : null;
  }

}

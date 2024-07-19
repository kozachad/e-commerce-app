import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CartRequest } from '../interfaces/cart-request';
import { ProductRequest } from '../interfaces/product-request';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7189/api/Product/GetProducts'; // API URL'nizi buraya ekleyin

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any>{
    return this.http.get<any>(this.apiUrl).pipe(
        map(response => response.$values || [])
    );
  }

  addProduct(data : ProductRequest): Observable<any>{
    var realId = localStorage.getItem("realId");
    return this.http.post<any>("https://localhost:7189/api/Product/PostProduct?userId=" + realId,data);
  }

  /*addToBasket(data : CartRequest): Observable<any>{
    return this.http.post<any>("https://localhost:7189/api/Carts",data).pipe(
        map(response => {
          
          return response;
        })
      );
  }*/

    getUserRealId(): number | null {
        const RealId = localStorage.getItem("realId");
        return RealId ? parseInt(RealId,10) : null;
      }
    

  getUserProducts(): Observable<any>{
    debugger;
    var realId = this.getUserRealId();
    return this.http.get<any>("https://localhost:7189/api/Product/GetProductsById?userId=" + realId).pipe(
        map(response => response.$values || [])
    );
  }

  updateProduct(Id: number, product: ProductRequest): Observable<ProductRequest> {
    //const token = this.authService.getToken();
    //let header = new HttpHeaders().set("Authorization","bearer "+token)
    return this.http.put<ProductRequest>(`https://localhost:7189/api/Product/EditProduct?id=`+Id, product);
}

  getProducts(search?: string, minPrice?: number, maxPrice?: number): Observable<any> {
    debugger;
    let params: any = {};

    if (search) {
      params.search = search;
    }
    if (minPrice) {
      params.minPrice = minPrice;
    }
    if (maxPrice) {
      params.maxPrice = maxPrice;
    }

    return this.http.get<any>(this.apiUrl, { params });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    var realId = this.getUserRealId();
    return this.http.get<any>("https://localhost:7189/api/Product/GetProductsById?userId=" + realId).pipe(
        map(response => response.$values || [])
    );
  }

  filterProducts(search?: string, minPrice?: number, maxPrice?: number): Observable<any> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    if (minPrice !== null && minPrice !== undefined) {
      params = params.set('minPrice', minPrice.toString());
    }
    if (maxPrice !== null && maxPrice !== undefined) {
      params = params.set('maxPrice', maxPrice.toString());
    }

    return this.http.get<any>(`https://localhost:7189/api/Product/FilterProducts/Filter`, { params }).pipe(
      map(response => response.$values || [])
  );
  }

  updateProduct(Id: number, product: ProductRequest): Observable<ProductRequest> {
    //const token = this.authService.getToken();
    //let header = new HttpHeaders().set("Authorization","bearer "+token)
    return this.http.put<ProductRequest>(`https://localhost:7189/api/Product/EditProduct?id=`+Id, product);
}

  deleteProduct(Id : number): Observable<void> {
    return this.http.delete<void>('https://localhost:7189/api/Product/DeleteProduct?id='+ Id);
  }

  uploadImage(file: File): Observable<{url : string}> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    console.log('FormData:', formData); // Debugging line

    return this.http.post<{url : string}>(`https://localhost:7189/api/Product/UploadImage`, formData);
  }
}

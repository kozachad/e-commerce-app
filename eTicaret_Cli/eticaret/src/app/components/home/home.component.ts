import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { UserModel } from '../../interfaces/user-model';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { TokenResponse } from '../../interfaces/token-response';
import { ProductService } from '../../services/product-service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: any[] = [];
  route : Router = new Router();
  user = new UserModel();
  userName: string ="";
  userRole : string ="";
  private tokenKey = 'token';
  private refreshToken = 'refreshToken';
  private isRefreshing = false;
  isLoggedIn = false;
  search: string = '';
  minPrice?: number ;
  maxPrice?: number ;

  constructor(
    private http: HttpClient,
    private productService : ProductService
  ){
    this.user = JSON.parse(localStorage.getItem("Id") ?? "");
    this.userName = this.user.name;
    this.userRole = this.user.role;
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe((data)=> {
      console.log("ss0",data);
      this.products = data;
    },
    (error)=> {
      console.error("error fetching!",error);
    });
  }


  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(){
    this.route.navigate(['/login']);
    this.isLoggedIn = true;
  }

  filterProducts(): void {
    if (event) {
      event.preventDefault();
    }

    this.productService.filterProducts(this.search, this.minPrice, this.maxPrice).subscribe(
      (data) => {
        console.log('Filtered Products:', data); // Gelen veriyi konsolda görüntüleme
        this.products = data;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  manageProduct(){
    this.route.navigate(['/manageProduct']);
  }

  register() {
    this.route.navigate(['/register']);
  }

  logout(){
      console.log("Disconnected");
      localStorage.clear();
      this.route.navigate(['/login']);
      this.isLoggedIn = false;
  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }


  private addToken(req: HttpRequest<any>, token: string) {
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer`+token)
  });
  }

  UpdateRefreshToken(): Observable<TokenResponse> {
    const refresh = localStorage.getItem('refreshToken');
    return this.http.get<TokenResponse>("https://localhost:7149/api/Auth/RefreshToken/refresh-token?refreshToken=" +refresh).pipe(
      map(response => {
        localStorage.setItem(this.refreshToken,response.refreshToken);
        localStorage.setItem(this.tokenKey,response.token);
        return response;
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      return this.UpdateRefreshToken().pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          return next.handle(this.addToken(req, response.token));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.logout();
          return throwError(err);
        })
      );
    } else {
      return throwError('Token refresh is already in progress.');
    }
  }

}

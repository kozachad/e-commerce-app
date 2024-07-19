import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../../interfaces/register-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = "";
  password : string = "";
  role : string = "";
  private tokenKey = 'token';
  private id = 'Id';


  constructor(private http: HttpClient,
    private router : Router
  )
  {}

  register(data: RegisterRequest): Observable<any>{
    //debugger;
    const url = 'https://localhost:7189/api/Auth/Register';
    return this.http.post(url,data);
  }

  onSubmit() {
    const RegData: RegisterRequest = {
      name: this.name,
      password: this.password,
      role : this.role
    };
  
    this.register(RegData).subscribe(
      response => {
        console.log('Register successful');
        this.router.navigateByUrl("/");
        // Redirect to another page or perform other actions
      },
      error => {
        console.error('Register failed', error);
      }
    );
  }
}
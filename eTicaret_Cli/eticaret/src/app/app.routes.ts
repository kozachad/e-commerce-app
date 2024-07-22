import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { BasketComponent } from './components/basket/basket.component';

export const routes: Routes = [

    {
        path: "",
        component : HomeComponent
        //canActivate : [()=> inject(AuthService).isAuthenticated()]
    },

    {
        path: "basket",
        component : BasketComponent
        //canActivate : [()=> inject(AuthService).isAuthenticated()]
    },

    {
        path: "addProduct",
        component : AddProductComponent
    },

    {
        path: "manageProduct",
        component : ManageProductComponent
    },
    
    
    {
        path: "login",
        component : LoginComponent
    },
    {
        path: "register",
        component : RegisterComponent
    }
];

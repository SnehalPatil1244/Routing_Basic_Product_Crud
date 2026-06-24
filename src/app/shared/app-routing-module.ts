import { Component, NgModule } from "@angular/core";
import { ProductDashboardComponent } from "./components/product-dashboard/product-dashboard.component";
import { ProductComponent } from "./components/product/product.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { RouterModule, Routes } from "@angular/router";
import { FairsComponent } from "./components/fairs/fairs.component";
import { UsersComponent } from "./components/users/users.component";
import { HomeComponent } from "./components/home/home.component";
import { UserDashboardComponent } from "./components/user-dashboard/user-dashboard.component";
import { UsersFormComponent } from "./components/users-form/users-form.component";



const routes: Routes = [
    // {
    //     path: '', //base url
    //     component: ProductDashboardComponent

    // },
    {
        path: '', //http://localhost:4200  - //base url
        component: HomeComponent
    },
    {
        path: 'home', //http://localhost:4200/home
        component: HomeComponent
    },
    {
        path: 'users', //http://localhost:4200/users
        component: UserDashboardComponent
    },
    {
        path: 'users/addUser',
        component: UsersFormComponent
    },
    {
        path: 'users/:userId',
        component: UsersComponent
    },
    {
        path: 'users/:userId/edit',
        component: UsersFormComponent
    },           


    {
        path: 'fairs', //http://localhost:4200/fairs
        component: FairsComponent

    },
    {
        path: 'product', //base_url/product
        component: ProductDashboardComponent
    },

    {
        path: 'product/addproduct',//base_url/product/addproduct
        component: ProductFormComponent
    },

    {
        path: 'product/:productId',//base_url/product/123
        component: ProductComponent
    },
    {
        path: 'product/:productId/edit',//base_url/product
        component: ProductFormComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
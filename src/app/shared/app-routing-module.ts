import { NgModule } from "@angular/core";
import { ProductDashboardComponent } from "./components/product-dashboard/product-dashboard.component";
import { ProductComponent } from "./components/product/product.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./components/users/users.component";
import { HomeComponent } from "./components/home/home.component";
import { UserDashboardComponent } from "./components/user-dashboard/user-dashboard.component";
import { UsersFormComponent } from "./components/users-form/users-form.component";
import { FairsDashBoardComponent } from "./components/fairs-dash-board/fairs-dash-board.component";
import { FairDetailsComponent } from "./components/fair-details/fair-details.component";
import { AuthComponent } from "./components/auth/auth.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { authGuard } from "./services/auth.Guard";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { userRoleGuard } from "./services/userRole.Guard";
import { canDeactivateComponent } from "./services/can-Deactivate.Guard";



const routes: Routes = [

    {
        path: '', //http://localhost:4200  - //base url
        component: AuthComponent
    },
    {
        path: 'home', //http://localhost:4200/home
        component: HomepageComponent,
        title: 'Home',
        canActivate: [authGuard, userRoleGuard],
        data: {
            userRole: ['buyer', 'admin', 'superAdmin']
        }
    },
    {
        path: 'users', //http://localhost:4200/users
        component: UserDashboardComponent,
        title: 'Users',
        canActivate: [authGuard, userRoleGuard],

        data: {
            userRole: ['admin', 'superAdmin']
        },
        children: [
            {
                path: 'addUser',
                component: UsersFormComponent,


            },
            {
                path: ':userId',
                component: UsersComponent,
                canDeactivate: [canDeactivateComponent]
            },
            {
                path: ':userId/edit',
                component: UsersFormComponent,
                canDeactivate: [canDeactivateComponent],

            },
        ]
    },

    {
        path: 'product', //base_url/product
        component: ProductDashboardComponent,
        title: 'Products',
        canActivate: [authGuard, userRoleGuard],
        data: {
            userRole: ['buyer', 'admin', 'superAdmin']
        },

        children: [
            {
                path: 'addproduct',//base_url/product/addproduct
                component: ProductFormComponent,

            },

            {
                path: ':productId',//base_url/123
                component: ProductComponent
            },
            {
                path: ':productId/edit',//base_url/product
                component: ProductFormComponent,
                canDeactivate: [canDeactivateComponent]
            }
        ]
    },
    {
        path: 'fairs', //http://localhost:4200/fairs
        component: FairsDashBoardComponent,
        title: 'fairs',
        canActivate: [authGuard, userRoleGuard],
        data: {
            userRole: ['superAdmin']
        },
        children: [
            {
                path: ':fairsId',
                component: FairDetailsComponent
            },

        ]

    },

    {
        path: 'page-not-found',
        component: PageNotFoundComponent,
        data: {
            msg: `Path Is Not Found  Using Static Data !!`
        }
    },
    {
        path: '**',
        redirectTo: 'page-not-found'
    }

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
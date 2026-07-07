import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductFormComponent } from './shared/components/product-form/product-form.component';
import { ProductComponent } from './shared/components/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { ProductDashboardComponent } from './shared/components/product-dashboard/product-dashboard.component';
import { AppRoutingModule } from './shared/app-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { FairsComponent } from './shared/components/fairs/fairs.component';
import { HomeComponent } from './shared/components/home/home.component';
import { UsersComponent } from './shared/components/users/users.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { GetConfirmationComponent } from './shared/components/get-confirmation/get-confirmation.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UsersFormComponent } from './shared/components/users-form/users-form.component';
import { UserDashboardComponent } from './shared/components/user-dashboard/user-dashboard.component';
import {MatChipsModule} from '@angular/material/chips';
import { FairCardComponent } from './shared/components/fair-card/fair-card.component';
import { FairDetailsComponent } from './shared/components/fair-details/fair-details.component';
import { FairsDashBoardComponent } from './shared/components/fairs-dash-board/fairs-dash-board.component';
import { AuthComponent } from './shared/components/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './shared/components/homepage/homepage.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductComponent,
    ProductDashboardComponent,
    FairsComponent,
    HomeComponent,
    UsersComponent,
    NavBarComponent,
    GetConfirmationComponent,
    UsersFormComponent,
    UserDashboardComponent,
    FairCardComponent,
    FairDetailsComponent,
    FairsDashBoardComponent,
    AuthComponent,
    HomepageComponent,
    PageNotFoundComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatChipsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

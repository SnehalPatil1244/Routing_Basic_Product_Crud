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
    UserDashboardComponent
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
    MatChipsModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

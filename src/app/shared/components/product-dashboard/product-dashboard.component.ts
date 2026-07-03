import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
  products: Array<IProduct> = []

  constructor(
    private productservice: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productservice.fetchproducts()
      .subscribe({
        next: data => {
          this.products = data
        },
        error: err => {
          console.log(err);

        }
      })
  }

  trackByFun(id: number, product: IProduct) {
    return product.pid
  }

}

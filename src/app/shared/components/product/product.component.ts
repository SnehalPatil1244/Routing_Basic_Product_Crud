import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productId !: string
  productobj !: IProduct


  constructor(
    private routes: ActivatedRoute,
    private productservice: ProductService,
    private router : Router,
    private snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.getproducts()

  }

  getproducts() {
   // this.productId = this.routes.snapshot.params['id']
   this.productId = this.routes.snapshot.paramMap.get('productId')!
    if (this.productId) {
      this.productservice.fetchproductById(this.productId)
        .subscribe({
          next: data => {
            this.productobj = data
          }
        })
    }
  }

  onRemove(){
    this.productservice.removeproduct(this.productId)
    .subscribe({
      next : res => {
        console.log(res);
        this.snackbar.opensnackbar(res.msg)
        this.router.navigate(['product'])
        
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }

}

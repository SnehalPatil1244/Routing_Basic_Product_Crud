import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmationComponent } from '../get-confirmation/get-confirmation.component';

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
    private router: Router,
    private snackbar: SnackbarService,
    private matdialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getproducts()

  }

  getproducts() {
    // this.productId = this.routes.snapshot.params['id']
    //  this.productId = this.routes.snapshot.paramMap.get('productId')!
    this.routes.params.subscribe(param => {
      this.productId = param['productId']
      if (this.productId) {
        this.productservice.fetchproductById(this.productId)
          .subscribe({
            next: data => {
              this.productobj = data
            }
          })
      }
    })
  }

  onRemove() {
    let config = new MatDialogConfig()
    config.width = '300px'
    config.disableClose = true
    config.data = `Are You Sure ? You Want To Remove This Product With Id ${this.productId}`
    let matref = this.matdialog.open(GetConfirmationComponent, config)
    matref.afterClosed().subscribe(res => {
      if (res) {
        this.productservice.removeproduct(this.productId).subscribe({
          next: res => {
            this.snackbar.opensnackbar(res.msg)
            this.productservice.fetchproducts().subscribe({
              next: res => {
                console.log(res[0].pid);
                this.router.navigate(['/product', res[0].pid], {
                  queryParams: { cr: res[0].canReturn }
                })
              }
            })

          },
          error: err => {
            console.log(err);

          }
        })
      }
    })
  }
  redirectToEdit() {
    this.router.navigate(['/product', this.productId, 'edit'], {
      queryParamsHandling: 'preserve',
      relativeTo: this.routes
    })

  }
}

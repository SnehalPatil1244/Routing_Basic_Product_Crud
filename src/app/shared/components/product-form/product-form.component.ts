import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../models/product';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm !: FormGroup
  isInEditMode: boolean = false
  ProductId !: string
  productobj !: IProduct
  DisableUpdatebtn: boolean = false

  constructor(
    private productservice: ProductService,
    private router: Router,
    private routes: ActivatedRoute,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.createproductform()
    this.patchproductdata()

    this.routes.queryParams.subscribe(res => {
      if (res['cr'] == 0) {
        this.productForm.disable()
        this.DisableUpdatebtn = true
      } else {
        this.productForm.enable()
        this.DisableUpdatebtn = false
      }
    })
  }

  createproductform() {
    this.productForm = new FormGroup({
      pname: new FormControl(null, [Validators.required]),
      pprice: new FormControl(null, [Validators.required]),
      pstatus: new FormControl('In-Progress'),
      pdescription: new FormControl(null, [Validators.required]),
      pimage: new FormControl(null, [Validators.required]),
      canReturn: new FormControl(1)
    })
  }


  onproductAdd() {
    let productobj = this.productForm.value;
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched()
    } else {
      let product: IProduct = {
        ...this.productForm.value, pid: Date.now().toString()
      }

      this.productservice.createproduct(product)
        .subscribe({
          next: res => {
            console.log(res);
            this.productForm.reset()
            this.snackbar.opensnackbar(res.msg)
            this.router.navigate(['product' , product.pid],{
          queryParams : {cr : res.data.canReturn}
        })

          },
          error: err => {
            console.log(err);

          }
        })
    }
  }

  patchproductdata() {
    this.ProductId = this.routes.snapshot.paramMap.get('productId')!
    if (this.ProductId) {
      this.isInEditMode = true
      this.productservice.fetchproductById(this.ProductId)
        .subscribe({
          next: res => {
            this.productForm.patchValue(res)

          }
        })
    }
  }


  onUpdate() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched()
    } else {
      let UpdatedObj: IProduct = {
        ...this.productForm.value, pid: this.ProductId
      }
      this.productservice.onupdateproduct(UpdatedObj)
        .subscribe({
          next: res => {
            this.productForm.reset()
            this.isInEditMode = false
            this.snackbar.opensnackbar(res.msg)
            this.router.navigate(['product', UpdatedObj.pid],{
          queryParams : {cr : UpdatedObj.canReturn}
        })
          },
          error: err => {
            console.log(err);
          }
        })
    }
  }

   canDeactivate() : boolean {
    if(this.productForm.dirty && this.isInEditMode) {
      return confirm(`Are You Sure Do You Want To Discard The Changes ?`)
    }
    return true
  }
}

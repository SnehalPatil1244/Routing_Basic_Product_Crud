import { inject, Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IProduct } from '../models/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class NewProductResolver implements Resolve<IProduct | IProduct[]> {
  private _productservice = inject(ProductService)
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct | IProduct[]> {
    let productId = route.paramMap.get('productId')

    if (productId) {
      return this._productservice.fetchproductById(productId)
    } else {
      return this._productservice.fetchproducts()
    }
  }
}

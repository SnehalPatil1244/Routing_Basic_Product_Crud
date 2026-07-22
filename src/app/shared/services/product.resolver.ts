import { inject, Injectable } from "@angular/core";
import { IProduct } from "../models/product";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ProductService } from "./product.service";

Injectable({
    providedIn : "root"
})
export class ProductResolver implements Resolve<IProduct[]> {
    private _productservice = inject(ProductService)
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProduct[] | Observable<IProduct[]> | Promise<IProduct[]> {
        return this._productservice.fetchproducts()
        
    }


}
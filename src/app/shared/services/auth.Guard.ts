import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn : "root"
})
export class authGuard implements CanActivate , CanActivateChild {
   

    private _authservice = inject(AuthService);
    private _router = inject(Router)
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if(!!this._authservice.getToken()){
            return true
        }else{
           return this._router.createUrlTree([''])
        }

    }

     canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       if(!! this._authservice.getToken()){
        return true
       }else{
        return this._router.createUrlTree([''])
       }
    }

} 
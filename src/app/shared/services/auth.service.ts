import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin, ISingIn } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth_Base_Url: string = environment.authBaseUrl
  isLoginSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private _http: HttpClient) { }


  login(userdetails: ILogin): Observable<any> {
    let login_url = `${this.auth_Base_Url}/api/auth/login`
    return this._http.post<any>(login_url, userdetails)
  }

  SignIn(userdetails: ISingIn): Observable<any> {
    let Signinurl = `${this.auth_Base_Url}/api/auth/register`
    return this._http.post<any>(Signinurl, userdetails)
  }
  saveToken(token: string) {
    localStorage.setItem('token', token)
  }
  saveUserRole(userRole: string) {
    localStorage.setItem('userRole', userRole)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getUserRole(): string | null {
    return localStorage.getItem('userRole')
  }

  LogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
  }


}

import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Routing_Basic_Product_Crud';
  isLogedIn: boolean = false
  private _authservice = inject(AuthService)

  ngOnInit(): void {
    this._authservice.isLoginSub$.subscribe(falg => {
      this.isLogedIn = falg
    })
    if (this._authservice.getToken()) {
      this.isLogedIn = true

    }

  }
}

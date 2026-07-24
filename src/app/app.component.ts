import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
isLoading : boolean = false
  title = 'Routing_Basic_Product_Crud';
  isLogedIn: boolean = false
  private _authservice = inject(AuthService)
  private spinnerservice = inject(SpinnerService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit(): void {
    this.islogging()
    this.isLoadingspinner()
  }

  islogging(){
     this._authservice.isLoginSub$.subscribe(falg => {
      this.isLogedIn = falg
    })
    if (this._authservice.getToken()) {
      this.isLogedIn = true
    }
  }


  isLoadingspinner(){
    this.spinnerservice.isLoadingObs$.subscribe({
      next : res => {
        this.isLoading = res
        this.cdr.detectChanges()
      }
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { OverlayModule } from "@angular/cdk/overlay";
import { Iuser } from '../../models/users';
import { UsersService } from '../../services/users.service';
import { SnackbarService } from '../../services/snackbar.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],

})
export class UserDashboardComponent implements OnInit {
 UsersArr : Iuser[] = [];
  constructor( private Userservice : UsersService,
              private snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.getusers()
   
  }

  getusers(){
    this.Userservice.fetchUsers()
    .subscribe({
      next : data =>{
        this.UsersArr = data
      },
      error : err => {
        this.snackbar.opensnackbar(err.msg)
      }
    })
  }

}

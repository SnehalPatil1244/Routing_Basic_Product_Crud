import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../models/users';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userDetails !: Iuser
  userId !: string
  constructor( private routes : ActivatedRoute,
              private userservice : UsersService
  ) { }

  ngOnInit(): void {
     this.userId = this.routes.snapshot.paramMap.get('userId')!;
    if(this.userId){
      this.userservice.fetchUserById(this.userId)
      .subscribe({
        next : data => {
          this.userDetails = data
        },
        error : err =>{
          console.log(err);
          
        }
      })
    }
  }

}

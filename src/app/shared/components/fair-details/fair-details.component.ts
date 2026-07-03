import { Component, OnInit } from '@angular/core';
import { Ifairs } from '../../models/fairs';
import { ActivatedRoute, Params } from '@angular/router';
import { FairsService } from '../../services/fairs.service';

@Component({
  selector: 'app-fair-details',
  templateUrl: './fair-details.component.html',
  styleUrls: ['./fair-details.component.scss']
})
export class FairDetailsComponent implements OnInit {
  fairsId !: string;
  fairsObj !: Ifairs
  constructor(private routes: ActivatedRoute,
    private fairsservice: FairsService
  ) { }

  ngOnInit(): void {
    this.routes.params.subscribe((params: Params) => {
      this.fairsId = params['fairsId']
      if (this.fairsId) {
        this.fairsservice.fetchFairsById(this.fairsId)
          .subscribe({
            next: data => {
              this.fairsObj = data
            },
            error: err => {
              console.log(err);

            }
          })
      }
    })
  }

}

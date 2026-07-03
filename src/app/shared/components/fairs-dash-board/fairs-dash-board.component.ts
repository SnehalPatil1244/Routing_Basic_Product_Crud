import { Component, OnInit } from '@angular/core';
import { Ifairs } from '../../models/fairs';
import { FairsService } from '../../services/fairs.service';

@Component({
  selector: 'app-fairs-dash-board',
  templateUrl: './fairs-dash-board.component.html',
  styleUrls: ['./fairs-dash-board.component.scss']
})
export class FairsDashBoardComponent implements OnInit {
  fairsArr: Ifairs[] = []
  constructor(private fairsservice: FairsService) { }

  ngOnInit(): void {
    this.getfairsDetails()
  }

  getfairsDetails() {
    this.fairsservice.fetchFairs()
      .subscribe({
        next: data => {
          this.fairsArr = data
        },
        error: err => {
          console.log(err);

        }
      })
  }

}

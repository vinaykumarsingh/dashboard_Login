import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  candidateDataRow: any = [];
  candidateData: any = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCandidateData().subscribe((data) => {
      this.candidateDataRow = data['data'];
      console.log("data==>", data)
      this.formatDashboard(this.candidateDataRow);
      this.dataService.setCandidateTableData(this.candidateDataRow)
    });

  }
  formatDashboard(data) {
    this.candidateData = _.chain(data)
      // Group the elements of Array based on `domain` property
      .groupBy("domain")
      // `key` is group's name (domain), `value` is the array of objects
      .map((value, key) => ({ domain: key, users: value.length }))
      .value();

    this.candidateData.unshift({ domain: 'Total Candidate', users: data.length })

    console.log('result--->', this.candidateData);
  }

}

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})
export class ScheduleTableComponent implements OnInit {
  sub: Subscription;
  displayedColumns = []
  dataSource;
  columnNames = [
    {
      'id': 'candidateId',
      'value': 'Candidate Id'
    },
    {
      'id': 'name',
      'value': 'Name'
    },
    {
      'id': 'domain',
      'value': 'Domain'
    },
    {
      'id': 'yearOfExperience',
      'value': 'Year of Exp'
    },
    {
      'id': 'recruiterName',
      'value': 'recruiter Name'
    },
    {
      'id': 'interviewType',
      'value': 'Interview Type'
    },
  ]

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.sub = this.dataService.getName.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}

export interface CandidateInterface {
  candidateId: string;
  name: string;
  domain: string;
  yearOfExp: string;
  recruiterName: string;
  InterviewType: string;
}
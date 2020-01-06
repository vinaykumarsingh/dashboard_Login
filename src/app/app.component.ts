import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MRC';
  isuserLoggedIn: boolean = false;

  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.dataService.currentUser.subscribe(user => {
      if (user) {
        this.isuserLoggedIn = true;
      } else {
        this.isuserLoggedIn = false;
      }
    });
  }
}

import { Component, OnInit, SimpleChanges, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  mode: any;
  selectedOption: string;
  options: string[] = ['Dashboard', 'Onboarding'];
  @ViewChild('drawer', { static: true }) public drawer: MatDrawer;

  constructor(private dataService: DataService) {
    this.mode = 'push'
    this.selectedOption = 'Dashboard'
  }

  ngOnInit() {
    this.dataService.setDrawer(this.drawer);
  }

}

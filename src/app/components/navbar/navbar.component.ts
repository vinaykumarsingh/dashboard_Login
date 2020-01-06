import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }
  toggleMenuClicked() {
    this.dataService.toggle()
  }
  navigateToLogin() {
    this.dataService.logout();
    this.dataService.currentUser.subscribe(user => {
      if (!user) {
        this.router.navigateByUrl('/login');
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage;
  isError: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }


  getError(el) {
    switch (el) {
      case 'user':
        if (this.formGroup.get('username').hasError('required')) {
          return 'Username required';
        }
        break;
      case 'pass':
        if (this.formGroup.get('password').hasError('required')) {
          return 'Password required';
        }
        break;
      default:
        return '';
    }
  }

  onSubmit(user) {
    /// uncomment below code after hitting real authentication API 
    // this.dataService.login(user).subscribe(data=>{
    //   this.router.navigate(['/home']);
    // },
    // error => {
    //   console.log("Auth Failed")
    // });

    this.dataService.login(user);
    this.dataService.currentUser.subscribe(user => {
      if (user) {
        this.router.navigate(['/home']);
      } else {
        this.isError = true;
        this.errorMessage = "Invalid Username or Password";
        // setTimeout(function() {
        //   this.errorMessage = '';
        //   this.isError = false;
        // }, 3000);
      }
    });


  }

}
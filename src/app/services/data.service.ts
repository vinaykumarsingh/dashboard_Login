import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { MatDrawer } from '@angular/material';
// import data from '../../assets/candidate.json'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private drawer: MatDrawer;
  candidateData;
  nameSub: BehaviorSubject<any> = new BehaviorSubject('');
  getName: Observable<any> = this.nameSub.asObservable();
  private currentUserSubject: BehaviorSubject<''>;
  public currentUser: Observable<''>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<''>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
  }

  toggle(): void {
    this.drawer.toggle();
  }

  getCandidateData() {
    return this.http.get('/assets/candidate.json');
  }

  setCandidateTableData(data) {
    this.candidateData = data;
    this.nameSub.next(data);
  }
  getCandidateTableData() {
    return this.candidateData;
  }

  login(user) {
    var requestData = [];
    var params = {
      "ActionMethod": "CheckLogin",
      "username": user.username,
      "Password": user.password
    }
    requestData.push(params);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //// Giive your real API Endpoint and uncomment the code 
    // let url = "http://localhost:5000/api/Auth/"

    // return this.http.post<any>(url, requestData, httpOptions).subscribe(user => {
    //   localStorage.setItem('currentUser', JSON.stringify(user));
    //   this.currentUserSubject.next(user);
    //   return user;
    // });


    if (user.username === 'Admin' && user.password === 'Admin@1234') {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    } else {
      return false;
    }

  }



  // if(post.username === 'test@test.com' && post.password === 'test') {
  //   this.router.navigate(['/home']);
  // }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}

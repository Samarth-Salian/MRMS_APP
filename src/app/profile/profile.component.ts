import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: any;

  appName = '';

  locations = ['Select', 'Building A, Bangalore', 'Building B, Bangalore', 'Building C, Bangalore'];

  constructor(public http: HttpClient, private titleChange: AppComponent,
    private activatedRoute: ActivatedRoute) {
    this.titleChange.title = this.activatedRoute.snapshot.data.title;
    this.titleChange.setTitle(this.titleChange.title);
    this.titleChange.showProfileImage = false;
    this.getjson().subscribe(data => {
      this.user = data[0];
    });
  }

  public getjson(): Observable<any> {
    return this.http.get('assets/userList.json').pipe();
  }

  public clickUpdate() {
    this.titleChange.goBack();
  }
}

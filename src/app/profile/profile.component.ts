import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'firebase/auth';
import { AppComponent } from '../app.component';

declare let window: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: any;

  appName = '';

  locations = ['Select', 'Building A, Bangalore', 'Building B, Bangalore', 'Building C, Bangalore'];

  constructor(private zone: NgZone, public http: HttpClient, private titleChange: AppComponent,
    private activatedRoute: ActivatedRoute, private router: Router) {
    this.titleChange.title = this.activatedRoute.snapshot.data.title;
    this.titleChange.setTitle(this.titleChange.title);
    this.titleChange.showProfileImage = false;
    this.user = this.titleChange.loginCredentials;
  }

  public clickUpdate() {
    this.titleChange.goBack();
  }
}

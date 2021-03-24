import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  appName = '';

  constructor(public appComponent: AppComponent) {
    this.appComponent.showProfileImage = false;
    this.appName = this.appComponent.title;
    this.appComponent.setTitle('');
    this.appComponent.backButtonScreenName = 'signin';
  }

  ngOnInit(): void {
  }
}

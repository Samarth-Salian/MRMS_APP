import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  appName = "";
  constructor(public appComponent: AppComponent) {
    this.appName = this.appComponent.title;
    this.appComponent.setTitle("");
  }

  ngOnInit(): void {
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-my-meetings',
  templateUrl: './my-meetings.component.html',
  styleUrls: ['./my-meetings.component.css'],
})
export class MyMeetingsComponent {
  constructor(private titleChange: AppComponent, private activatedRoute: ActivatedRoute) {
    this.titleChange.roomListBackButton = true;
    this.titleChange.title = this.activatedRoute.snapshot.data[''];
    this.titleChange.showProfileImage = true;
    this.titleChange.setTitle('');
    this.titleChange.showFabIcon = true;
    this.titleChange.backButtonScreenName = 'meeting';
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { MeetingService } from '../../services/meeting.service';

@Component({
  selector: 'app-my-meetings',
  templateUrl: './my-meetings.component.html',
  styleUrls: ['./my-meetings.component.css'],
})
export class MyMeetingsComponent {
  userLoginData = history.state.data;
  constructor(private titleChange: AppComponent, private activatedRoute: ActivatedRoute, private MeetingService: MeetingService) {
    this.titleChange.roomListBackButton = true;
    this.titleChange.title = this.activatedRoute.snapshot.data[''];
    this.titleChange.showProfileImage = true;
    this.titleChange.setTitle(this.titleChange.title)
    this.titleChange.setImage(this.userLoginData.profilePic);
    this.titleChange.showFabIcon = true;
    this.titleChange.backButtonScreenName = 'meeting';
    this.MeetingService.requestType = 'get';
    this.MeetingService.getToken = 'j';
    this.MeetingService.callApi();
  }
}

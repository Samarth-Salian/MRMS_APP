import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ApiServiceService } from '../../api-service.service'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-my-meetings',
  templateUrl: './my-meetings.component.html',
  styleUrls: ['./my-meetings.component.css'],
})
export class MyMeetingsComponent extends ApiServiceService implements OnInit {
  constructor(http: HttpClient, private titleChange: AppComponent, private activatedRoute: ActivatedRoute, private callService: ApiServiceService) {
    super(http);
    this.url = 'https://reqres.in/api/users/23';
    this.requestType = 'get';
    this.get();
    this.titleChange.roomListBackButton = true;
    this.titleChange.title = this.activatedRoute.snapshot.data[''];
    this.titleChange.showProfileImage = true;
    this.titleChange.setTitle('');
    this.titleChange.showFabIcon = true;
    this.titleChange.backButtonScreenName = 'meeting';
  }

  ngOnInit(): void {
   // this.callService.get();
  }
}

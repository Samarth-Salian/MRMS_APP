import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Room } from 'src/app/models/room';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-my-meetings',
  templateUrl: './my-meetings.component.html',
  styleUrls: ['./my-meetings.component.css'],
})
export class MyMeetingsComponent {
  roomSearchs: Room;

  todayDate = new FormControl(new Date());

  constructor(private titleChange: AppComponent, private activatedRoute: ActivatedRoute) {
    this.roomSearchs = new Room();
    this.titleChange.roomListBackButton = true;
    this.titleChange.title = this.activatedRoute.snapshot.data[''];
    this.titleChange.showProfileImage = true;
    this.titleChange.setTitle('');
    this.titleChange.showFabIcon = true;
    this.titleChange.backButtonScreenName = 'meeting';


  }
  onCalendarChange(pthis: any) {
    this.roomSearchs.date = pthis.targetElement.value;
  }
}

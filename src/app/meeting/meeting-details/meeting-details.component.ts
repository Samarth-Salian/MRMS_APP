import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingService } from '../../services/meeting.service';
import { AppComponent } from '../../app.component';
import { Room } from 'src/app/models/room';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {
  meetingTitle: string = "";
  meetingLocation: string = "";
  meetingRoom: string = "";
  meetingSchedule: string = "";
  meetingAttendees: any;
  selectedRoom: Room = history.state.data;
  constructor(public meetingService: MeetingService, private titleChange: AppComponent, private router: Router) {
    this.titleChange.setTitle();
    if (typeof (history.state.data) !== "undefined") {

      this.meetingLocation = this.selectedRoom.location;
      this.meetingRoom = this.selectedRoom.name;
      if (typeof (this.selectedRoom.date) !== "undefined") {
        this.meetingSchedule = this.selectedRoom.date + ' ' + this.selectedRoom.fromTime + ' ' + this.selectedRoom.toTime;
      }
      this.meetingAttendees = this.selectedRoom.seats;
    }
  }
  submitMsg: String = "Meeting details submitted successfully";
  ngOnInit(): void {

  }
  getSubmitMsg() {
    let newMeetingObj: any = {};
    newMeetingObj.Location = this.meetingLocation;
    newMeetingObj._id = this.meetingRoom;
    newMeetingObj.attendees = this.meetingAttendees;
    newMeetingObj.name = this.meetingTitle;
    newMeetingObj.fromTime = this.selectedRoom.fromTime;
    newMeetingObj.toTime = this.selectedRoom.toTime;
    this.meetingService.showSuccess(this.submitMsg);
    this.router.navigateByUrl('/my-meetings', { state: { data: newMeetingObj } });
  }

}

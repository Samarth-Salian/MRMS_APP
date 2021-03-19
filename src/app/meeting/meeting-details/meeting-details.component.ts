import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service'
import { Router } from '@angular/router';

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
  meetingAttendees:any;
  meetingObj: any = history.state.data;
  constructor(public meetingService: MeetingService,private router: Router) {
    if (typeof (history.state.data) !== "undefined") {
      this.meetingTitle = this.meetingObj.name;
      this.meetingLocation = this.meetingObj.Location;
      this.meetingRoom = this.meetingObj.roomId;
      if (typeof (this.meetingObj.date) !== "undefined") {
      this.meetingSchedule = this.meetingObj.date + ' ' + this.meetingObj.fromTime + ' ' + this.meetingObj.toTime;
      }
      this.meetingAttendees = this.meetingObj.attendees;
    }
  }
  submitMsg: String = "Meeting details submitted successfully";
  ngOnInit(): void {

  }
  getSubmitMsg() {
    let newMeetingObj:any={};
    newMeetingObj.Location = this.meetingLocation;
    newMeetingObj._id = this.meetingRoom;
    newMeetingObj.attendees = this.meetingAttendees;
    newMeetingObj.name = this.meetingTitle;
    newMeetingObj.fromTime = this.meetingObj.fromTime;
    newMeetingObj.toTime = this.meetingObj.toTime;
    this.meetingService.showSuccess(this.submitMsg);
    this.router.navigateByUrl('/my-meetings',{state: {data:newMeetingObj}});
  }

}

import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service'

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
  meetingObj: any = history.state.data;
  constructor(public meetingService: MeetingService) {
    if (typeof (history.state.data) !== "undefined") {
      this.meetingTitle = this.meetingObj.name;
      this.meetingLocation = this.meetingObj.Location;
      this.meetingRoom = this.meetingObj.roomId;
      this.meetingSchedule = this.meetingObj.date + ' ' + this.meetingObj.fromTime + ' ' + this.meetingObj.toTime;
    }
  }
  submitMsg: String = "Meeting details submitted successfully";
  ngOnInit(): void {

  }
  getSubmitMsg() {
    this.meetingService.showSuccess(this.submitMsg);
  }

}

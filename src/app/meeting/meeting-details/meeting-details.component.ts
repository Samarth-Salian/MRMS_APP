import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Room } from '../../models/room';
import { Meeting } from '../../models/meeting';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {
  meetingSchedule: string = "";
  meeting: Meeting;
  selectedMeeting: Meeting;
  selectedRoom: Room;
  submitMsg: string = "Meeting details submitted successfully";
  constructor(public snackBar: SnackbarService, private titleChange: AppComponent, private router: Router) {
    this.titleChange.setTitle();
    this.meeting = new Meeting();
    this.selectedMeeting = new Meeting();
    this.selectedRoom = new Room();
    console.log(history.state);
    if (typeof (history.state.data) !== "undefined") {
      if (history.state.flow === "createMeeting") {
        this.selectedRoom = history.state.data;
        if (typeof (history.state.data.roomCreationDetails._date) !== "undefined") {
          this.meetingSchedule = history.state.data.roomCreationDetails._date + " " + history.state.data.roomCreationDetails._fromTime + " " + history.state.data.roomCreationDetails._toTime;
        }
        this.meeting.location = history.state.data.roomCreationDetails._location;
        this.meeting.room = this.selectedRoom.name;
        this.meeting.fromTime = this.selectedRoom.fromTime;
        this.meeting.toTime = this.selectedRoom.toTime;
        this.meeting.date = this.selectedRoom.date
        this.meeting.seats = history.state.data.roomCreationDetails._seats;
      } else if (history.state.flow === "editMeeting") {
        this.selectedMeeting = history.state.data;
        if (typeof (this.selectedMeeting.date) !== "undefined") {
          this.meetingSchedule = this.selectedMeeting.date + " " + this.selectedMeeting.fromTime + " " + this.selectedMeeting.toTime;
        }
        this.meeting.name = this.selectedMeeting.name;
        this.meeting.location = this.selectedMeeting.location;
        this.meeting.room = history.state.data.roomName;
        this.meeting.seats = history.state.data.attendees;
        this.meeting.fromTime = this.selectedMeeting.fromTime;
        this.meeting.toTime = this.selectedMeeting.toTime;
        this.meeting.date = this.selectedMeeting.date
      } else {
        //TODO handle exception
      }
    } else {
      //TODO handle undefined
    }
  }
  ngOnInit(): void {

  }
  getSubmitMsg() {
    this.snackBar.openSnackBar(this.submitMsg, '');
    this.router.navigateByUrl('/my-meetings', { state: { data: this.meeting } });
  }
}

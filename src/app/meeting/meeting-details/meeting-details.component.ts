import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service'

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {
  
  constructor(public meetingService: MeetingService ) { }
  submitMsg:String = "Meeting details submitted successfully"
  ngOnInit(): void {
    
  }
  getSubmitMsg(){
    this.meetingService.showSuccess(this.submitMsg);
  }
  
}

import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']

})
export class MeetingListComponent implements OnInit {
  meetings: any;
  constructor(public http: HttpClient,private router: Router) {
    this.getjson().subscribe(data => {
      this.meetings = data;
      this.meetings.forEach(function(e:any){
        let fromSlot : any= e.slotFrom/4 < 1 ? 12+e.slotFrom/4:e.slotFrom/4;
        let toSlot : any = e.slotTo/4 < 1 ? 12+e.slotTo/4:e.slotTo/4;
        let minutesObj :any = {
          "25":15,
          "5":30,
          "75":45
          };
        fromSlot = typeof(JSON.stringify(fromSlot).split('.')[1])!=="undefined" ? JSON.stringify(fromSlot).split('.')[0] +':'+ minutesObj[JSON.stringify(fromSlot).split('.')[1]]:fromSlot+':00';
        toSlot = typeof(JSON.stringify(toSlot).split('.')[1])!=="undefined" ? JSON.stringify(toSlot).split('.')[0] +':'+ minutesObj[JSON.stringify(toSlot).split('.')[1]]:toSlot+':00';
        e.fromTime = parseInt(fromSlot.split(':')[0]) <= 12 ? fromSlot+' AM' : parseInt(fromSlot.split(':')[0]) - 12+':'+fromSlot.split(':')[1]+' PM';
        e.toTime = parseInt(toSlot.split(':')[0]) <= 12 ? toSlot+' AM' : parseInt(toSlot.split(':')[0]) - 12+':'+toSlot.split(':')[1]+' PM';
      })
      console.log(this.meetings)
    })
  }

  ngOnInit(): void { }
  public getjson(): Observable<any> {
    return this.http.get("assets/meetingList.json").pipe()
  }
  public fnNavigateToMeeting(selectedMeeting: any): any {
    this.router.navigateByUrl('/meeting-details',{state: {data:selectedMeeting}});
  }
}


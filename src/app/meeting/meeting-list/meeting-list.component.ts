import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']

})
export class MeetingListComponent implements OnInit {

  meetings: any;
  constructor(public http: HttpClient) {
    this.getjson().subscribe(data => {
      this.meetings = data;
    })
  }

  ngOnInit(): void { }
  public getjson(): Observable<any> {
    return this.http.get("assets/meetingList.json").pipe()
  }
  convertTime(timeVal: any) {
    let convertTime: any = (timeVal / 4).toString().split(".");
    switch (convertTime[1]) {
      case '25':
        convertTime[1] = ".15";
        break;
      case "5":
        convertTime[1] = ".30";
        break;
      case '75':
        convertTime[1] = ".45";
        break;
      default:
        convertTime[1] = ".00";
        break;
    }
    if (parseInt(convertTime[0]) > 12) {   //greater than 12hr
      convertTime[1] = convertTime[1] + " PM";
      convertTime[0] = parseInt(convertTime[0]) - 12;
    } else if (parseInt(convertTime[0]) < 1) {   //between 12 to 1 hr - morning
      convertTime[0] = "12";
      convertTime[1] = convertTime[1] + " AM";
    } else {    // less than 12 hr
      convertTime[1] = convertTime[1] + " AM";
    }

    return convertTime.join('');
  }
}


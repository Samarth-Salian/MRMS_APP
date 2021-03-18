import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']

})
export class MeetingListComponent implements OnInit {

  tempjson: any;
  constructor(public http: HttpClient) {
    this.getjson().subscribe(data => {
      this.tempjson = data;
      })
  }

  ngOnInit(): void {}
  public getjson(): Observable<any> {
    return this.http.get("assets/meetingList.json").pipe()
  }
}


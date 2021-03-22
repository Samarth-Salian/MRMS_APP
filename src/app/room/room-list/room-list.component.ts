import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Room } from '../../models/room';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent {
  roomDetails: Room = history.state.data;
  rooms: Room[] = [];
  conditionalFabIcon:boolean;

  constructor(private titleChange: AppComponent, private router: Router, public http: HttpClient) {

    this.titleChange.setTitle();
    this.conditionalFabIcon = this.titleChange.showFabIcon
    this.getjson().subscribe(data => {
      this.rooms = data;
    })
  }
  public getjson(): Observable<any> {
    return this.http.get("assets/roomList.json").pipe();
  }

  public fnNavigateToMeetingDetails(selectedRoom: Room): void {
    this.router.navigateByUrl('/room-details', { state: { data: selectedRoom , flow : "createMeeting" } });
  }

}







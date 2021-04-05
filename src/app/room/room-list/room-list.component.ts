import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Room } from '../../models/room';
import { AppComponent } from '../../app.component';
import { RoomSearchComponent } from '../room-search/room-search.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent {
  roomDetails: Room = history.state.data;

  rooms: Room[] = [];

  conditionalFabIcon: boolean;

  constructor(private zone: NgZone, private titleChange: AppComponent, private router: Router,
    private activatedRoute: ActivatedRoute, public http: HttpClient, private dialog: MatDialog) {
    this.titleChange.title = this.activatedRoute.snapshot.data.title;
    this.titleChange.setTitle(this.titleChange.title);
    this.conditionalFabIcon = this.titleChange.showFabIcon;
    this.subscribedRoomList();
  }

  subscribedRoomList() {
    this.getjson().subscribe(data => {
      this.rooms = data;
    });
  }

  public getjson(): Observable<any> {
    return this.http.get('assets/roomList.json').pipe();
  }

  public fnNavigateToMeetingDetails(selectedRoom: Room): void {
    if (history.state.data === 'Root Menu') {
      this.zone.run(() => { this.router.navigateByUrl('/room-details', { state: { data: selectedRoom, flow: 'creatRoom' } }); });
    } else {
      Object.defineProperty(selectedRoom, 'roomCreationDetails', {
        value: this.roomDetails,
        writable: false,
        enumerable: true,
        configurable: true,
      });
      this.zone.run(() => { this.router.navigateByUrl('/meeting-details', { state: { data: selectedRoom, flow: 'createMeeting' } }); });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(RoomSearchComponent, {
      width: '80%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (typeof (result) !== 'undefined') {
        this.roomDetails = result.data;
        this.subscribedRoomList();
      }
    });
  }
}

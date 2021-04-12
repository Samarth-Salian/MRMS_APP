import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Room } from '../../models/room';
import { AppComponent } from '../../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomSearchComponent } from '../room-search/room-search.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent {
  scrollRoomListElement: any;
  deletedRoomListRecord: any;
  deletedRoomListRow: number = 0;
  roomDetails: Room = history.state.data;

  rooms: Room[] = [];

  conditionalFabIcon: boolean;

  constructor(private zone: NgZone, private titleChange: AppComponent, private router: Router,
    private activatedRoute: ActivatedRoute, public http: HttpClient, private dialog: MatDialog, public snackBar: MatSnackBar) {
    this.titleChange.title = this.activatedRoute.snapshot.data.title;
    this.titleChange.setTitle(this.titleChange.title);
    this.conditionalFabIcon = this.titleChange.showFabIcon;
    this.subscribedRoomList();
    setTimeout(() => { this.InitializeRoomSwipe() }, 0);

  }

  public InitializeRoomSwipe = () => {
    this.titleChange.SwipeList();
  }
  subscribedRoomList() {
    this.getjson().subscribe(data => {
      this.rooms = data;
    });
  }

  public getjson(): Observable<any> {
    return this.http.get('assets/roomList.json').pipe();
  }

  public Delete(event: any) {
    this.deletedRoomListRecord = event.target.closest('.listContainer');
    this.deletedRoomListRow = parseInt(event.target.closest('.swipe-box').getAttribute('rowno'));
    event.target.closest('.listContainer').remove();
    let snackBarRef = this.snackBar.open('Deleted Successfully', 'Undo', {
      duration: 2000,
    });
    snackBarRef.onAction().subscribe(() => {
      console.log(this.deletedRoomListRow);
      console.log(this.deletedRoomListRecord);
      let currentRoomListRecord: any;
      let swipeList: any = document.getElementsByClassName('swipe-box');
      if (!swipeList.length) {
        document.getElementsByTagName('app-room-list')[0].append(this.deletedRoomListRecord);
      }
      else if ((this.deletedRoomListRow - 1) === parseInt(swipeList[swipeList.length - 1].getAttribute('rowno'))) {
        currentRoomListRecord = document.getElementById('swipeBoxId_' + (this.deletedRoomListRow - 1));
        currentRoomListRecord.parentElement.after(this.deletedRoomListRecord);
      } else {
        currentRoomListRecord = document.getElementById('swipeBoxId_' + (this.deletedRoomListRow + 1));
        currentRoomListRecord.parentElement.before(this.deletedRoomListRecord);
      }
      this.titleChange.SwipeList();
    });

  }

  public NavigateToMeetingDetails(selectedRoom: Room): void {
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
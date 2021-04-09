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
  scrollElement: any;
  deletedRecord: any;
  deletedRow: number = 0;
  roomDetails: Room = history.state.data;

  rooms: Room[] = [];

  conditionalFabIcon: boolean;

  constructor(private zone: NgZone, private titleChange: AppComponent, private router: Router,
    private activatedRoute: ActivatedRoute, public http: HttpClient, private dialog: MatDialog, public snackBar: MatSnackBar) {
    this.titleChange.title = this.activatedRoute.snapshot.data.title;
    this.titleChange.setTitle(this.titleChange.title);
    this.conditionalFabIcon = this.titleChange.showFabIcon;
    this.subscribedRoomList();
    setTimeout(() => { this.fnInitializeSwipe() }, 500);

  }
  public fnInitializeSwipe = () => {
    this.fnSwipeList();
    this.restrictDelete();
  }
  subscribedRoomList() {
    this.getjson().subscribe(data => {
      this.rooms = data;
    });
  }

  public getjson(): Observable<any> {
    return this.http.get('assets/roomList.json').pipe();
  }

  public fnDelete(event: any) {
    this.deletedRecord = event.target.closest('.listContainer');
    this.deletedRow = parseInt(event.target.closest('.swipe-box').getAttribute('rowno'));
    event.target.closest('.listContainer').remove();
    let snackBarRef = this.snackBar.open('Deleted Successfully', 'Undo', {
      duration: 2000,
    });
    snackBarRef.onAction().subscribe(() => {
      console.log(this.deletedRow);
      console.log(this.deletedRecord);
      let currentRecord: any;
      let swipeList: any = document.getElementsByClassName('swipe-box');
      if ((this.deletedRow - 1) === parseInt(swipeList[swipeList.length - 1].getAttribute('rowno'))) {
        currentRecord = document.getElementById('swipeBoxId_' + (this.deletedRow - 1));
        currentRecord.parentElement.after(this.deletedRecord);
      } else {
        currentRecord = document.getElementById('swipeBoxId_' + (this.deletedRow + 1));
        currentRecord.parentElement.before(this.deletedRecord);
      }
      this.fnSwipeList();
    });

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

  public restrictDelete() {
    let initialCard: any = document.getElementsByClassName('observe-item');
    if (document.getElementsByClassName('listContainer ').length === 1) {
      initialCard[0].style.display = 'none';
    } else {
      initialCard[0].style.display = 'block';
    }
  }


  public fnSwipeList() {
    const swipeBoxes = document.querySelectorAll('.swipe-box');
    swipeBoxes.forEach(swipeBox => {
      const scroller = swipeBox.querySelector('.swipe-box__scroller');
      if (scroller) {
        scroller.scrollLeft += scroller.scrollWidth / 3;
      }
      this.fnDetectSwipe(swipeBox);
    });
  }

  public fnDetectSwipe(swipeBoxObj: any) {
    let touchstartX = 0;
    let touchendX = 0;
    const gestureZone = swipeBoxObj;
    gestureZone.addEventListener('touchstart', function (event: any) {
      touchstartX = event.changedTouches[0].screenX;
    }, false);
    gestureZone.addEventListener('touchend', (event: any) => {
      touchendX = event.changedTouches[0].screenX;
    }, false);
  }

}
import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Meeting } from '../../models/meeting';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from 'src/app/app.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css'],
  animations: [
    trigger('slidelefttitle', [
      transition('void=>*', [
        style({ opacity: 0, transform: 'translateX(150%)' }),
        animate('900ms 300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 },))
      ])
    ])
  ]
})
export class MeetingListComponent {
  meetings: Meeting[] = [];
  scrollElement: any;
  deletedRecord: any;
  deletedRow: number = 0;
  showSkeletion: any;
  constructor(private zone: NgZone, public http: HttpClient, private router: Router, public snackBar: MatSnackBar, private appComponent: AppComponent) {
    this.getjson().subscribe((data) => {
      this.showSkeletion = false;
      this.meetings = data;
      this.meetings.forEach((e: Meeting) => {
        let fromSlot: any = e.slotFrom / 4 < 1 ? 12 + e.slotFrom / 4 : e.slotFrom / 4;
        let toSlot: any = e.slotTo / 4 < 1 ? 12 + e.slotTo / 4 : e.slotTo / 4;
        const minutesObj: any = {
          25: 15,
          5: 30,
          75: 45,
        };
        fromSlot = typeof (JSON.stringify(fromSlot).split('.')[1]) !== 'undefined' ? `${JSON.stringify(fromSlot).split('.')[0]}:${minutesObj[JSON.stringify(fromSlot).split('.')[1]]}` : `${fromSlot}:00`;
        toSlot = typeof (JSON.stringify(toSlot).split('.')[1]) !== 'undefined' ? `${JSON.stringify(toSlot).split('.')[0]}:${minutesObj[JSON.stringify(toSlot).split('.')[1]]}` : `${toSlot}:00`;
        e.fromTime = parseInt(fromSlot.split(':')[0]) <= 12 ? `${fromSlot} AM` : `${parseInt(fromSlot.split(':')[0]) - 12}:${fromSlot.split(':')[1]} PM`;
        e.toTime = parseInt(toSlot.split(':')[0]) <= 12 ? `${toSlot} AM` : `${parseInt(toSlot.split(':')[0]) - 12}:${toSlot.split(':')[1]} PM`;
      });
      setTimeout(() => { this.initializeSwipe() }, 0);
      setTimeout(() => {
        this.showSkeletion = true;
      }, 3000);
    });
  }
  public getjson(): Observable<any> {
    return this.http.get('assets/meetingList.json').pipe();
  }

  public navigateToMeeting(selectedMeeting: Meeting): any {
    this.zone.run(() => { this.router.navigateByUrl('/meeting-details', { state: { data: selectedMeeting, flow: 'editMeeting' } }); });
  }
  public fnTaskGlobalSearch(searchText: any, data: any) {
    let results = [];
    const toSearch = searchText;
    let key;
    for (let item of data) {
      for (key in item) {
        if (item[key].toString().indexOf(toSearch) !== -1) {
          results.push(item);
        }
      }
    }
  }
  public initializeSwipe = () => {
    //this.appComponent.swipeList();
  }
  public delete(event: any) {
    this.deletedRecord = event.target.closest('.ionicListContainer');
    this.deletedRow = parseInt(event.target.closest('.ionicListContainer').getAttribute('rowno'));
    event.target.closest('.ionicListContainer').remove();
    let snackBarRef = this.snackBar.open('Deleted Successfully', 'Undo', {
      duration: 2000,
    });
    snackBarRef.onAction().subscribe(() => {
      let currentRecord: any;
      let swipeList: any = document.getElementsByClassName('ionicListContainer');
      if (!swipeList.length) {
        document.getElementsByClassName('appMeetingList')[0].append(this.deletedRecord);
      }
      else if ((this.deletedRow - 1) === parseInt(swipeList[swipeList.length - 1].getAttribute('rowno'))) {
        currentRecord = document.getElementById('swipeBoxId_' + (this.deletedRow - 1));
        currentRecord.parentElement.after(this.deletedRecord);
      } else {
        currentRecord = document.getElementById('swipeBoxId_' + (this.deletedRow + 1));
        currentRecord.parentElement.before(this.deletedRecord);
      }
      this.appComponent.swipeList();
    });
  }
}




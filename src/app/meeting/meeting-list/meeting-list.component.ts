import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Meeting } from '../../models/meeting';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css'],
})
export class MeetingListComponent {
  meetings: Meeting[] = [];
  scrollElement: any;
  deletedRecord: any;
  deletedRow: number = 0;
  constructor(private zone: NgZone, public http: HttpClient, private router: Router, public snackBar: MatSnackBar) {
    this.getjson().subscribe((data) => {
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
      setTimeout(() => { this.fnInitializeSwipe() }, 0);
    });
  }

  public getjson(): Observable<any> {
    return this.http.get('assets/meetingList.json').pipe();
  }

  public fnNavigateToMeeting(selectedMeeting: Meeting): any {
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
  public fnInitializeSwipe = () => {
    this.fnSwipeList();
    this.restrictDelete();
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
    const gestureZone = swipeBoxObj;
    gestureZone.addEventListener('touchstart', (event: any) => {
      event.target.closest('.listContainer').classList.add("swipeCls");
    }, false);
    gestureZone.addEventListener('touchend', (event: any) => {
      clearInterval(this.scrollElement);
      this.handleGesture(event);
      event.target.closest('.listContainer').classList.remove("swipeCls");
    }, false);
  }
  public handleGesture(event: any) {
    console.log(event.target.closest('.swipe-box__scroller').scrollLeft);
    this.scrollElement = setInterval(() => {
      if (event.target && event.target.closest('.swipe-box__scroller') && window.location.pathname.split('/')[window.location.pathname.split('/').length - 1] === "my-meetings") {
        let cardDisplay: string = event.target.closest('.swipe-box__scroller').getElementsByClassName('observe-item')[0].style.display;
        if (!event.target.closest('.swipe-box__scroller').scrollLeft && cardDisplay === "block") {
          clearInterval(this.scrollElement);
          this.deletedRecord = event.target.closest('.listContainer');
          this.deletedRow = parseInt(event.target.closest('.swipe-box').getAttribute('rowno'));
          event.target.closest('.listContainer').remove();
          this.restrictDelete();
          this.handleSnackbar();
        }
      } else {
        clearInterval(this.scrollElement);
      }
    }, 200);
  }
  public handleSnackbar() {
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
}




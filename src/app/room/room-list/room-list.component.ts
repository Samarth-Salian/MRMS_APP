import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Room } from '../../models/room';
import { AppComponent } from '../../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomSearchComponent } from '../room-search/room-search.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent {
  scrollElement: any;
  scrollRoomListElement: any;
  deletedRoomListRecord: any;
  deletedRoomListRow: number = 0;
  roomDetails: Room = history.state.data;
  conditionalFilter: boolean;

  rooms: Room[] = [];

  conditionalFabIcon: boolean;
  showSkeletion: boolean = false;
  constructor(private zone: NgZone, private titleChange: AppComponent, private router: Router,
    private activatedRoute: ActivatedRoute, public modalController: ModalController, public http: HttpClient, private dialog: MatDialog, public snackBar: MatSnackBar) {
    this.titleChange.title = this.activatedRoute.snapshot.data.title;
    this.titleChange.setTitle(this.titleChange.title);
    this.conditionalFabIcon = this.titleChange.showFabIcon;
    this.conditionalFilter = this.titleChange.showFilterIcon;
    this.subscribedRoomList();
    setTimeout(() => {
      this.showSkeletion = true;
    }, 3000)
    this.scrollElement = setInterval(() => {
      if (document.getElementsByClassName('swipe-box__scroller').length && !document.getElementsByClassName('swipe-box__scroller')[0].scrollLeft) {
        this.initializeRoomSwipe();
        if (!this.conditionalFilter) {
          const filterObj: any = document.getElementsByClassName('listHeader');
          filterObj[0].style.marginTop = '30px';
        }
        if (!history.state.data || document.getElementsByClassName('filterIcon').length) {
          this.hideEditSection();
        }
        clearInterval(this.scrollElement);
      }
    }, 100);
  }

  public initializeRoomSwipe = () => {
    this.titleChange.swipeList();
  }
  subscribedRoomList() {
    this.getjson().subscribe(data => {
      this.rooms = data;
    });
  }

  public getjson(): Observable<any> {
    return this.http.get('assets/roomList.json').pipe();
  }

  public delete(event: any) {
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
      this.titleChange.swipeList();
    });

  }

  public navigateToMeetingDetails(selectedRoom: Room): void {
    if (history.state.data === 'Root Menu') {
      this.zone.run(() => { this.router.navigateByUrl('/room-details', { state: { data: selectedRoom, flow: 'creatRoom' } }); });
    } else {
      Object.defineProperty(selectedRoom, 'roomCreationDetails', {
        value: this.roomDetails,
        writable: false,
        enumerable: true,
        configurable: true,
      });
      let navigationExtras: NavigationExtras = {
        state: {
          data: selectedRoom,
          flow: 'createMeeting'
        }
      };
      this.zone.run(() => { this.router.navigateByUrl('/meeting-details', navigationExtras); });
    }
      //this.zone.run(() => { this.router.navigateByUrl('/meeting-details', { state: { data: selectedRoom, flow: 'createMeeting' } }); });
  }

  public hideEditSection() {
    let observeItem = document.querySelectorAll('.swipe-box__scroller');
    observeItem.forEach(e => {
      let mailBox: any = e.querySelectorAll('.observe-item');
      let ionCard: any = e.querySelector('.shimmerHeader ')
      if (ionCard !== null && ionCard.length === 0) {
        let listCard: any = e.querySelectorAll('.mat-card-header');
        listCard[0].classList.add('restrictSwipeCls');
        mailBox[0].remove();
      }
    });
  }

  openDialog() {
    this.presentModal();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: RoomSearchComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}

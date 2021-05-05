import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class LocationListComponent {
  scrollElement: any;
  deletedLocationListRecord: any;
  deletedLocationListRow: number = 0;
  locations: any;
  showSkeletion: boolean = false;
  constructor(private zone: NgZone, private titleChange: AppComponent, private activatedRoute: ActivatedRoute,
    public http: HttpClient, private router: Router, public snackBar: MatSnackBar) {
    this.titleChange = titleChange;
    this.titleChange.title = this.activatedRoute.snapshot.data.title;
    this.titleChange.setTitle(this.titleChange.title);
    this.titleChange.showFabIcon = false;
    this.getjson().subscribe(data => {
      setTimeout(() => {
        this.showSkeletion = true;
      }, 3000)
      this.locations = data;
    });
    this.scrollElement = setInterval(() => {
      if (!document.getElementsByClassName('swipe-box__scroller')[0].scrollLeft) {
        this.initializeSwipe();
        clearInterval(this.scrollElement);
      }
    }, 100);
  }
  public initializeSwipe = () => {
    this.titleChange.swipeList();
  }

  public getjson(): Observable<any> {
    return this.http.get('assets/locationList.json').pipe();
  }

  public navigateToLocation(selectedLocation: any): any {
    this.titleChange.swipeList();
    this.zone.run(() => { this.titleChange.navCtlr.navigateForward('/location-details', { state: { data: selectedLocation } }); });
  }

  public delete(event: any) {
    this.deletedLocationListRecord = event.target.closest('.listContainer');
    this.deletedLocationListRow = parseInt(event.target.closest('.swipe-box').getAttribute('rowno'));
    event.target.closest('.listContainer').remove();
    let snackBarRef = this.snackBar.open('Deleted Successfully', 'Undo', {
      duration: 2000,
    });
    snackBarRef.onAction().subscribe(() => {
      console.log(this.deletedLocationListRow);
      console.log(this.deletedLocationListRecord);
      let currentRoomListRecord: any;
      let swipeList: any = document.getElementsByClassName('swipe-box');
      if (!swipeList.length) {
        document.getElementsByTagName('app-location-list')[0].append(this.deletedLocationListRecord);
      }
      else if ((this.deletedLocationListRow - 1) === parseInt(swipeList[swipeList.length - 1].getAttribute('rowno'))) {
        currentRoomListRecord = document.getElementById('swipeBoxId_' + (this.deletedLocationListRow - 1));
        currentRoomListRecord.parentElement.after(this.deletedLocationListRecord);
      } else {
        currentRoomListRecord = document.getElementById('swipeBoxId_' + (this.deletedLocationListRow + 1));
        currentRoomListRecord.parentElement.before(this.deletedLocationListRecord);
      }
      this.titleChange.swipeList();
    });

  }

  fabIconValidation() {
    this.titleChange.showFabIcon = false;
    this.titleChange.showFilterIcon = true;
    this.titleChange.navCtlr.navigateForward('/location-details');
  }

}

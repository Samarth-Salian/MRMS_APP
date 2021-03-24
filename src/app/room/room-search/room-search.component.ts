import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { AppComponent } from '../../app.component';
import { Room } from 'src/app/models/room';
import { Moment } from 'moment';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.css']
})
export class RoomSearchComponent implements OnInit {
  color: ThemePalette = 'primary';
  selected: any;
  locations = ['Select', 'Building A', 'Building B', 'Building C'];
  roomSearch: Room;
  fromTime = "";
  toTime = "";
  minDate = new Date();
  todayDate = new FormControl(new Date());
  constructor(private activatedRoute: ActivatedRoute, private titleChange: AppComponent, private router: Router, private snackBar: SnackbarService) {
    this.titleChange.roomListBackButton = false;
    this.titleChange.title = this.activatedRoute.snapshot.data['title'];
    this.titleChange.setTitle(this.titleChange.title);
    this.titleChange.showFabIcon = false;
    this.roomSearch = new Room();
    this.formatDate();
    this.roomSearch.date = moment(new Date()).format("DD-MM-YYYY");
  }

  ngOnInit(): void {
    this.roomSearch.fromTime = this.fromTime;
    this.roomSearch.toTime = this.toTime;
  }
  ngAfterViewInit() {
  }
  onOptionsSelected() {
    console.log(this.selected)
  }

  public fnNavigateToRoomList() {
    if (this.roomSearch.seats <= 0) {
      this.snackBar.openSnackBar('Seats should be more than 0', '');
    } else {
    console.log(this.roomSearch);
    console.log(`after ${JSON.stringify(this.roomSearch)}`);
    this.router.navigateByUrl('/room-list', { state: { data: this.roomSearch } });
    }
  }
  onCalendarChange(pthis: any) {
    this.roomSearch.date = pthis.targetElement.value;
  }
  formatDate() {
    let minutes = new Date().getMinutes();
    var updatedMinutes: Date = new Date();
    if (minutes >= 0 && minutes < 15) {
      let rMin = 15 - minutes;
      updatedMinutes = new Date(new Date().setMinutes(minutes + rMin))
    } else if (minutes >= 15 && minutes < 30) {
      let rMin = 30 - minutes;
      updatedMinutes = new Date(new Date().setMinutes(minutes + rMin))
    } else if (minutes >= 30 && minutes < 45) {
      let rMin = 45 - minutes;
      updatedMinutes = new Date(new Date().setMinutes(minutes + rMin))
    } else if (minutes >= 45 && minutes < 59) {
      let rMin = 60 - minutes;
      updatedMinutes = new Date(new Date().setMinutes(minutes + rMin))
    }
    let fromDate: string = this.formatDateAndTime(updatedMinutes);
    let updatedHours = new Date(updatedMinutes.setHours(updatedMinutes.getHours() + 1));
    let toDate: string = this.formatDateAndTime(updatedHours);
    this.fromTime = fromDate;
    this.toTime = toDate;
  }
  formatDateAndTime(updatedMinutes: Date) {
    let normalizeHour = updatedMinutes.getHours() >= 12 ? updatedMinutes.getHours() - 12 : updatedMinutes.getHours()
    let finalTime = ("0" + updatedMinutes.getMinutes()).slice(-2);
    return updatedMinutes.getHours() >= 12 ? normalizeHour + ':' + finalTime + ' pm' : normalizeHour + ':' + finalTime + ' aM'
  }
}


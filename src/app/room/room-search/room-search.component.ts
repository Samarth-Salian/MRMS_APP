import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { AppComponent } from '../../app.component';
import { Room } from 'src/app/models/room';
import { Moment } from 'moment';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

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
  fromTime = '';
  toTime = '';
  minDate = new Date();
  todayDate = new FormControl(new Date());
  constructor(private titleChange: AppComponent, private router: Router) {
    this.titleChange.setTitle();
    this.titleChange.showFabIcon = false;
    this.roomSearch = new Room();
    this.formatDate();
    this.roomSearch.date = moment(new Date()).format('DD-MM-YYYY');
  }

  ngOnInit(): void {
    this.roomSearch.fromTime = this.fromTime;
    this.roomSearch.toTime = this.toTime;
  }
  AfterViewInit(): void {
  }
  onOptionsSelected(): void {
    console.log(this.selected);
  }

  public fnNavigateToRoomList(): void {
    console.log(this.roomSearch);
    console.log(`after ${JSON.stringify(this.roomSearch)}`);
    this.router.navigateByUrl('/room-list', { state: { data: this.roomSearch } });
  }
  onCalendarChange(pthis: any): void {
    this.roomSearch.date = pthis.targetElement.value;
  }
  formatDate(): void {
    const minutes = new Date().getMinutes();
    let updatedMinutes: Date = new Date();
    if (minutes >= 0 && minutes < 15) {
      const rMin = 15 - minutes;
      updatedMinutes = new Date(new Date().setMinutes(minutes + rMin));
    } else if (minutes >= 15 && minutes < 30) {
      const rMin = 30 - minutes;
      updatedMinutes = new Date(new Date().setMinutes(minutes + rMin));
    } else if (minutes >= 30 && minutes < 45) {
      const rMin = 45 - minutes;
      updatedMinutes = new Date(new Date().setMinutes(minutes + rMin));
    } else if (minutes >= 45 && minutes < 59) {
      const rMin = 60 - minutes;
      updatedMinutes = new Date(new Date().setMinutes(minutes + rMin));
    }
    const fromDate: string = this.formatDateAndTime(updatedMinutes);
    const updatedHours = new Date(updatedMinutes.setHours(updatedMinutes.getHours() + 1));
    const toDate: string = this.formatDateAndTime(updatedHours);
    this.fromTime = fromDate;
    this.toTime = toDate;
  }
  formatDateAndTime(updatedMinutes: Date) {
    const normalizeHour = updatedMinutes.getHours() >= 13 ? updatedMinutes.getHours() - 12 : updatedMinutes.getHours();
    const finalTime = ('0' + updatedMinutes.getMinutes()).slice(-2);
    return updatedMinutes.getHours() >= 13 ? normalizeHour + ':' + finalTime + ' pm' : normalizeHour + ':' + finalTime + ' aM';
  }
}


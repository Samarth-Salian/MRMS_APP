import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { $ } from 'protractor';
import { DatePipe } from '@angular/common';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.css']
})
export class RoomSearchComponent implements OnInit {
  color: ThemePalette = 'primary';
  selected: any;
  locations = ['Select', 'Building A', 'Building B', 'Building C'];
  constructor(private titleChange: AppComponent, private router: Router, public datepipe: DatePipe) {
    this.titleChange.setTitle();
  }

  ngOnInit(): void {
  }
  onOptionsSelected() {
    console.log(this.selected)
  }
  public fnNavigateToRoomList(params: any): any {
    let roomDetailsObj: any = {};
    roomDetailsObj.location = document.getElementById("buldingnames");
    roomDetailsObj.location = roomDetailsObj.location.selectedOptions.length !== 0 ? roomDetailsObj.location.selectedOptions[0].innerText : "";
    roomDetailsObj.date = this.datepipe.transform(params.date, 'yyyy-MM-dd');
    roomDetailsObj.fromTime = params.fromSlot;
    roomDetailsObj.toTime = params.toSlot;
    roomDetailsObj.attendees = params.attendee;
    this.router.navigateByUrl('/room-list', { state: { data: roomDetailsObj } });
  }
}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { $ } from 'protractor';


@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.css']
})
export class RoomSearchComponent implements OnInit {

  selected: any;
  locations = ['Select', 'Building 1', 'Building 2', 'Building 3'];
  constructor(private router: Router) { }


  ngOnInit(): void {

  }
  onOptionsSelected() {
    console.log(this.selected)
  }
  public fnNavigateToRoomList(params: any): any {
    let roomDetailsObj: any = {};
    roomDetailsObj.location = document.getElementById("buldingnames");
    roomDetailsObj.location = roomDetailsObj.location.selectedOptions[0].innerText;
    roomDetailsObj.date = params.date;
    roomDetailsObj.fromTime = params.fromSlot;
    roomDetailsObj.toTime = params.toSlot;
    roomDetailsObj.attendees = params.attendee;
    this.router.navigateByUrl('/room-list', { state: { data: roomDetailsObj } });
  }

}


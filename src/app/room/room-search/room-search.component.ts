import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { AppComponent } from '../../app.component';
import { Room } from 'src/app/room';

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

  constructor(private titleChange: AppComponent, private router: Router, public datepipe: DatePipe) {
    this.titleChange.setTitle();
    this.roomSearch = new Room();
  }

  ngOnInit(): void {
  }

  onOptionsSelected() {
    console.log(this.selected)
  }

  public fnNavigateToRoomList() {
    this.router.navigateByUrl('/room-list', { state: { data: this.roomSearch } });
  }
}


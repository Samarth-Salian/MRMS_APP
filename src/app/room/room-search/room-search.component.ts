import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { AppComponent } from '../../app.component';
import { Room } from 'src/app/models/room';
import { Moment } from 'moment';

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

  constructor(private titleChange: AppComponent, private router: Router) {
    this.titleChange.setTitle();
    this.roomSearch = new Room();
  }

  ngOnInit(): void {
  }

  onOptionsSelected() {
    console.log(this.selected)
  }

  public fnNavigateToRoomList() {
    console.log(this.roomSearch);
    this.roomSearch.date = (<Moment><unknown>this.roomSearch.date).format('DD-MM-YYYY');
    console.log(`after ${JSON.stringify(this.roomSearch)}`);
    this.router.navigateByUrl('/room-list', { state: { data: this.roomSearch } });
  }
}


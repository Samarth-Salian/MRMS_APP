import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';


@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.css']
})
export class RoomSearchComponent implements OnInit {

  selected: any;

  locations = ['Select', 'Building 1', 'Building 2', 'Building 3'];

  constructor() { }


  ngOnInit(): void {

  }
  onOptionsSelected() {
    console.log(this.selected)
  }


}


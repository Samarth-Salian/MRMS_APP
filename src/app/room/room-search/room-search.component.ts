import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { $ } from 'protractor';


@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.css']
})
export class RoomSearchComponent implements OnInit {
  color: ThemePalette = 'primary';
  selected: any;
  locations = ['Select', 'Building A', 'Building B', 'Building C'];

  constructor() { }

  ngOnInit(): void {

  }
  onOptionsSelected() {
    console.log(this.selected)
  }
}


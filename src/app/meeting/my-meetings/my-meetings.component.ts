import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component'

@Component({
  selector: 'app-my-meetings',
  templateUrl: './my-meetings.component.html',
  styleUrls: ['./my-meetings.component.css']
})
export class MyMeetingsComponent implements OnInit {

  constructor(private titleChange:AppComponent) {
    this.titleChange.setTitle();
   }

  ngOnInit(): void {
  }

}

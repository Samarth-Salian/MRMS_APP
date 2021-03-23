import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-meetings',
  templateUrl: './my-meetings.component.html',
  styleUrls: ['./my-meetings.component.css']
})
export class MyMeetingsComponent implements OnInit {
  constructor(private titleChange: AppComponent, private activatedRoute: ActivatedRoute) {
    this.titleChange.title = this.activatedRoute.snapshot.data[''];
    this.titleChange.setTitle('');
    this.titleChange.showFabIcon = true;
  }

  ngOnInit(): void {
  }

}

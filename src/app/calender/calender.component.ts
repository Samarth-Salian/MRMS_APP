import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MeetingListComponent } from './../meeting/meeting-list/meeting-list.component';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  date1: any;
  transformedDate: any;
  constructor(public datepipe: DatePipe) {
  }
  onCalendarChange(event: any): void {
    this.transformedDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
  }
  ngOnInit(): void {
    const currentDate = new Date().getFullYear() + ' - ' + (new Date().getMonth() + 1) + ' - ' + new Date().getDate();
    // this.fnTaskGlobalSearch(currentDate,currentDate);
  }


}

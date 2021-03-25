import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalenderComponent {
  date1: any;

  transformedDate: any;

  constructor(public datepipe: DatePipe) {
  }

  onCalendarChange(event: any) {
    this.transformedDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
  }
}

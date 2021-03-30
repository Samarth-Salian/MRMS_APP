import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-stepper',
  templateUrl: './input-stepper.component.html',
  styleUrls: ['./input-stepper.component.css'],
})
export class InputStepperComponent {
  @Input() seatsNo: number;
  @Output() updateSeatNum: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    this.seatsNo = 1;
  }

  disabledMinus = false;

  updateSeatValue(event: any) {
    if (this.seatsNo === 1 && event.target.id !== 'plusBtn') {
      this.disabledMinus = true;
    } else {
      if (this.seatsNo >= 1) {
        this.disabledMinus = false;
      }
      if (event.target.id === 'plusBtn') {
        this.seatsNo++;
      } else {
        this.seatsNo--;
      }
      this.updateSeatNum.emit(this.seatsNo);
    }
  }

  updatedSeatVal() {
    this.updateSeatNum.emit(this.seatsNo);
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-stepper',
  templateUrl: './input-stepper.component.html',
  styleUrls: ['./input-stepper.component.css'],
})
export class InputStepperComponent {
  @Input() seatsNo: number;

  constructor() {
    this.seatsNo = 1;
  }

  disabledMinus = false;

  updateSeatValue(event: any) {
    let count = Number((<HTMLInputElement>document.getElementById('mynum')).value);
    if (count === 1 && event.target.id !== 'plusBtn') {
      this.disabledMinus = true;
    } else {
      if (count >= 1) {
        this.disabledMinus = false;
      }
      if (event.target.id === 'plusBtn') {
        count++;
      } else {
        count--;
      }
      (<HTMLInputElement>document.getElementById('mynum')).value = String(count);
    }
  }
}

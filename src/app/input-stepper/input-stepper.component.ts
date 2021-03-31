import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-stepper',
  templateUrl: './input-stepper.component.html',
  styleUrls: ['./input-stepper.component.css'],
})
export class InputStepperComponent {
  @Input() counter: number;

  @Output() counterChange = new EventEmitter<number>();

  constructor() {
    this.counter = 1;
  }

  disabledMinus = false;

  updateSeatValue(event: any) {
    if (this.counter === 1 && event.target.id !== 'plusBtn') {
      this.disabledMinus = true;
    } else {
      if (this.counter >= 1) {
        this.disabledMinus = false;
      }
      if (event.target.id === 'plusBtn') {
        this.counterChange.emit(++this.counter);
      } else if (event.target.id === 'minusBtn') {
        this.counterChange.emit(--this.counter);
      } else if (String(this.counter) === '') {
        this.counter = 1;
        this.counterChange.emit(this.counter);
      }
    }
  }
}

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
      event.target.classList.add("disabled")
    } else {
      if (this.counter >= 1) {
        this.disabledMinus = false;
        event.target.parentElement.children[1].classList.remove('disabled')
      }
      if (event.target.id === 'plusBtn') {
        this.counterChange.emit(++this.counter);
      } if (event.target.id === 'minusBtn') {
        this.counterChange.emit(--this.counter);
      } if (this.counter === 1) {
        event.target.classList.add("disabled")
      } if (String(this.counter) === '' || this.counter === null) {
        this.counter = 1;
        this.counterChange.emit(this.counter);
      } else {
        this.counterChange.emit(this.counter);
      }
    }
  }
}

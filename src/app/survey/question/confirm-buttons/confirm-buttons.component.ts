import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-buttons',
  templateUrl: './confirm-buttons.component.html',
  styleUrls: ['./confirm-buttons.component.css']
})
export class ConfirmButtonsComponent {
  @Output() next = new EventEmitter();
  @Output() prev = new EventEmitter();

  constructor() {}

  onNext() {
    this.next.emit();
  }

  onPrev() {
    this.prev.emit();
  }
}

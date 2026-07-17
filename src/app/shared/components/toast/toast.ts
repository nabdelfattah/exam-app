import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
})
export class Toast {
  @Output() toastEvent: EventEmitter<boolean> = new EventEmitter();

  clickHandler() {
    this.toastEvent.emit(false);
  }
}

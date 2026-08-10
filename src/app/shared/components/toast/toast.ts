import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
})
export class Toast {
  message = input<string>();
  @Output() toastEvent: EventEmitter<boolean> = new EventEmitter();

  clickHandler() {
    this.toastEvent.emit(false);
  }
}

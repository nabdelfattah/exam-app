import { Component, inject } from '@angular/core';

import { Location } from '@angular/common';
@Component({
  selector: 'app-back-button',
  imports: [],
  templateUrl: './back-button.component.html',
  host: {
    class: 'h-full',
  },
})
export class BackButtonComponent {
  private location = inject(Location);
  goBack() {
    this.location.back();
  }
}

import { Component, ViewChild, inject, input, model } from '@angular/core';
import { RouterLinkWithHref, RouterLinkActive, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { Popover } from 'primeng/popover';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLinkWithHref,
    ButtonModule,
    PopoverModule,
    AvatarModule,
    RippleModule,
    StyleClassModule,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  host: {
    class: 'h-full',
  },
})
export class SidebarComponent {
  private readonly router = inject(Router);
  user = JSON.parse(localStorage.getItem('examUser') || '');
  isVisible = model();

  // the close button handler
  closeCallback(e: Event) {
    this.isVisible.set(false);
  }

  // for the user popover (ellipsis)
  @ViewChild('op') op!: Popover;
  toggle(event: Event) {
    this.op.toggle(event);
  }

  logout() {
    localStorage.removeItem('examToken');
    localStorage.removeItem('examUser');
    this.router.navigate(['/login']);
  }
}

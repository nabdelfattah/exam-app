import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { RippleModule } from 'primeng/ripple';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, DrawerModule, RippleModule, ButtonModule, SidebarComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  visible = true;
}

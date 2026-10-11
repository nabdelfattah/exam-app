import { Component, inject } from '@angular/core';
import { BreadcrumbRouterDemo } from '@/app/shared/components/breadcrumb/breadcrumb.component';
import { BackButtonComponent } from '@/app/shared/components/back-button/back-button.component';
import { TitleComponent } from '@/app/shared/components/title/title.component';
import { RouterModule } from '@angular/router';
import { Button } from '@/app/shared/components';
import { AuthFlowService } from '@/app/features/auth/services/auth-flow-service';

@Component({
  selector: 'app-settings-layout',
  imports: [BreadcrumbRouterDemo, BackButtonComponent, TitleComponent, RouterModule, Button],
  templateUrl: './settings-layout.component.html',
})
export class SettingsLayoutComponent {
  private readonly authFlowService = inject(AuthFlowService);
  items = [{ label: 'Account', routerLink: '/account' }];
  logout() {
    this.authFlowService.logout();
  }
}
